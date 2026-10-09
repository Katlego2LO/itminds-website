# Collaboration guide

## Adding partners to the repository

1. GitHub, repository, **Settings**, **Collaborators and teams**, **Add people**.
2. Search by GitHub username or email and choose a role:
   - **Write** for developers who push branches and open pull requests.
   - **Triage** for people who manage issues only.
   - **Read** for reviewers and the client.
3. If the repo sits under an organisation, create a team and grant the team access instead of individuals.
4. Each partner accepts the emailed invitation, then clones the repo.

Free personal repositories allow collaborators but have limited branch protection on private repos.
If rules below are not available, move the repo to an organisation or upgrade the plan.

## Branches

- `main` is production. `develop` is staging for client sign-off.
- Work on `feature/...`, `fix/...` or `chore/...` branches cut from `develop`.
- Commit messages follow `feat:`, `fix:`, `docs:`, `refactor:`.

## Protect the branches

Settings, **Branches**, add a rule for `main` and `develop`:

- Require a pull request with at least one approval
- Require status checks: `quality` (from `.github/workflows/ci.yml`)
- Block force pushes and deletion

## Daily flow

```bash
git switch develop && git pull
git switch -c feature/faculty-filters
# work, then
git add -A && git commit -m "feat: add programme filters"
git push -u origin feature/faculty-filters
```

Open a pull request into `develop`. Vercel posts a preview URL on the pull request for review.

## Secrets

Never commit `.env*` files. Share Supabase and Vercel access through their own team settings, not chat.
Environment variables live in Vercel (Project, Settings, Environment Variables) and Supabase.

## Database changes

Only through new files in `supabase/migrations/`, named `YYYYMMDDHHMMSS_description.sql`.
Do not edit the database by hand in production.
