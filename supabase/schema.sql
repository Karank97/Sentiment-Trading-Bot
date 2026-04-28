-- NashBud backend-ready schema (Middlesex County, NJ deal discovery)

create extension if not exists "pgcrypto";

create table if not exists dispensaries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  city text not null,
  county text not null default 'Middlesex',
  state text not null default 'NJ',
  address text,
  source_url text,
  status text not null default 'verified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  dispensary_id uuid not null references dispensaries(id) on delete cascade,
  title text not null,
  category text not null,
  discount numeric(5,2) not null,
  expiration_date date not null,
  source_url text not null,
  status text not null default 'verified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists submitted_deals (
  id uuid primary key default gen_random_uuid(),
  dispensary_name text not null,
  city text not null,
  county text not null default 'Middlesex',
  state text not null default 'NJ',
  address text not null,
  title text not null,
  category text not null,
  discount numeric(5,2) not null,
  expiration_date date not null,
  source_url text not null,
  submitter_email text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'reviewer',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_deals_expiration_date on deals(expiration_date);
create index if not exists idx_submitted_deals_status on submitted_deals(status);
create index if not exists idx_dispensaries_city on dispensaries(city);
