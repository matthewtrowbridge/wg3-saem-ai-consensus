# WG3 Working Site

A small static site for the SAEM AI Consensus 2026 Working Group 3 (AI Education, Training & Competency Development). Built as a collaboration surface for the planning group and as a staging ground for the straw-man scenarios × themes framework.

## Structure

```
WG3_Website/
├── index.html          Landing page — conference context, WG3 charge, timeline
├── grant.html          AHRQ R13 grant overview, three aims, WG3's role in Aim 3
├── framework.html      Interactive scenarios × themes matrix (the main artifact)
├── themes.html         Full theme definitions + candidate gap themes
├── scenarios.html      Browsable scenarios, filterable by theme
├── resources.html      Consolidated links (Slack, Drive, lit, grant, open threads)
├── people.html         Living roster
├── assets/
│   ├── site.css        Shared styles
│   ├── site.js         Shared helpers (legend, matrix, detail modal)
│   └── data.js         Single source of truth for themes / scenarios / gaps
├── deploy.sh           One-shot deploy script (see DEPLOY.md)
├── CLAUDE.md           Project context for Claude / future maintainers
├── CHANGELOG.md        Running log of site changes
├── DEPLOY.md           Step-by-step deploy and collaborator setup
└── README.md
```

**Editing content:** update `assets/data.js` and every page picks up the change. Theme definitions, scenario wording, and gap candidates all live there.

## Running locally

No build step. Any static web server works:

```
cd WG3_Website
python3 -m http.server 8080
# open http://localhost:8080
```

Or just double-click `index.html` — most pages work from `file://` too.

## Deployment: GitHub Pages

The site is deployed at **https://matthewtrowbridge.github.io/wg3-saem-ai-consensus/** from the `matthewtrowbridge/wg3-saem-ai-consensus` public repo. GitHub Pages fits this collaboration well: free, version-controlled, reviewable, reversible, and sophisticated collaborators can edit pages directly in the GitHub web UI.

**Initial setup is automated by `deploy.sh`.** See `DEPLOY.md` for the step-by-step (install GitHub CLI, authenticate, run the script). The script creates the repo, pushes the code, and enables Pages in one shot.

**Updating the live site after the initial deploy:**

```
git add <files>
git commit -m "describe what changed"
git push
```

Pages re-publishes within ~30-90 seconds. If you only edit `assets/data.js`, every page that uses scenarios/themes/scores updates automatically.

Optional: add a custom domain via **Settings → Pages → Custom domain**.

**How collaborators contribute without touching a terminal:**

- Click any file in the GitHub web UI → pencil icon → edit → "Commit changes" (or propose via PR).
- Use GitHub's "Suggest changes" flow for review.
- Comments and discussion happen in PRs, tied directly to the change.

**Alternatives if GitHub Pages is the wrong fit:**

- **Netlify Drop** (netlify.com/drop) — drag the folder in, get a URL in 10 seconds. No version control. Good for a throwaway preview; bad for collaboration.
- **Cloudflare Pages** — same as GitHub Pages, slightly faster edge.
- **Vercel** — overkill here (no build step needed).

## Editorial conventions

- Keep `data.js` as the canonical source for scenarios / themes / scores. Never hand-edit numbers in individual pages.
- Every theme code (`T1a`, `T2b`, etc.) in the UI should have a `data-tip` tooltip via `WG3.themeTip()` — audience won't know the codes by heart.
- The landing page's CTA always points to `framework.html`. That's the artifact we want people to engage with first.
- Label anything in-progress as "Draft / provisional" so reviewers don't mistake straw-man scores for consensus.

## What's intentionally missing

- No build tooling, bundlers, or frameworks. Static HTML is the point: anyone can read it, edit it, and deploy it.
- No analytics or tracking.
- No server-side anything.
- No localStorage / cookies.

## Next likely additions

- Comments / annotations per scenario (could use GitHub Discussions + a lightweight widget like `giscus`).
- Embedded Google Doc links per resource section as the Drive fills in.
- Conference-day view: breakout schedule, facilitation prompts, live links.
- Export: "download current data.js as XLSX" button for anyone who wants the matrix offline.
