# Backend - SMI Latinhas API

API REST para gerenciamento de demandas de produção de latinhas.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Rotas da API](#rotas-da-api)
  - [Health Check](#health-check)
  - [Demandas](#demandas)
  - [Itens](#itens)
- [Regras de Negócio](#regras-de-negócio)
- [Validações e Erros](#validações-e-erros)
- [Banco de Dados](#banco-de-dados)

---

## 🎯 Visão Geral

API desenvolvida com **Fastify** e **TypeScript** que gerencia:

- **Demandas**: Planejamento de produção com datas, status e itens
- **Itens**: Produtos (latinhas) com SKU e descrição

---

## 🏗️ Arquitetura

```
backend/
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   ├── migrations/         # Histórico de migrations
│   └── seed.ts            # Dados de teste
├── src/
│   ├── config/            # Configurações (database)
│   ├── controllers/       # Controllers (BaseController, DemandaController, ItemController)
│   ├── routes/            # Definição de rotas
│   ├── schemas/           # Validações com Zod
│   ├── services/          # Lógica de negócio
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilitários (error-handler, status-validator)
│   └── server.ts          # Entrada da aplicação
└── Dockerfile
```

**Padrão arquitetural:** MVC simplificado com camadas de Service

---

## 🛣️ Rotas da API

### Health Check

#### `GET /health`

Verifica se a API está funcionando.

**Resposta:**

```json
{
  "status": "ok",
  "timestamp": "2025-11-11T12:00:00.000Z"
}
```

---

### Demandas

#### `POST /demandas`

Cria uma nova demanda.

**Body:**

```json
{
  "dataInicial": "2025-05-23T00:00:00Z",
  "dataFinal": "2025-05-29T23:59:59Z",
  "status": "PLANEJAMENTO",
  "itens": [
    {
      "itemId": 1,
      "totalPlanejado": 3000,
      "totalProduzido": 0
    }
  ]
}
```

**Resposta:** `201 Created`

**Validações:**

- `dataInicial` e `dataFinal` são obrigatórios
- `status` deve ser: `PLANEJAMENTO`, `EM_ANDAMENTO` ou `CONCLUIDO`
- `itens` deve ter pelo menos 1 item
- `totalPlanejado` deve ser maior que 0
- `totalProduzido` deve ser maior ou igual a 0

---

#### `GET /demandas`

Lista todas as demandas com seus itens.

**Resposta:** `200 OK`

```json
[
  {
    "id": 1,
    "dataInicial": "2025-05-23T00:00:00.000Z",
    "dataFinal": "2025-05-29T23:59:59.000Z",
    "status": "PLANEJAMENTO",
    "createdAt": "2025-11-11T12:00:00.000Z",
    "updatedAt": "2025-11-11T12:00:00.000Z",
    "itens": [
      {
        "id": 1,
        "demandaId": 1,
        "itemId": 1,
        "totalPlanejado": 3000,
        "totalProduzido": 0,
        "item": {
          "id": 1,
          "sku": "4298",
          "descricao": "LATINHA VERMELHA COM AZUL"
        }
      }
    ]
  }
]
```

---

#### `GET /demandas/:id`

Busca uma demanda específica por ID.

**Resposta:** `200 OK` ou `404 Not Found`

**Erros comuns:**

- ID inválido (não numérico ou <= 0): `400 Bad Request`
- Demanda não encontrada: `404 Not Found`

---

#### `PUT /demandas/:id`

Atualiza uma demanda existente.

**Body (todos os campos são opcionais):**

```json
{
  "dataInicial": "2025-05-23T00:00:00Z",
  "dataFinal": "2025-05-29T23:59:59Z",
  "status": "EM_ANDAMENTO",
  "itens": [
    {
      "itemId": 1,
      "totalPlanejado": 5000,
      "totalProduzido": 2500
    }
  ]
}
```

**Resposta:** `200 OK`

**Validações:**

- Mesmas validações do POST
- **Transições de status** são validadas (ver [Regras de Negócio](#regras-de-negócio))
- Se `itens` for enviado, **substitui todos os itens** da demanda

---

#### `DELETE /demandas/:id`

Remove uma demanda e seus itens relacionados (cascade).

**Resposta:** `204 No Content`

---

### Itens

#### `POST /items`

Cria um novo item.

**Body:**

```json
{
  "sku": "9999",
  "descricao": "LATINHA AZUL MARINHO"
}
```

**Resposta:** `201 Created`

**Validações:**

- `sku` é obrigatório e não pode ser vazio
- `descricao` é opcional

---

#### `GET /items`

Lista todos os itens.

**Resposta:** `200 OK`

---

#### `GET /items/:id`

Busca um item específico com suas demandas relacionadas.

**Resposta:** `200 OK`

```json
{
  "id": 1,
  "sku": "4298",
  "descricao": "LATINHA VERMELHA COM AZUL",
  "createdAt": "2025-11-11T12:00:00.000Z",
  "updatedAt": "2025-11-11T12:00:00.000Z",
  "demandaItems": [
    {
      "id": 1,
      "demandaId": 1,
      "itemId": 1,
      "totalPlanejado": 3000,
      "totalProduzido": 0,
      "demanda": {
        "id": 1,
        "status": "PLANEJAMENTO",
        "dataInicial": "2025-05-23T00:00:00.000Z",
        "dataFinal": "2025-05-29T23:59:59.000Z"
      }
    }
  ]
}
```

---

#### `PUT /items/:id`

Atualiza um item existente.

**Body (todos os campos são opcionais):**

```json
{
  "sku": "4298-V2",
  "descricao": "LATINHA VERMELHA COM AZUL - EDIÇÃO ESPECIAL"
}
```

**Resposta:** `200 OK`

---

#### `DELETE /items/:id`

Remove um item.

**Resposta:** `204 No Content`

**⚠️ Atenção:** Não é possível deletar um item que está vinculado a uma demanda. Primeiro remova a demanda ou os itens da demanda.

---

## 📏 Regras de Negócio

### Transições de Status

As demandas seguem um fluxo de status com regras específicas:

| Status Atual   | Pode mudar para             |
| -------------- | --------------------------- |
| `PLANEJAMENTO` | `EM_ANDAMENTO`              |
| `EM_ANDAMENTO` | `PLANEJAMENTO`, `CONCLUIDO` |
| `CONCLUIDO`    | ❌ Nenhum (status final)    |

**Exemplos:**

✅ **Válido:**

```json
// PLANEJAMENTO → EM_ANDAMENTO
PUT /demandas/1
{ "status": "EM_ANDAMENTO" }
```

❌ **Inválido:**

```json
// PLANEJAMENTO → CONCLUIDO (pula etapa)
PUT /demandas/1
{ "status": "CONCLUIDO" }

// Resposta: 500 Internal Server Error
{
  "error": "Internal server error",
  "message": "Transição de status inválida: não é possível mudar de PLANEJAMENTO para CONCLUIDO"
}
```

❌ **Inválido:**

```json
// CONCLUIDO → qualquer outro (status final)
PUT /demandas/3
{ "status": "PLANEJAMENTO" }

// Resposta: 500 Internal Server Error
{
  "error": "Internal server error",
  "message": "Transição de status inválida: não é possível mudar de CONCLUIDO para PLANEJAMENTO"
}
```

---

## ⚠️ Validações e Erros

### Erros de Validação (400 Bad Request)

Quando campos obrigatórios estão faltando ou são inválidos:

```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "sku",
      "message": "SKU é obrigatório",
      "code": "too_small"
    }
  ]
}
```

### Erros de ID Inválido (400 Bad Request)

```json
{
  "error": "Invalid ID format"
}
```

### Erros de Recurso Não Encontrado (404 Not Found)

```json
{
  "error": "Demanda not found"
}
```

ou

```json
{
  "error": "Item not found"
}
```

### Erros do Prisma (404 Not Found)

Quando tenta atualizar/deletar um recurso que não existe:

```json
{
  "error": "Demanda not found"
}
```

### Erros Internos (500 Internal Server Error)

Erros de lógica de negócio (ex: transição de status inválida):

```json
{
  "error": "Internal server error",
  "message": "Transição de status inválida: não é possível mudar de CONCLUIDO para PLANEJAMENTO"
}
```

---

## 🗄️ Banco de Dados

### Schema

```prisma
model Item {
  id           Int            @id @default(autoincrement())
  sku          String
  descricao    String?
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  demandaItems DemandaItem[]
}

model Demanda {
  id           Int            @id @default(autoincrement())
  dataInicial  DateTime
  dataFinal    DateTime
  status       String         // PLANEJAMENTO | EM_ANDAMENTO | CONCLUIDO
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  itens        DemandaItem[]
}

model DemandaItem {
  id             Int      @id @default(autoincrement())
  demandaId      Int
  itemId         Int
  totalPlanejado Int
  totalProduzido Int      @default(0)
  demanda        Demanda  @relation(fields: [demandaId], references: [id], onDelete: Cascade)
  item           Item     @relation(fields: [itemId], references: [id])
}
```

### Dados de Teste (Seed)

O comando `npm run prisma:seed` popula o banco com:

- **4 itens** (latinhas com diferentes SKUs)
- **3 demandas** (uma em cada status)

---

## 🐳 Docker

O backend está dockerizado e pode ser executado via `docker-compose` na raiz do monorepo.

**Dockerfile highlights:**

- Imagem base: `node:24-alpine`
- Build multi-stage otimizado
- Migrations automáticas no startup
- Health check configurado

---

## 📝 Notas Técnicas

- **CORS:** Habilitado para todas as origens (desenvolvimento)
- **Validações:** Zod para validação de schemas
- **ORM:** Prisma com SQLite
- **Arquitetura:** Controllers herdam de `BaseController` para reduzir duplicação
- **Error Handling:** Centralizado em `ErrorHandler` com tratamento específico para Zod e Prisma
- **Type Safety:** TypeScript strict mode habilitado

---

## 👤 Autor

Desenvolvido por Leonardo Faleiros como parte da prova técnica para SMI Latinhas LLC.
