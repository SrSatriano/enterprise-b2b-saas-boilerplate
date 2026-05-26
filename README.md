# Enterprise B2B SaaS Boilerplate

Base arquitetural para lançar SaaS B2B: auth, RBAC, multi-tenancy e assinaturas Stripe.

## Stack

- Next.js 14
- Supabase (PostgreSQL + Auth)
- Stripe Billing

## Clone e rode em < 10 minutos

```bash
git clone <repo>
cd 13-enterprise-b2b-saas-boilerplate
cp .env.example .env.local
# Preencha SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY
npm install
npx supabase db push   # ou aplicar migrations/
npm run dev
```

Acesse `http://localhost:3000` — signup cria tenant automaticamente.

## Diagrama ER (resumo)

```
organizations ──┬── memberships ── users
                ├── subscriptions (stripe_id)
                └── roles ── permissions
```

ERD completo: [docs/ERD.md](docs/ERD.md)

## Rotas protegidas

| Rota | Auth | Role |
|------|------|------|
| `/dashboard` | Sim | member+ |
| `/admin` | Sim | admin |
| `/billing` | Sim | owner |
| `/api/webhooks/stripe` | Assinatura | — |

Arquitetura: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Multi-tenancy

- `organization_id` em todas as tabelas de dados.
- RLS no Supabase: `auth.uid()` só vê rows do seu org.

## Stripe

Produtos: Starter, Pro, Enterprise. Webhook sincroniza `subscriptions`.

## Estrutura

```
app/
  (auth)/
  (dashboard)/
  api/webhooks/stripe/
supabase/migrations/
lib/supabase/
docs/
```
