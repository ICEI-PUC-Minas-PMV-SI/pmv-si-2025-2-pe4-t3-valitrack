import { StatusEnum, StockProductResponse } from '@/services/stockProductService'

export interface Product {
  id: number
  name: string
  sector: string
  expiry: string
  quantity: number
  price: string
  status: string
  internalCode: string
  priority: string
  unit: string
  costPrice: string
  totalValue: string
  inPromotion: boolean
  promoQuantity: number
  promoPrice: string
}

export const PriorityMap = {
  1: 'Baixa',
  2: 'Média',
  3: 'Alta',
} as const

export const StatusMap = {
  [StatusEnum.Ativo]: 'Ativo',
  [StatusEnum.Vendido]: 'Vendido',
  [StatusEnum.Expirado]: 'Vencido',
} as const

export function mapStockProductToProduct(
  stockProduct: StockProductResponse
): Product {
  const isPromo = stockProduct.promotionalPrice < stockProduct.originalPrice

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiryDate = new Date(stockProduct.expirationDate)
  expiryDate.setHours(0, 0, 0, 0)
  const isExpired = expiryDate < today

  let status = StatusMap[stockProduct.status]
  if (isExpired && stockProduct.status === StatusEnum.Ativo) {
    status = 'Vencido'
  }

  return {
    id: stockProduct.id,
    name: stockProduct.productName,
    sector: stockProduct.section,
    expiry: stockProduct.expirationDate,
    quantity: stockProduct.quantity,
    price: stockProduct.originalPrice.toFixed(2),
    status: status,
    internalCode: stockProduct.internalCode,
    priority: PriorityMap[stockProduct.priority as 1 | 2 | 3] || 'Baixa',
    unit: stockProduct.unitType,
    costPrice: stockProduct.costPrice.toFixed(2),
    totalValue: (stockProduct.quantity * stockProduct.costPrice).toFixed(2),
    inPromotion: isPromo,
    promoQuantity: isPromo ? stockProduct.quantity : 0,
    promoPrice: stockProduct.promotionalPrice.toFixed(2),
  }
}
