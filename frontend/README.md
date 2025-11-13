# Frontend - SMI Latinhas LLC

Interface web para gerenciamento de demandas de produção de latinhas.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Configuração e Instalação](#configuração-e-instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Docker](#docker)
- [Funcionalidades](#funcionalidades)

---

## 🎯 Visão Geral

Aplicação frontend desenvolvida com **Next.js 14** e **TypeScript** que oferece interface completa para:

- **Gerenciamento de Demandas**: CRUD completo com formulários, validações e feedback visual
- **Gerenciamento de Itens**: CRUD de produtos/SKUs disponíveis para produção
- **Sincronização em Tempo Real**: Atualização automática de dados a cada 30 segundos
- **Notificações**: Feedback visual com toasts para todas as operações

---

## 🏗️ Arquitetura

### Padrão Arquitetural

- **Modular por Domínio**: Cada feature (demandas, itens) possui sua própria estrutura
- **Separação de Responsabilidades**: Hooks customizados para lógica de negócio
- **Componentização**: Componentes reutilizáveis e específicos separados
- **Type Safety**: TypeScript strict em todo o projeto

### Estrutura de Pastas

```
frontend/
├── src/
│   ├── app/                      # App Router do Next.js
│   │   ├── _components/          # Componentes globais (UI, Header, Sidebar)
│   │   ├── demandas/            # Página de demandas
│   │   ├── itens/               # Página de itens
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Página inicial
│   │   └── globals.css          # Estilos globais
│   │
│   ├── modules/                  # Módulos de domínio
│   │   ├── demandas/
│   │   │   ├── components/      # Componentes específicos
│   │   │   │   ├── demanda-form.tsx
│   │   │   │   ├── demanda-modal.tsx
│   │   │   │   ├── demandas-table.tsx
│   │   │   │   ├── demandas-list.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/           # Lógica de negócio
│   │   │   │   ├── use-demanda-modal.ts
│   │   │   │   ├── use-demanda-list.ts
│   │   │   │   ├── use-demanda-form.ts
│   │   │   │   └── index.ts
│   │   │   └── schemas/         # Validações Zod
│   │   │       └── demanda.schema.ts
│   │   │
│   │   └── itens/               # Estrutura idêntica para itens
│   │       ├── components/
│   │       ├── hooks/
│   │       └── schemas/
│   │
│   ├── hooks/                    # Hooks globais
│   │   ├── use-crud.ts          # Factory de hooks CRUD genéricos
│   │   ├── use-demandas.ts      # Hooks de fetch para demandas
│   │   └── use-itens.ts         # Hooks de fetch para itens
│   │
│   ├── stores/                   # Gerenciamento de estado (Zustand)
│   │   └── ui-store.ts          # Estado da UI (modals, sidebar)
│   │
│   ├── types/                    # Tipos TypeScript
│   │   ├── demanda.ts
│   │   ├── item.ts
│   │   └── crud.ts
│   │
│   ├── lib/                      # Utilitários
│   │   ├── fetcher.ts           # Cliente HTTP
│   │   └── utils.ts             # Funções auxiliares
│   │
│   ├── config/                   # Configurações
│   │   ├── api.ts               # URL da API
│   │   └── constants/           # Constantes da aplicação
│   │
│   ├── providers/                # Providers React
│   │   └── index.tsx            # QueryClient, Toaster
│   │
│   └── utils/                    # Utilitários globais
│       └── cn.ts                # Merge de classes CSS
│
├── public/                       # Assets estáticos
├── Dockerfile
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠️ Tecnologias

### Core

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário

### Gerenciamento de Estado e Dados

- **TanStack Query (React Query)** - Cache e sincronização de dados server-side
- **Zustand** - Gerenciamento de estado UI (modals, sidebar)

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas TypeScript-first
- **@hookform/resolvers** - Integração React Hook Form + Zod

### UI e UX

- **Lucide React** - Ícones
- **React Hot Toast** - Notificações toast
- **clsx** - Utilitário para classes condicionais

### Dev Tools

- **React Query Devtools** - Debug de queries e mutations
- **ESLint** - Linter
- **PostCSS + Autoprefixer** - Processamento CSS

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

### Instalação Local

1. **Clone o repositório**

```bash
git clone <repository-url>
cd frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
NEXT_PUBLIC_BASE_API_URL=http://localhost:3333
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🔐 Variáveis de Ambiente

| Variável                   | Descrição          | Padrão                  |
| -------------------------- | ------------------ | ----------------------- |
| `NEXT_PUBLIC_BASE_API_URL` | URL da API backend | `http://localhost:3333` |

**Nota:** Variáveis prefixadas com `NEXT_PUBLIC_` são expostas no browser.

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento (porta 3000)

# Produção
npm run build        # Cria build otimizado para produção
npm start            # Inicia servidor de produção

# Code Quality
npm run lint         # Executa ESLint
```

---

## 🐳 Docker

### Build da Imagem

```bash
docker build -t smi-latinhas-frontend .
```

### Executar Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BASE_API_URL=http://backend:3333 \
  smi-latinhas-frontend
```

### Docker Compose (Recomendado)

Na raiz do projeto:

```bash
docker-compose up --build
```

Serviços disponíveis:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3333`

**Configuração do Docker Compose:**

- Frontend depende do backend (aguarda healthcheck)
- Comunicação via rede bridge `smi-network`
- Healthcheck a cada 30 segundos
- Restart automático em caso de falha

---

## ✨ Funcionalidades

### 🎯 Demandas

#### Listagem

- Tabela responsiva com todas as demandas
- Exibição de: datas, status, itens e totais
- Badges visuais de status
- Ações rápidas (editar/excluir) por linha
- Estado vazio com call-to-action

#### Criação

- Modal com formulário completo
- Campos: data inicial, data final, status
- Gerenciamento dinâmico de itens (adicionar/remover)
- Validações em tempo real
- Feedback visual (toast) de sucesso/erro

#### Edição

- Mesmo modal, pré-preenchido com dados atuais
- Atualização em tempo real
- Validação de mudanças de status
- Sincronização automática após salvar

#### Exclusão

- Modal de confirmação
- Feedback durante processo
- Atualização automática da lista

### 📦 Itens

#### Listagem

- Tabela com SKU, descrição e data de criação
- Ordenação e filtros (futuro)
- Ações inline (editar/excluir)

#### CRUD Completo

- Mesma estrutura e padrões de Demandas
- Formulário simples (SKU + Descrição)
- Validações Zod
- Integração com React Query

### 🔄 Sincronização de Dados

#### React Query Configuration

```typescript
{
  staleTime: 30000,              // Dados considerados frescos por 30s
  refetchInterval: 30000,        // Refetch automático a cada 30s
  refetchOnReconnect: true,      // Refetch ao reconectar
  gcTime: 180000                 // Garbage collection após 3min
}
```

**Benefícios:**

- ✅ Dados sempre atualizados entre múltiplas abas/janelas
- ✅ Sincronização automática após mutações (criar/editar/deletar)
- ✅ Cache otimizado reduz chamadas desnecessárias
- ✅ UX superior com estados de loading e erro

### 🎨 Componentes UI Reutilizáveis

- **Button**: Variantes (primary, secondary, danger)
- **Input**: Com estados de erro
- **Select**: Dropdown customizado
- **Modal**: Genérico e acessível
- **ConfirmModal**: Para ações destrutivas
- **FormField**: Wrapper com label e erro
- **CircleLoading**: Indicador de carregamento
- **EmptyState**: Estado vazio com ilustração

### 🎯 UX/UI

- Design responsivo (mobile-first)
- Sidebar colapsável
- Navegação intuitiva
- Feedback visual em todas as ações
- Loading states
- Error boundaries
- Toast notifications customizados

---

## 🏛️ Padrões de Código

### Hooks Customizados

Separação clara de responsabilidades:

- **use-\*-modal.ts**: Lógica de submit e state do modal
- **use-\*-list.ts**: Ações da lista (edit, delete, open modal)
- **use-\*-form.ts**: State e validação do formulário

### Componentização

- Componentes pequenos e focados
- Props tipadas com TypeScript
- Exportação centralizada via `index.ts`

### Type Safety

```typescript
// Tipos derivados dos schemas Zod
type CreateDemandaFormData = z.infer<typeof createDemandaSchema>;

// DTOs alinhados com backend
interface CreateDemandaDTO {
  dataInicial: string;
  dataFinal: string;
  status: StatusDemandaType;
  itens: CreateDemandaItemDTO[];
}
```

---

## 🔧 Troubleshooting

### Erro de conexão com API

```bash
# Verifique se o backend está rodando
curl http://localhost:3333/health

# Verifique a variável de ambiente
echo $NEXT_PUBLIC_BASE_API_URL
```

### Erros de build

```bash
# Limpe cache e reinstale
rm -rf .next node_modules
npm install
npm run build
```

### Problemas com Docker

```bash
# Rebuild sem cache
docker-compose build --no-cache

# Logs do container
docker-compose logs frontend

# Acesse o container
docker exec -it smi-latinhas-frontend sh
```

---

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 👤 Autor

Desenvolvido por Leonardo Faleiros como parte da prova técnica para SMI Latinhas LLC.
