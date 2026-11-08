# ADR-0001 Stack, content and theme for portfolio revamp
Status: accepted

## Context
Existing static React SPA (React 16.13.1, react-router-dom 5.2, react-scripts 3.4.1, SCSS, Now UI Kit styles, Node 16.20.2).
Goal is a content/visual revamp from the user's resume, with no runtime backend, no secrets, zero per-request cost.
No git remote exists yet; Render service is added later by the human.

## Decision
- Framework: keep CRA 3.4.1 and the current dependency set. No new dependencies, no upgrade.
- Database: none. Content lives in plain JS modules in `src/data/` (`profile`, `experience`, `projects`, `education`,
  `skills`, `metrics`); views import and render them. Every `metrics.js` entry carries a `source` citing its resume bullet.
- LLM/RAG: none. No AI components, so no prompts, embeddings, vector store or guardrails. Cost per request: 0.
- Hosting: Render static site (`npm run build`, publish `build/`, keep `_redirects` SPA rewrite). Deploys from `master`;
  agents only verify the build. No remote now; merges are local `git merge --squash` into `revamp`.
- Theme: SCSS design tokens (colors, spacing, radius, type scale) as CSS custom properties in `_art-theme.scss`,
  switched by a `data-theme` attribute on `<html>`. Light is default, dark kept; choice persisted in localStorage.
  Palette: cool slate with teal accent. Fonts: Inter for body, IBM Plex Sans for headings.
- Contact: no backend and no third-party form posts. The form is replaced by `mailto:` / `tel:` / LinkedIn tiles
  driven by `profile.js`. External links use `rel="noopener noreferrer"`.
- Fonts and icons: one Google Fonts request with `display=swap` (preconnect); drop unused font families. Remove the Font
  Awesome CDN if unused after the revamp, else keep a minimal self-hosted subset. Remove unused images.
- Analytics: Google Analytics loads only when `REACT_APP_GA_MEASUREMENT_ID` is set; otherwise no script and no calls.
  `.env` stays untracked; `.env.example` is added by the human (protected path).
- Routes: `/portfolio`, `/projects`, `/history`, `/contact-me`; `/certifications` redirects to `/portfolio`.

## Alternatives
- Upgrade to Vite/Next or newer CRA: cleaner tooling, but out of scope and adds risk; revisit later.
- Headless CMS or JSON fetched at runtime: unneeded for one author, adds cost and failure modes.
- Formspree/EmailJS for the contact form: violates the no-third-party-post rule and adds a dependency or key.
- Tailwind or a component library: new dependency and a larger bundle versus existing SCSS.
- Self-hosting all fonts: faster, but more asset work; Google Fonts with `display=swap` meets the targets.
- Vercel hosting: works, but Render is the user's chosen target.

## Consequences (cost, risk, reversibility)
- Cost: 0 runtime, free static hosting, no new packages. Bundle shrinks if CDN assets are removed.
- Risk: CRA 3.4.1 on Node 16 is old and may carry audit warnings; accepted. Content errors are the main risk, so a
  manual diff of numbers against the resume is required in review. Resume dates run to Sep 2026 and need human confirmation.
- `.claude/kit.json` verify lacks `--passWithNoTests`, and `.github/` and `.env*` are protected; the human handles those.
- Reversible: content modules and tokens are isolated, so a framework migration or re-theme touches views only.
- Google Fonts and GA are the only external calls; GA is opt-in.
