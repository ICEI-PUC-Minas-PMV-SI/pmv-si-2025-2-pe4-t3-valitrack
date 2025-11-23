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

## Indicadores de Risco e Validade

Estas medidas focam na identificação preventiva de produtos que estão prestes a expirar.

| **Nome do Job**        | **Descrição do Negócio**                                                                 | **Lógica Técnica (DAX)**                                                                                     |
|------------------------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| **DiasParaVencer**     | Calcula a contagem de dias entre a data de controle e a data de expiração do produto.     | `DATEDIFF entre ControlDate e ExpirationDate (em dias)`                                                                 |
| **MediaDiasAntecedencia** | Média global dos dias de antecedência, indicando a eficiência operacional na identificação de produtos. | `AVERAGE da coluna DiasAntecedencia.`                                                                                  |
| **ProdutosEmRisco**    | Contagem de linhas de produtos que vencem em 30 dias ou menos.                            | `CALCULATE(COUNTROWS) filtrando onde DiasParaVencer <= 30.`                                                         |
| **ProximosAVencer**    | Contagem de IDs únicos de produtos que vencerão nos próximos 30 dias (intervalo entre Hoje e Hoje+30). | `CALCULATE(COUNT) com filtro de datas dinâmico (TODAY())` |

### DiasParaVencer

```DAX
DiasParaVencer =
DATEDIFF(
    'valitrack stockproducts'[ControlDate],
    'valitrack stockproducts'[ExpirationDate],
    DAY
)
```

### MediaDiasAntecedencia

```DAX
DiasAntecedencia =
DATEDIFF(
    'valitrack stockproducts'[ControlDate],
    'valitrack stockproducts'[ExpirationDate],
    DAY
)
```
```DAX
MediaDiasAntecedencia =
AVERAGE('valitrack stockproducts'[DiasAntecedencia])
```

### ProdutosEmRisco
```DAX
ProdutosEmRisco =
CALCULATE(
    COUNTROWS('valitrack stockproducts'),
    'valitrack stockproducts'[DiasParaVencer] <= 30
)
```

### ProximosAVencer
```DAX
ProximosAVencer =
CALCULATE(
    COUNT('valitrack stockproducts'[Id]),
    'valitrack stockproducts'[ExpirationDate] >= TODAY(),
    'valitrack stockproducts'[ExpirationDate] <= TODAY() + 30
)
```

## Indicadores Financeiros (Perdas e Custos)

| **Nome do Job**      | **Descrição do Negócio**                                                                 | **Lógica Técnica (DAX)**                                                                           |
|----------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **PrejuizoTotal**    | Soma total do valor de custo de todos os produtos que já expiraram (Data de Validade menor que Hoje) | SUMX iterando linha a linha: Se vencido, multiplica Quantidade X Preço de Custo. |
| **PrejuizoVencidos** | Variação da medida acima, focada especificamente na soma do custo de itens já vencidos.  | CALCULATE(SUMX) filtrando ExpirationDate < TODAY() |
| **PrejuizoProximosAVencer** | Projeção de perda financeira futura. Soma o custo dos produtos que vencerão nos próximos 30 dias. | CALCULATE(SUMX) filtrando ExpirationDate entre Hoje e Hoje+30. |
| **PrejuizoPorCategoria**    | Soma do preço de custo de produtos classificados com `StatusId = 1`.                    | CALCULATE(SUM) filtrando StatusId = 1 |
| **VendasTotais**            | Apesar do nome, calcula o Custo Total dos produtos com `StatusId = 1`.                               | CALCULATE(SUMX) de (Quantidade X Custo) onde StatusId = 1. |
| **%PrejuizoVencidos** | Calcula o percentual do valor perdido em produtos vencidos em relação ao valor total do estoque atual. Considera todos os produtos cuja data de validade já passou (ExpirationDate < Hoje) e compara o valor financeiro desses itens com o valor total do estoque registrado. | VAR ValorVencidos = CALCULATE(SUM('valitrack stockproducts'[CostPrice]), 'valitrack stockproducts'[ExpirationDate] < TODAY())<br><br>VAR ValorEstoque = [ValorTotalEstoque]<br><br>RETURN DIVIDE(ValorVencidos, ValorEstoque, 0) |

## PrejuizoTotal

```DAX
PrejuizoTotal =
SUMX(
    'valitrack stockproducts',
    IF(
        'valitrack stockproducts'[ExpirationDate] < TODAY(),
        RELATED('valitrack catalogs'[Quantity]) *
        'valitrack stockproducts'[CostPrice],
        0
    )
)
```
## PrejuizoVencidos

```DAX
PrejuizoVencidos =
CALCULATE(
    SUMX(
        'valitrack stockproducts',
        RELATED('valitrack catalogs'[Quantity]) *
        'valitrack stockproducts'[CostPrice]
    ),
    'valitrack stockproducts'[ExpirationDate] < TODAY()
)
```
## PrejuizoProximosAVencer

```DAX
PrejuizoProximosAVencer =
CALCULATE(
    SUMX(
        'valitrack stockproducts',
        RELATED('valitrack catalogs'[Quantity]) *
        'valitrack stockproducts'[CostPrice]
    ),
    'valitrack stockproducts'[ExpirationDate] >= TODAY(),
    'valitrack stockproducts'[ExpirationDate] <= TODAY() + 30
)
```
## PrejuizoPorCategoria

```DAX
PrejuizoPorCategoria =
CALCULATE(
    SUM('valitrack stockproducts'[CostPrice]),
    'valitrack stockproducts'[StatusId] = 1
)
```
## VendasTotais

```DAX
VendasTotais =
CALCULATE(
    SUMX(
    'valitrack stockproducts',
    RELATED('valitrack catalogs'[Quantity]) *
    'valitrack stockproducts'[CostPrice]
),
'valitrack stockproducts'[StatusId] = 1
)
```

## %PrejuizoVencidos

```DAX
%PrejuizoVencidos =
VAR ValorVencidos =
    CALCULATE(
        SUM('valitrack stockproducts'[CostPrice]),
        'valitrack stockproducts'[ExpirationDate] < TODAY()
    )

VAR ValorEstoque = [ValorTotalEstoque]

RETURN
    DIVIDE(ValorVencidos, ValorEstoque, 0)
```

## Gestão de Inventários e Status

| **Nome do Job**      | **Descrição do Negócio**                                                                 | **Lógica Técnica (DAX)**                                                                           |
|----------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **ProdutosAtivos** | Quantidade de produtos marcados como ativos no sistema `(StatusId = 3)`. | CALCULATE(COUNT) onde StatusId = 3. |
| **ProdutosInativos** | Quantidade de produtos marcados como inativos ou baixados `(StatusId = 2)`. | CALCULATE(COUNT) onde StatusId = 2. |
| **UnidadesPerdidas** | Soma da quantidade física de itens que já venceram. | CALCULATE(SUM) da coluna Quantity onde data de validade < Hoje. |
| **TotalDesperdiçado_Kg** | Calcula o total de peso (em quilogramas) desperdiçado considerando todos os produtos cuja validade já expirou. A soma é feita com base na quantidade cadastrada de cada item cujo vencimento é anterior à data atual. | CALCULATE(SUM('valitrack catalogs'[Quantity]), 'valitrack stockproducts'[ExpirationDate] < TODAY()) |

## ProdutosAtivos

```DAX
ProdutosAtivos =
CALCULATE(
    COUNT('valitrack stockproducts'[Id]),
    'valitrack stockproducts'[StatusId] = 3
)
```

## ProdutosInativos

```DAX
ProdutosInativos =
CALCULATE(
    COUNT('valitrack stockproducts'[Id]),
    'valitrack stockproducts'[StatusId] = 2
)
```

## UnidadesPerdidas

```DAX
UnidadesPerdidas =
CALCULATE(
    SUM('valitrack catalogs'[Quantity]),
    'valitrack stockproducts'[ExpirationDate] < TODAY()
)
```

## TotalDesperdicado_Kg

```DAX
TotalDesperdicado_Kg =
CALCULATE(
    SUM('valitrack catalogs'[Quantity]),
    'valitrack stockproducts'[ExpirationDate] < TODAY()
)
```

## Precificação e Descontos

| **Nome do Job**      | **Descrição do Negócio**                                                                 | **Lógica Técnica (DAX)**                                                                           |
|----------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **DescontoPercentual** | Calcula a % de desconto aplicada. Protege contra erro de divisão por zero caso o preço original seja nulo. | (PreçoOriginal - PreçoPromo) \ PreçoOriginal |
| **ÍndiceAgressividadeDesconto** | Média dos descontos percentuais aplicados apenas em produtos inativos `(StatusId = 2)`, indicando o quanto o preço foi baixado para tentar vazão. | AVERAGEX filtrando StatusId = 2 e excluindo descontos em branco |

## DescontoPercentual

```DAX
DescontoPercentual =
VAR Original = 'valitrack stockproducts'[OriginalPrice]
VAR Promocional = 'valitrack stockproducts'[PromotionalPrice]
RETURN
IF(
     NOT ISBLANK(Original) && Original > 0,
     DIVIDE(Original - Promocional, Original),
     BLANK()
)
```

## IndiceAgressividadeDesconto

```DAX
IndiceAgressividadeDesconto =
AVERAGEX(
    FILTER(
       'valitrack stockproducts'
       'valitrack stockproducts'[StatusId] = 2
          && NOT ISBLANK('valitrack stockproducts'[DescontoPercentual])
    ),
    'valitrack stockproducts'[DescontoPercentual]
)
```
