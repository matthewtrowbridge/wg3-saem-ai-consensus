# Changelog

Running log of changes to the WG3 working site. Add an entry for any non-trivial change (content addition, structural change, new page, copy revision).

Format: most recent first. Each entry: `YYYY-MM-DD — short description (commit hash if applicable).`

## 2026-04-07

- Pre-share refinements before sending repo link to WG3 colleagues. `people.html`: added conference-day attendance status to Carl, Christian, and Matt leadership cards; restructured "Planning committee context" into "Planning committee & likely WG3 members" with Moira Smith, Thomas Hartka, and Andrew Muck added; updated Makutonin status to note Christian's April 6 outreach; **removed the public "Declined / deprioritized" recruitment card** to eliminate reputational risk on a public-facing page. `index.html`: hero paragraph now names both publication tracks (the AEM Education & Training manuscript on AI competency gaps and the broader AEM proceedings paper); "The conference" card adds Graham Walker keynote and ~175-attendees pill.
- Added `CLAUDE.md` (project context for future Claude sessions) and this `CHANGELOG.md`. Fixed README drift: noted `grant.html`, corrected repo name to `wg3-saem-ai-consensus`, pointed deployment section at `deploy.sh`.
- Added `grant.html` — AHRQ R13 grant overview page with the three-aim structure and WG3's role in Aim 3. Added "The Grant" to the nav bar across all pages. (`e532bff`)
- Added profile links to all five names on `people.html` (Carl Preiksaitis, Christian Rose, Matt Trowbridge, R. Andrew Taylor, Michael Makutonin). Updated credentials: Andrew Taylor to "R. Andrew Taylor, MD, MHS"; Matt Trowbridge to "MD, MPH". (`963786e`)
- Initial deploy of the WG3 working site to GitHub Pages at https://matthewtrowbridge.github.io/wg3-saem-ai-consensus/. Includes landing page, scenarios x themes interactive framework, theme reference, scenarios browser, consolidated resources page, and people roster. Single source of truth in `assets/data.js`. (`56a755e`)
