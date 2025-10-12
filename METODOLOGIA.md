## Metodologia do Projeto

O desenvolvimento do ValiTrack será conduzido por meio de uma abordagem ágil, tendo o framework Scrum como base metodológica. Essa escolha se justifica pela necessidade de flexibilidade, colaboração contínua e entregas incrementais, características que possibilitam ajustar o sistema ao longo do processo conforme os feedbacks dos stakeholders. Para assegurar a correta aplicação da metodologia, a equipe elegeu Marcus Paulo O. Silva como Scrum Master, papel responsável por garantir que os princípios do framework sejam respeitados durante todas as etapas.

A ferramenta escolhida para a gestão das atividades é o GitHub Projects, cuja utilização se pauta na centralização das informações do projeto, permitindo o registro, acompanhamento e atualização em tempo real das tarefas. O uso dessa plataforma viabiliza a transparência entre todos os envolvidos e assegura que as etapas possam ser visualizadas de forma clara pela equipe, pela professora orientadora e pelo parceiro. A documentação do projeto será continuamente atualizada de acordo com o andamento das etapas propostas pela instituição educacional e pelos feedbacks recebidos, preservando a rastreabilidade de decisões e ajustes realizados.

A fim de manter o alinhamento entre todos os membros envolvidos no desenvolvimento do ValiTrack, devem ser realizadas reuniões online semanais, onde devem ser discutidas as atividades pendentes, a distribuição de responsabilidades e o progresso alcançado. A distribuição das tarefas será realizada de maneira igualitária, assegurando que todos os integrantes contribuam para a conclusão de cada fase do projeto. Após cada reunião, o Scrum Master será responsável por registrar as atividades em formato de tarefas no GitHub Projects, as quais devem ser atualizadas pelos devidos responsáveis de forma regular, o que será essencial para garantir um acompanhamento coletivo das entregas e proporcionar maior visibilidade acerca do andamento do projeto. Embora o Scrum preveja cerimônias como Sprint Planning, Review e Retrospective, estas foram adaptadas à realidade acadêmica da equipe, sendo incorporadas às reuniões semanais de forma a contemplar a definição de metas, a coleta de feedbacks, atualização sobre possíveis impedimentos e a análise de pontos de melhoria em cada ciclo.

No que se refere à interação com o estabelecimento parceiro, a comunicação será mais intensa nas fases iniciais do projeto. Esse período demanda maior envolvimento para o entendimento das dores e da infraestrutura do supermercado, bem como para a definição da proposta e a elicitação dos requisitos funcionais e não funcionais. Durante esse período inicial, serão realizadas reuniões semanais com a pessoa gestora responsável pelo projeto no estabelecimento parceiro, de modo a assegurar o alinhamento sobre os aspectos supracitados. Já na fase de desenvolvimento, o contato deve ocorrer ao final de cada ciclo de entrega, por meio de reuniões de acompanhamento e validação, onde será possível à equipe coletar os feedbacks dos stakeholders e efetuar os ajustes no código conforme necessário. Considerando que um dos membros da equipe possui experiência prévia no estabelecimento, com acesso direto às operações internas, optou-se por não realizar visitas técnicas adicionais.

Após a conclusão da entrega final, contemplando tanto o website quanto os painéis de visualização em Business Intelligence (BI), a equipe será responsável por promover a capacitação do quadro de funcionários do supermercado parceiro. Essa etapa ocorrerá por meio de reuniões síncronas online, de forma a assegurar que todos compreendam corretamente a utilização do sistema. Ademais, será entregue ao estabelecimento um material completo de documentação, incluindo orientações técnicas e de negócio, o qual será estruturado de maneira a servir como insumo para o esclarecimento de dúvidas, bem como para subsidiar eventuais manutenções ou atualizações futuras da plataforma, garantindo a sustentabilidade e continuidade do uso da solução desenvolvida.

---

## Projeto do Data Warehouse / Data Mart

O modelo dimensional proposto é composto por quatro tabelas inter-relacionadas que suportam as operações de controle e análise de produtos em estoque:

![banco-de-dados](../pmv-si-2025-2-pe4-t3-valitrack/img/banco%20de%20dados%20atualizado.jpg)

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


[def]: /pmv-si-2025-2-pe4-t3-valitrack/img/banco%20de%20dados%20atualizado.jpg