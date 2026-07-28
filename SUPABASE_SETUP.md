# Supabase Setup — 30-Day Trial Requests

Three steps, about five minutes.

## 1. Run the migration

Supabase Dashboard → **SQL Editor** → New query → paste the contents of
`supabase/migrations/0001_trial_requests.sql` → **Run**.

This creates `public.trial_requests` and — importantly — enables Row Level
Security with an **insert-only** policy for anonymous visitors.

## 2. Add your credentials

Dashboard → **Project Settings → API**, copy the Project URL and the
`anon` `public` key. Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

`.env` is gitignored. Add the same two variables to your host's environment
settings (Vercel / Netlify → Environment Variables) before deploying.

⚠️ Never use the `service_role` key here — anything in a `VITE_` variable is
compiled into the public JavaScript bundle.

## 3. Restart and test

```bash
npm run dev
```

Submit the form, then check Dashboard → **Table Editor → trial_requests**.

---

## Why the anon key is safe to publish

The anon key identifies your project, it does not grant access — RLS decides
what that key may do. The migration grants `INSERT` only. With RLS enabled,
anything without a matching policy is **denied by default**, so:

- ✅ A visitor can submit a trial request.
- ❌ Nobody can read, edit or delete rows with the public key — your lead list
  cannot be scraped.

You read the leads through the Dashboard, or from a server using the
`service_role` key.

## The table

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key, `gen_random_uuid()` |
| `full_name` | text | required |
| `company_name` | text | required |
| `email` | text | required, format-checked, stored lowercase |
| `phone` | text | **nullable** — blank submits as `NULL` |
| `company_size` | text | required |
| `status` | text | default `'new'` — one of `new` / `contacted` / `activated` / `declined` |
| `created_at` | timestamptz | default `now()` |

The app inserts only the five user fields; `id`, `status` and `created_at`
come from database defaults.

## Working the leads

```sql
-- Newest requests
select created_at, full_name, company_name, email, phone, company_size, status
from trial_requests
order by created_at desc;

-- Mark one as contacted
update trial_requests set status = 'contacted' where id = 'PASTE-UUID';

-- Still to action
select * from trial_requests where status = 'new' order by created_at;
```

## Recommended next steps

1. **Email notification** — a Supabase Database Webhook or Edge Function on
   insert, so you hear about a lead immediately instead of checking the table.
2. **Spam protection** — the endpoint is public by design. If you start seeing
   junk, add Cloudflare Turnstile or hCaptcha, or rate-limit by IP in an Edge
   Function. Not needed on day one; worth watching.
3. **Duplicate handling** — repeat submissions with the same email are allowed
   today. If you'd rather block them, add:
   `create unique index on public.trial_requests (email);`
   The client already surfaces a friendly message for error code `23505`.

## Behaviour when Supabase isn't configured

The form does **not** show a fake success screen. It displays:

> Signups aren't connected yet. Please contact us on WhatsApp and we'll set you up.

So a missing `.env` in production can never silently swallow leads.
