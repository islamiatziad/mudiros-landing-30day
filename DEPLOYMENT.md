# MudirOS — Production Deployment (mudiros.com)

Single-page React app with **path-based routing** (React Router). The homepage
is `/`; legal and trust pages are real URLs.

## Routes

| Path | Page |
|---|---|
| `/` | Landing (homepage) |
| `/about` | About |
| `/contact` | Contact |
| `/security` | Security |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/refund-policy` | Refund Policy |
| `/cookie-policy` | Cookie Policy |
| any other | Branded 404 |

## Build

```bash
npm install
npm run build      # runs tsc --noEmit then vite build → dist/
```

## ⚠️ SPA hosting requirement (must-do)

Because routing is path-based, the server must return `index.html` for any
unknown path — otherwise refreshing `mudiros.com/privacy-policy` returns a 404.
Config files are included for the common hosts:

- **Vercel** → `vercel.json` (rewrites all paths to `/index.html`)
- **Netlify** → `public/_redirects`
- **Apache** → `public/.htaccess`
- **nginx** → `nginx.conf.example` (copy the `try_files` block into your server)

Deploy the contents of `dist/` as the site root.

## Environment variables (trial signup → Supabase)

Set these in your host's environment settings before deploying:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

See `SUPABASE_SETUP.md` for the table migration and RLS.

## SEO

- Each route sets its own `<title>`, `<meta name="description">`, and
  `<link rel="canonical">` (via `src/components/Seo.tsx`), plus OG title/url.
- `public/sitemap.xml` and `public/robots.txt` list the canonical URLs.
- **Recommendation for best crawler/social results:** add prerendering or SSR
  so each URL returns fully-formed HTML at request time. The meta tags are set
  client-side today, which modern crawlers execute, but prerendering guarantees
  it. `vite-plugin-ssg` or a prerender step over the 8 routes is the simplest
  path and requires no code changes to the pages.

## Before pointing DNS at this

1. Set the Supabase env vars (or signups won't save).
2. Replace placeholder contact details in `src/lib/site.ts`
   (emails + WhatsApp number `966500000000`).
3. Confirm pricing + the "VAT-ready invoicing" claim against ZATCA reality.
4. Have the legal pages reviewed against KSA PDPL before relying on them.
5. Add a real 1200×630 OG image.
