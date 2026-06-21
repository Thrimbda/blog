# Test Report: Const RSS Exclusion

**Task**: `const-rss-exclusion`  
**Date**: 2026-06-21  
**Result**: PASS

## Verification Basis

Changed files under review:

- `templates/atom.xml`
- `.legion/tasks/const-rss-exclusion/**`

The main claim is that generated public feeds exclude any entry whose generated URL path is `/const` or starts with `/const/`, without disabling normal feeds.

## Checks

| Check | Command / Method | Result | Evidence / Notes |
|---|---|---|---|
| Template syntax and build | `nix-shell --run "zola build"` | PASS | Zola built successfully after adding the project-level `templates/atom.xml` override. |
| Future `/const/` descendant proof | Temporary dated fixture with `path = "const/feed-exclusion-check"`, then `zola build` and feed scan | PASS | The synthetic page would be feed-eligible by date and tag, but no generated `atom.xml` contained its title, URL path, or `/const/` URL. The root feed still contained entries. The fixture was removed before final status. |
| Final real-tree feed exclusion | `nix-shell --run "zola build && rg ... public --glob 'atom.xml' --glob '**/atom.xml'"` | PASS | Final build generated 257 pages and 59 Atom feed files. Scan found no `https://0xc1.space/const`, `/const/`, or descendant `/const/` URLs in generated feeds. |
| Public feed still populated | `rg -n '<entry xml:lang=' public/atom.xml >/dev/null` | PASS | Root `atom.xml` still has feed entries, so the change did not disable all feed output. |
| Temporary fixture cleanup | `git status --short`; absence check for `content/feed-exclusion-check.md` | PASS | Only intended task docs and `templates/atom.xml` remain changed; the synthetic page is not present. |

## Why These Checks

- `zola build` proves the local Atom template override is valid for the current Zola version.
- A temporary dated page with a `/const/...` output path proves the path filter protects future feed-eligible const documents, not just the current undated `content/const.md` page.
- Scanning every generated `atom.xml` covers root, language, and taxonomy feed outputs created by the current site configuration.

## Skipped / Not Applicable

- No Cloudflare verification was run because the task only changes generated feeds, not Access policy or infrastructure.
- No RSS-format `rss.xml` file was checked because the current configuration only generates `atom.xml`; the user-facing RSS requirement maps to all generated public feed files for this site.

## Conclusion

Verification passed. `/const` path-family documents are excluded from generated Atom feeds while normal public feed entries remain.
