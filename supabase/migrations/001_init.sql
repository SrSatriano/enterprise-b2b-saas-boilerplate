-- Organizations & multi-tenancy
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  unique (user_id, organization_id)
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  stripe_subscription_id text,
  plan text not null default 'starter',
  status text not null default 'trialing'
);

alter table memberships enable row level security;

create policy "members see own org"
  on memberships for select
  using (auth.uid() = user_id);
