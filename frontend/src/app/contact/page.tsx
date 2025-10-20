import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiUsers, FiTrendingUp, FiPlayCircle } from 'react-icons/fi'

export default function SupportPage() {
  const whatsappNumber = '553798336732'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Preciso de ajuda com o ValiTrack.`

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <header className="bg-[#0b2239] text-white flex justify-between items-center px-8 py-3 shadow-md sticky top-0 z-20">
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

      <main>
        <section className="bg-white text-center py-20 px-4">
          <span className="text-sm font-bold text-[#e67e22] uppercase tracking-widest">
            Suporte ValiTrack
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0b2239] mt-2 mb-4">
            Estamos aqui para ajudar você a crescer.
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Nossa equipe de especialistas está pronta para resolver suas dúvidas
            e garantir que você aproveite ao máximo o potencial do ValiTrack.
          </p>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Mais que Suporte, Uma Parceria Estratégica
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 mb-12">
              Na ValiTrack, seu sucesso é o nosso. Por isso, nosso suporte vai
              além de resolver problemas.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              <DifferenceCard
                icon={<FiUsers size={24} className="text-[#e67e22]" />}
                title="Especialistas do Setor"
                description="Nossa equipe entende os desafios do varejo e oferece soluções que realmente se aplicam ao seu negócio."
              />
              <DifferenceCard
                icon={<FiClock size={24} className="text-[#e67e22]" />}
                title="Respostas Ágeis"
                description="Valorizamos seu tempo. Nosso compromisso é com um atendimento rápido e eficiente para não impactar sua operação."
              />
              <DifferenceCard
                icon={<FiTrendingUp size={24} className="text-[#e67e22]" />}
                title="Foco no Seu Crescimento"
                description="Ajudamos você a usar os dados do ValiTrack de forma proativa para identificar oportunidades e aumentar sua lucratividade."
              />
              <DifferenceCard
                icon={<FiPlayCircle size={24} className="text-[#e67e22]" />}
                title="Onboarding Simplificado"
                description="Ajudamos você a configurar e começar a usar o ValiTrack rapidamente, com treinamento completo para sua equipe."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0b2239] to-[#102d4d] p-10 rounded-lg shadow-2xl text-white flex flex-col items-center text-center">
              <FaWhatsapp size={40} className="mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-3">
                Fale com um Especialista Agora
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl">
                Para questões urgentes, dúvidas sobre a plataforma ou um contato
                mais direto, nossa equipe está a uma mensagem de distância.
                Clique no botão abaixo para iniciar a conversa.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-md font-bold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
              >
                <FaWhatsapp size={22} />
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </section>
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

interface DifferenceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const DifferenceCard = ({ icon, title, description }: DifferenceCardProps) => (
  <div className="border-t-4 border-[#e67e22] bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
)
