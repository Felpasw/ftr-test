# Desafio Finanças

Gerenciador de transações e categorias financeiras. Monorepo com API GraphQL
(Node + TypeScript + Apollo Server + Prisma + SQLite) e web app (React + Vite +
Apollo Client).

## Estrutura

```
desafio-financas/
├── backend/   # API GraphQL
└── frontend/  # Aplicação React
```

## Backend

Pré-requisito: Node 20+.

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

Playground / endpoint GraphQL: `http://localhost:4000/graphql`.

## Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App em `http://localhost:5173`.

## Variáveis de ambiente

### backend/.env

| Chave          | Descrição                                    |
|----------------|----------------------------------------------|
| `JWT_SECRET`   | Segredo HMAC para assinar os tokens JWT      |
| `DATABASE_URL` | Connection string Prisma (ex: `file:./dev.db`) |
| `PORT`         | Porta do servidor (default `4000`)           |

### frontend/.env

| Chave               | Descrição                                   |
|---------------------|---------------------------------------------|
| `VITE_BACKEND_URL`  | URL do endpoint GraphQL (ex: `http://localhost:4000/graphql`) |
