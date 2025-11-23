 ## Processo de ETL
 
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

## Documentação dos jobs
Os jobs de transformação executados por cada módulo seguem uma rotina de atualização diária (a cada 24 horas). Esse intervalo garante que os dados processados e enviados ao Power BI estejam sempre atualizados com as informações mais recentes inseridas no ValiWeb e armazenadas no banco AWS SQL.



