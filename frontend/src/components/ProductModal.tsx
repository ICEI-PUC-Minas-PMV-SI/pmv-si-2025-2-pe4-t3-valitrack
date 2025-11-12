'use client'

import { useState, useEffect } from 'react'
import { HiX, HiPencil, HiOutlineTrash } from 'react-icons/hi'
import { Product } from '@/app/products/types'
import { ProductForm } from './ProductForm'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'add' | 'details'
  product: Product | null
  onDeleteClick: () => void
  onSubmit: (formData: Record<string, FormDataEntryValue>) => void
}

export function ProductModal({
  isOpen,
  onClose,
  mode,
  product,
  onDeleteClick,
  onSubmit,
}: ProductModalProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    if (mode === 'add') {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [mode, isOpen])

  if (!isOpen) return null

  const title = mode === 'add' ? 'Adicionar Novo Produto' : 'Detalhes'

  const handleEditClick = () => setIsEditing(true)

  const handleCancelEdit = () => {
    if (mode === 'details') {
      setIsEditing(false)
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-20 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            {mode === 'details' && !isEditing && (
              <>
                <button
                  onClick={handleEditClick}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <HiPencil className="h-5 w-5" />
                </button>
                <button
                  onClick={onDeleteClick}
                  className="text-gray-500 hover:text-red-600"
                >
                  <HiOutlineTrash className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <ProductForm
            productData={product}
            isEditable={isEditing}
            onCancel={handleCancelEdit}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}
