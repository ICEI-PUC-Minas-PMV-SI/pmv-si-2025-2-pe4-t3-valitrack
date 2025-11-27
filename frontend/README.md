# ValiWeb - Frontend

Sistema de tracking de produtos próximos à data de vencimento desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 15.5.4** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework CSS utilitário
- **Axios** - Cliente HTTP para API
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 📋 Pré-requisitos

- Node.js 22 instalado
- npm como gerenciador de pacotes

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

4. Edite o arquivo `.env.local` com suas configurações:

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7036
NODE_ENV=development
```

## 🏃‍♂️ Executando o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Build para Produção

```bash
npm run build
npm run start
```

### Linting e Formatação

```bash
# Verificar linting
npm run lint

# Corrigir problemas de linting
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── auth/login/        # Página de login
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial
├── components/            # Componentes React reutilizáveis
├── hooks/                 # Custom hooks
├── services/              # Serviços de API
│   ├── api.config.ts     # Configuração da API
│   ├── apiClient.ts      # Cliente HTTP base
│   ├── authService.ts    # Serviço de autenticação
│   └── userService.ts    # Serviço de usuários
├── types/                 # Tipos TypeScript
├── utils/                 # Funções utilitárias
```

## 🔐 Autenticação

O projeto inclui um sistema de autenticação integrado:

- **Login**: `/auth/login`
- **Serviços**: Configurados em `src/services/`
- **Credenciais de teste**: `admin@example.com` / `password123`

## 🌐 Integração com API

A aplicação está configurada para integrar com uma API .NET:

- **Base URL**: Configurável via `NEXT_PUBLIC_API_BASE_URL`
- **Cliente HTTP**: Axios com interceptadores
- **Serviços**: Organizados por funcionalidade

## 📝 Scripts Disponíveis

- `dev` - Inicia servidor de desenvolvimento
- `build` - Gera build de produção
- `start` - Inicia servidor de produção
- `lint` - Executa ESLint
- `lint:fix` - Corrige problemas de ESLint automaticamente
- `format` - Formata código com Prettier
- `format:check` - Verifica formatação do código

## 🎨 Personalização

O projeto usa Tailwind CSS para estilização. Para personalizar:

1. Edite `tailwind.config.ts` para configurações globais
2. Modifique `src/app/globals.css` para estilos personalizados
3. Use classes utilitárias do Tailwind nos componentes

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
