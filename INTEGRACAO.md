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


## Medidas de Contagem e Quantidade

| Nome | Regra de Negócio | Lógica Técnica |
|------|------------------|----------------|
| **ProdutosVencidos** | Conta quantos produtos únicos estão marcados como vencidos | COUNT na coluna ID filtrando StatusID = 3 |
| **ProdutosAtivos** | Conta quantos produtos únicos estão marcados como ativos | COUNT na coluna ID filtrando StatusId = 1 |
| **UnidadesPerdidasSoma** | Conta quantos produtos únicos estão marcados como ativos | Soma a coluna Quantity da tabela relacionada Catalogs onde o status é 3 |
| **TotalDesperdicado_Kg** | Soma a quantidade total de produtos cuja data de validade já passou (menor que hoje) | Soma a coluna Quantity filtrando ExpirationDate < TODAY() |
| **Total_Desperdicio_Real** | Calcula a quantidade total de itens com status de perda | Itera (SUMX) sobre a tabela StockProducts somando a quantidade relacionada onde o status é 3 |

### Código DAX

**ProdutosVencidos:**
```dax
ProdutosVencidos =
CALCULATE(
    COUNT('StockProducts'[Id]),
    'StockProducts'[StatusID] = 3
)
```

**ProdutosAtivos:**
```dax
ProdutosAtivos =
CALCULATE(
    COUNT('StockProducts'[Id]),
    'StockProducts'[StatusId] = 1
)
```

**UnidadesPerdidasSoma:**
```dax
UnidadesPerdidasSoma =
CALCULATE(
    SUM('Catalogs'[Quantity]),
    'StockProducts'[StatusId] = 3
)
```

**TotalDesperdicado_Kg:**
```dax
TotalDesperdicado_Kg =
CALCULATE(
    SUM('Catalogs'[Quantity]),
    'StockProducts'[ExpirationDate] < TODAY()
)
```

**Total_Desperdicio_Real:**
```dax
Total_Desperdicio_Real =
CALCULATE(
    SUMX(
        'StockProducts',
        RELATED('Catalogs'[Quantity])
    ),
    'StockProducts'[StatusId] = 3
)
```

---

## Medidas Financeiras (Valores e Prejuízos)

| Nome | Regra de Negócio | Lógica Técnica |
|------|------------------|----------------|
| **PrejuizoTotal_Vencidos** | Calcula o valor monetário total dos produtos vencidos | Multiplica Quantidade por CostPrice filtrando StatusID = 3 |
| **ValorTotalEstoque** | Calcula o valor monetário total do estoque considerado válido | Multiplica Quantidade por CostPrice filtrando StatusId = 2 |
| **PrejuizoTotal** | Calcula o valor total de perda financeira | Soma condicional (IF) multiplicando Quantity por CostPrice onde status é 3 |
| **PrejuizoPorCategoria** | Calcula o valor de custo dos produtos ativos | Multiplica Quantidade por Custo filtrando StatusId = 1 |
| **Prejuizo_EmReais** | Uma referência direta à medida de prejuízo total | Invoca a medida [PrejuizoTotal] |

### Código DAX

**PrejuizoTotal_Vencidos:**
```dax
PrejuizoTotal_Vencidos =
CALCULATE(
    SUMX(
        'StockProducts',
        RELATED('Catalogs'[Quantity]) * 'StockProducts'[CostPrice]
    ),
    'StockProducts'[StatusId] = 3
)
```

**ValorTotalEstoque:**
```dax
ValorTotalEstoque =
CALCULATE(
    SUMX(
        'StockProducts',
        RELATED('Catalogs'[Quantity]) * 'StockProducts'[CostPrice]
    ),
    'StockProducts'[StatusId] = 2
)
```

**PrejuizoTotal:**
```dax
PrejuizoTotal =
SUMX(
    'StockProducts',
    IF(
        'StockProducts'[StatusId] = 3,
        RELATED('Catalogs'[Quantity]) * 'StockProducts'[CostPrice],
        0
    )
)
```

**PrejuizoPorCategoria:**
```dax
PrejuizoPorCategoria =
CALCULATE(
    SUMX(
        'StockProducts',
        RELATED('Catalogs'[Quantity]) * 'StockProducts'[CostPrice]
    ),
    'StockProducts'[StatusId] = 1
)
```

**Prejuizo_EmReais:**
```dax
Prejuizo_EmReais = [PrejuizoTotal]
```

---

## Indicadores de Risco e Índices

| Nome | Regra de Negócio | Lógica Técnica |
|------|------------------|----------------|
| **IndiceDescontoPercentual** | Calcula a média do desconto aplicado comparando preço original e promocional | Subtrai o total promocional do total original e divide pelo total original. Retorna BLANK se não houver preço original |
| **IndiceMediaDiasAntecedencia** | Média de dias entre a data de validade e a data de controle | Média (AVERAGEX) da diferença em dias (DATEDIFF) entre ExpirationDate e ControlDate |
| **Qtd Produtos Risco** | Conta produtos ativos que vencem nos próximos 30 dias | Conta linhas com StatusId = 1 onde a data de validade está entre TODAY() e TODAY() + 30 |
| **PercentualEmRisco** | Representa a proporção de produtos em risco em relação ao total de produtos | Divide a medida [ProdutosEmRisco] pelo total de linhas da tabela valitrack stockproducts |
| **% Prejuízo Vencidos** | Mostra quanto do valor total do estoque foi perdido por vencimento (baseado em data) | Divide a soma do custo dos produtos com data expirada (ExpirationDate < TODAY) pelo [ValorTotalEstoque] |

### Código DAX

**IndiceDescontoPercentual:**
```dax
IndiceDescontoPercentual =
VAR Original = SUM('StockProducts'[OriginalPrice])
VAR Promocional = SUM('StockProducts'[PromotionalPrice])
RETURN
IF(
    NOT ISBLANK(Original) && Original > 0,
    DIVIDE(Original - Promocional, Original),
    BLANK()
)
```

**IndiceMediaDiasAntecedencia:**
```dax
IndiceMediaDiasAntecedencia =
AVERAGEX(
    'StockProducts',
    DATEDIFF(
        'StockProducts'[ExpirationDate],
        'StockProducts'[ControlDate],
        DAY
    )
)
```

**Qtd Produtos Risco:**
```dax
Qtd Produtos Risco =
CALCULATE(
    COUNTROWS('StockProducts'),
    'StockProducts'[StatusId] = 1,
    DATEDIFF(TODAY(), 'StockProducts'[ExpirationDate], DAY) >= 0,
    DATEDIFF(TODAY(), 'StockProducts'[ExpirationDate], DAY) <= 30
)
```

**PercentualEmRisco:**
```dax
PercentualEmRisco =
DIVIDE(
    [ProdutosEmRisco],
    COUNTROWS('valitrack stockproducts')
)
```

**% Prejuízo Vencidos:**
```dax
% Prejuízo Vencidos =
VAR ValorVencidos =
    CALCULATE(
        SUM('StockProducts'[CostPrice]),
        'StockProducts'[ExpirationDate] < TODAY()
    )
VAR ValorEstoque = [ValorTotalEstoque]
RETURN
    DIVIDE(ValorVencidos, ValorEstoque, 0)
```

---

## Outros Indicadores

| Nome | Regra de Negócio | Lógica Técnica |
|------|------------------|----------------|
| **Status Promoção** | Retorna "SIM" ou "NÃO" para indicar se existe algum valor promocional cadastrado | Se a soma de PromotionalPrice for maior que 0, retorna texto "SIM", senão "NÃO" |
| **PerdasPorMes** | Parece referenciar uma coluna ou medida existente na tabela Catalogs | Chama 'Catalogs'[PrejuizoTotal] diretamente |

### Código DAX

**Status Promoção:**
```dax
Status Promoção =
IF(
    SUM('StockProducts'[PromotionalPrice]) > 0,
    "SIM",
    "NÃO"
)
```

**PerdasPorMes:**
```dax
PerdasPorMes = 'Catalogs'[PrejuizoTotal]
