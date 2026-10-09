# IT Minds Institute website

Public website and learner sign-in for IT Minds Institute (www.itminds.ac.za).
Built with Next.js (App Router), React, TypeScript, Tailwind CSS and Supabase, deployed on Vercel.

The full baseline is in `docs/specification-v1.1.pdf`. Design references are in `docs/ref-*.png`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase values
npm run dev                  # http://localhost:3000
```

The site runs without Supabase. Content comes from `lib/data/content.ts`, sign-in shows a
"not available" message, and the dashboard opens in preview mode.

### Connect Supabase

1. Create a project at supabase.com and copy the URL and anon key into `.env.local`.
2. Run the migration in `supabase/migrations/` (SQL editor, or `supabase db push` with the CLI).
3. In Authentication, enable Email, set the Site URL, and add `<site>/auth/callback` as a redirect URL.
4. Put `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for the enquiry route. Never commit it.

## Scripts

| Command                               | Purpose                         |
| ------------------------------------- | ------------------------------- |
| `npm run dev`                         | Local development               |
| `npm run build`                       | Production build                |
| `npm run lint` / `typecheck` / `test` | Quality checks (also run in CI) |
| `npm run format`                      | Format with Prettier            |

## Structure

```
app/(site)/        public pages with header and footer
app/(app)/         signed-in learner area (/dashboard)
components/        ui, layout, sections, auth, dashboard
lib/data/          content and query layer (swap for Supabase here)
lib/supabase/      browser, server and middleware clients
hooks/useAutosave  debounced autosave used across the site
supabase/migrations  versioned schema with Row Level Security
docs/              specification, references, collaboration guide, decisions
```

## More

- Working with partners on the repo: `docs/COLLABORATION.md`
- Decisions and open client questions: `docs/DECISIONS.md`
