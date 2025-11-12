'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product, mapStockProductToProduct } from './types'
import { ProductsHeader } from '@/components/ProductsHeader'
import { TabButton } from '@/components/TabButton'
import { SearchBar } from '@/components/SearchBar'
import { ProductTable } from '@/components/ProductTable'
import { ProductModal } from '@/components/ProductModal'
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal'
import { stockProductService, StatusEnum } from '@/services/stockProductService'
import { catalogService } from '@/services/catalogService'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function ProductsPage() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<string>('ativos')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<'add' | 'details'>('add')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const router = useRouter()

  const handleOpenAddModal = () => {
    setModalMode('add')
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleOpenDetailsModal = (product: Product) => {
    setModalMode('details')
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true)
  }

  const parseCurrency = (value: string): number => {
    if (!value) return 0
    const cleaned = value.replace(/R\$\s*/g, '').trim()
    const normalized = cleaned.replace(',', '.')
    return parseFloat(normalized) || 0
  }

  const handleProductSubmit = async (
    formData: Record<string, FormDataEntryValue>
  ) => {
    setLoading(true)
    setError('')

    try {
      const now = new Date()
      const today = now.toISOString().split('T')[0]

      if (modalMode === 'add') {
        const internalCode = formData.internalCode as string

        try {
          const catalogExists = await catalogService.exists(internalCode)

          if (!catalogExists) {
            const catalogDto = {
              internalCode: internalCode,
              name: formData.name as string,
              section: formData.sector as string,
              quantity: parseFloat(formData.quantity as string) || 0,
            }
            await catalogService.create(catalogDto)
          }
        } catch (catalogError: any) {
          console.error('Erro ao criar item no catálogo:', catalogError)
          setError('Erro ao criar produto no catálogo. Tente novamente.')
          setLoading(false)
          return
        }
        const stockDto = {
          internalCode: internalCode,
          expirationDate: formData.expiry as string,
          unitType: formData.unit as string,
          originalPrice: parseCurrency(formData.price as string),
          promotionalPrice:
            parseCurrency(formData.promoPrice as string) ||
            parseCurrency(formData.price as string),
          costPrice: parseCurrency(formData.costPrice as string),
          priority: getPriorityValue(formData.priority as string),
          status: StatusEnum.Ativo,
          updatedBy: user?.name || 'Unknown',
          controlDate: today,
        }

        await stockProductService.create(stockDto)
      } else if (selectedProduct) {
        try {
          const catalogDto = {
            name: formData.name as string,
            section: formData.sector as string,
            quantity: parseFloat(formData.quantity as string) || 0,
          }
          await catalogService.update(selectedProduct.internalCode, catalogDto)
        } catch (catalogError: any) {
          console.error('Erro ao atualizar item no catálogo:', catalogError)
          setError('Erro ao atualizar produto no catálogo. Tente novamente.')
          setLoading(false)
          return
        }

        const stockDto = {
          expirationDate: formData.expiry as string,
          unitType: formData.unit as string,
          originalPrice: parseCurrency(formData.price as string),
          promotionalPrice: parseCurrency(formData.promoPrice as string),
          costPrice: parseCurrency(formData.costPrice as string),
          priority: getPriorityValue(formData.priority as string),
          status: getStatusValue(formData.status as string),
          updatedBy: user?.name || 'Unknown',
          controlDate: today,
        }

        await stockProductService.update(selectedProduct.id, stockDto)
      }

      setIsModalOpen(false)
      setSelectedProduct(null)
      fetchProducts()
    } catch (err: any) {
      console.error('Erro ao salvar produto:', err)
      setError(
        err.response?.data?.message ||
          'Erro ao salvar produto. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    if (!selectedProduct) return

    try {
      await stockProductService.delete(selectedProduct.id)

      await catalogService.delete(selectedProduct.internalCode)

      setIsDeleteConfirmOpen(false)
      setIsModalOpen(false)
      fetchProducts()
    } catch (err: any) {
      console.error('Erro ao deletar produto:', err)
      setError('Erro ao deletar produto. Tente novamente.')
    }
  }

  const getPriorityValue = (priority: string): number => {
    switch (priority) {
      case 'Baixa':
        return 1
      case 'Média':
        return 2
      case 'Alta':
        return 3
      default:
        return 1
    }
  }

  const getStatusValue = (status: string): StatusEnum => {
    switch (status) {
      case 'Ativo':
        return StatusEnum.Ativo
      case 'Vendido':
        return StatusEnum.Vendido
      case 'Vencido':
      case 'Expirado':
        return StatusEnum.Expirado
      default:
        return StatusEnum.Ativo
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    try {
      let stockProducts

      if (searchQuery.trim()) {
        stockProducts = await stockProductService.getByInternalCode(
          searchQuery.trim()
        )
      } else {
        switch (activeTab) {
          case 'ativos':
            stockProducts = await stockProductService.getByStatus(
              StatusEnum.Ativo
            )
            break
          case 'vencidos':
            stockProducts = await stockProductService.getByStatus(
              StatusEnum.Expirado
            )
            break
          case 'vendidos':
            stockProducts = await stockProductService.getByStatus(
              StatusEnum.Vendido
            )
            break
          default:
            stockProducts = await stockProductService.getAll()
        }
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      for (const product of stockProducts) {
        const expiryDate = new Date(product.expirationDate)
        expiryDate.setHours(0, 0, 0, 0)

        if (expiryDate < today && product.status === StatusEnum.Ativo) {
          try {
            await stockProductService.update(product.id, {
              status: StatusEnum.Expirado,
            })
            product.status = StatusEnum.Expirado
          } catch (err) {
            console.error('Erro ao atualizar status de produto expirado:', err)
          }
        }
      }

      const mappedProducts = stockProducts.map(mapStockProductToProduct)
      setProducts(mappedProducts)
    } catch (err: any) {
      console.error('Erro ao buscar produtos:', err)
      setError('Erro ao carregar produtos. Tente novamente.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        fetchProducts()
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      router.replace('/auth/login')
    }
  }, [activeTab, searchQuery, isAuthenticated])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <ProductsHeader />

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center border-b border-gray-300 mb-6 overflow-x-auto pb-2">
            <TabButton
              title="Produtos Ativos"
              isActive={activeTab === 'ativos'}
              onClick={() => setActiveTab('ativos')}
            />
            <TabButton
              title="Vencidos"
              isActive={activeTab === 'vencidos'}
              onClick={() => setActiveTab('vencidos')}
            />
            <TabButton
              title="Vendidos"
              isActive={activeTab === 'vendidos'}
              onClick={() => setActiveTab('vendidos')}
            />
          </div>

          <SearchBar
            onAddClick={handleOpenAddModal}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b2239]"></div>
            </div>
          ) : (
            <ProductTable
              products={products}
              onDetailsClick={handleOpenDetailsModal}
            />
          )}
        </div>
      </main>

      <footer className="bg-[#0b2239] text-white py-4 px-8 flex justify-center md:justify-end gap-8 text-sm">
        <Link href="/about" className="hover:underline">
          Sobre nós
        </Link>
        <Link href="/contact" className="hover:underline">
          Suporte
        </Link>
      </footer>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        product={selectedProduct}
        onDeleteClick={handleDeleteClick}
        onSubmit={handleProductSubmit}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
