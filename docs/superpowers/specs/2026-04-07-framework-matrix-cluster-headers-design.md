# Framework matrix — cluster-grouped column headers

**Date:** 2026-04-07
**Status:** Approved (visual mockup approved in brainstorming session)
**Scope:** `framework.html` matrix only
**Author:** Matt Trowbridge (approved) · draft by Claude

## Problem

The framework page (`framework.html`) renders a scenarios × themes matrix with ten subtheme columns labeled `T1a T1b T2a T2b T2c T3a T3b T3c T3d T4`. On first view, the reader has no way to tell that `T1a`/`T1b` belong to the "Communicating" cluster, `T2a`/`T2b`/`T2c` to "Use cases", `T3a`–`T3d` to "Interaction", and `T4` to "Medico-legal". Decoding a column requires hovering for the tooltip or scrolling back to the theme legend strip above the matrix. This makes the matrix hard to scan and hides the four-theme mental model that the whole framework is built on.

## Goal

Make the four parent clusters visually obvious at a glance without losing the existing T-code shorthand that WG3 members will use during discussion ("let's look at T2b on scenario 4").

## Design

Add a **cluster header row** above the existing code row, and restyle the code row so each subtheme column shows both its T-code *and* a short human-readable label. Apply a cluster-colored band through both header rows and insert a vertical divider between clusters.

### Visual treatment

**Cluster header row** (new, above the T-code row):
- `Communicating` spans T1a, T1b (colspan=2)
- `Use cases` spans T2a, T2b, T2c (colspan=3)
- `Interaction` spans T3a, T3b, T3c, T3d (colspan=4)
- `Medico-legal` spans T4 (colspan=1)
- Text: 11px, uppercase, letter-spacing 0.06em, weight 700, **centered**
- Each cluster gets a strong-tint background and a matching cluster-colored foreground
- 2px colored bottom border reinforces the cluster-to-code-row transition

**Code row** (existing, restyled):
- Each `<th>` contains two stacked spans:
  - `.code` — T-code in ui-monospace, 11px, weight 700, color `#1f3864` (dark navy)
  - `.lbl` — short 1–2 word label, -apple-system, 10.5px, weight 600, color `#0f172a` (ink)
- Each cell gets the **pale** variant of its cluster color as background
- `min-width: 62px` per column to fit the short labels without wrapping in most cases
- Centered text

**Vertical dividers:**
- The first column of each cluster (T2a, T3a, T4) gets `border-left: 2px solid #94a3b8`
- This divider runs top-to-bottom through both header rows and all body rows

**Corner cells** (`#`, `Scenario`) get `rowspan="2"` to span both header rows. They retain the current dark-navy treatment.

### Cluster colors

| Cluster | Strong band (header row) | Pale band (code row) | Border / text |
|---|---|---|---|
| Communicating | `#e9d5ff` | `#f5f3ff` | border `#8b5cf6`, text `#581c87` |
| Use cases | `#a7f3d0` | `#ecfdf5` | border `#10b981`, text `#064e3b` |
| Interaction | `#fde68a` | `#fffbeb` | border `#f59e0b`, text `#78350f` |
| Medico-legal | `#fecaca` | `#fef2f2` | border `#ef4444`, text `#7f1d1d` |

Score cells keep the existing blue scale (`.s0`–`.s3`). No change to the coloring that encodes the 0–3 score.

### Short labels

| Code | Full theme name (from `data.js`) | Short label |
|---|---|---|
| T1a | Documentation of AI | Documenting |
| T1b | Risks/benefits with patients | Patient talk |
| T2a | When AI is beneficial | When useful |
| T2b | Limitations & weaknesses | Limitations |
| T2c | Under-the-hood mechanisms | Mechanism |
| T3a | Workflow & gestalt synthesis | Gestalt use |
| T3b | Iterative improvement | Feedback loop |
| T3c | Evaluating evidence/output | Appraising output |
| T3d | Prompt engineering | Prompting |
| T4 | Medico-legal risk & governance | Governance |

Short labels are stored as a new field `short` on each theme object in `assets/data.js`, added to all ten leaf subtheme entries (T1a, T1b, T2a, T2b, T2c, T3a, T3b, T3c, T3d, T4). The parent `T1`/`T2`/`T3` entries do not need the field. Adding a field is non-breaking; the legend strip and theme page continue to work without modification.

## Implementation notes

- **CSS specificity gotcha:** The existing `.matrix-wrap` CSS in `assets/site.css` has rules like `table.matrix th{...text-align:left}`. New cluster-header classes must be prefixed (e.g., `table.matrix th.c-comm-hd`) to beat that specificity. Learned this during the mockup iteration.
- **Tooltip compatibility:** The existing `data-tip` hover-for-full-definition behavior on T-codes must still work. The tooltip goes on the `.code` span, not the whole cell.
- **Rotation removal:** The current CSS rotates the T-code headers vertically (`writing-mode: vertical-rl; transform: rotate(180deg)`). That needs to be removed for the code+label cells, since the label must read horizontally.
- **`matrixThemes` array** in `data.js` stays unchanged — still drives which subthemes appear as columns and in what order.
- **Render function:** `renderMatrix()` in `assets/site.js` needs to emit the new two-row `<thead>` structure. The scenario rows in `<tbody>` do not change except for picking up the three new `div-left` classes on T2a, T3a, and T4 cells.
- **Mobile:** The matrix already sits in an `overflow:auto` wrapper. Adding the cluster header row and wider cells will make the table slightly wider; horizontal scroll is fine and already the expected behavior on narrow viewports.

## Acceptance criteria

1. The framework page matrix shows four labeled cluster bands across the top: Communicating, Use cases, Interaction, Medico-legal.
2. Each cluster name is **centered** across its spanned subtheme columns.
3. Each T-code cell below shows both the T-code and a short 1–2 word label, both readable (dark text on pale cluster background).
4. Vertical dividers (2px slate) separate clusters top-to-bottom.
5. Score cells remain the existing blue scale. No regression in the 0–3 visual encoding.
6. Hover tooltips on the T-codes still display the full theme definition.
7. Click-to-open scenario detail modal still works on body rows.
8. `data.js` gains a `short` field on each theme object. Existing code that reads `themes[i].code`, `.name`, `.def`, `.cluster` continues to work unchanged.
9. No visual regression on the index, themes, scenarios, resources, or people pages (they don't share the matrix CSS but the legend strip renderer uses `.theme-legend` classes which this change does not touch).

## Out of scope (explicit)

- Updating `themes.html` page to show clusters visually. (Can follow in a later change if Matt wants.)
- Updating the theme legend strip above the matrix (`renderThemeLegend`). (Same.)
- Any changes to the theme taxonomy itself or the score values.
- Mobile-specific layout (horizontal scroll is the accepted behavior).
- A collapse/expand toggle to switch between cluster view and subtheme view.

## Open questions

None. All design decisions captured above.

## Reference mockup

Visual treatment was iterated in a local brainstorming session (not committed) with four options presented — plain grouped header, grouped header + color bands, grouped header + short labels, and labels-only without T-codes. Matt selected the third option (grouped header + color bands + T-codes with short labels) and requested that cluster headers be centered across their spanned columns. This spec captures that final approved treatment.
