# WG3 Working Site — Claude Instructions

## What this is

A static collaboration site for **Working Group 3 (AI Education, Training & Competency Development)** of the **2026 SAEM AI Consensus Conference** (May 21, 2026, Atlanta). The site is the planning group's working surface and the staging ground for the straw-man scenarios x themes framework that WG3 will refine into consensus.

The conference is funded by an **AHRQ R13** grant titled "Artificial Intelligence and Emergency Medicine: Technology, Training, Self, and Society", awarded to **Andrew Taylor (UVA)** and **Jeremiah Hinson (Johns Hopkins)**. WG3 owns **Aim 3** of the grant: a structured educational needs assessment producing identified competency gaps and an educational roadmap, feeding into an AEM Education & Training manuscript.

## Who's involved

- **WG3 co-leads:** Carl Preiksaitis, MD (Stanford EM); Christian Rose, MD (Stanford EM)
- **Preliminary organizing lead:** Matt Trowbridge, MD, MPH (UVA EM) — site owner
- **Conference R13 PIs:** R. Andrew Taylor, MD, MHS (UVA); Jeremiah Hinson, MD (Johns Hopkins)
- **Prior work anchor:** Michael Makutonin, MD — author of the 2025 nominal group themes that anchor WG3's starting framework

## Site URLs

- **Live site:** https://matthewtrowbridge.github.io/wg3-saem-ai-consensus/
- **Repo:** https://github.com/matthewtrowbridge/wg3-saem-ai-consensus (public)
- **Deploy:** push to `main`, GitHub Pages rebuilds in ~30-90 seconds

## Locked technical decisions

These are deliberate. Do not change without explicit confirmation:

- **Static HTML, no build step.** No bundlers, no frameworks, no transpilation. Anyone can read, edit, and deploy.
- **Single source of truth:** `assets/data.js` holds all themes, scenarios, gaps, and scores. Pages render from it. Never hand-edit numbers in individual HTML files.
- **GitHub Pages on `main` / root.** Deploy is `git push`. The `deploy.sh` script handles the initial setup.
- **Public repo.** Decision was deliberate to allow easy GitHub web UI editing for collaborators. May transfer to a SAEM org later if the group decides to.
- **No analytics, no tracking, no cookies, no localStorage, no server-side anything.**
- **No external JS dependencies.** Plain vanilla HTML/CSS/JS only.

## Page inventory

| File | Purpose | Data source |
|---|---|---|
| `index.html` | Landing page: conference context, WG3 charge, CTA to framework | static |
| `grant.html` | AHRQ R13 grant overview, three aims, WG3's role | static |
| `framework.html` | Interactive scenarios x themes matrix (the main artifact) | `data.js` |
| `themes.html` | Full theme definitions and candidate gap themes | `data.js` |
| `scenarios.html` | Browsable scenarios, filterable by theme | `data.js` |
| `resources.html` | Consolidated links (Slack, Drive, lit, grant, open threads) | static |
| `people.html` | Living roster: leadership, planning committee, recruitment status | static |

`assets/`:
- `data.js` — single source of truth (themes, scenarios, gaps, scores)
- `site.css` — shared styles
- `site.js` — shared helpers (legend, matrix render, detail modal, tooltips)

## Editorial conventions

- **Update `data.js`, not individual pages.** Theme codes, scenario wording, and scores all live there.
- **Tooltips on theme codes.** Every `T1a`, `T2b`, etc. in the UI must have a `data-tip` tooltip via `WG3.themeTip()`. The audience does not know the codes by heart.
- **Landing page CTA always points to `framework.html`.** That's the artifact we want people to engage with first.
- **Label in-progress content as "Draft / provisional"** so reviewers don't mistake straw-man scores for consensus.
- **Open external links in new tabs:** `target="_blank" rel="noopener"`.
- **Avoid em dashes in prose.** Use commas, periods, or semicolons. (House style.)

## Workflow for changes

1. Edit content (`data.js` for matrix data, individual HTML for structural changes).
2. Verify locally if useful: `python3 -m http.server 8080` then open http://localhost:8080.
3. `git add <file> && git commit -m "..." && git push`.
4. Pages rebuilds in 30-90 seconds.
5. Update `CHANGELOG.md` for non-trivial changes (content adds, structural changes, new pages).

For the commit author, the deploy script and prior commits use:
- `user.name="Matt Trowbridge"`
- `user.email="trowbridge.business@gmail.com"`

## Things to ask before doing

- Renaming files (breaks bookmarks and external links)
- Adding new top-level pages (touches every nav bar)
- Changing the public/private status of the repo
- Adding any external dependency (CDN script, font, analytics)
- Changing the deploy target away from GitHub Pages
- Touching `data.js` scores without confirming the source (these are straw-man until WG3 ratifies)

## Source material copy policy

The `docs/source-materials/` folder holds durable copies of the source documents that the site draws on, so that a clone, fork, or future org migration carries the supporting material with it — not just the rendered HTML. Because this repo is public, the policy is:

- **Safe to copy without asking:**
  - Anything Matt Trowbridge authored from scratch (evidence brief summaries, synthesis docs, landscape writeups, meeting notes that are Matt's alone).
  - Public links — just link, don't transcribe or mirror paywalled content.
- **Ask the author first, in writing, before committing:**
  - Andrew Taylor's AHRQ R13 grant materials (aims, project summary, conference plan narrative, any section derived from the original grant). Budget and any pre-publication sections are excluded regardless of other permissions.
  - Michael Makutonin's 2025 nominal group work (Google Doc content, Slack notes, prior drafts).
  - Anything that quotes another working group member candidly, or that names individuals in a way they haven't consented to publicly.
- **Never commit:**
  - Third-party copyrighted PDFs (published papers behind paywalls) — link to PubMed, publisher pages, or preprint servers instead.
  - Slack exports that contain identifying detail beyond what's already on the public site.
  - AHRQ R13 budget or any personnel cost detail.

When in doubt, default to linking rather than copying, and default to asking rather than assuming consent.

## Parent context

This folder lives inside `01 - Working Group Documents/` under the broader SAEM AI Consensus 2026 project. Sibling folders that may be relevant when iterating on the site:

- `02 - Member Recruitment/` — `Candidate Tracker.md`, `Candidate_Profiles.md` (referenced from `people.html`)
- Other working group folders (WG1, WG2, WG4, WG5) — each owns a different aim
- AHRQ R13 grant materials at the conference root

When in doubt, check the parent SAEM consensus folder for canonical source documents before modifying anything on the site.

## Working with Claude in this folder

1. Read this file and `README.md` first.
2. For content changes, check `data.js` to see what's already canonical vs. straw-man.
3. For copy changes, mirror the existing voice: declarative, concise, no hedging, no em dashes.
4. For structural changes, update every page's nav bar consistently and update the page inventory in this file.
5. After non-trivial changes, add a `CHANGELOG.md` entry in the same commit.
