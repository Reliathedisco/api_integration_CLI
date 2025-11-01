-- Supabase Database Schema for API Integrations Platform
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (synced from Clerk via webhooks)
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  clerk_id text unique not null,
  email text not null,
  first_name text,
  last_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Purchases table
create table public.purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_session_id text unique not null,
  stripe_subscription_id text,
  plan_type text not null, -- 'pro_monthly', 'pro_lifetime'
  amount integer not null, -- Amount in cents
  status text not null default 'pending', -- 'pending', 'completed', 'failed'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- License keys table
create table public.license_keys (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  purchase_id uuid references public.purchases(id) on delete cascade,
  key text unique not null,
  status text not null default 'active', -- 'active', 'revoked', 'expired'
  plan_type text not null,
  expires_at timestamp with time zone, -- null for lifetime plans
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Subscriptions table (for monthly plans)
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  stripe_subscription_id text unique not null,
  stripe_customer_id text not null,
  status text not null, -- 'active', 'canceled', 'past_due', 'unpaid'
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.purchases enable row level security;
alter table public.license_keys enable row level security;
alter table public.subscriptions enable row level security;

-- Policies for users table
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid()::text = clerk_id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid()::text = clerk_id);

-- Policies for purchases table
create policy "Users can view their own purchases"
  on public.purchases for select
  using (user_id in (select id from public.users where clerk_id = auth.uid()::text));

-- Policies for license_keys table
create policy "Users can view their own license keys"
  on public.license_keys for select
  using (user_id in (select id from public.users where clerk_id = auth.uid()::text));

-- Policies for subscriptions table
create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  using (user_id in (select id from public.users where clerk_id = auth.uid()::text));

-- Function to generate license keys
create or replace function generate_license_key()
returns text
language plpgsql
as $$
declare
  key_prefix text := 'api-lic-';
  random_part text;
begin
  random_part := encode(gen_random_bytes(16), 'hex');
  return key_prefix || random_part;
end;
$$;

-- Function to create license key after purchase
create or replace function create_license_key_for_purchase()
returns trigger
language plpgsql
as $$
declare
  new_key text;
  expires timestamp with time zone;
begin
  -- Generate unique key
  new_key := generate_license_key();
  
  -- Set expiration for monthly plans (null for lifetime)
  if NEW.plan_type = 'pro_monthly' then
    expires := now() + interval '30 days';
  else
    expires := null;
  end if;
  
  -- Only create license if purchase is completed
  if NEW.status = 'completed' then
    insert into public.license_keys (user_id, purchase_id, key, plan_type, expires_at)
    values (NEW.user_id, NEW.id, new_key, NEW.plan_type, expires);
  end if;
  
  return NEW;
end;
$$;

-- Trigger to auto-create license keys
create trigger create_license_on_purchase
  after insert or update on public.purchases
  for each row
  execute function create_license_key_for_purchase();

-- Indexes for performance
create index idx_users_clerk_id on public.users(clerk_id);
create index idx_purchases_user_id on public.purchases(user_id);
create index idx_purchases_stripe_session_id on public.purchases(stripe_session_id);
create index idx_license_keys_user_id on public.license_keys(user_id);
create index idx_license_keys_key on public.license_keys(key);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_stripe_subscription_id on public.subscriptions(stripe_subscription_id);

