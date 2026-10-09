# Decisions and open items

## Decided

| Decision                                            | Reason                                                                                  |
| --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Next.js App Router, not plain React or React Native | Public site needs SEO, speed and shareable links (spec 6.1)                             |
| Tailwind with tokens in `tailwind.config.ts`        | Tokens map to spec section 4.2 and can change in one place                              |
| Supabase email and password auth only               | Client brief: sign in and account creation by email                                     |
| Content read through `lib/data/queries.ts`          | Lets the admin area and database replace seed content without touching pages            |
| Autosave via `hooks/useAutosave.ts`                 | Brief: things save frequently. Debounced, flushes on tab hide, retries when back online |
| Fonts bundled with Fontsource                       | No third-party font requests (privacy, speed)                                           |
| Dashboard is a shell with sample data               | Spec marks the LMS out of scope; this gives the e-learning area a place to land         |

## Awaiting the client (spec section 9)

1. "Faculties" vs "programmes and courses" label
2. Which programmes are QCTO occupational qualifications; SAQA IDs
3. Which values list to use (site uses the seven from the Cornerstone document)
4. Vector logo and brand colours (current greens and slate are sampled from the PNG)
5. PATRIDOS logo and wording
6. E-learning platform URL; new tab or gateway page
7. Business School: interest form or hide tab
8. Corporate courses: pricing and delivery mode
9. Application process
10. Programme detail for all 24 programmes
11. Domain ownership, social links, content administrator

## Still to build

- Admin area for editing content (spec 5.2), with autosave on every editor
- Supabase-backed `lib/data/queries.ts`
- News from `news_posts`
- Programme listing filters (faculty, NQF level, mode)
- Rate limiting backed by shared storage; bot protection on forms
- Structured data (Organization, Course, EducationalOrganization)
- Real photography and the SVG logo lock-up
