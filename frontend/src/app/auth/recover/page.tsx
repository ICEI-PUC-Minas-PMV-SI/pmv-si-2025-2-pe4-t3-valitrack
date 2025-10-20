import Link from 'next/link'
import { HiOutlineMail } from 'react-icons/hi'

export default function ForgotPasswordPage() {
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
        <div className="w-full max-w-xl border border-[#e67e22] rounded-lg p-10 text-center shadow-lg bg-white">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo-card.svg"
              alt="Logo ValiWeb"
              className="w-48 h-auto"
            />
          </div>

          <p className="text-gray-600 mb-8 text-base leading-relaxed">
            Informe o e-mail cadastrado para receber as instruções para
            recuperar sua senha
          </p>

          <form className="flex flex-col gap-4 text-left">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <HiOutlineMail className="h-5 w-5" />
              </span>
              <input
                type="email"
                placeholder="E-mail"
                className="w-full pl-10 pr-4 py-3 border-none rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0b2239] text-white py-3 rounded-md font-semibold hover:bg-[#102d4d] transition-colors mt-4 text-base cursor-pointer"
            >
              Recuperar senha
            </button>
          </form>
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
