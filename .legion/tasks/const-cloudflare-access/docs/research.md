# Research Notes（现状摸底）

> 目标：在 RFC 前确认现有 Zola 入口模式、导航来源和 Cloudflare Terraform provider/resource 选择。本文不包含真实 Cloudflare token、account id、zone id、team domain、邮箱名单或组织私有身份规则。

---

## 1. Problem Restatement

- 任务要在现有 Zola 博客中新增 `/const/` 入口，并为该 path 初始化 Cloudflare Access Terraform 设计。
- 影响范围横跨静态站点内容/导航、Terraform provider/resource、Cloudflare Zero Trust Access 鉴权边界，因此按 Heavy RFC 处理。

## 2. Relevant Code / Entry Points

- `config.toml:1` — 当前 `base_url` 为公开站点域名。
- `config.toml:9` — 默认语言为 `zh-Hans`。
- `config.toml:13-42`、`50-79`、`87-116`、`124-153`、`161-190` — 各语言导航/页脚翻译 key；新增导航项需要补 `nav_const`。
- `config.toml:219-224` — `extra.header_nav` 是主页主导航来源，当前通过 `@/...` 内容路径引用 blog、diary、gcores、about。
- `themes/cone-scroll/templates/header.html:1-16` — header 使用当前语言遍历 `config.extra.header_nav`，通过 `get_url(path=nav_item.path, lang=current_lang)` 生成 URL，并通过 `trans(label_key)` 输出 label。
- `content/_index.md:1-4` 与 `themes/cone-scroll/templates/index.html:6-37` — 首页内容使用 section front matter 控制近期文章插入，与新增独立 `/const/` 页面无直接冲突。
- `.gitignore:2-5` — 当前忽略多语言内容副本 `content/**/*.en-US.md` 等；说明实现阶段若新增翻译内容文件需先审视 ignore 约束。

## 3. Existing Conventions

- 顶部导航统一配置在 `config.toml [extra].header_nav`，不在模板中硬编码。
- 普通页面可通过 `content/<name>.md` 暴露为 `/<name>/`，现有导航项 `gcores-talks` 与 `about` 使用该模式；`blog` 与 `diary` 使用 section `_index.md`。
- 多语言导航 label 依赖每个 language 的 translations；为避免 `trans` 缺 key，新增 `nav_const` 应覆盖默认语言和已声明语言。

## 4. Cloudflare Terraform Findings

- Terraform Registry 当前 Cloudflare provider 文档显示 Zero Trust Access 推荐资源：
  - `cloudflare_zero_trust_access_application`
  - `cloudflare_zero_trust_access_policy`
- 最新文档示例显示 application 可使用 `domain`、`type = "self_hosted"`、`zone_id`、`destinations = [{ type = "public", uri = "..." }]`、`policies = [{ id = ..., precedence = 0 }]`。
- `self_hosted_domains` 已被标记 deprecated；`destinations` supersedes `self_hosted_domains`，public destination `uri` 可包含 domain/path/wildcards。
- Cloudflare One docs 的 Application paths 说明：
  - `example.com/alpha/*` 覆盖子路径，但不覆盖 `example.com/alpha`；
  - 若要同时保护 parent path 和子路径，需要同时覆盖 exact path 与 wildcard 子路径，或采用能覆盖两者的可验证配置。

## 5. Constraints & Non-goals

- 不在 RFC 或后续配置中写入真实 Cloudflare API token、account id、zone id、team domain、邮箱名单或组织私有身份规则。
- RFC 阶段不修改 `content/const.md`、`config.toml` 或 Terraform 生产配置。
- 本任务不配置 DNS、Pages、Workers、Zero Trust organization 或真实 `terraform apply`。

## 6. Risks & Pitfalls

- Access path 漏配：只配置 `/const/*` 可能漏保护 `/const` 或 `/const/`；只配置 `/const` 可能漏保护子资源。
- Provider schema 漂移：Cloudflare provider v5 与 v4 在 Access 资源命名和 policy attachment 上存在差异；实现前需用锁定版本 `terraform init` + `terraform validate` 验证。
- 多语言导航：模板会为每种语言调用同一 `header_nav`；新增 label key 未覆盖所有语言会破坏导航渲染。
- 静态站点边界：Zola 会生成公开静态文件，真正访问控制只在 Cloudflare 边缘生效；本地 `zola serve` 或非 Cloudflare 部署不会被 Access 保护。

## 7. Unknowns

- [ ] Cloudflare provider 最新 v5.x 的 `include`/`require` 嵌套结构精确 HCL 形态：实现阶段用 Terraform Registry 和 `terraform validate` 确认。
- [ ] 生产 Zero Trust 身份策略应使用 email、email_domain、IdP group、Access group 还是其他规则：必须由用户/环境 owner 在私有变量或私有 tfvars 中提供，不在仓库固化。
- [ ] 是否存在既有 Cloudflare Access application 与 policy：本任务默认初始化新配置；若已有资源，实施前需决定 import 或改由变量引用既有 policy id。

## 8. References

- Task contract: `.legion/tasks/const-cloudflare-access/plan.md`
- Local files:
  - `config.toml`
  - `themes/cone-scroll/templates/header.html`
  - `themes/cone-scroll/templates/index.html`
  - `content/_index.md`
  - `.gitignore`
- External docs checked 2026-06-08:
  - Terraform Registry: `cloudflare_zero_trust_access_application` resource docs.
  - Terraform Registry: `cloudflare_zero_trust_access_policy` resource docs.
  - Cloudflare One docs: Application paths / wildcard behavior.
