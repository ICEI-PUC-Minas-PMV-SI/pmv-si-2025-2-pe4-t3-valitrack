## Especificação de Requisitos de Software

A plataforma web ValiWeb será desenvolvida com o objetivo de permitir que o supermercado parceiro realize o cadastro e acompanhamento de produtos próximos à data de validade. Sua interface principal disponibilizará um formulário para inserção desses itens, contemplando as informações necessárias para o controle da loja. As informações registradas nessa interface serão armazenadas no banco de dados do projeto, constituindo a base fundamental para a etapa final da entrega: a geração de painéis/visualizações em Business Intelligence (BI).

### Requisitos Funcionais

#### Aplicação Web (ValiWeb):

| Código | Descrição |
|--------|-----------|
| **RF01** | O sistema deve permitir cadastro manual de produtos identificados como próximos ao vencimento, com os seguintes dados: nome, código de barras, código interno, preço original, preço promocional, preço de custo, quantidade, unidade de medida, data de validade, setor, prioridade e status. |
| **RF02** | O sistema deve permitir exclusão manual de produtos identificados como próximos ao vencimento. |
| **RF03** | O sistema deve permitir a visualização de produtos identificados como próximos ao vencimento. |
| **RF04** | O sistema deve permitir edição manual de produtos identificados como próximos ao vencimento. |
| **RF05** | O sistema deve permitir o cadastro de usuários. |
| **RF06** | O sistema deve permitir o login de usuários. |
| **RF07** | O sistema deve permitir o cadastro e o login de um usuário do tipo administrador. |
| **RF08** | O usuário do tipo administrador deve conseguir cadastrar usuários. |
| **RF09** | O sistema deve permitir a alteração de status do produto cadastrado, entre: vendido (sucesso), vencido (prejuízo), expirado e ativo. |
| **RF10** | O sistema deve alterar automaticamente o status de um produto para “expirado” quando atingir um dia após a data de validade inserida para aquele item. |

#### Power BI / Data Warehouse:

| Código | Descrição |
|--------|-----------|
| **RF11** | O sistema deve realizar o envio de e-mails de alerta ao usuário quando um produto estiver com 7 dias faltantes para o vencimento. |
| **RF12** | O sistema deve permitir exportação de relatório de produtos cadastrados e que estejam com status “ativo”, em formato xlsx. |
| **RF13** | O sistema deve permitir filtrar por nome, código de barras e código interno durante a visualização dos dados dos produtos. |
| **RF14** | O sistema deve permitir ordenar por nome, código de barras, código interno, preço original, preço promocional, preço de custo, quantidade, unidade de medida, data de validade, setor, prioridade e status, durante a visualização dos dados dos produtos. |
| **RF15** | O sistema deve exibir o valor de prejuízo de mercadorias que não venderam e venceram. |
| **RF16** | O sistema deve exibir um comparativo de valor de prejuízo por trimestre. |
| **RF17** | O sistema deve classificar alertas em níveis de prioridade: baixo (verde), médio (amarelo) e alto (vermelho). |
| **RF18** | O sistema deve exibir alertas visuais no dashboard, informando o produto, prioridade, quantidade em estoque e data de validade. |

---

### Requisitos Não Funcionais

| Código | Descrição |
|--------|-----------|
| **RNF01** | O sistema deve manter disponibilidade de 99% durante horário comercial (8h às 19h). |
| **RNF02** | A interface deve ser intuitiva, permitindo uso por pessoas com conhecimento básico em informática. |
| **RNF03** | O sistema deve funcionar em multi navegadores (versões atuais). |
| **RNF04** | O sistema deve ser responsivo, adaptando-se automaticamente a diferentes tamanhos e resoluções de tela (desktop, notebook, tablet e smartphone), preservando a usabilidade, legibilidade e consistência visual em todos os dispositivos. |
| **RNF05** | O sistema deve permitir atualizações sem interrupção prolongada dos serviços. |
| **RNF06** | O sistema deve permitir acessos simultâneos de até 20 usuários, sem perder performance. |
| **RNF07** | Em 95% das requisições, o retorno não deve exceder 3 segundos. |
| **RNF08** | Os dados devem ser criptografados com criptografia AES (Advanced Encryption Standard). |
| **RNF09** | O código deve estar adequadamente documentado. |
