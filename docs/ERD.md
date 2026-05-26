# Entity-Relationship Diagram

## organizations

| Campo | Tipo |
|-------|------|
| id | uuid PK |
| name | text |
| slug | text unique |
| created_at | timestamptz |

## users (auth.users)

Gerenciado pelo Supabase Auth.

## memberships

| Campo | Tipo |
|-------|------|
| user_id | uuid FK |
| organization_id | uuid FK |
| role | enum(admin, member, owner) |

## subscriptions

| Campo | Tipo |
|-------|------|
| organization_id | uuid FK |
| stripe_subscription_id | text |
| plan | text |
| status | text |

## RLS policies

```sql
CREATE POLICY org_isolation ON projects
  USING (organization_id IN (
    SELECT organization_id FROM memberships WHERE user_id = auth.uid()
  ));
```
