import Link from 'next/link';
import { FiTarget, FiBarChart2, FiAlertTriangle } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
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
        <section className="bg-[#0b2239] text-white text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transformando o controle de validade em lucro.
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            A ValiTrack é a solução inteligente para o gerenciamento de estoque que evita perdas, otimiza suas operações e impulsiona seus resultados.
          </p>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">O Fim do Desperdício Começa Aqui</h2>
            <p className="max-w-3xl mx-auto text-gray-600 mb-12">
              Milhões de reais são perdidos anualmente com produtos vencidos. Um desperdício que afeta seu estoque, suas finanças e o meio ambiente. Nós criamos a ferramenta para mudar essa realidade.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiAlertTriangle size={32} className="text-[#e67e22]" />}
                title="Alertas Inteligentes"
                description="Receba notificações automáticas sobre produtos próximos ao vencimento e tome ações preventivas."
              />
              <FeatureCard
                icon={<FiTarget size={32} className="text-[#e67e22]" />}
                title="Controle Preciso"
                description="Tenha uma visão clara e organizada de todo o seu inventário, com dados precisos e em tempo real."
              />
              <FeatureCard
                icon={<FiBarChart2 size={32} className="text-[#e67e22]" />}
                title="Aumento de Lucratividade"
                description="Reduza perdas, crie promoções estratégicas e transforme o que seria prejuízo em novas oportunidades de venda."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://placehold.co/600x400/0b2239/e67e22?text=ValiTrack" 
                alt="Equipe ValiTrack em reunião" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossa Jornada</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Nascido em 2025 da paixão por tecnologia e eficiência, o ValiTrack é a criação de uma equipe dedicada a resolver um dos maiores desafios do varejo. Vimos a necessidade de uma ferramenta que fosse não apenas funcional, mas também intuitiva e poderosa.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Atualmente em desenvolvimento, nossa plataforma está sendo construída com as mais modernas tecnologias para garantir robustez, segurança e, acima de tudo, facilidade de uso. Estamos comprometidos em entregar uma solução que faça a diferença no seu dia a dia.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white py-20 text-center">
             <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Pronto para otimizar seu negócio?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Junte-se a nós e descubra como a gestão inteligente de validade pode revolucionar seus lucros.
                </p>
                <Link
                    href="/auth/register"
                    className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors inline-block"
                >
                    Comece a Usar Gratuitamente
                </Link>
             </div>
        </section>

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

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};