# RFC: `/const/` Zola Entry + Cloudflare Access Terraform Design

> **Profile**: RFC Heavy（auth / permissions / secrets）
> **Status**: Draft — ready for `review-rfc`
> **Created**: 2026-06-08
> **Last Updated**: 2026-06-08

---

## Executive Summary

- **Problem**: 新增公开可见的站点导航入口 `/const/`，但该路径的真实访问必须由 Cloudflare Access 在边缘保护。
- **Decision**: 实现阶段采用最小 Zola 页面 + `config.toml` 导航扩展；Terraform 放在独立 `infra/cloudflare-access/`，使用 Cloudflare provider v5 Zero Trust 资源 `cloudflare_zero_trust_access_application` + `cloudflare_zero_trust_access_policy`，所有环境私有值变量化。
- **Access scope**: 用 self-hosted Access application 保护 `${site_hostname}/const`、`${site_hostname}/const/` 和 `${site_hostname}/const/*` 等价覆盖范围；实现时优先用 `destinations` 而不是 deprecated `self_hosted_domains`。
- **Policy boundary**: 仓库只提供变量化 policy 框架和占位示例，不提交真实 account/zone/team/email/IdP 规则。
- **Verification**: 使用 `shell.nix` 中的项目命令 `npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE` 验证静态入口和多语言构建；`terraform fmt -check`、`terraform init -backend=false`、`terraform validate` 验证配置可初始化与 schema。
- **Rollback**: 删除导航/页面并移除或 disable Access application/policy；不得依赖 `terraform apply` 回滚未审查变更。

---

## 1. Context / Evidence

- 当前站点为 Zola：`config.toml:1-9` 定义 base URL、theme 和 default language。
- 顶部导航来源是 `config.toml:219-224` 的 `extra.header_nav`。
- `themes/cone-scroll/templates/header.html:11-16` 遍历 `header_nav`，通过 `get_url(path=..., lang=current_lang)` 和 `trans(label_key)` 生成导航。
- 当前已声明 5 个语言 translation block；新增 `nav_const` 必须覆盖所有语言，避免 `trans` 缺 key。
- Terraform Registry 当前 Cloudflare provider 文档显示：
  - `cloudflare_zero_trust_access_application` 支持 `domain`、`type = "self_hosted"`、`zone_id`、`destinations`、`policies`；`self_hosted_domains` deprecated。
  - `cloudflare_zero_trust_access_policy` 定义 `decision` 与 `include`/`exclude`/`require` 规则。
- Cloudflare Application paths 文档说明 wildcard path 不自动覆盖 parent path；`/const/*` 不等同于 `/const`。

## 2. Goals

- 生成 `/const/` 页面并在主页主导航出现 `const` 入口。
- 不破坏现有 blog/diary/gcores/about 导航和多语言导航渲染。
- 初始化可审查、可变量化的 Cloudflare Access Terraform 配置。
- 精确保护 `const` path，而不是误保护整个 apex domain 或漏保护 `/const/`。
- 明确敏感值边界、验证路径和回滚路径。

## 3. Non-goals

- 不在 RFC 阶段实现生产代码或 Terraform 配置。
- 不提交真实 Cloudflare API token、account id、zone id、team domain、邮箱名单或组织私有身份规则。
- 不配置 Cloudflare DNS、Pages、Workers、Zero Trust organization 或 CI/CD secrets。
- 不执行真实 `terraform apply`。
- 不实现复杂 `const` 页面业务内容。

## 4. Options

### Option A — Zola page + Cloudflare Access self-hosted application with `destinations`（选择）

- **Design**:
  - Zola：新增 `content/const.md`，在 `config.toml` 增加 `nav_const` translations 和 `header_nav` 项。
  - Terraform：新增 `infra/cloudflare-access/`，声明 Cloudflare provider v5、变量、Access application 和 Access policy。
  - Access application 使用 `cloudflare_zero_trust_access_application`、`type = "self_hosted"`、`zone_id = var.zone_id`、`domain = local.const_access_primary_domain`、`destinations = [...]`。
  - Policy 使用 `cloudflare_zero_trust_access_policy`，由变量传入非公开的 include/require 规则或引用私有 Access group/policy 信息。
- **Pros**:
  - 使用当前 provider 推荐的 Zero Trust 资源与 `destinations`，避开 deprecated `self_hosted_domains`。
  - Path 保护边界可显式覆盖 exact path 与子路径。
  - 站点入口与基础设施配置边界清晰，便于 review 和 rollback。
- **Cons**:
  - 需要验证 provider v5 schema，尤其是 policy rule object 的精确 HCL 形态。
  - 如果生产已有 Access resources，后续可能需要 import，而不是直接创建。

### Option B — Zola page + deprecated/legacy Access resources

- **Design**: 使用旧资源名或 `self_hosted_domains` 管理 Access application/policy。
- **Pros**: 对旧 provider v4 项目可能更熟悉。
- **Cons**: `self_hosted_domains` 已 deprecated；旧资源命名/attachment 模型更容易在升级时破坏；不适合作为新初始化配置。
- **Why not**: 本仓库当前无 Terraform 约束，新增配置应优先选择当前 provider 推荐路径。

### Option C — 只做站点入口，Access 手工配置在 Cloudflare Dashboard

- **Pros**: 初次落地快，不需要 provider schema 验证。
- **Cons**: 不满足“仓库包含可初始化 Terraform Cloudflare 配置”的验收；审计和回滚不可重复；易出现 Dashboard 与仓库漂移。
- **Why not**: 任务目标明确要求初始化 Terraform 配置。

### Decision

- 选择 **Option A**。
- 放弃：Dashboard-only、legacy/deprecated resource、在仓库写死真实 identity allowlist。

## 5. Proposed Design

### 5.1 Zola site changes（实现阶段）

- 新增 `content/const.md`，保持最小 front matter 和占位内容，使默认语言输出 `/const/`。
- 更新 `config.toml`：
  - 在默认 `[translations]` 与每个 `[languages.*.translations]` 增加 `nav_const`。
  - 在 `[extra].header_nav` 中追加 `{ path = "@/const.md", label_key = "nav_const" }`。
- 使用项目 `czon` 构建链生成/更新 `.czon/meta.json` 与 `.czon/src/*/content/const.md`，确保多语言构建命令能输出各语言 `const` 页面。
- 不改 theme 模板，沿用现有 `header_nav` 约定。
- 多语言策略：先只新增默认内容页面；导航 label 本地化。若 `zola build` 证明非默认语言缺少页面会失败，则实现阶段必须在不泄露内容/不违反 ignore 约束的前提下调整方案（例如语言导航不指向缺失页面，或生成受控的翻译占位文件并同步 `.gitignore` 决策）。

### 5.2 Terraform layout（实现阶段）

建议目录：`infra/cloudflare-access/`

- `versions.tf` — pin Terraform 与 Cloudflare provider，例如 `cloudflare/cloudflare >= 5.8, < 6.0`（实现时以 Registry 当前版本验证）。
- `providers.tf` — provider block，不写 token；token 通过 `CLOUDFLARE_API_TOKEN` 环境变量或 sensitive variable 注入。
- `variables.tf` — 声明 `account_id`、`zone_id`、`site_hostname`、`const_path`、policy 输入等变量；敏感或私有值设置 `sensitive = true`。
- `main.tf` — Access application + policy resources。
- `outputs.tf` — 只输出非敏感的 resource ids 或说明；如输出 id，标注可能是环境信息。
- `terraform.tfvars.example` — 只放占位值和注释，不放真实值。

`.gitignore` 实现阶段应增加 Terraform 本地文件忽略：`.terraform/`、`*.tfstate*`、`*.tfplan`、`terraform.tfvars`、`*.auto.tfvars`（保留 `.tfvars.example`）。

### 5.3 Cloudflare Access resources

- Provider/resource choice:
  - `cloudflare_zero_trust_access_application` for self-hosted app.
  - `cloudflare_zero_trust_access_policy` for allow/deny policy framework.
- Scope:
  - `site_hostname` 默认示例可对应公开站点 host，但在 Terraform 中必须变量化。
  - `const_path` 默认 `const` 或 `/const`，用 locals 规范化，避免双斜杠。
  - Application must cover exact parent and descendants. Design target equivalent to:
    - `${var.site_hostname}/const`
    - `${var.site_hostname}/const/`
    - `${var.site_hostname}/const/*`
  - 因 Cloudflare wildcard 不覆盖 parent path，review-rfc 必须重点审查最终 HCL 是否同时覆盖 `/const/` 与子路径。
- Policy:
  - `decision = "allow"` for allowed identities.
  - Include/require criteria must be driven by variables or documented placeholders.
  - Do **not** commit actual email allowlists, organization domains, IdP group IDs, Access group IDs, service token IDs, team domain, or private identity rules.
- Token permissions:
  - API token scope should be minimum required for Access apps/policies write and read plus zone/account scope required by provider.
  - Token itself must come from environment/secret manager, never from repo.

## 6. Security & Sensitive Value Boundary

- **Never commit**:
  - Cloudflare API token。
  - account id / zone id。
  - Zero Trust team domain / auth domain。
  - real email list、email domain、IdP group id、Access group id、service token。
  - Terraform state、plan、local tfvars。
- **Allowed in repo**:
  - Variable names and descriptions。
  - Placeholder examples like `REPLACE_WITH_ACCOUNT_ID` only if clearly non-real。
  - Public path name `const` and public host variable default only if already public; safer design is no default for `site_hostname` and example placeholder.
- **Threat model**:
  - Under-protection: `/const/` visible without Access due to path mismatch。
  - Over-protection: apex or unrelated routes blocked due to wildcard too broad。
  - Secret leakage: committed tfvars/state/plan or real policy values。
  - Drift: Dashboard changes differ from Terraform state。

## 7. Verification Strategy

### Design review gate

- Run `review-rfc` before implementation.
- Review must specifically inspect:
  - Cloudflare resource names and provider major version assumption。
  - `destinations` path coverage for `/const`、`/const/`、`/const/*`。
  - Policy variables do not encode real private identities。
  - Rollback is executable without real apply in review environment。

### Implementation verification gate

- Site build:
  - `nix-shell --run "npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"`
  - Inspect generated output or build logs to confirm `/const/` and language variants exist and nav renders。
  - Treat naked `zola build` as a lower-level diagnostic only; this repository's shell hook documents `czon build` as the project build command because multilingual content must be generated first。
  - Verify existing language routes do not fail due to missing `nav_const` or missing content translations。
- Terraform:
  - `terraform fmt -check -recursive infra/cloudflare-access`
  - `terraform init -backend=false` in `infra/cloudflare-access`
  - `terraform validate`
  - Optional static review: no real ids/tokens/emails/team domains in tracked files。
- No `terraform apply` unless user explicitly provides environment and requests it in a later phase.

## 8. Rollout / Rollback

### Rollout

1. After RFC PASS, implement Zola entry and Terraform config in worktree.
2. Run local Zola and Terraform validation.
3. Review sensitive values and ignored Terraform artifacts.
4. Merge/deploy static site only after Cloudflare Access config is ready to apply in the target environment, or document temporary exposure risk if site deploy precedes Access apply.
5. Environment owner applies Terraform with private variables outside repo.

### Rollback triggers

- `/const/` is publicly reachable through Cloudflare when it should be protected。
- Non-const routes become Access-protected unexpectedly。
- Terraform config requires committing sensitive values。
- Provider schema cannot validate with selected version。

### Rollback steps

- Site rollback: remove `header_nav` entry, `nav_const` translations, and `content/const.md`; rebuild/deploy previous static site。
- Infra rollback before apply: remove or revert `infra/cloudflare-access/` changes and local ignored artifacts。
- Infra rollback after apply: `terraform destroy` targeted to the const Access application/policy or revert to prior Terraform state/config; if Terraform state unavailable, manually disable/delete only the const-specific Access application in Cloudflare Dashboard and then reconcile/import in Terraform。
- Secret rollback: if any sensitive value is accidentally committed, rotate token/identifier where applicable and purge from history per repository incident process before merging。

## 9. Observability / Operations

- Primary operational signal is Cloudflare Access request logs/audit events in the Cloudflare dashboard or account logging pipeline; this repo will not configure log sinks.
- Manual smoke checks after apply:
  - Unauthenticated request to `/const/` redirects/challenges via Access。
  - Authorized identity can access `/const/`。
  - `/blog/`、`/diary/`、`/about/` remain public。
- If Cloudflare Access logs are unavailable to the implementer, record that verification is limited to Terraform validation and reviewer path inspection.

## 10. Milestones

- **Milestone 1 — RFC Review**
  - Scope: review this RFC and research notes。
  - Acceptance: `docs/review-rfc.md` PASS or actionable blockers。
- **Milestone 2 — Site entry**
  - Scope: `content/const.md` + `config.toml` translation/nav changes + `.czon` multilingual source artifacts。
  - Acceptance: project `czon build` passes and `/const/` exists。
- **Milestone 3 — Terraform initialization**
  - Scope: `infra/cloudflare-access/` + `.gitignore` for Terraform local artifacts。
  - Acceptance: `terraform fmt/init/validate` pass or blocked by documented missing Terraform binary/provider access。
- **Milestone 4 — Delivery review**
  - Scope: security review, test report, walkthrough。
  - Acceptance: `review-change` PASS and PR body ready。

## 11. Open Questions for `review-rfc`

- [ ] Should implementation use no default for `site_hostname`, or keep a public default matching `config.toml`? Safer default is no default plus example placeholder.
- [ ] Should policy be fully variable-driven, or should repo include a disabled placeholder policy shape that requires private values before apply?
- [ ] If a Cloudflare Access app already exists for this hostname/path, should implementation import it or fail fast with documentation?

## 12. Implementation Notes（not implementation in this phase）

- Do not create `content/const.md`, edit `config.toml`, or create Terraform files until `review-rfc` passes。
- When implementation starts, keep changes inside `/home/c1/Work/blog/.worktrees/const-cloudflare-access`。
- Prefer provider v5 syntax and validate against Registry docs at implementation time; do not rely only on this RFC if provider latest changes。

## 13. References

- Plan: `.legion/tasks/const-cloudflare-access/plan.md`
- Research: `.legion/tasks/const-cloudflare-access/docs/research.md`
- Local evidence:
  - `config.toml:1-9`, `13-42`, `50-79`, `87-116`, `124-153`, `161-190`, `219-224`
  - `themes/cone-scroll/templates/header.html:1-16`
  - `content/_index.md:1-4`
  - `.gitignore:1-5`
- External docs checked 2026-06-08:
  - Terraform Registry Cloudflare provider `cloudflare_zero_trust_access_application` docs。
  - Terraform Registry Cloudflare provider `cloudflare_zero_trust_access_policy` docs。
  - Cloudflare One docs: Application paths and wildcard coverage。
