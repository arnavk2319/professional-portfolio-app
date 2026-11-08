# Status (rolling, max 60 lines; orchestrator rewrites after every stage)

Updated: 2026-11-08 · P6 done: T-014 route fix (#17), T-015 editorial scroll in lavender light (#19) merged into revamp

## Done
- 12 of 12 tickets merged into `revamp` (PRs #1 to #12). 120 tests, build green on Node 16.
- Security audit: no blockers. Spend $16.34 of $30 day cap (54%).

## Gate B (human)
- Open PR revamp -> main: `gh pr create --base main --head revamp` (title/body in the Gate B summary).

## Human actions pending
- BEFORE Render: run `npm install --package-lock-only` (lockfile still lists gh-pages; `npm ci` on npm 8 fails when out of sync); remove stale sass scripts in package.json.
- Delete `.github/workflows/main.yml`; add `.env.example` (REACT_APP_GA_MEASUREMENT_ID=).
- Decide LinkedIn: resume has a link annotation (https://www.linkedin.com/in/sakshi-sakshi-32b510215/); set LINKEDIN_URL in src/data/profile.js to show it.
- Confirm WOW1DAY end date Sep 2026; confirm publishing phone/email/resume PDF.
- Look at all 4 routes in light and dark, and at 375/768/1280 px (never viewed in a browser by any agent).
- Render: static site from `main`, build `npm run build`, publish `build`, env GENERATE_SOURCEMAP=false, add security headers (see audit).
- After the domain exists: absolute og:image/twitter:image; replace Font Awesome CDN with react-icons.
- Later: drop location.search from PageTracker page_path; gitignore logs/usage and logs/decisions; plan CRA 3.4.1 -> Vite.

## Budget warning (2026-11-08)
- Day spend $22.32 of $30 (74%) when T-014 started. T-015 (L, $8) may hit the day cap; resume tomorrow or raise `day_usd` in `.claude/budgets.json` (human-only path).

## Done in P6
- T-014: no app-code error on /projects, /history, /contact-me; cause is a missing SPA rewrite on the static host (Render ignores public/_redirects). render.yaml added.
- T-015: one editorial page at `/`, sticky section index, anchors work with no host rewrite, legacy routes redirect to #anchors. Lavender light default, dark kept.
- Day spend about $26-27 of $30 (86%+). Resume tomorrow or raise day_usd in `.claude/budgets.json` (human-only).

## Human actions pending (updated)
- Render: if the service was created by hand, add Redirects/Rewrites `/*` -> `/index.html` (Rewrite), or recreate from render.yaml. With the new single page, `/` works without it.
- Remove the stray "package-lock.json" dependency in package.json (git checkout -- package.json package-lock.json, then `npm install --package-lock-only`), then commit it with .env.example.
- Open the revamp -> main PR: main is behind revamp (#14, #15, #17, #19 and docs).
- Two project links are "Add link" placeholders: add URLs in src/data/projects.js or hide them.
- Look at the site in a real browser/phone (phone layout only checked at the top of the page by iframe).
- Later: gitignore logs/usage and logs/decisions; en dash in date ranges; Font Awesome CDN gone? (verify), og:image absolute URL.
