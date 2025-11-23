## Metas do Projeto

1. Reduzir em pelo menos 30% o descarte de produtos próximos ao vencimento no supermercado parceiro até três meses após a implementação do ValiTrack, por meio da gestão eficiente do estoque;
  
2. Disponibilizar o sistema web funcional com, no mínimo, 90% dos requisitos funcionais e não funcionais priorizados implementados até a data da entrega final definida pela instituição educacional;
  
3. Conduzir pelo menos 6 reuniões formais com o parceiro ao longo do desenvolvimento, incluindo fases de levantamento de requisitos, validação de protótipos e avaliação dos incrementos entregues;
  
4. Assegurar taxa mínima de 70% de participação dos membros da equipe em todas as reuniões semanais propostas, monitorada por lista de presença registrada em ata;
  
5. Capacitar 100% do quadro de funcionários do supermercado parceiro diretamente envolvido com o uso da plataforma, em reuniões síncronas online de treinamento antes da implantação final;
   
6. Disponibilizar documentação técnica e de negócio completa, incluindo guias de uso, descrição de requisitos, arquitetura do sistema e instruções para atualização futura, até a data de entrega final.

## Indicadores-Chave (KPIs)

Em contato direto com o supermercado parceiro, foram definidos diversos indicadores-chave para a operação do mesmo, sendo eles:

- **Total de Produtos Cadastrados:** Representa o número total de produtos registrados no banco de dados do Valitrack, incluindo todos os itens que já passaram pelo sistema, estejam eles ativos, vencidos ou vendidos (inativos). O cálculo considera o conjunto completo de registros na tabela de produtos, refletindo o portfólio monitorado pelo supermercado.

- **Total de Produtos Ativos:** Quantidade de produtos que se encontram disponíveis e válidos no estoque no momento da consulta. Para esse indicador, são considerados apenas itens cuja data de validade é posterior à data atual e cujo status operacional está marcado como “ativo”.

- **Total de Prejuízo (em Produtos):** Número de produtos (unidades) que foram descartados devido à expiração da validade. Esse total é obtido pela soma das quantidades de todos os itens cujo status foi marcado como "vencido" na base de dados, dentro do período analisado no dashboard.

- **Total de Prejuízo (em R$):** Valor monetário total relacionado aos produtos perdidos por vencimento. O cálculo é feito multiplicando-se a quantidade de cada item descartado pelo seu preço unitário (cadastrado no sistema), e somando-se o resultado para todos os produtos vencidos do período.

- Principais Produtos Perdidos: Gráfico dos produtos que mais contribuíram para o total de perdas por quantidade descartada. O indicador exibe os itens com maior impacto no conjunto analisado.

- **Categorias Críticas:** Distribuição das perdas por categoria de produto (como Mercearia, Laticínios, Congelados, Padaria). Essa métrica agrupa todos os produtos perdidos em seus respectivos setores e soma o prejuízo financeiro de cada grupo, permitindo visualizar quais categorias têm maior incidência de perdas dentro do período analisado.

- **Total Desperdiçado (em Kg):** Quantidade total de peso descartado. O valor é calculado multiplicando o peso unitário de cada item pela quantidade descartada, e somando esses resultados para todos os produtos vencidos. O indicador expressa o volume físico do desperdício, representado em quilogramas.

- **Total de Prejuízo (em %):** Percentual do prejuízo em relação ao total de produtos ativos no período. Ele é calculado dividindo-se a quantidade de produtos perdidos pela quantidade total de produtos ativos e multiplicando o resultado por 100, representando o índice percentual de perdas.

- **Evolução de Perdas:** Série temporal que apresenta a variação mensal dos valores de prejuízo. O gráfico é composto pela soma das perdas financeiras de cada mês, permitindo visualizar oscilações ao longo dos meses com base nos registros históricos do sistema.

- **Total de Produtos em Risco:** Quantidade de itens ativos que estão próximos da data de vencimento e ainda disponíveis no estoque. Considera-se em risco todo produto cuja validade esteja dentro de um intervalo pré-definido (até 5 dias do vencimento).

- **% de Estoque em Risco:** Proporção do estoque ativo que se encontra na condição de risco. É calculado dividindo-se o total de produtos em risco pelo total de produtos ativos e convertendo o resultado em porcentagem. Representa a fração do estoque que requer ação preventiva.

- **Produtos em Risco por Categoria:** Distribuição dos produtos em risco de acordo com seus setores. É um agrupamento por categoria (ex.: Laticínios, Mercearia, Congelados, Padaria), no qual se contabiliza a quantidade de itens que estão próximos da validade. O resultado é exibido como barras comparativas por categoria.

- **Índice de Agressividade de Desconto:** Mede a diferença percentual entre o preço original e o preço promocional aplicado a produtos com risco de vencimento. Esse indicador permite analisar a relação entre a profundidade do desconto aplicado e o resultado alcançado (se o produto foi recuperado ou não), possibilitando identificar a média de desconto efetiva para recuperação.

- **Lead Time Operacional:** Refere-se ao intervalo entre a data em que o produto foi identificado pelo sistema (control_date) e sua data de vencimento (expiration_date). O indicador expressa o tempo disponível para que o supermercado realize ações de recuperação (como promoção, mudança de exposição, giro acelerado). 
