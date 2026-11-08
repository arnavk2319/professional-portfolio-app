# Professional Portfolio spec

Revamp of the existing React portfolio (Arnav Kaushal, ML) into a Data Analyst portfolio for **Sakshi**.
Source of truth for content: `src/assets/Sakshi_Data_Analyst_Resume.pdf`.

## Goal
Re-skin and re-content the existing CRA site so it presents Sakshi (Data Analyst, Toronto) accurately and
professionally: new content from the resume, a new dashboard-inspired visual theme, and all site config/branding
swapped away from Arnav. Result must build green and be deployable as a static site on Render.

## Non-goals
- No backend, DB, auth, contact-form delivery service, CMS, or LLM/AI features.
- No new dependencies, no CRA/React upgrade, no migration to Vite.
- No invented facts: employers, metrics, links, certifications, photos, testimonials. Resume only.
- No real chart library; KPI tiles are CSS/HTML.

## Users and flows
Recruiters / hiring managers / franchise-ops stakeholders. Flows: land on home -> scan summary + KPI tiles ->
Experience -> Projects -> Education/Skills -> Download resume or email/phone/LinkedIn (placeholder).

## Features (v1)
1. Content swap (all verbatim from resume; American/Canadian spelling as in the PDF):
   - Summary (3 yrs, Redshift/SQL, Tableau, Power BI, Excel, 58 franchise partners).
   - Experience: WOW1DAY Painting Inc. (Data Analyst, Nov 2024 - Sep 2026, 6 bullets); JP Morgan Chase & Co.
     (Business Analyst, Jul 2021 - Aug 2022, 5); HFCL (Data Analyst Intern, Jun - Aug 2020, 3); SpiceJet Pvt. Ltd.
     (Data Analyst Intern, Jun - Aug 2019, 3).
   - Projects: VIP Tires and Services (Retail Market Analysis, Analyst); Yonge Street Mission Program Analysis (Team Lead).
   - Education: MSc Analytics, Northeastern University, Toronto (coursework line); BEng Mechanical Engineering,
     Netaji Subhas University of Technology, Delhi.
   - Skills in 5 resume groups (Databases & SQL; Visualization & BI; Programming & Analytics; Business & Customer
     Data; Strengths).
2. Content lives in `src/data/*.js` modules (profile, experience, projects, education, skills), pages only render.
3. Remove Arnav-only features: Certifications page/route/nav, Credly badges + carousel, GitHub repos fetch, ML project
   cards and images, Arnav resume PDF, unused `src/assets/img` files tied to them. Certifications are NOT in the resume.
4. KPI tiles: headline metrics taken only from resume numbers (e.g. 58 franchise partners, 25+ Tableau dashboards,
   20 SQL views, 25% query performance, 35% manual reporting cut, 30% fewer reporting errors).
5. New theme: dashboard-inspired palette, typography, cards, section layout; light + dark via existing theme switch.
6. Resume download: copy PDF to `public/` and link it (Download resume button on home + contact).
7. Contact page: email `sakshi1999lohia@gmail.com`, phone `+1 (437) 673-8835`, Toronto, ON, LinkedIn tile with a
   clearly marked placeholder (`LINKEDIN_URL` constant, tile hidden until set). Contact form: keep UI as is only if it
   works without a backend (mailto); otherwise replace with direct contact tiles.
8. Config/branding: `<title>`, meta description/OG/Twitter tags, theme-color, favicon + apple icon (initials "S"),
   manifest names, package.json `name`, remove `homepage` herokuapp and `gh-pages` deploy/predeploy scripts and
   devDependency, remove `.github/workflows/main.yml` (Creative Tim autocloser; human-only path, listed for human),
   README/CHANGELOG/ISSUE_TEMPLATE cleanup of github.com/arnavk2319, footer/copyright, avatar -> initials placeholder.
9. Analytics: GA id comes from env `REACT_APP_GA_MEASUREMENT_ID`; keep wiring but do not ship Arnav's id; guard so
   nothing loads when unset; document in `.env.example`.
10. Accessibility and responsive pass (mobile/tablet/desktop), alt text, focus states, contrast AA.

## Stack
Existing: React 16.13.1, react-router-dom 5.2, react-scripts 3.4.1, SCSS (sass), Now UI Kit styles, Node 16.20.2.
No new dependencies. Hosting: Render static site (`npm run build`, publish `build/`, `_redirects` rewrite kept).

## Architecture
Static SPA. Routes: `/portfolio` (home), `/projects`, `/history` (experience + education + skills), `/contact-me`;
`/certifications` removed (redirect to `/portfolio`). Data modules -> view components. Theme via `data-theme`
attribute and SCSS tokens in `_art-theme.scss`.

## Data model
Plain JS modules in `src/data/`: `profile.js` {name, title, location, email, phone, linkedin, summary, resumeUrl},
`experience.js` [{company, role, start, end, bullets[]}], `projects.js` [{name, role, bullets[]}],
`education.js`, `skills.js` [{group, items[]}], `metrics.js` [{value, label, source}] where every metric cites its
resume bullet.

## AI design (models, prompts, retrieval/agent loop, guardrails, cost per request)
N/A. No LLM at runtime. Cost per request: 0.

## Evals and targets (metric, dataset, threshold)
No LLM evals. Content fidelity check: every number in `metrics.js`, experience and projects appears in the resume
text (manual diff in review, reviewer lists mismatches). Build green: `npm run build` exit 0.

## Security and abuse
Static site; no secrets in repo. `.env` stays untracked; `.env.example` documents vars. Personal contact data is
published intentionally (user-provided resume). External links use `rel="noopener noreferrer"`. No form
posts to third parties.

## Performance targets
Lighthouse mobile: Performance >= 85, Accessibility >= 95, SEO >= 95. Remove unused images/fonts/Font Awesome CDN if
no longer used; images webp/lazy where present; fonts via single Google Fonts request with `display=swap`.

## Deploy target and env vars
Render static site from `master`; agents only verify the build. Env: `REACT_APP_GA_MEASUREMENT_ID` (optional).
Git: new local repo, no remote yet; integration branch `revamp`; PR/auto-merge are local (`git merge --squash`
into `revamp`, `gh` steps skipped while no remote). Human adds remote and Render service later.

## Risks
- `.claude/kit.json` verify lacks `--passWithNoTests`; fails with no tests. `.claude` is protected: human must edit.
- `.github/` and `.env*` are protected from agents; human handles workflow removal and `.env.example`.
- CRA 3.4.1 on Node 16 is old; no upgrade in scope.
- Resume dates run to Sep 2026 (today Nov 2026): present as written, flagged for human to confirm still-current.
- No LinkedIn URL, photo or certifications supplied: placeholders only.
- Resume PDF contains personal phone/email; publishing it is the user's decision (assumed yes).

## Defaults assumed
Style: clean dashboard look (cool slate + teal accent, Inter/IBM Plex Sans), light default, dark kept. Contact form
replaced by mailto/tiles. No questions asked of human.
