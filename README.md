# WG3 Working Site

A small static site for the SAEM AI Consensus 2026 Working Group 3 (AI Education, Training & Competency Development). Built as a collaboration surface for the planning group and as a staging ground for the straw-man scenarios × themes framework.

## Structure

```
WG3_Website/
├── index.html          Landing page — conference context, WG3 charge, timeline
├── framework.html      Interactive scenarios × themes matrix (the main artifact)
├── themes.html         Full theme definitions + candidate gap themes
├── scenarios.html      Browsable scenarios, filterable by theme
├── resources.html      Consolidated links (Slack, Drive, lit, grant, open threads)
├── people.html         Living roster
├── assets/
│   ├── site.css        Shared styles
│   ├── site.js         Shared helpers (legend, matrix, detail modal)
│   └── data.js         Single source of truth for themes / scenarios / gaps
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

## Recommended deployment: GitHub Pages

GitHub Pages fits this collaboration well: free, version-controlled, reviewable, reversible, and sophisticated collaborators can edit pages directly in the GitHub web UI.

**Setup (one time, ~5 minutes):**

1. Create a new GitHub repo. Private is fine — Pages works on private repos with a paid plan, or make it public if we're comfortable showing the draft.
2. Push the contents of this folder to the repo:
   ```
   git init
   git add .
   git commit -m "Initial WG3 working site"
   git branch -M main
   git remote add origin https://github.com/<org>/wg3-site.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source → Deploy from a branch → main / (root)**.
4. URL will be `https://<org>.github.io/wg3-site/` within ~1 minute.
5. Optional: add a custom domain (`wg3.saem-consensus.org` etc.) via Pages settings.

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
