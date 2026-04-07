#!/usr/bin/env bash
# WG3 working site -- one-shot deploy to GitHub Pages.
#
# Prerequisites (one time, ~3 min):
#   1. Install GitHub CLI: brew install gh   (macOS)
#   2. Authenticate:        gh auth login    (choose GitHub.com, HTTPS, browser)
#
# Then from inside this folder run:
#   ./deploy.sh
#
# Or pass a custom repo name:
#   ./deploy.sh wg3-saem-ai-consensus

set -euo pipefail

REPO_NAME="${1:-wg3-saem-ai-consensus}"
VISIBILITY="--public"
DESC="WG3 working site -- SAEM AI Consensus 2026 -- Education, Training & Competency Development"

echo "==> Cleaning any stale .git directory"
rm -rf .git || true

echo "==> Initializing git repo"
git init -q -b main
git add .
git -c user.email="trowbridge.business@gmail.com" -c user.name="Matt Trowbridge" \
    commit -q -m "Initial WG3 working site

Landing page, scenarios x themes interactive framework, theme reference,
scenarios browser, consolidated resources page, and people roster.
Single source of truth in assets/data.js. Static site, no build step.

Draft for WG3 internal review."

echo "==> Creating GitHub repo: $REPO_NAME"
gh repo create "$REPO_NAME" $VISIBILITY --description "$DESC" --source=. --remote=origin --push

echo "==> Enabling GitHub Pages on main / root"
OWNER=$(gh api user --jq .login)
gh api -X POST "repos/$OWNER/$REPO_NAME/pages" \
   -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || \
gh api -X PUT "repos/$OWNER/$REPO_NAME/pages" \
   -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || true

URL="https://${OWNER}.github.io/${REPO_NAME}/"
echo
echo "============================================================"
echo "  Deployed."
echo "  Repo:  https://github.com/$OWNER/$REPO_NAME"
echo "  Site:  $URL"
echo "  (Pages takes ~30-90 seconds to build on first deploy.)"
echo "============================================================"
echo
echo "Next steps:"
echo "  - Invite collaborators:"
echo "      gh api -X PUT repos/$OWNER/$REPO_NAME/collaborators/<gh-username> -f permission=push"
echo "  - To update the site after editing files:"
echo "      git add . && git commit -m 'your message' && git push"
