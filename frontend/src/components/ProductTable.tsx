import { HiOutlineTrash } from 'react-icons/hi'
import { Product } from '@/app/products/types'

interface ProductTableProps {
  products: Product[]
  onDetailsClick: (product: Product) => void
}

export function ProductTable({ products, onDetailsClick }: ProductTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-left min-w-[640px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <Th>Produto</Th>
            <Th>Setor</Th>
            <Th>Validade</Th>
            <Th>Quantidade</Th>
            <Th>Preço Unitário</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr
              key={product.id}
              className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50"
            >
              <Td>{product.name}</Td>
              <Td>{product.sector}</Td>
              <Td isExpired={product.status === 'Vencido'}>
                {product.expiry.split('-').reverse().join('/')}
              </Td>
              <Td>{product.quantity}</Td>
              <Td>R$ {product.price}</Td>
              <Td>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {product.status}
                </span>
              </Td>
              <Td>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDetailsClick(product)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Detalhes
                  </button>
                  <button className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition-colors">
                    <HiOutlineTrash className="h-5 w-5" />
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ThProps {
  children: React.ReactNode
}

const Th = ({ children }: ThProps) => (
  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
    {children}
  </th>
)

interface TdProps {
  children: React.ReactNode
  isExpired?: boolean
}

const Td = ({ children, isExpired = false }: TdProps) => (
  <td
    className={`px-6 py-4 whitespace-nowrap text-sm ${isExpired ? 'text-red-600 font-semibold' : 'text-gray-700 font-medium'}`}
  >
    {children}
  </td>
)
