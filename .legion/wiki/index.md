# Legion Wiki

## 查询入口
- `patterns.md` - 可复用工程模式与约定。
- `tasks/const-cloudflare-access.md` - `const` 入口与 Cloudflare Access Terraform 任务摘要。
- `tasks/daily-log-split-design.md` - daily-log split implementation and frontend behavior.

## 当前重点
- Zola/czon 项目构建验证应优先使用 `shell.nix` 中暴露的 `npx czon build --lang ...` 命令。
- Cloudflare Access path 保护需要显式覆盖 exact path、trailing slash 和 wildcard descendants。
- Daily archives should preserve static pagination while enhancing to infinite loading.
