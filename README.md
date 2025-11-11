# SMI Latinhas - Sistema de Planejamento de Demandas

Monorepo contendo backend e frontend para o sistema de planejamento de produção de latinhas.

## 📁 Estrutura do Projeto

```
smi-latinhas-monorepo/
├── backend/          # API REST com Fastify + TypeScript + Prisma + SQLite
├── frontend/         # (em desenvolvimento)
└── docker-compose.yml
```

## 🚀 Tecnologias

### Backend

- Node.js v24.11.0
- Fastify
- TypeScript
- Prisma ORM
- SQLite
- Zod (validações)
- Docker

## 🏃 Como Executar

### Opção 1: Docker (Recomendado)

```bash
# Na raiz do monorepo
docker compose up --build
```

A API estará disponível em: `http://localhost:3333`

**Popular o banco com dados de teste:**

```bash
docker compose exec backend npm run prisma:seed
```

**Parar os containers:**

```bash
docker compose down
```

---

### Opção 2: Desenvolvimento Local

#### Backend

```bash
cd backend
npm install

# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular banco com dados de teste (opcional)
npm run prisma:seed

# Iniciar servidor em modo desenvolvimento
npm run dev
```

A API estará disponível em: `http://localhost:3333`

**Comandos úteis:**

```bash
npm run dev              # Inicia servidor em modo watch
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor em produção
npm run prisma:studio    # Abre interface visual do banco
npm run prisma:seed      # Popula banco com dados de teste
```

---

## 📚 Documentação

Para mais detalhes sobre as rotas da API, validações e regras de negócio, consulte o [README do Backend](./backend/README.md).

## ✅ Health Check

Verifique se a API está rodando:

```bash
curl http://localhost:3333/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "timestamp": "2025-11-11T..."
}
```
