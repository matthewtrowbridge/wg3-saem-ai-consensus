# Framework Matrix Cluster-Grouped Column Headers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the `framework.html` scenarios × themes matrix so the ten subtheme columns sit under four clearly-labeled cluster headers (Communicating, Use cases, Interaction, Medico-legal), with short human-readable labels under each T-code and cluster-colored tint bands running through the header.

**Architecture:** Pure static-site change. Data in `assets/data.js` gains a `short` field on leaf subtheme entries. `renderMatrix()` in `assets/site.js` is rewritten to emit a two-row `<thead>` with `rowspan`/`colspan`-based cluster grouping. New CSS rules in `assets/site.css` style the cluster bands and sub cells; one dead CSS block is removed. No build step; changes are visible on `git push` after GitHub Pages rebuilds.

**Tech Stack:** Plain HTML/CSS/vanilla JavaScript. No test framework — verification is manual browser inspection.

**Spec:** `docs/superpowers/specs/2026-04-07-framework-matrix-cluster-headers-design.md`

---

## File structure

Three files change, plus the changelog:

- **Modify** `assets/data.js` — add `short` field to each of ten leaf subtheme entries (T1a, T1b, T2a, T2b, T2c, T3a, T3b, T3c, T3d, T4)
- **Modify** `assets/site.css` — drop dead `th.theme` rotation rule, drop `position:sticky` from `thead th`, add cluster-header and sub-cell style block
- **Modify** `assets/site.js` — rewrite `renderMatrix()` to emit two-row `<thead>` with cluster grouping and add `div-left` class to cluster-boundary cells in body rows
- **Modify** `CHANGELOG.md` — new entry
- **No changes** to `framework.html`, `themes.html`, `index.html`, `people.html`, `grant.html`, `resources.html`, `scenarios.html`, or `assets/data.js` theme parent entries (T1, T2, T3)

### Why these files in this order

Data first (Task 1) so the renderer has something to read. CSS next (Task 2) so the new markup lands in a styled page. JS last (Task 3) — this is the change that actually flips the visual. Verify (Task 4), changelog (Task 5), commit (Task 6). Any single earlier task is non-disruptive on its own: data.js gains an unused field, CSS gains unused selectors, and the JS rewrite then consumes both.

---

## Task 1: Add `short` field to leaf subtheme entries in `data.js`

**Files:**
- Modify: `assets/data.js` (lines 4–30, the ten leaf `{code:"T1a"...}`, `{code:"T1b"...}`, etc. entries)

- [ ] **Step 1: Open `assets/data.js` and locate the ten leaf theme entries**

Each leaf has `code` of the form `T1a`, `T1b`, `T2a`, `T2b`, `T2c`, `T3a`, `T3b`, `T3c`, `T3d`, or `T4`. The three parent entries `T1`, `T2`, `T3` are NOT modified — they do not appear in the matrix columns.

- [ ] **Step 2: Add `short` field to each leaf entry**

For each of the ten entries below, add `short:"<label>"` between the `cluster` field and the `def` field. Final shape of each entry:

```js
{code:"T1a", name:"Documentation of AI", cluster:"Communicating", short:"Documenting",
 def:"How and when to document AI involvement in a patient encounter — what to attest to, what to disclose, what the note should make legible to future clinicians and auditors."},
{code:"T1b", name:"Risks/benefits with patients", cluster:"Communicating", short:"Patient talk",
 def:"Explaining AI's role, limitations, and benefits to patients, families, and consulting colleagues during real encounters."},

{code:"T2a", name:"When AI is beneficial", cluster:"Use cases", short:"When useful",
 def:"Recognizing the clinical situations, populations, and workflows where a given AI tool adds value."},
{code:"T2b", name:"Limitations & weaknesses", cluster:"Use cases", short:"Limitations",
 def:"Understanding failure modes — distribution shift, training-data bias, known blind spots, false positives/negatives — and anticipating them at the point of care."},
{code:"T2c", name:"Under-the-hood mechanisms", cluster:"Use cases", short:"Mechanism",
 def:"Enough conceptual understanding of how the model was built (data, task, outputs, calibration) to reason about when to trust it."},

{code:"T3a", name:"Workflow & gestalt synthesis", cluster:"Interaction", short:"Gestalt use",
 def:"Integrating AI output into clinical gestalt and workflow without losing situational awareness or over-anchoring."},
{code:"T3b", name:"Iterative improvement", cluster:"Interaction", short:"Feedback loop",
 def:"Giving feedback to tools, reporting failures, and contributing to post-deployment monitoring loops."},
{code:"T3c", name:"Evaluating evidence/output", cluster:"Interaction", short:"Appraising output",
 def:"Critically appraising AI output against the evidence base, the patient in front of you, and the local validation data."},
{code:"T3d", name:"Prompt engineering", cluster:"Interaction", short:"Prompting",
 def:"For generative tools, crafting inputs that produce reliable, clinically usable output."},

{code:"T4",  name:"Medico-legal risk & governance", cluster:"Medico-legal", short:"Governance",
 def:"Liability, consent, governance, and the regulatory surface around using AI in patient care."}
```

The parent entries (T1, T2, T3) and the `matrixThemes` array below them stay exactly as they are. `scenarios`, `gaps`, and the `themeTip` helper are unchanged.

- [ ] **Step 3: Verify the file still parses**

Open `framework.html` in a browser. The legend strip at the top should still render with all ten codes and their full names. If the legend is blank or the browser shows a JS error in the console, there's a syntax error in the object literal — check for missing commas.

Expected: legend renders as before; no console errors.

- [ ] **Step 4: No commit yet**

We'll batch all changes into one commit at the end of Task 6.

---

## Task 2: Add cluster-header styles and drop dead rules in `site.css`

**Files:**
- Modify: `assets/site.css` (the `/* matrix */` block, lines ~115–128 in the current file)

- [ ] **Step 1: Locate the existing matrix block in `site.css`**

Find the section that starts with the comment `/* matrix */`. The relevant rules are:

```css
.matrix-wrap{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:0;overflow:auto;box-shadow:var(--shadow)}
table.matrix{border-collapse:collapse;width:100%;font-size:12px}
table.matrix th,table.matrix td{border:1px solid var(--line);padding:8px;text-align:left;vertical-align:middle}
table.matrix thead th{background:#1f3864;color:#fff;font-weight:600;position:sticky;top:0}
table.matrix th.theme{writing-mode:vertical-rl;transform:rotate(180deg);min-width:34px;text-align:center;padding:10px 4px}
table.matrix td.score{text-align:center;font-weight:600;cursor:pointer;width:36px}
```

- [ ] **Step 2: Replace two existing rules and delete one**

Drop `position:sticky;top:0` from the `thead th` rule (sticky breaks with our new two-row header and the matrix is short enough that it's not needed), and delete the dead `th.theme` rotation rule (the new header cells use class `sub`, not `theme`). In `assets/site.css`, replace:

```css
table.matrix thead th{background:#1f3864;color:#fff;font-weight:600;position:sticky;top:0}
table.matrix th.theme{writing-mode:vertical-rl;transform:rotate(180deg);min-width:34px;text-align:center;padding:10px 4px}
```

with:

```css
table.matrix thead th{background:#1f3864;color:#fff;font-weight:600}
table.matrix th.corner{background:#1f3864;color:#fff;text-align:center}

/* Cluster header row — strong tint, cluster-colored text, centered across spanned subthemes */
table.matrix th.c-comm-hd{background:#e9d5ff;color:#581c87;border-bottom:2px solid #8b5cf6;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:700;padding:8px 4px}
table.matrix th.c-use-hd{background:#a7f3d0;color:#064e3b;border-bottom:2px solid #10b981;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:700;padding:8px 4px}
table.matrix th.c-int-hd{background:#fde68a;color:#78350f;border-bottom:2px solid #f59e0b;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:700;padding:8px 4px}
table.matrix th.c-med-hd{background:#fecaca;color:#7f1d1d;border-bottom:2px solid #ef4444;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:700;padding:8px 4px}

/* Sub row — T-code + short label cells, pale cluster backgrounds */
table.matrix th.sub{min-width:62px;text-align:center;padding:6px 4px 7px}
table.matrix th.sub.c-comm-sub{background:#f5f3ff}
table.matrix th.sub.c-use-sub{background:#ecfdf5}
table.matrix th.sub.c-int-sub{background:#fffbeb}
table.matrix th.sub.c-med-sub{background:#fef2f2}
table.matrix th.sub .code{display:block;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;font-weight:700;color:#1f3864;letter-spacing:.02em}
table.matrix th.sub .lbl{display:block;font-family:-apple-system,system-ui,sans-serif;font-size:10.5px;font-weight:600;color:#0f172a;margin-top:2px;line-height:1.2;text-transform:none;letter-spacing:0;white-space:normal}

/* Vertical divider between clusters (applies to thead and tbody cells) */
table.matrix th.div-left,table.matrix td.div-left{border-left:2px solid #94a3b8}
```

Leave every other rule in the `/* matrix */` block untouched (`.matrix-wrap`, `table.matrix`, `th,td` base rule, `td.score`, `.s0`–`.s3` score colors, `tr.row` hover rules).

- [ ] **Step 3: Specificity sanity check**

The base rule `table.matrix th,table.matrix td{...text-align:left}` has specificity `(0,1,2)` (one class + two elements). Each new cluster-header rule like `table.matrix th.c-comm-hd` has specificity `(0,2,2)` (two classes + two elements) and therefore wins — the cluster name will actually center. This bug was caught during mockup iteration and is the reason every new rule is prefixed with `table.matrix th.`.

- [ ] **Step 4: Visual smoke check**

Refresh `framework.html` in a browser. At this point the matrix will look *broken* — the old header markup from `renderMatrix()` is still emitting `<th class="theme">` cells that no longer have a rotation rule, so the T-codes will now read horizontally in a narrow column. This is expected interim state and will be fixed in Task 3. Confirm that (a) the legend strip above still renders normally and (b) no console errors appear. Anything more than a crowded/ugly header is a real bug.

Expected: legend strip unchanged; matrix header briefly ugly; no console errors.

- [ ] **Step 5: No commit yet**

---

## Task 3: Rewrite `renderMatrix()` in `site.js` to emit two-row thead with cluster grouping

**Files:**
- Modify: `assets/site.js` (the `window.renderMatrix = function(sel){...}` block)

- [ ] **Step 1: Locate the current `renderMatrix` function**

In `assets/site.js` it looks like this:

```js
 // Build the matrix table
 window.renderMatrix = function(sel){
  const el = document.querySelector(sel); if(!el) return;
  const gapByS = {};
  WG3.gaps.forEach(g=>g.scenarios.forEach(s=>(gapByS[s]=gapByS[s]||[]).push(g.name)));
  let h = '<table class="matrix"><thead><tr><th>#</th><th>Scenario</th>';
  WG3.matrixThemes.forEach(code=>{
   h += `<th class="theme"><span data-tip="${esc(WG3.themeTip(code))}">${code}</span></th>`;
  });
  h += '<th>Σ</th><th>Gap?</th></tr></thead><tbody>';
  WG3.scenarios.forEach(s=>{
   const sum = s.scores.reduce((a,b)=>a+b,0);
   h += `<tr class="row" onclick="showScenarioDetail(${s.id})"><td>${s.id}</td><td><b>${s.name}</b><br><small style="color:#64748b">${s.vig}</small></td>`;
   s.scores.forEach((v,i)=>{
    h += `<td class="score s${v}" data-tip="${esc(WG3.themeTip(WG3.matrixThemes[i]))}">${v||''}</td>`;
   });
   const g = (gapByS[s.id]||[]).map(x=>`<span class="chip gap" data-tip="${esc(x)}">gap</span>`).join('');
   h += `<td><b>${sum}</b></td><td>${g}</td></tr>`;
  });
  h += '</tbody></table>';
  el.innerHTML = h;
 };
```

- [ ] **Step 2: Replace with the new implementation**

Paste the following in its place (the comment header stays):

```js
 // Build the matrix table
 window.renderMatrix = function(sel){
  const el = document.querySelector(sel); if(!el) return;
  const gapByS = {};
  WG3.gaps.forEach(g=>g.scenarios.forEach(s=>(gapByS[s]=gapByS[s]||[]).push(g.name)));

  // Cluster name -> short CSS key used in class names (c-comm-hd, c-use-sub, etc.)
  const clusterKey = {
   "Communicating":"comm",
   "Use cases":"use",
   "Interaction":"int",
   "Medico-legal":"med"
  };

  // Walk matrixThemes once to build (a) cluster header groups for the top row
  // and (b) the set of column indices that begin a new cluster (for div-left).
  const groups = []; // [{name, key, count}, ...]
  const firstInCluster = new Set();
  let prevCluster = null;
  WG3.matrixThemes.forEach((code,i)=>{
   const t = WG3.themes.find(x=>x.code===code);
   if(t.cluster !== prevCluster){
    groups.push({name:t.cluster, key:clusterKey[t.cluster], count:1});
    firstInCluster.add(i);
    prevCluster = t.cluster;
   } else {
    groups[groups.length-1].count++;
   }
  });

  // THEAD — two rows. Row 1: corners with rowspan=2, cluster names with colspan.
  let h = '<table class="matrix"><thead><tr>';
  h += '<th rowspan="2" class="corner">#</th>';
  h += '<th rowspan="2" class="corner">Scenario</th>';
  groups.forEach(g=>{
   h += `<th colspan="${g.count}" class="c-${g.key}-hd">${g.name}</th>`;
  });
  h += '<th rowspan="2" class="corner">Σ</th>';
  h += '<th rowspan="2" class="corner">Gap?</th>';
  h += '</tr><tr>';

  // Row 2: sub-theme cells with T-code + short label, pale cluster background
  WG3.matrixThemes.forEach((code,i)=>{
   const t = WG3.themes.find(x=>x.code===code);
   const key = clusterKey[t.cluster];
   const divL = (i>0 && firstInCluster.has(i)) ? ' div-left' : '';
   h += `<th class="sub c-${key}-sub${divL}">`;
   h += `<span class="code" data-tip="${esc(WG3.themeTip(code))}">${code}</span>`;
   h += `<span class="lbl">${esc(t.short||'')}</span>`;
   h += '</th>';
  });
  h += '</tr></thead><tbody>';

  // TBODY — score cells pick up the same div-left on cluster boundaries
  WG3.scenarios.forEach(s=>{
   const sum = s.scores.reduce((a,b)=>a+b,0);
   h += `<tr class="row" onclick="showScenarioDetail(${s.id})"><td>${s.id}</td><td><b>${s.name}</b><br><small style="color:#64748b">${s.vig}</small></td>`;
   s.scores.forEach((v,i)=>{
    const divL = (i>0 && firstInCluster.has(i)) ? ' div-left' : '';
    h += `<td class="score s${v}${divL}" data-tip="${esc(WG3.themeTip(WG3.matrixThemes[i]))}">${v||''}</td>`;
   });
   const g = (gapByS[s.id]||[]).map(x=>`<span class="chip gap" data-tip="${esc(x)}">gap</span>`).join('');
   h += `<td><b>${sum}</b></td><td>${g}</td></tr>`;
  });
  h += '</tbody></table>';
  el.innerHTML = h;
 };
```

Key differences from the original:
- Two-row `<thead>` with `rowspan="2"` on the four corner cells (`#`, `Scenario`, `Σ`, `Gap?`) and `colspan` on cluster header cells.
- Each subtheme cell is now `<th class="sub c-{key}-sub">` with `.code` and `.lbl` spans inside, instead of `<th class="theme"><span>CODE</span></th>`.
- Tooltip (`data-tip`) moves from the old single span to the new `.code` span — so hover-for-definition still works on the T-code.
- Cluster-boundary indices (T2a, T3a, T4 → indices 2, 5, 9) pick up the `div-left` class on both the header `<th>` and the body `<td>` cells. Derived from `firstInCluster`, not hardcoded — so if `matrixThemes` or the cluster assignments in `data.js` change, the dividers follow automatically.

Everything else (`el`, `gapByS`, the `<tbody>` scenario iteration, the onclick handler, the sum `<td>`, the gap chips) is byte-identical to the original.

- [ ] **Step 3: Hard refresh the framework page**

In the browser, hard-refresh `framework.html` (Shift+Cmd+R on macOS). You should now see:
1. A row of four cluster bands across the top — "Communicating" (light purple), "Use cases" (mint), "Interaction" (cream), "Medico-legal" (rose) — each centered across its columns.
2. Underneath each, the T-code (dark navy, monospace) with a short label below it (ink, normal weight).
3. Vertical slate dividers between the four clusters, running top-to-bottom through the whole table.
4. Score cells in the body rows unchanged in color (`.s0`–`.s3`).

Expected: matches the approved mockup from the brainstorming session.

- [ ] **Step 4: Check tooltip and click behaviors still work**

- Hover any T-code (e.g., `T2b`) — the full theme definition should pop up as a tooltip (from the existing `[data-tip]` CSS).
- Click any scenario row — the "Theme mapping" modal should open, same as before.

Both were preserved intentionally in the rewrite; if either is broken, the tooltip must be on the `.code` span and the row `onclick` must still be on the `<tr class="row">` element.

Expected: tooltip appears on T-code hover; modal opens on row click.

- [ ] **Step 5: No commit yet**

---

## Task 4: Manual browser verification against spec acceptance criteria

**Files:**
- None (read-only inspection)

- [ ] **Step 1: Walk through the spec's acceptance criteria**

Open `framework.html` and verify each of the nine criteria from the spec (`docs/superpowers/specs/2026-04-07-framework-matrix-cluster-headers-design.md`, section "Acceptance criteria"):

1. Four labeled cluster bands across the top: Communicating, Use cases, Interaction, Medico-legal. ✓/✗
2. Each cluster name is **centered** across its spanned subtheme columns. ✓/✗
3. Each T-code cell below shows both the T-code and a short 1–2 word label, both readable (dark text on pale cluster background). ✓/✗
4. Vertical dividers (2px slate) separate clusters top-to-bottom. ✓/✗
5. Score cells remain the existing blue scale. ✓/✗
6. Hover tooltips on the T-codes still display the full theme definition. ✓/✗
7. Click-to-open scenario detail modal still works on body rows. ✓/✗
8. `data.js` gains a `short` field on each of the ten leaf theme objects. Existing code reading `themes[i].code`, `.name`, `.def`, `.cluster` continues to work unchanged. ✓/✗
9. No visual regression on the index, themes, scenarios, resources, or people pages. Click each nav link and confirm each page renders without console errors. ✓/✗

Any ✗ goes back to the corresponding task (CSS → Task 2, JS → Task 3, data → Task 1) and is re-fixed before moving on.

- [ ] **Step 2: Check the theme legend strip above the matrix**

The legend strip (`renderThemeLegend`) was explicitly out of scope for the color/cluster-header treatment, but it reads from `WG3.themes`. Since Task 1 only *adds* a field (`short`), the legend should render identically. Confirm visually.

Expected: legend strip looks exactly like it did before.

- [ ] **Step 3: Narrow-viewport check**

Resize the browser window to ~800px wide. The matrix should become horizontally scrollable inside the `.matrix-wrap` container (existing `overflow:auto`). The cluster header row should scroll horizontally in step with the body — no visual tearing.

Expected: clean horizontal scroll; cluster bands stay aligned with their subtheme columns.

---

## Task 5: Update `CHANGELOG.md`

**Files:**
- Modify: `CHANGELOG.md` (add one entry at the top of the `## 2026-04-07` section)

- [ ] **Step 1: Open `CHANGELOG.md` and find the `## 2026-04-07` heading**

Add the new bullet as the **first** bullet under that heading (most-recent-first ordering). Do not create a new date section — this change ships the same day as the spec.

- [ ] **Step 2: Add the entry**

Insert this bullet as the first item under `## 2026-04-07`:

```markdown
- Reworked the framework matrix column headers. Added a cluster-grouped header row above the existing T-codes (Communicating · Use cases · Interaction · Medico-legal), with each cluster name centered across its spanned subtheme columns and tinted with a distinct pale cluster color (purple / mint / cream / rose). Added short 1–2 word labels under each T-code (e.g., T2b → "Limitations", T3c → "Appraising output"), a 2px slate divider between clusters running top-to-bottom, and a `short` field on each leaf subtheme in `data.js`. Dropped the dead `th.theme` rotation rule and `position:sticky` from `thead th` (incompatible with two-row header and not needed on a 14-row matrix). Design spec in `docs/superpowers/specs/2026-04-07-framework-matrix-cluster-headers-design.md`.
```

- [ ] **Step 3: No commit yet**

---

## Task 6: Commit and push all changes in a single commit

**Files:**
- All files modified in Tasks 1–5: `assets/data.js`, `assets/site.css`, `assets/site.js`, `CHANGELOG.md`

- [ ] **Step 1: Review the working tree**

```bash
cd "01 - Working Group Documents/WG3_Website" && git status && git diff --stat
```

Expected output: `modified: assets/data.js`, `modified: assets/site.css`, `modified: assets/site.js`, `modified: CHANGELOG.md`. Nothing else. If other files are listed, something unrelated snuck in — stop and investigate.

- [ ] **Step 2: Stage only the four files and commit**

```bash
git add assets/data.js assets/site.css assets/site.js CHANGELOG.md
git commit -m "$(cat <<'EOF'
Framework matrix: cluster-grouped column headers

Add a cluster header row above the existing T-code row with
centered, tinted cluster bands (Communicating, Use cases,
Interaction, Medico-legal), short human-readable labels under
each T-code, and 2px slate dividers between clusters. Restyled
subtheme cells read horizontally with dark text on pale cluster
backgrounds.

Drops the dead th.theme vertical rotation rule and the sticky
header (incompatible with the new two-row thead, and the matrix
is short enough that it isn't needed).

Design spec: docs/superpowers/specs/2026-04-07-framework-matrix-cluster-headers-design.md
EOF
)"
```

- [ ] **Step 3: Push**

```bash
git push
```

GitHub Pages rebuilds in 30–90 seconds. After that, hard-refresh https://matthewtrowbridge.github.io/wg3-saem-ai-consensus/framework.html and confirm the deployed version matches the local version.

Expected: single new commit on `main`; deployed site shows the cluster-grouped matrix header.

- [ ] **Step 4: Done**

Implementation complete. If any acceptance criterion failed on deploy that passed locally, that's almost certainly a stale browser cache — hard-refresh again.

---

## Notes

- **No test framework exists in this project.** Verification is manual browser inspection against the spec's acceptance criteria. This is appropriate for a small, purely-visual static-site change where the source of truth is "does it match the approved mockup."
- **No `framework.html` changes.** The page template is untouched; all the visual change flows from `renderMatrix()` emitting new markup and CSS styling it.
- **`matrixThemes` array is untouched.** It still lists the ten leaf codes in the same order. The cluster grouping is *derived* from each leaf's `cluster` field, not hardcoded in the renderer — so if the theme taxonomy is later reorganized in `data.js`, the renderer will still group correctly as long as the `clusterKey` lookup table (four entries) stays in sync with the cluster names.
- **Sticky headers were removed deliberately.** The cleanest way to sticky a two-row header requires magic numbers for the first-row height or duplicating the corner cells across both rows. Neither is worth the complexity on a 14-row matrix. If it becomes a problem later, the fix is adding one CSS rule scoped to `thead tr:first-child th`.
