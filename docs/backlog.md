# Backlog

Ticket files live in `docs/tickets/T-<nnn>.md`. Status: draft | approved | in-progress | in-review | changes-requested | done.
Only the human (via Gate A) moves a ticket from draft to approved.

## Phases

| Phase | Name | Tickets | Status |
| ----- | ---- | ------- | ------ |
| P1 | Foundation (data, branding, removals) | T-001..T-004 | done |
| P2 | Content pages | T-005..T-008 | done |
| P3 | Theme, a11y, responsive, perf | T-009..T-011 | done |
| P4 | Final fidelity check | T-012 | done |
| P5 | Lavender theme (user request) | T-013 | done |
| P6 | Editorial layout and error fixes (user request) | T-014..T-015 | done |

## Tickets

| Ticket | Phase | Title | Size | Depends on | Status |
| ------ | ----- | ----- | ---- | ---------- | ------ |
| T-001 | P1 | Data modules from resume | M | - | done |
| T-002 | P1 | Remove Arnav-only features and routes | M | - | done |
| T-003 | P1 | Config and branding swap (needs_architect) | M | - | done |
| T-004 | P1 | Analytics from env, guarded | S | - | done |
| T-005 | P2 | Home: summary, KPI tiles, resume download | M | T-001, T-002, T-003 | done |
| T-006 | P2 | History: experience, education, skills | M | T-001, T-002 | done |
| T-007 | P2 | Projects page | S | T-001, T-002 | done |
| T-008 | P2 | Contact page, mailto/tiles, resume | M | T-001, T-002 | done |
| T-009 | P3 | Dashboard theme, light/dark | M | T-005..T-008 | done |
| T-010 | P3 | Accessibility and responsive pass | M | T-009 | done |
| T-011 | P3 | Performance and asset cleanup | S | T-009 | done |
| T-012 | P4 | Final fidelity check vs resume | S | T-010, T-011 | done |
| T-013 | P5 | Lavender theme, light and dark | M | T-009, T-010, T-011 | done |
| T-014 | P6 | Reproduce and fix Projects, Contact, Education errors | S | T-013 | done |
| T-015 | P6 | Editorial scroll layout, lavender light | L | T-014 | done |

## Later (not built)
- LinkedIn tile activation once the human supplies the URL.
- Real photo/avatar, certifications, testimonials (none in resume).
- Upgrade off CRA 3.4.1 / Node 16, or migrate to Vite.
- Real charts (chart library) for KPI tiles.
- Contact form delivery service (backend/third party).
- Human: remove `.github/workflows/main.yml`, add `.env.example`, edit `.claude/kit.json` verify (`--passWithNoTests`), add git remote and Render service, confirm Sep 2026 end date.
