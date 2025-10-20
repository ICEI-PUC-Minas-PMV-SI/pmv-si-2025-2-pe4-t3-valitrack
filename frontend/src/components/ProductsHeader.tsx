import { FaUserCircle } from 'react-icons/fa'

export function ProductsHeader() {
  return (
    <header className="bg-[#0b2239] text-white shadow-md sticky top-0 z-10">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        <div className="flex items-center">
          <img
            src="/Logo.svg"
            alt="Logo ValiWeb"
            className="h-12 sm:h-19 w-auto"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-sm">Márcia Rodrigues</p>
            <p className="text-xs text-gray-300">
              Supermercado Pereira Pingo
            </p>
          </div>
          <FaUserCircle className="h-10 w-10 text-gray-400" />
        </div>
      </div>
    </header>
  )
}
