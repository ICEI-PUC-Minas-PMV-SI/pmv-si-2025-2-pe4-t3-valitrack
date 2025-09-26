import Link from 'next/link'

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">ValiWeb</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema de tracking de produtos próximos à data de vencimento
          </p>
        </div>

        <div className="text-center max-w-2xl">
          <p className="text-lg text-gray-700 mb-8">
            Bem-vindo ao ValiWeb, sua plataforma completa para gerenciamento de
            produtos próximos à data de vencimento.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/auth/login"
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base h-12 px-8 flex items-center justify-center"
          >
            Fazer Login
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors font-medium text-sm sm:text-base h-12 px-8 flex items-center justify-center"
          >
            Começar Agora
          </Link>
        </div>
      </main>

      <footer className="row-start-3 text-center text-gray-500 text-sm">
        <p>&copy; 2025 ValiWeb. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
