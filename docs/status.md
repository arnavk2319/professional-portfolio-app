# Status (rolling, max 60 lines; orchestrator rewrites after every stage)

Updated: 2026-11-08 · T-013 lavender theme merged into revamp (PR #15); revamp is 2 commits ahead of main (#14, #15)

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
