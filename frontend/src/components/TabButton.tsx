interface TabButtonProps {
  title: string
  isActive: boolean
  onClick: () => void
}

export const TabButton = ({ title, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-1 pb-2 text-lg sm:text-xl font-semibold transition-colors duration-300 mr-4 sm:mr-8 ${isActive ? 'border-b-2 border-[#0b2239] text-[#0b2239]' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {title}
  </button>
)
