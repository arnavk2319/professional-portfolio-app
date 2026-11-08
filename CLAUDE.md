# Professional Portfolio

Personal portfolio site (React, static, hosted on Render). Full spec: [docs/spec.md](docs/spec.md). Read it **by section** (grep the heading), never whole.

## Priorities (every agent, in order)

1. Cost, context and token efficiency 2. Correctness 3. Speed. The cheaper path wins unless the human says otherwise.

## Start here

- Read `docs/status.md` first (rolling summary, max 60 lines). Do not re-explore the repo to learn where things stand.
- Per-project knobs (verify command, branches, protected paths) live in `.claude/kit.json`.
- Scope: build only what the approved spec and tickets say. Extra ideas go to `docs/backlog.md` under Later.
- Ask, don't assume only for decisions that cost money or are hard to undo; default everything else and record it.

## Workflow (autopilot model)

`/kickoff "<brief>"` -> spec + ADR + phases + tickets -> **GATE A** (one approval) -> `/autopilot` builds every approved
ticket (implementer -> test-writer -> reviewer -> verify -> PR -> auto-merge into `revamp`) -> **GATE B**
(human merges `revamp` -> `master` and promotes production). Nothing else needs approval.
Other commands: `/plan` `/build <ticket>` `/review <branch>` `/ship-check` `/status` `/budget` `/log` `/ask` `/uicheck`.

## Conventions

- One ticket per implementer; branch `t-<id>-<slug>` off `revamp`; PR into `revamp`, `gh pr merge --auto --squash`. Conventional commit titles.
- Never push to `master`, force push, promote to production, or run schema push/migrate against a non-local DB.
- Never read `node_modules/`, `.venv/`, `.next/`, lockfiles, `logs/runs/`, `test-results/`.
- Never edit `.env*`, `secrets/`, `.github/`, `.claude/` (hooks block it). Human-only: describe the change in the ticket.
- Secrets only via env; every variable documented in `.env.example`. No new dependency without an ADR; pin exact versions.
- Every agent ends with `node scripts/agentic/log-decision.ts --agent <name> --ticket <id> --stage <s> --decision '...' --why '...'`.
- Commands print failures only. Keep this file under 150 lines.
- Never add `Co-Authored-By:` or "Generated with" lines to commits or PRs (`.githooks/commit-msg` rejects them).

## Agents (`.claude/agents/`)

planner · architect · implementer · test-writer · reviewer · evaluator (LLM/RAG evals) · security-auditor · deployer
(preview only) · ops-watcher. Subagents cannot spawn subagents; all delegation goes through the orchestrator,
which never writes feature code.

## Budgets

`.claude/budgets.json` holds caps (ticket S/M/L, day, week). Hook `guard-budget` warns at 70% and stops at 100%.
A stage failing twice stops the run and reports error, tokens spent and a proposed next step.

## Protected-path maintenance (human)

Start Claude Code with `KIT_ALLOW_PROTECTED=1` to let an agent edit `.claude/`, `.github/`, `.env*`.

## Stack (web-static-npm)

Static front-end site built with npm (Create React App or Vite) and hosted on Render as a static site. No backend.
Verify = tests (if any) + production build; a green build is the minimum bar. Keep dependencies minimal and pinned;
prefer CSS/SCSS over new UI libraries. Check responsive layout (mobile, tablet, desktop), accessibility (contrast,
alt text, keyboard focus, semantic headings), Lighthouse performance (image sizes, lazy loading) and SEO meta tags.
Deploys: Render builds from the production branch; agents only verify the build, never trigger a production deploy.
