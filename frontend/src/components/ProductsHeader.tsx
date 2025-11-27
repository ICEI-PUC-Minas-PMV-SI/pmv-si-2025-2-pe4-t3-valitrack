'use client'

import { FaUserCircle } from 'react-icons/fa'
import { HiLogout } from 'react-icons/hi'
import { useAuth } from '@/contexts/AuthContext'

export function ProductsHeader() {
  const { user, logout } = useAuth()

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
            <p className="font-semibold text-sm">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-300">ValiTrack</p>
          </div>
          <FaUserCircle className="h-10 w-10 text-gray-400" />
          <button
            onClick={logout}
            className="ml-2 p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Sair"
          >
            <HiLogout className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
