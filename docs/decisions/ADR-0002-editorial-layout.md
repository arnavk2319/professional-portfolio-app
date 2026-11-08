# ADR-0002 Editorial scroll layout, hash routes, fonts
Status: accepted
Date: 2026-11-08
Amends: ADR-0001 (fonts, routes)

## Context
The sidebar plus sliding-panel layout hid content behind menus and, on a static host with no
rewrite, 404ed on direct loads of /projects, /history and /contact-me (T-014). The user chose
layout option 2 "Editorial scroll" from the mockups.

## Decision
- Layout: one long page with sections summary, experience, projects, education, skills and
  contact, a sticky section index (compact horizontal strip on narrow screens), a dated ledger
  for experience and hairline dividers. No sidebar, no sliding panels.
- Routes: the whole site is served from `/` (`/portfolio` and `/index` are aliases). Sections are
  `#anchors` in plain `<a href>` links, so `build/index.html` alone is enough with no host
  rewrite and the index works with JavaScript off. `/projects`, `/history` and `/contact-me`
  redirect client-side to `/#projects`, `/#education`, `/#contact`; unknown paths go to `/`.
- Active section: IntersectionObserver, guarded where it is missing; marked with aria-current.
- Fonts: one Google Fonts stylesheet (display=swap) for Fraunces (headings), DM Sans (body) and
  DM Mono (dates, numbers) replaces Inter and IBM Plex Sans. Tokens: --font-head, --font-body,
  --font-data.
- Dependencies: none added; package.json is unchanged.
- Missing resume data (project links) renders a muted "Add link" placeholder, never a made-up URL.

## Consequences
- Old page components, sidebar, menu bar and their SCSS are deleted.
- The legacy-route redirects only help where a host serves index.html for them.
- Colours still come only from the T-013 lavender tokens (light default, dark kept).
