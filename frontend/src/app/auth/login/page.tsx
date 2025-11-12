'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi'
import { authService } from '@/services'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login({ email, password })
      console.log('Login bem-sucedido:', response)

      login(response)
    } catch (err: any) {
      console.error('Erro no login:', err)
      setError(
        err.response?.data?.message || 'Falha no login. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <header className="bg-[#0b2239] text-white flex justify-between items-center px-8 py-3 shadow-md">
        <div className="flex items-center">
          <img src="/Logo.svg" alt="Logo ValiWeb" className="h-19 w-auto" />
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth/register" className="text-sm hover:underline">
            Cadastrar
          </Link>
          <Link
            href="/auth/login"
            className="bg-[#e67e22] hover:bg-[#d35400] text-white px-5 py-1.5 rounded text-sm font-medium transition-colors"
          >
            Entrar
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-md border border-[#e67e22] rounded-lg p-8 text-center shadow-lg bg-white">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo-card.svg"
              alt="Logo ValiWeb"
              className="w-48 h-auto"
            />
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            Acesse sua conta para gerenciar seus produtos
          </p>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <HiOutlineUser className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border-none rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 text-black"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <HiOutlineLockClosed className="h-5 w-5" />
              </span>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border-none rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 text-black"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 my-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#0b2239] focus:ring-[#0b2239]/50"
                />
                Lembrar acesso
              </label>
              <Link
                href="/auth/recover"
                className="text-gray-500 hover:underline hover:text-[#0b2239]"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0b2239] text-white py-3 rounded-md font-semibold hover:bg-[#102d4d] transition-colors mt-2 uppercase tracking-wider text-sm disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Não tem uma conta?{' '}
            <Link
              href="/auth/register"
              className="text-[#0b2239] hover:underline font-semibold"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>

      <footer className="bg-[#0b2239] text-white py-4 px-8 flex justify-end gap-8 text-sm">
        <Link href="/about" className="hover:underline">
          Sobre nós
        </Link>
        <Link href="/contact" className="hover:underline">
          Suporte
        </Link>
      </footer>
    </div>
  )
}
