import Link from "next/link";
// Os ícones não são mais necessários nesta página, podem ser removidos se não forem usados em outro lugar
// import { HiOutlineUser, HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";

export default function RegisterPage() {
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

          <form className="flex flex-col gap-5 text-left">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                Endereço de e-mail corporativo
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50"
              />
            </div>

            <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0b2239] text-white py-3 rounded-md font-semibold hover:bg-[#102d4d] transition-colors mt-4 text-base"
            >
              Criar Conta
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Já tem uma conta?{" "}
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
        <Link href="/auth/about" className="hover:underline">
          Sobre nós
        </Link>
        <Link href="/auth/contact" className="hover:underline">
          Suporte
        </Link>
      </footer>
    </div>
  );
}