import { HiOutlineSearch } from 'react-icons/hi'

interface SearchBarProps {
  onAddClick: () => void
  onSearch: (query: string) => void
  searchQuery: string
}

export function SearchBar({
  onAddClick,
  onSearch,
  searchQuery,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="relative w-full md:max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <HiOutlineSearch className="h-5 w-5" />
        </span>
        <input
          type="text"
          placeholder="Buscar por código ou nome do produto..."
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 text-gray-800 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <button
          onClick={onAddClick}
          className="w-full sm:w-auto bg-[#e67e22] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#d35400] transition-colors text-sm"
        >
          + Novo Produto
        </button>
      </div>
    </div>
  )
}
