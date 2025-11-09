 ### PROCESSO DE ETL
 
O processo de ETL (Extract, Transform, Load) do sistema Valitrack tem como objetivo consolidar, tratar e disponibilizar dados operacionais provenientes do sistema ValiWeb para visualização analítica no Power BI. Esse fluxo garante a integridade, atualização e padronização dos dados apresentados nos dashboards.

#### Etapas principais deste processo:

Extração (Extract):
Origem: Sistema ValiWeb;
Descrição: O ValiWeb é a aplicação responsável por registrar e atualizar informações operacionais;
Esses dados são armazenados no banco de dados relacional (SQL) hospedado na AWS;
Tecnologias:
Banco de dados: Amazon RDS (SQL Server);
Linguagem de integração: .NET.

#### Transformação (Transform):

Responsável: Código em .NET;
Descrição: Através de métodos e APIs desenvolvidos internamente, são realizadas:
Limpezas e padronizações de dados;
Aplicação de regras de negócio;
Junções e cálculos necessários para os relatórios;
Conversão dos dados para os formatos esperados pelo Power BI.

#### Carga (Load):
Destino: Modelos de dados utilizados pelo Power BI;
Descrição: Os dados transformados são disponibilizados por meio de endpoints/API para o Power BI, que realiza a conexão direta e atualizações programadas (refresh).

 ### DOCUMENTAÇÃO DOS JOBS
Os jobs de transformação executados por cada módulo seguem uma rotina de atualização diária (a cada 24 horas). Esse intervalo garante que os dados processados e enviados ao Power BI estejam sempre atualizados com as informações mais recentes inseridas no ValiWeb e armazenadas no banco AWS SQL.

### Módulo: Gerenciamento de Estoque (StockProductService / StockProductController)
Os jobs deste módulo são responsáveis por tratar, validar e transformar as informações de produtos em estoque cadastradas no ValiWeb, garantindo que os dados sejam padronizados e coerentes para posterior consumo nas visualizações do Power BI.

#### Método: GetAllAsync()
Objetivo: Retornar todos os produtos em estoque.

#### Método: GetByIdAsync()
Objetivo: Retornar um produto específico em estoque, identificado pelo seu ID, garantindo que os dados sejam apresentados de forma padronizada e enriquecida para consumo no Power BI.
Método: GetByInternalCodeAsync()
Objetivo: Filtrar produtos pelo código interno (campo usado para integração com catálogo).

#### Método: GetByStatusAsync()
Objetivo: Retornar produtos conforme seu status operacional (Ativo, Vendido, Expirado).

#### Método: GetExpiringProductsAsync()
Objetivo: Retornar produtos com data de validade próxima.

#### Método: CreateAsync()
Objetivo: Cadastrar um novo produto no estoque.

#### Método: UpdateAsync()
Objetivo: Atualizar dados de um produto existente.

#### Método: DeleteAsync()
Objetivo: Excluir produto do estoque.



#### Método: MapToResponseDto()
Objetivo: Mapear as entidades StockProduct para StockProductResponseDto.




### Módulo: Catálogo de Produtos (CatalogController)
Os jobs deste módulo são responsáveis por gerenciar, transformar e padronizar os dados de produtos cadastrados no ValiWeb, garantindo que o catálogo armazenado no banco de dados AWS SQL permaneça íntegro, atualizado e pronto para consumo nas visualizações do Power BI.

#### Método: Create()
Objetivo: Inserir um novo item no catálogo de produtos do sistema, garantindo integridade e padronização dos dados antes de persistir no banco AWS SQL.
Método: GetAll()
Objetivo: Retornar todos os itens cadastrados no catálogo de forma estruturada e limpa, consolidando os dados do banco em formato adequado para consumo no Power BI.

#### Método: GetByCode()
Objetivo: Buscar um item específico do catálogo com base em seu código interno (InternalCode).

#### Método: Update()
Objetivo: Atualizar os dados de um item existente no catálogo, mantendo integridade referencial e refletindo mudanças de estoque, seção ou nome.



#### Método: Delete()
Objetivo: Remover um item do catálogo com base no seu InternalCode, garantindo consistência na base e evitando resíduos de dados inativos.

### Módulo: Gerenciamento de Usuários (UserController / UserService)

Os jobs deste módulo são responsáveis por tratar, transformar e garantir a segurança dos dados de usuários provenientes do ValiWeb, assegurando que as informações pessoais e credenciais armazenadas no banco AWS SQL estejam padronizadas e devidamente criptografadas.

#### Método: GetAll()
Objetivo: Retornar todos os usuários cadastrados de forma simplificada, padronizando as informações em formato DTO.


#### Método: GetById()
Objetivo: Buscar um usuário específico pelo seu ID, retornando dados tratados e seguros.




#### Método: Add()
Objetivo: Cadastrar um novo usuário no sistema, aplicando transformações de segurança e validação antes da persistência no banco.

#### Método: Update()
Objetivo: Atualizar informações de um usuário existente, aplicando novamente a criptografia e validações necessárias.

#### Método: Delete()
Objetivo: Excluir um usuário do sistema com base no seu ID, garantindo remoção completa e consistente.





