-- =====================================================================
-- MudirOS — trial_requests
-- Stores 30-day free trial requests submitted from the landing page.
--
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- (or `supabase db push` if you use the CLI)
-- =====================================================================

-- gen_random_uuid() lives in pgcrypto (already enabled on most Supabase projects)
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------
create table if not exists public.trial_requests (
  id           uuid        primary key default gen_random_uuid(),
  full_name    text        not null,
  company_name text        not null,
  email        text        not null,
  phone        text,                                  -- nullable (optional field)
  company_size text        not null,
  status       text        not null default 'new',
  created_at   timestamptz not null default now()
);

comment on table public.trial_requests is
  'Trial requests captured by the MudirOS landing page signup modal.';

-- ---------------------------------------------------------------------
-- Data integrity
-- ---------------------------------------------------------------------
do $$
begin
  -- Lightweight email sanity check (real validation happens client-side too)
  if not exists (
    select 1 from pg_constraint where conname = 'trial_requests_email_check'
  ) then
    alter table public.trial_requests
      add constraint trial_requests_email_check
      check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
  end if;

  -- Keep status to a known set so the pipeline stays clean
  if not exists (
    select 1 from pg_constraint where conname = 'trial_requests_status_check'
  ) then
    alter table public.trial_requests
      add constraint trial_requests_status_check
      check (status in ('new', 'contacted', 'activated', 'declined'));
  end if;

  -- Guard against empty strings sneaking into required text columns
  if not exists (
    select 1 from pg_constraint where conname = 'trial_requests_required_check'
  ) then
    alter table public.trial_requests
      add constraint trial_requests_required_check
      check (
        length(btrim(full_name)) > 0
        and length(btrim(company_name)) > 0
        and length(btrim(company_size)) > 0
      );
  end if;
end $$;

-- ---------------------------------------------------------------------
-- Indexes — newest-first listing and status filtering
-- ---------------------------------------------------------------------
create index if not exists trial_requests_created_at_idx
  on public.trial_requests (created_at desc);

create index if not exists trial_requests_status_idx
  on public.trial_requests (status);

-- ---------------------------------------------------------------------
-- Row Level Security
--
-- ⚠️ IMPORTANT: the anon key is publicly visible in the frontend bundle.
-- RLS is what makes that safe. The policy below lets anonymous visitors
-- INSERT a request and nothing else — they cannot read, update or delete
-- any row, so your lead list can never be scraped with the public key.
-- Reading happens through the Dashboard or a service-role key on a server.
-- ---------------------------------------------------------------------
alter table public.trial_requests enable row level security;

drop policy if exists "Anonymous visitors can submit a trial request"
  on public.trial_requests;

create policy "Anonymous visitors can submit a trial request"
  on public.trial_requests
  for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policy is defined on purpose:
-- with RLS enabled, anything without a policy is denied by default.
