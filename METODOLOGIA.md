## Metodologia do Projeto

O desenvolvimento do ValiTrack será conduzido por meio de uma abordagem ágil, tendo o framework Scrum como base metodológica. Essa escolha se justifica pela necessidade de flexibilidade, colaboração contínua e entregas incrementais, características que possibilitam ajustar o sistema ao longo do processo conforme os feedbacks dos stakeholders. Para assegurar a correta aplicação da metodologia, a equipe elegeu Marcus Paulo O. Silva como Scrum Master, papel responsável por garantir que os princípios do framework sejam respeitados durante todas as etapas.

A ferramenta escolhida para a gestão das atividades é o GitHub Projects, cuja utilização se pauta na centralização das informações do projeto, permitindo o registro, acompanhamento e atualização em tempo real das tarefas. O uso dessa plataforma viabiliza a transparência entre todos os envolvidos e assegura que as etapas possam ser visualizadas de forma clara pela equipe, pela professora orientadora e pelo parceiro. A documentação do projeto será continuamente atualizada de acordo com o andamento das etapas propostas pela instituição educacional e pelos feedbacks recebidos, preservando a rastreabilidade de decisões e ajustes realizados.

A fim de manter o alinhamento entre todos os membros envolvidos no desenvolvimento do ValiTrack, devem ser realizadas reuniões online semanais, onde devem ser discutidas as atividades pendentes, a distribuição de responsabilidades e o progresso alcançado. A distribuição das tarefas será realizada de maneira igualitária, assegurando que todos os integrantes contribuam para a conclusão de cada fase do projeto. Após cada reunião, o Scrum Master será responsável por registrar as atividades em formato de tarefas no GitHub Projects, as quais devem ser atualizadas pelos devidos responsáveis de forma regular, o que será essencial para garantir um acompanhamento coletivo das entregas e proporcionar maior visibilidade acerca do andamento do projeto. Embora o Scrum preveja cerimônias como Sprint Planning, Review e Retrospective, estas foram adaptadas à realidade acadêmica da equipe, sendo incorporadas às reuniões semanais de forma a contemplar a definição de metas, a coleta de feedbacks, atualização sobre possíveis impedimentos e a análise de pontos de melhoria em cada ciclo.

No que se refere à interação com o estabelecimento parceiro, a comunicação será mais intensa nas fases iniciais do projeto. Esse período demanda maior envolvimento para o entendimento das dores e da infraestrutura do supermercado, bem como para a definição da proposta e a elicitação dos requisitos funcionais e não funcionais. Durante esse período inicial, serão realizadas reuniões semanais com a pessoa gestora responsável pelo projeto no estabelecimento parceiro, de modo a assegurar o alinhamento sobre os aspectos supracitados. Já na fase de desenvolvimento, o contato deve ocorrer ao final de cada ciclo de entrega, por meio de reuniões de acompanhamento e validação, onde será possível à equipe coletar os feedbacks dos stakeholders e efetuar os ajustes no código conforme necessário. Considerando que um dos membros da equipe possui experiência prévia no estabelecimento, com acesso direto às operações internas, optou-se por não realizar visitas técnicas adicionais.

Após a conclusão da entrega final, contemplando tanto o website quanto os painéis de visualização em Business Intelligence (BI), a equipe será responsável por promover a capacitação do quadro de funcionários do supermercado parceiro. Essa etapa ocorrerá por meio de reuniões síncronas online, de forma a assegurar que todos compreendam corretamente a utilização do sistema. Ademais, será entregue ao estabelecimento um material completo de documentação, incluindo orientações técnicas e de negócio, o qual será estruturado de maneira a servir como insumo para o esclarecimento de dúvidas, bem como para subsidiar eventuais manutenções ou atualizações futuras da plataforma, garantindo a sustentabilidade e continuidade do uso da solução desenvolvida.

---

## Projeto do Data Warehouse / Data Mart

O modelo dimensional proposto é composto por quatro tabelas inter-relacionadas que suportam as operações de controle e análise de produtos em estoque:

![banco-de-dados](./img/banco%20de%20dados%20atualizado.jpg)

---

### 1. TABELA: Users (Usuários)

**Descrição:**  
Tabela responsável pelo armazenamento das informações dos usuários que interagem com o sistema, proporcionando controle de acesso do sistema.

**Campos:**  
- **id** - Tipo: Integer. Chave Primária. Não aceita valores nulos. Identificador único e sequencial atribuído automaticamente a cada usuário cadastrado no sistema. Este campo é utilizado como referência em outras tabelas para estabelecer relacionamentos.  
- **username** - Tipo: Varchar(40). Não aceita valores nulos. Armazena o nome de usuário utilizado para autenticação no sistema. Deve ser único para cada usuário, garantindo que não existam duplicidades no acesso.  
- **password** - Tipo: Varchar(255). Não aceita valores nulos. Campo destinado ao armazenamento da senha do usuário em formato criptografado. Por questões de segurança, a senha nunca deve ser armazenada em texto plano.  
- **role** - Tipo: Varchar(40). Não aceita valores nulos. Define o papel ou nível de permissão do usuário dentro do sistema, podendo assumir valores como "administrador", "operador", "gerente", entre outros, que determinam quais funcionalidades o usuário pode acessar.  
- **email** - Tipo: Varchar(255). Aceita valores nulos. Endereço de e-mail do usuário utilizado para comunicações do sistema e recuperação de senha. Deve seguir o formato padrão de e-mail.  

**Relacionamentos:**  
Esta tabela possui relacionamento um-para-muitos (1:N) com a tabela **Stock_Products** através do campo `updated_by`, permitindo rastrear qual usuário realizou a última modificação em cada produto do estoque.

**Regras de Negócio:**  
O campo `username` deve ser único no sistema.  
O campo `role` deve estar limitado aos papéis previamente definidos na aplicação.

---

### 2. TABELA: Catalog (Catálogo)

**Descrição:**  
Tabela de referência que contém o cadastro geral de produtos cadastrados. Funciona como base para o registro de itens no estoque, mantendo as informações padronizadas dos produtos.

**Campos:**  
- **internal_code** - Tipo: Varchar(255). Chave Primária. Não aceita valores nulos. Código único de identificação interna do produto, utilizado como padrão em toda a organização. Este código é definido pela empresa e serve como referência principal para identificação dos produtos.  
- **name** - Tipo: Varchar(255). Não aceita valores nulos. Denominação completa do produto conforme cadastrado no sistema. Deve ser descritivo o suficiente para identificação clara do item.  
- **section** - Tipo: Varchar(40). Aceita valores nulos. Indica a seção, departamento ou categoria à qual o produto pertence dentro da organização, facilitando a classificação e localização física ou lógica dos itens. Exemplos incluem "alimentos", "bebidas", "limpeza", etc.  
- **quantity** - Tipo: Float. Não aceita valores nulos. Representa a quantidade base ou padrão do produto no catálogo. Este valor funciona como uma especificação cadastral do item, indicando, por exemplo, a quantidade unitária padrão de comercialização (como "embalagem com 12 unidades" ou "peso líquido de 1kg").  

**Relacionamentos:**  
Possui relacionamento um-para-muitos (1:N) com a tabela **Stock_Products** através do campo `internal_code`, permitindo que um mesmo produto do catálogo tenha múltiplas entradas no estoque com características distintas como lotes, validades e preços diferentes.

**Regras de Negócio:**  
O campo `internal_code` deve ser único e seguir o padrão de codificação estabelecido pela empresa.  
O campo `quantity` não pode ser negativo.

---

### 3. TABELA: Stock_Products (Produtos em Estoque)

**Descrição:**  
Tabela central do sistema que concentra todas as informações operacionais e gerenciais dos produtos. Cada registro representa uma entrada específica de produto com suas características particulares de precificação, validade e controle.

**Campos:**  
- **id** - Tipo: Integer. Chave Primária. Não aceita valores nulos. Identificador único e sequencial de cada registro de produto no estoque. Gerado automaticamente pelo sistema a cada nova entrada.  
- **internal_code** - Tipo: Varchar(255). Chave Estrangeira referenciando **Catalog** (internal_code). Não aceita valores nulos. Estabelece a vinculação entre o item em estoque e seu cadastro no catálogo mestre de produtos, permitindo herdar informações básicas e manter consistência.  
- **expiration_date** - Tipo: Date. Não aceita valores nulos. Registra a data de validade do produto. É fundamental para o controle de produtos e a gestão de perdas.  
- **unit_type** - Tipo: Varchar(2). Não aceita valores nulos. Define a unidade de medida utilizada para quantificação do produto, como "UN", "KG", "L", "M", "CX", entre outros. Padroniza a forma de medição no sistema.  
- **original_price** - Tipo: Float. Não aceita valores nulos. Armazena o preço de venda original ou regular do produto antes de qualquer desconto ou promoção. Serve como base para cálculos de margem e rentabilidade.  
- **promotional_price** - Tipo: Float. Aceita valores nulos. Registra o preço promocional do produto quando houver campanhas ou descontos ativos. Quando nulo, indica que o produto está sendo comercializado pelo preço original.  
- **cost_price** - Tipo: Float. Não aceita valores nulos. Valor de custo de aquisição ou produção do produto. Essencial para análises de margem de lucro, rentabilidade e precificação estratégica.  
- **priority** - Tipo: Integer. Aceita valores nulos. Indica o nível de prioridade do produto para fins de gestão, podendo representar urgência de venda, importância comercial ou ordem de expedição. Representado em escala numérica (por exemplo, 1 a 3).  
- **status** - Tipo: Enum. Chave Estrangeira referenciando **Status** (id). Não aceita valores nulos. Define o estado atual do produto no estoque, como "ativo", "vendido", "vencido", permitindo controle preciso da situação de cada item.  
- **updated_by** - Tipo: Varchar(255). Chave Estrangeira referenciando **Users** (username). Não aceita valores nulos. Registra o nome de usuário da pessoa que realizou a última atualização no registro, garantindo rastreabilidade das modificações realizadas.  
- **control_date** - Tipo: Date. Não aceita valores nulos. Data de cadastro ou controle do produto no sistema. Utilizada para análises temporais e relatórios de entrada dos itens.  

**Relacionamentos:**  
- Relacionamento muitos-para-um (N:1) com **Catalog** através de `internal_code`, vinculando cada entrada de estoque ao produto correspondente no catálogo mestre.  
- Relacionamento muitos-para-um (N:1) com **Status** através do campo `status`, permitindo padronização dos estados possíveis.  
- Relacionamento muitos-para-um (N:1) com **Users** através de `updated_by`, possibilitando rastreamento de quem modificou cada registro.  

**Regras de Negócio:**  
- Os valores de preços (`original_price`, `promotional_price`, `cost_price`) não podem ser negativos.  
- O campo `priority`, quando utilizado, deve respeitar a escala definida pelo sistema. Valores entre 1 e 3, em que 1 será “alta”, 2 será “média” e 3, “baixa”.  
- A `control_date` não pode ser uma data futura.  
- A `expiration_date`, quando preenchida, deve ser igual ou posterior à `control_date`.  
- Cada registro corresponde a um lote completo de produto. O modelo atual funciona com o conceito de lote indivisível, em que cada entrada no estoque representa um lote específico identificado por sua data de validade, preços e data de controle.

---

### 4. TABELA: Status

**Descrição:**  
Tabela de domínio que padroniza e centraliza os possíveis estados que um produto pode assumir. Funciona como tabela auxiliar para garantir consistência e integridade dos dados.

**Campos:**  
- **id** - Tipo: Integer. Chave Primária. Não aceita valores nulos. Identificador único de cada status disponível no sistema. Gerado sequencialmente.  
- **description** - Tipo: Varchar(40). Não aceita valores nulos. Descrição textual do status em linguagem clara e compreensível, como "vendido", "vencido" e "ativo".  

**Valores Possíveis:**  
- "ativo": lote ainda disponível para venda.  
- "vendido": lote já comercializado e que não contabilizou prejuízo por ultrapassar a data de validade.  
- "vencido": lote que ultrapassou a data de validade e será contabilizado como prejuízo por ultrapassar a data de validade, com a quantidade que não foi vendida.  

**Relacionamentos:**  
Possui relacionamento um-para-muitos (1:N) com **Stock_Products**, onde cada status pode ser atribuído a múltiplos produtos, mas cada produto possui apenas um status por vez.

**Regras de Negócio:**  
O campo `description` deve ser único no sistema para evitar duplicidade de status com mesmo significado.


## Integração de Fontes de Dados

### Telas - ValiWeb:

### Tela de Cadastro de Usuário

Essa tela permite que novos usuários criem uma conta no sistema, inserindo suas informações corporativas. Após o cadastro, os dados são registrados na tabela de usuários (Users).

#### Funcionalidades principais:

- Registro de novos usuários;
- Validação dos campos obrigatórios (username, e-mail e senha);
- Link para redirecionar à tela de login.

#### Campos e elementos:

- Username: nome de identificação do usuário no sistema;
- Endereço de e-mail corporativo: campo de texto para o e-mail utilizado na comunicação;
- Senha:** campo do tipo password;
- Botão “Criar Conta”;
- Link “Já tem uma conta? Faça login”.

#### Dados utilizados (Banco de Dados) - Tabela *Users*:

- username;
- email;
- password;
- role.

![tela-cadastro-usuario](./img/Tela%20-%20Cadastro%20de%20Novo%20usuário.png)

---

### Tela de Login

É o ponto de entrada do sistema ValiWeb. Ela permite que usuários previamente cadastrados acessem a plataforma para gerenciar seus produtos e estoques.

#### Funcionalidades principais:

- Autenticação do usuário por meio de credenciais (username e senha);
- Opção de lembrar acesso, permitindo o salvamento de sessão;
- Link de recuperação de senha para redirecionar o usuário à tela de redefinição, caso necessário;
- Acesso direto ao cadastro de nova conta, caso o usuário ainda não possua registro.

#### Campos e elementos:

- Username: campo de texto para o nome de usuário;
- Senha: campo do tipo password para autenticação;
- Checkbox “Lembrar acesso” para facilitar a entrada posterior no sistema;
- Botão “Entrar”;
- Link “Esqueceu a senha?”;
- Link “Cadastre-se”.

#### Dados utilizados (Banco de Dados) - Tabela *Users*:

- username (para identificação);
- password (para validação da senha);
- role (para controle de permissões de acesso);
- email (utilizado somente em caso de recuperação de senha).

![tela-login](./img/Tela%20-%20Login.png)

---

### Tela de Recuperação de Senha

Essa tela possibilita que o usuário redefina sua senha caso a tenha esquecido, inserindo o e-mail cadastrado. O sistema envia instruções de recuperação para o endereço de e-mail informado.

#### Funcionalidades principais:

- Verificação da existência do e-mail cadastrado;
- Envio automático de instruções de redefinição de senha.

#### Campos e elementos:

- E-mail: campo de texto para o endereço eletrônico;
- Botão “Recuperar senha”.

#### Dados utilizados (Banco de Dados) - Tabela *Users*:

- email (verificação e envio das instruções de recuperação);
- password (atualizado após redefinição).

![tela-recuperar-senha](./img/Tela%20-%20Recuperar%20senha.png)

---

### Dashboard de Produtos (ativos, vendidos e vencidos)

A tela principal do sistema exibe o painel de gerenciamento de produtos cadastrados, permitindo o controle de validade, quantidade, preço e status. É o centro operacional do ValiWeb, utilizado por todos os colaboradores do supermercado parceiro.

#### Funcionalidades principais:

- Exibição de produtos ativos, vencidos e vendidos (por abas);
- Busca e filtragem de produtos pelo nome, setor e validade;
- Inclusão de novos produtos via botão “+ Novo Produto”;
- Visualização detalhada de informações de cada item cadastrado;
- Exclusão de produtos;
- Destaque visual para produtos próximos da data de validade (em escalas de verde, amarelo e vermelho, sendo este último o alerta mais relevante).

#### Campos e elementos:

- Campo de busca livre;
- Botão “Filtrar”;
- Botão “+ Novo Produto”;
- Tabela com as colunas:
  - Produto;
  - Setor;
  - Validade;
  - Quantidade;
  - Preço Unitário;
  - Status;
  - Ações (visualização de detalhes e exclusão).

#### Dados utilizados (Banco de Dados):

- **Tabela Catalog:** internal_code, name, section, quantity (para identificação básica dos produtos);
- **Tabela Stock_Products:** expiration_date, unit_type, original_price, promotional_price, priority, status, updated_by, control_date;
- **Tabela Status:** description (usada para indicar se o produto está “Ativo”, “Vencido” ou “Vendido”);
- **Tabela Users:** username (para identificar o usuário logado).

![tela-dashboard](./img/Dashboard%20ValiWeb.png)

---

### Tela de Adicionar Novo Produto

Essa tela é acionada pelo botão “+ Novo Produto” no Dashboard e permite o cadastro de um novo item no sistema. O objetivo é registrar os dados necessários para o controle de estoque e precificação.

#### Funcionalidades principais:
- Cadastro de produtos com informações detalhadas;
- Opção de marcar o produto como “em promoção”;
- Botões de ação para “Cadastrar” ou “Cancelar” o processo;
- Validação de campos obrigatórios antes da submissão.

#### Campos e elementos:
- Nome - Produto;
- Setor (seleção de categoria, ex.: Mercearia, Padaria, Açougue);
- Data de Validade;
- Código Interno (identificador único no estoque);
- Prioridade (baixa, média, alta — de acordo com critérios estabelecidos pelo supermercado parceiro);
- Unidade de Medida (ex.: ml, kg, un);
- Quantidade;
- Preço de Custo;
- Preço de Venda;
- Produto em promoção (checkbox) - campo que, se selecionado, apresenta dois novos campos: quantidade em promoção e preço promocional.

#### Dados utilizados (Banco de Dados):
- **Tabela Catalog:** internal_code, name, section;
- **Tabela Stock_Products:** expiration_date, quantity, original_price, promotional_price, priority, unit_type, status;
- **Tabela Users:** updated_by (identifica o usuário que cadastrou o produto).

![tela-adicionar-produto](./img/Adicionar%20Novo%20Produto.png)

---

### Tela de Visualizar Detalhes do Produto

Exibe as informações completas de um produto já cadastrado. Essa tela é acessada por meio do botão “Detalhes” localizado na listagem do Dashboard.

#### Funcionalidades principais:
- Visualização dos dados completos de um lote de produto;
- Indicação visual se o produto está em promoção;
- Acesso ao botão de edição de produtos;
- Acesso ao botão de exclusão do lote diretamente pela interface.

#### Campos e elementos:
- Nome - Produto;
- Setor;
- Data de Validade;
- Código Interno;
- Prioridade;
- Unidade de Medida;
- Quantidade;
- Preço de Custo;
- Preço de Venda;
- Valor total do lote (calculado automaticamente);
- Status (Ativo, Vendido, Vencido);
- Checkbox “Produto em promoção”.

#### Dados utilizados (Banco de Dados):
- **Tabela Stock_Products:** expiration_date, quantity, unit_type, original_price, promotional_price, priority, status, control_date;
- **Tabela Catalog:** name, internal_code, section;
- **Tabela Status:** description (para indicar o estado do produto).

![tela-visualizar-detalhes](./img/Visualizar%20Detalhes.png)

---

### Tela de Edição de Lote de Produtos

Permite a edição de informações já cadastradas sobre um lote de produtos, como preços, quantidades, status, entre outros campos. Essa tela mantém o mesmo layout da de visualização de detalhes, mas com campos editáveis e botões para salvar ou cancelar alterações.

#### Funcionalidades principais:
- Atualização de dados do lote de produtos;
- Opção de adicionar, remover ou alterar promoções;
- Botões “Salvar alterações” e “Cancelar”;
- Validação dos campos modificados antes da atualização.

#### Campos e elementos:
- Todos os campos da tela de detalhes tornam-se editáveis.

#### Dados utilizados (Banco de Dados):
- **Tabela Stock_Products:** expiration_date, quantity, original_price, promotional_price, priority, status, updated_by. As atualizações são registradas via campo control_date e associadas ao updated_by (usuário responsável pela modificação);
- **Tabela Catalog:** internal_code, name, section.

![tela-editar-produtos](./img/Editar%20lote.png)

---

### Tela de Exclusão de Lote

Essa tela aparece em formato de modal de confirmação, após o clique no ícone de exclusão, seja no Dashboard ou na visualização de detalhes. Garante que o usuário confirme a remoção de um lote antes da exclusão definitiva dos dados.

#### Funcionalidades principais:
- Confirmação ou cancelamento da exclusão de um produto;
- Prevenção de exclusões acidentais.

#### Campos e elementos:
- Mensagem: “Confirmar exclusão do lote?”;
- Botão “Cancelar” (retorna ao Dashboard sem alterações);
- Botão “Confirmar exclusão” (remove o registro definitivamente).

#### Dados utilizados (Banco de Dados):
- **Tabela Stock_Products:** id (para a exclusão do registro referente ao lote);
- **Tabela Users:** updated_by (identifica quem realizou a exclusão).

![tela-excluir-produtos](./img/Excluir%20lote.png)

---

### Telas - Painéis em BI

Os dashboards em Business Intelligence (BI) foram desenvolvidos com o objetivo de transformar dados operacionais em informações estratégicas, oferecendo aos gestores do supermercado parceiro uma visão ampla sobre o desempenho de produtos, perdas e indicadores financeiros.

Integrado diretamente ao banco de dados central do ValiWeb, o BI atua como uma camada analítica, extraindo e consolidando dados provenientes dos módulos existentes no sistema. Cada visualização foi projetada com base em métricas relevantes para o negócio, priorizando clareza, agilidade na leitura e suporte à decisão.

---

### Dashboard BI – Visão Geral (Produtos e Perdas)

A tela de Visão Geral representa o painel principal do Business Intelligence (BI) e foi projetado para fornecer uma análise consolidada dos produtos cadastrados, perdas e prejuízos do supermercado parceiro. O objetivo é apoiar decisões estratégicas, identificando gargalos no controle de estoque, produtos críticos e o impacto financeiro de perdas.

#### Funcionalidades principais:
- Visualização em tempo real de indicadores de desempenho relacionados a produtos e perdas;
- Monitoramento de métricas-chave (KPIs), como número total de produtos, prejuízo em unidades e em valores monetários (considerando como prejuízo o valor de custo dos produtos perdidos);
- Gráficos dinâmicos que comparam o desempenho de vendas e perdas ao longo dos meses (o período é selecionado pelo usuário);
- Identificação das categorias mais críticas e dos principais produtos perdidos, permitindo priorização de ações corretivas;
- Filtros laterais configuráveis (painel “Filters”) para personalização da visualização.

#### Componentes visuais:
- Indicadores numéricos (Cards): Total de produtos cadastrados, de produtos ativos, de prejuízo em produtos (unidades) e em dinheiro;
- Gráfico de pizza – “Principais Produtos Perdidos”: Exibe a proporção dos produtos com maior índice de perda, destacando os itens com maior impacto;
- Gráfico de linha – “Prejuízo X Vendas Totais”: Mostra a relação entre os valores de prejuízo (em azul) e vendas (em vermelho) ao longo do ano de 2025;
- Gráfico de barras horizontais – “Categorias Críticas”: Classifica as categorias com maior perda financeira.

#### Dados utilizados (Banco de Dados):
- **Tabela Stock_Products:** expiration_date, quantity, original_price, promotional_price, status, control_date;
- **Tabela Catalog:** section, name, internal_code;
- **Tabela Status:** description (para identificar produtos “Ativos”, “Vendidos” ou “Vencidos”).

![dashboard-visão-geral](./img/Dashboard%20BI%20-%20Visão%20Geral.png)

---

### Dashboard BI – Produtos em Alerta

O painel fornece uma visão analítica dos produtos em risco, seu percentual em relação ao estoque total e a distribuição desses produtos por categoria, apoiando decisões operacionais no controle de validade e reposição.

#### Funcionalidades principais:
- Exibição da quantidade total de produtos em risco e do percentual correspondente ao estoque total;
- Análise comparativa de produtos em risco por categoria, permitindo identificar setores mais críticos;
- Listagem detalhada dos produtos em alerta, incluindo setor, data de validade, quantidade, preço unitário e nível de prioridade;
- Atualização automática dos dados de acordo com o período e filtros aplicados (ano, mês, categoria, produto e código interno);
- Destacamento visual de produtos com validade próxima (em vermelho) e prioridade alta (em destaque).

#### Componentes visuais:
- Indicadores numéricos (Cards): Total de produtos em risco (com validade próxima) e percentual do estoque que está em risco; 
- Gráfico de barras horizontais – “Produtos em Risco por Categoria”: Mostra a quantidade de itens próximos à validade em cada categoria do supermercado;
- Tabela – “Produtos em Alerta”: Apresenta a listagem completa dos produtos, com informações de setor, validade, quantidade, preço unitário e prioridade, destacando visualmente os produtos mais urgentes.

#### Dados utilizados (Banco de Dados):
- **Tabela Stock_Products:** expiration_date, quantity, original_price, priority, status, control_date;
- **Tabela Catalog:** name, section, internal_code;
- **Tabela Status:** description (para identificar produtos “Ativos” ou “Vendidos”).

![dashboard-produtos](./img/Dashboard%20BI%20-%20Produtos%20em%20Alerta.png)

---

### Dashboard BI – Prejuízos

O painel fornece uma visão abrangente do impacto econômico do desperdício e dos produtos não comercializados, apoiando estratégias de redução de perdas e otimização do giro de estoque.

#### Funcionalidades principais:
- Cálculo automático do prejuízo total (em reais), do total de produtos perdidos e do percentual de prejuízo em relação ao estoque total;
- Exibição do total desperdiçado em quilogramas (Kg), permitindo mensurar o volume físico das perdas;
- Gráfico de evolução temporal das perdas, mostrando variações mensais de prejuízo;
- Listagem dos produtos que geraram prejuízo, com informações de validade, quantidade, preço unitário e indicação de participação em promoções antes da perda;
- Integração direta com os dados de estoque e controle de validade do sistema operacional ValiWeb.

#### Componentes visuais:
- Indicadores numéricos (Cards): Total de prejuízo em dinheiro, em peso (kg) e em quantidade de itens, bem como o percentual das perdas em relação ao estoque;
- Gráfico de linha – “Evolução de Perdas”: Mostra a tendência mensal do prejuízo financeiro ao longo do ano;
- Tabela – “Produtos Perdidos”: Exibe os produtos vencidos com dados detalhados de setor, validade, quantidade, preço unitário e indicação de participação em promoções antes da perda;

#### Dados utilizados (Banco de Dados):
- **Tabela Stock_Products:** expiration_date, quantity, cost_price, promotional_price, status, control_date;
- **Tabela Catalog:** section, name, internal_code;
- **Tabela Status:** description (para identificar produtos “Vencidos” e “Ativos”).

![dashboard-prejuízos](./img/Dashboard%20BI%20-%20Prejuízos.png)

---

### Dashboard BI – Filtros (Painel Lateral)

Esse painel permite ao usuário personalizar e refinar as informações exibidas em todos os painéis do BI. Essa funcionalidade garante maior flexibilidade na análise, facilitando a busca por padrões específicos de produtos, categorias ou períodos de tempo.

#### Funcionalidades principais:
- Filtragem dinâmica por ano, mês, categoria, nome do produto e código interno;
- Atualização imediata de todos os gráficos e indicadores ao aplicar ou limpar filtros;
- Campo de busca textual para localizar produtos específicos rapidamente;
- Painel retrátil que otimiza o espaço da interface, permitindo expandir ou recolher os filtros conforme necessidade.

#### Componentes visuais:
- Painel lateral interativo (Filters): com listas suspensas, campo de busca e opções de seleção múltipla;
- Botões de controle: ícones para abrir/fechar o painel e redefinir filtros.

#### Dados utilizados (Banco de Dados):
- **Tabela Catalog:** name, section, internal_code;
- **Tabela Stock_Products:** control_date (para ano e mês de referência).

![dashboard-filtros](./img/Dashboard%20BI%20-%20Filtros.png)