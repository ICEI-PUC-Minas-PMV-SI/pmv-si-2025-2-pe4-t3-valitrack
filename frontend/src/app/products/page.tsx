'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from './types'
import { ProductsHeader } from '@/components/ProductsHeader'
import { TabButton } from '@/components/TabButton'
import { SearchBar } from '@/components/SearchBar'
import { ProductTable } from '@/components/ProductTable'
import { ProductModal } from '@/components/ProductModal'
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal'

const sampleProduct: Product = {
  id: 1,
  name: 'Coca cola 300ml',
  sector: 'Mercearia',
  expiry: '2025-10-10',
  quantity: 35,
  price: '4.29',
  status: 'Ativo',
  internalCode: '84546910',
  priority: 'Alta',
  unit: 'ml',
  costPrice: '2.29',
  totalValue: '150.15',
  inPromotion: true,
  promoQuantity: 35,
  promoPrice: '3.29',
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('ativos')
  const [products, setProducts] = useState<Product[]>([sampleProduct])
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<'add' | 'details'>('add')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false)

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

  const confirmDelete = () => {
    console.log('Deletando produto:', selectedProduct?.id)
    setIsDeleteConfirmOpen(false)
    setIsModalOpen(false)
  }

  useEffect(() => {
    // A lógica da API para buscar produtos com base na activeTab irá aqui
  }, [activeTab])

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

          <SearchBar onAddClick={handleOpenAddModal} />

          <ProductTable
            products={products}
            onDetailsClick={handleOpenDetailsModal}
          />
        </div>
      </main>

      <footer className="bg-[#0b2239] text-white py-4 px-8 flex justify-center md:justify-end gap-8 text-sm">
        <Link href="/auth/about" className="hover:underline">
          Sobre nós
        </Link>
        <Link href="/auth/contact" className="hover:underline">
          Suporte
        </Link>
      </footer>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        product={selectedProduct}
        onDeleteClick={handleDeleteClick}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
