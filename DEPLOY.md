# Deploying the WG3 Working Site — fast path

Goal: live URL in under 10 minutes, collaborators editable from a browser, transferable later if WG3 wants an official home.

## Prerequisites (one time, ~3 min)

1. **GitHub account** — if you don't have one: https://github.com/join (free).
2. **GitHub CLI** — on macOS: `brew install gh`. On Windows: `winget install --id GitHub.cli`. Verify: `gh --version`.
3. **Authenticate**:
   ```
   gh auth login
   ```
   Choose: GitHub.com → HTTPS → Login with a web browser → paste the one-time code.

## Deploy (60 seconds)

```
cd "/path/to/SAEM AI Consensus (Spring 2026)/01 - Working Group Documents/WG3_Website"
chmod +x deploy.sh
./deploy.sh
```

The script will:
- Clean any stale `.git` folder (the one created in the Cowork sandbox is locked — `rm -rf .git` runs first)
- Initialize git, commit everything as "Initial WG3 working site"
- Create a public GitHub repo named `wg3-saem-ai-consensus` under your account
- Push the code
- Enable GitHub Pages on `main` / root
- Print the live URL

Your URL will be: `https://<your-github-username>.github.io/wg3-saem-ai-consensus/`

GitHub Pages takes ~30-90 seconds to build on first deploy. Refresh after a minute.

## Invite Andrew, Carl, Christian (and anyone else)

Each gets full edit-via-browser access. From the same folder:

```
gh api -X PUT repos/<your-username>/wg3-saem-ai-consensus/collaborators/<their-gh-username> -f permission=push
```

Or via the GitHub web UI: **Settings → Collaborators → Add people**.

Once they accept the invite, they can:
- Edit any file by clicking the pencil icon in the GitHub web UI
- Use "Suggest changes" to propose edits as a PR (no terminal needed)
- Comment on each other's edits before merging

## Updating the site after deployment

Anything you change locally:
```
git add .
git commit -m "describe what changed"
git push
```
Pages re-publishes within ~30 seconds.

If you only edit `assets/data.js`, every page that uses scenarios/themes/scores updates automatically.

## If GitHub Pages won't enable

Some accounts need Pages turned on manually the first time:
1. Go to `https://github.com/<username>/wg3-saem-ai-consensus/settings/pages`
2. Source → "Deploy from a branch" → main → / (root) → Save
3. Wait ~60 seconds → URL appears at the top of the page

## Custom domain (optional, later)

If WG3 wants `wg3.something.org`:
1. Add a `CNAME` file containing just the domain.
2. Settings → Pages → Custom domain → enter the domain.
3. Add a CNAME record at your DNS provider pointing at `<username>.github.io`.

## Transferring to an official home later

If Andrew or SAEM later wants this in an org:
- Settings → General → Danger Zone → Transfer ownership → enter org name.
- Repo, Pages URL, and history all move with the transfer.
- Old URL auto-redirects.

## Private repo alternative

GitHub Pages on a private repo requires GitHub Pro ($4/mo) or Team. If you'd rather keep it private and free:
- **Cloudflare Pages** (free, supports private repos): connect your GitHub repo at https://pages.cloudflare.com → "Create application" → connect repo → no build command → publish directory = `/`. URL: `<project>.pages.dev`.

## Troubleshooting

**`gh: command not found`** — install GitHub CLI (see prerequisites).

**`Permission denied (publickey)`** — you're using SSH; switch to HTTPS auth: `gh auth login` → HTTPS.

**`Repository creation failed: name already exists`** — pass a different name: `./deploy.sh wg3-saem-2026`.

**Pages 404 after deploy** — wait 60 more seconds; first build is slow. If still 404, manually enable in Settings → Pages.
