# Roadmap

Living plan for `dudes_invitation` — a Next.js 16 / React 19 / Prisma app serving:
- VIP invitation flow (`src/app/invite/[slug]`)
- Dudes Club landing page (`src/app/club`)
- Product survey + results dashboard (`src/app/survey`, `src/app/admin/survey`)
- Admin login/dashboard (`src/app/admin`)
- Feasibility study page (`src/app/feasibility-study`)
- Nightmare Esports Organization landing page (`src/app/esports`), served at esports.dudesco.com via host-based rewrite in `src/proxy.ts`

## Shipped
- [x] VIP invitation site with per-slug invites, RTL time rendering fixes
- [x] Dudes Club landing page split out from root route
- [x] Product survey (bilingual options, free-text step, "other" purchase-factor option)
- [x] Admin survey results dashboard
- [x] Admin nav tab-switch loading feedback
- [x] Amplify SSR env var pipeline fixed
- [x] Esports department landing page (teams, sectors, recruiting rows, founders) — front-end only, no backend yet

## Now
- [ ] Add `esports.dudesco.com` as a domain in the Amplify console (code-side rewrite is done and tested locally; the subdomain won't resolve until this DNS/domain step is done in AWS)

## Next
- [ ] (add upcoming work items)

## Later / Ideas
- [ ] (backlog — nice-to-haves, unscoped ideas)

## Notes
- Deployment target: AWS Amplify (see `amplify.yml`)
- DB: Prisma (see `prisma/`)
- Keep this file updated as priorities shift — treat each checkbox as a single deliverable, not an epic.
