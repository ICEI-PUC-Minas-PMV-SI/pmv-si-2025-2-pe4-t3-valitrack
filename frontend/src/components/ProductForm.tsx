'use client'

import { useState } from 'react'
import { Product } from '@/app/products/types'
import { InputGroup, SelectGroup } from './FormFields'

interface ProductFormProps {
  productData: Product | null
  isEditable: boolean
  onCancel: () => void
  onSubmit: (data: Record<string, FormDataEntryValue>) => void
}

export function ProductForm({ productData, isEditable, onCancel, onSubmit }: ProductFormProps) {
  const [isPromo, setIsPromo] = useState<boolean>(productData?.inPromotion || false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputGroup
          label="Nome - Produto"
          name="name"
          defaultValue={productData?.name}
          disabled={!isEditable}
        />
        <div></div>
        <SelectGroup
          label="Setor"
          name="sector"
          defaultValue={productData?.sector}
          disabled={!isEditable}
          options={['Mercearia', 'Laticínios', 'Padaria', 'Limpeza']}
        />
        <InputGroup
          label="Data de Validade"
          name="expiry"
          type="date"
          defaultValue={productData?.expiry}
          disabled={!isEditable}
        />
        <InputGroup
          label="Código Interno"
          name="internalCode"
          defaultValue={productData?.internalCode}
          disabled={!isEditable}
        />
        <SelectGroup
          label="Prioridade"
          name="priority"
          defaultValue={productData?.priority}
          disabled={!isEditable}
          options={['Baixa', 'Média', 'Alta']}
        />
        <SelectGroup
          label="Unidade de Medida"
          name="unit"
          defaultValue={productData?.unit}
          disabled={!isEditable}
          options={['un', 'kg', 'g', 'l', 'ml']}
        />
        <InputGroup
          label="Quantidade"
          name="quantity"
          type="number"
          defaultValue={productData?.quantity}
          disabled={!isEditable}
        />
        <InputGroup
          label="Preço de Custo"
          name="costPrice"
          prefix="R$"
          defaultValue={productData?.costPrice}
          disabled={!isEditable}
        />
        <InputGroup
          label="Preço de Venda"
          name="price"
          prefix="R$"
          defaultValue={productData?.price}
          disabled={!isEditable}
        />
        <InputGroup
          label="Valor total do lote"
          name="totalValue"
          prefix="R$"
          defaultValue={productData?.totalValue}
          disabled={!isEditable}
          readOnly
        />
        <SelectGroup
          label="Status"
          name="status"
          defaultValue={productData?.status}
          disabled={!isEditable}
          options={['Ativo', 'Vendido', 'Vencido']}
        />
      </div>

      <div className="pt-4 border-t mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPromo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsPromo(e.target.checked)}
            disabled={!isEditable}
            className="h-4 w-4 rounded"
          />
          Produto em promoção
        </label>
        {isPromo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
            <InputGroup
              label="Quantidade em Promoção"
              name="promoQuantity"
              type="number"
              defaultValue={productData?.promoQuantity}
              disabled={!isEditable}
            />
            <InputGroup
              label="Preço Promocional"
              name="promoPrice"
              prefix="R$"
              defaultValue={productData?.promoPrice}
              disabled={!isEditable}
            />
          </div>
        )}
      </div>

      {isEditable && (
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 mt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#0b2239] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#102d4d]"
          >
            Salvar alterações
          </button>
        </div>
      )}
    </form>
  )
}
