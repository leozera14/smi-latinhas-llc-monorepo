# SMI Latinhas LLC - Sistema de Planejamento de Demandas

Sistema completo full-stack para gerenciamento de demandas de produção de latinhas, desenvolvido com as melhores práticas e tecnologias modernas.

## 📋 Overview

Aplicação web que permite:

- ✅ **Gerenciar Demandas**: Criar, editar, visualizar e excluir demandas de produção
- ✅ **Gerenciar Itens**: Cadastro de SKUs e produtos disponíveis
- ✅ **Sincronização em Tempo Real**: Dados atualizados automaticamente entre múltiplas abas
- ✅ **Validações de Status**: Regras de negócio para transição de status de demandas
- ✅ **Docker Ready**: Totalmente containerizado e pronto para produção

## 📁 Estrutura do Projeto

```
smi-latinhas-llc-monorepo/
├── backend/                    # API REST
│   ├── prisma/                # Schema e migrations do banco
│   ├── src/                   # Código-fonte TypeScript
│   ├── Dockerfile
│   └── README.md
├── frontend/                   # Interface Web
│   ├── src/                   # Código-fonte Next.js
│   │   ├── app/              # App Router (páginas e layout)
│   │   ├── modules/          # Módulos de domínio (demandas, itens)
│   │   ├── hooks/            # React hooks customizados
│   │   ├── stores/           # Gerenciamento de estado (Zustand)
│   │   └── types/            # Tipos TypeScript
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
└── README.md
```

## 🚀 Stack Tecnológico

### Backend

- **Node.js 20** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática
- **Prisma ORM** - ORM type-safe
- **SQLite** - Banco de dados leve
- **Zod** - Validação de schemas
- **Docker** - Containerização

### Frontend

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **TanStack Query (React Query)** - Gerenciamento de estado server
- **Zustand** - Gerenciamento de estado UI
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de formulários
- **Docker** - Containerização

## 🏃 Quick Start

### Opção 1: Docker Compose (Recomendado)

```bash
# Na raiz do projeto
docker compose up --build
```

🎉 **Pronto!** Os serviços estarão disponíveis:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3333
- **Health Check**: http://localhost:3333/health

**Popular banco com dados de teste:**

```bash
docker compose exec backend npm run prisma:seed
```

**Parar os containers:**

```bash
docker compose down
```

**Ver logs:**

```bash
docker compose logs -f            # Todos os serviços
docker compose logs -f frontend   # Apenas frontend
docker compose logs -f backend    # Apenas backend
```

---

### Opção 2: Desenvolvimento Local

#### 1. Backend

```bash
cd backend
npm install

# Setup do banco de dados
npm run prisma:generate
npm run prisma:migrate

# Popular com dados de teste (opcional)
npm run prisma:seed

# Iniciar servidor
npm run dev
```

API disponível em: `http://localhost:3333`

#### 2. Frontend

```bash
cd frontend
npm install

# Configurar variável de ambiente
cp .env.example .env
# Edite .env e configure NEXT_PUBLIC_BASE_API_URL=http://localhost:3333

# Iniciar servidor
npm run dev
```

App disponível em: `http://localhost:3000`

---

## 📚 Documentação Detalhada

- **[Backend README](./backend/README.md)** - Rotas da API, schemas, validações e regras de negócio
- **[Frontend README](./frontend/README.md)** - Arquitetura, componentes, hooks e configurações

---

## 🐳 Docker

### Arquitetura

```yaml
services:
  backend:
    - Porta: 3333
    - Network: smi-network
    - Healthcheck: /health endpoint

  frontend:
    - Porta: 3000
    - Network: smi-network
    - Depends on: backend (aguarda healthcheck)
    - Environment: NEXT_PUBLIC_BASE_API_URL=http://backend:3333
```

### Comandos Úteis

```bash
# Build sem cache
docker compose build --no-cache

# Rebuild apenas um serviço
docker compose build frontend
docker compose build backend

# Restart de um serviço
docker compose restart frontend

# Executar comando em um container
docker compose exec backend sh
docker compose exec frontend sh

# Ver status dos containers
docker compose ps

# Remover volumes (limpa banco de dados)
docker compose down -v
```

### Gerar Imagem para Produção

```bash
# Build das imagens
docker compose build

# Salvar imagens em arquivo .tar
docker save smi-latinhas-llc-backend smi-latinhas-llc-frontend | gzip > smi-latinhas.tar.gz

# Carregar imagens (em outro ambiente)
gunzip -c smi-latinhas.tar.gz | docker load
```

---

## ✅ Verificação de Funcionamento

### Backend Health Check

```bash
curl http://localhost:3333/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "timestamp": "2025-11-13T..."
}
```

### Frontend Health Check

Acesse: http://localhost:3000

Você deve ver a interface com a página de demandas.

### Testar API

```bash
# Listar demandas
curl http://localhost:3333/demandas

# Listar itens
curl http://localhost:3333/itens

# Criar item
curl -X POST http://localhost:3333/itens \
  -H "Content-Type: application/json" \
  -d '{"sku":"LAT-001","descricao":"Lata 350ml"}'
```

---

## 🎯 Funcionalidades

### ✨ Demandas

- [x] Listagem com tabela responsiva
- [x] Criação com formulário validado
- [x] Edição de demandas existentes
- [x] Exclusão com confirmação
- [x] Gerenciamento de itens da demanda
- [x] Validação de status e transições
- [x] Sincronização automática (30s)

### 📦 Itens

- [x] CRUD completo de itens (SKU + Descrição)
- [x] Listagem em tabela
- [x] Validações de campos obrigatórios
- [x] Sincronização em tempo real

### 🔄 Integração

- [x] React Query com refetch automático
- [x] Cache inteligente
- [x] Notificações toast
- [x] Loading states
- [x] Error handling

---

## 🛠️ Scripts Úteis

### Backend

```bash
cd backend
npm run dev              # Desenvolvimento
npm run build            # Build para produção
npm start                # Produção
npm run prisma:studio    # Interface visual do banco
npm run prisma:seed      # Popular dados de teste
```

### Frontend

```bash
cd frontend
npm run dev              # Desenvolvimento (porta 3000)
npm run build            # Build para produção
npm start                # Produção
npm run lint             # Linter
```

---

## 👤 Autor

Desenvolvido por **Leonardo Faleiros** como parte da prova técnica Full Stack Pleno para **SMI Latinhas LLC**.

---

## 📝 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.
