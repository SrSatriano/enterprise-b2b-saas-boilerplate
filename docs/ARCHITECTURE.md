# Arquitetura de rotas protegidas

## Middleware Next.js

```typescript
// middleware.ts — verifica sessão Supabase
// Redireciona /dashboard/* para /login se não autenticado
```

## RBAC

- `owner`: billing, delete org
- `admin`: convites, roles
- `member`: CRUD de recursos do produto

## Fluxo de signup

1. User signup → Supabase Auth
2. Trigger cria `organization` + `membership` owner
3. Redirect para onboarding + checkout Stripe (opcional trial)
