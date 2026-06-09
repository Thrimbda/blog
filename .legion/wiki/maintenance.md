# Maintenance Backlog

## Daily Log Split Follow-ups

- Implement `diary-2020` split first with a dry-run manifest.
- Add a daily-entry template reusing the existing article shell.
- Add year/source archive templates with normal Zola pagination.
- Keep `/diary/diary-2020/`, `/diary/diary-2026/`, and `/gcores-talks/` as compatibility surfaces during the first migration release.
- Extend `scripts/get-gcores-talk.ts` to emit atomic files with stable source ids or deterministic date sequence suffixes.
- Decide whether atomic daily entries should appear in the global Atom feed.
- Decide whether Giscus comments belong on every daily entry or only on aggregate/year pages.
- Add progressive infinite loading only after static pagination is verified.
