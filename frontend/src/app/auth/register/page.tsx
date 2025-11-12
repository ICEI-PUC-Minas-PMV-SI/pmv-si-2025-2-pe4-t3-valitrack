'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { authService } from '@/services'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await authService.register({ name, password })
      console.log('Registro bem-sucedido:', response)
      setSuccess(true)

      // Automatically login the user after successful registration
      setTimeout(() => {
        login(response)
      }, 1500)
    } catch (err: any) {
      console.error('Erro no registro:', err)
      setError(
        err.response?.data?.message || 'Falha ao criar conta. Tente novamente.'
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
        <div className="w-full max-w-lg border border-[#e67e22] rounded-lg p-10 text-center shadow-lg bg-white">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo-card.svg"
              alt="Logo ValiWeb"
              className="w-48 h-auto"
            />
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            Preencha as informações abaixo para criar sua conta
          </p>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
              Conta criada com sucesso! Redirecionando...
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 text-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Endereço de e-mail corporativo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 text-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 text-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0b2239] text-white py-3 rounded-md font-semibold hover:bg-[#102d4d] transition-colors mt-4 text-base disabled:opacity-60"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Já tem uma conta?{' '}
            <Link
              href="/auth/login"
              className="text-[#0b2239] hover:underline font-semibold"
            >
              Faça Login
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
