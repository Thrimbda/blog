# Maintenance Backlog

## Daily Log Split Follow-ups

- Restore or document `scripts/daily-sources/*` so `scripts/split-daily-logs.mjs` can be re-run end-to-end from a clean worktree.
- Keep `/diary/diary-2020/`, `/diary/diary-2026/`, and `/gcores-talks/` as compatibility surfaces during the first migration release.
- Extend `scripts/get-gcores-talk.ts` to emit atomic files with stable source ids or deterministic date sequence suffixes.
- Decide whether atomic daily entries should appear in the global Atom feed.
- Decide whether Giscus comments belong on every daily entry or only on aggregate/year pages.
- Watch Gcores mobile TOC length in real use; add year collapse or a local in-TOC filter only if the direct date list feels too heavy.
