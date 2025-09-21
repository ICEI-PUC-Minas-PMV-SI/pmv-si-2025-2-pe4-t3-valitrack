## Arquitetura do Projeto

O supermercado parceiro possui uma infraestrutura tecnológica consolidada, baseada em três servidores principais que suportam as operações críticas do negócio. O ambiente conta com oito computadores de retaguarda dedicados às atividades administrativas e gerenciais, incluindo controle financeiro e fiscal, gestão de compras e supervisão operacional.

O ponto de venda (PDV) é operado através de quatro terminais, responsáveis pelo processamento das transações comerciais. Todo o ecossistema tecnológico é centralizado pelo sistema ERP "VRSoftware", uma solução abrangente que gerencia desde o cadastro de produtos até o controle financeiro da empresa.

O software ERP utilizado na empresa demonstra robustez em funcionalidades essenciais do varejo, oferecendo módulos completos para gestão de estoque, vendas, compras e relacionamento com fornecedores. A plataforma possui recursos avançados para criação e gestão de ofertas promocionais, permitindo configuração de descontos, períodos de validade das promoções e segmentação por categorias de produtos. Entretanto, o sistema apresenta limitações significativas no monitoramento de datas de validade dos produtos. Embora registre essas informações durante o cadastro, não oferece alertas proativos, relatórios específicos sobre produtos próximos ao vencimento, nem análises preditivas sobre o comportamento de vendas versus proximidade de validade. Essa deficiência representa uma oportunidade de melhoria crítica, considerando o impacto financeiro e ambiental dos produtos que vencem sem serem vendidos.

O ValiTrack será desenvolvido como um sistema web-based de apoio à tomada de decisão, com foco no monitoramento de produtos próximos ao vencimento. Sua arquitetura contemplará os seguintes aspectos:

#### Camada de Aplicação (Frontend)
- Desenvolvimento de uma página web responsiva, acessível a partir dos computadores de retaguarda já existentes no parceiro;
- Implementação em Next.js, visando flexibilidade, modularidade e melhor experiência do usuário.

#### Camada de Lógica de Negócio (Backend)
- Implementação da API e das regras de negócio utilizando C# com o framework .NET 8, garantindo robustez, escalabilidade e compatibilidade com ambientes corporativos.

#### Camada de Dados
- Armazenamento em banco de dados relacional para garantir integridade e consistência das informações;
- Estruturas otimizadas para controle de validade, geração de alertas automáticos e relatórios customizados.

#### Camada de Business Intelligence (BI)
- Construção de dashboards interativos utilizando Power BI, já compatível com o ambiente do parceiro;
- Disponibilização de indicadores-chave (KPIs), como taxa de desperdício, percentual de produtos vendidos antes do vencimento e desempenho de promoções aplicadas.

#### Infraestrutura e Hardware
- O sistema será hospedado em servidor em nuvem, garantindo disponibilidade, escalabilidade e segurança;
- Os computadores de retaguarda existentes servirão como pontos de acesso, não exigindo investimentos adicionais em hardware;
- Os terminais de PDV permanecerão sob gestão exclusiva do ERP, enquanto o ValiTrack atuará como solução complementar.
