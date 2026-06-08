# Const Cloudflare Access

## 目标
在现有 Zola 博客中新增一个名为 `const` 的主页导航入口，路径为 `/const/`，并初始化 Terraform 配置，用 Cloudflare Access 保护该路径。

## 问题陈述
当前站点只有公开博客、日志、机组和关于页面。用户希望增加一个新的 `const` 入口，同时在基础设施层为该路径建立 Cloudflare Access 保护，使该入口可以在站点中可见，但访问控制由 Cloudflare 在边缘侧执行。

这项工作同时触及站点导航、内容路由、Terraform 初始化和 Cloudflare Access 鉴权边界；需要先明确 Terraform 配置结构、变量边界和 Access 应用策略，避免把账号、域名、身份策略或密钥硬编码进仓库。

## 验收标准
- [ ] Zola 站点生成后存在 `/const/` 路径，并且主页主导航中出现 `const` 入口。
- [ ] 新入口不破坏现有多语言导航、主题配置、博客列表和内容构建。
- [ ] 仓库包含可初始化的 Terraform Cloudflare 配置，Provider 与远端账号/zone/application 等环境相关值通过变量传入。
- [ ] Terraform 配置声明 Cloudflare Access 应用，保护 `0xc1.space/const` 或等价变量化域名下的 `const` path。
- [ ] Terraform 配置包含最小可审查的 Access policy 框架，不在仓库中提交 token、account id、zone id、team domain 或邮箱名单等敏感/环境私有值。
- [ ] 验证记录覆盖 Zola 构建/检查与 Terraform 格式化/静态验证可执行结果或阻塞原因。

## 假设 / 约束 / 风险
- **假设**: 站点仍以 Zola 构建，`config.toml` 的 `extra.header_nav` 是主页主导航来源。
- **假设**: 默认生产域名为 `0xc1.space`，但 Terraform 应通过变量保留可配置性。
- **假设**: `const` 页面初始内容可以是最小占位页；本任务重点是入口和访问保护，而不是页面业务内容。
- **约束**: 不提交 Cloudflare API token、account id、zone id、team domain、用户邮箱或组织私有身份规则的真实值。
- **约束**: Terraform 初始化应优先放在独立基础设施目录，避免混入 Zola 内容和主题代码。
- **约束**: 在 RFC 通过前不得开始生产代码或 Terraform 配置实现。
- **风险**: Cloudflare Access 是鉴权边界，错误的 application domain/path 或 policy 可能导致入口未受保护或误拦截其他页面。
- **风险**: Cloudflare provider 资源版本与 Access/Zero Trust API 命名可能随 provider 版本变化，需要设计阶段确认资源选择。
- **风险**: Zola 多语言路径可能影响 `/const/` 是否只在默认语言出现，或是否需要为多语言站点分别处理入口。

## 要点
- **站点入口**: 新增 `content/const.md` 或等价 Zola 页面，并把 `const` 加入主页导航。
- **Terraform 初始化**: 新建独立 Terraform 目录，声明 Cloudflare provider、变量、资源和示例变量文件。
- **Access 保护**: 使用 Cloudflare Access application + policy 保护 `const` path，具体资源和 policy 形态在 RFC 中确定。
- **安全边界**: 所有环境私有值变量化；示例文件只能包含占位值或说明。

## 范围
- `config.toml` - 增加 `const` 导航翻译或导航入口配置。
- `content/` - 增加 `/const/` 对应页面内容。
- `.czon/meta.json` 与 `.czon/src/*/content/const.md` - 维护项目多语言构建链生成的 `const` 源内容。
- `infra/` 或 `terraform/` - 初始化 Cloudflare Terraform 配置。
- `.gitignore` - 如需要，忽略 Terraform 本地状态、计划文件和本地变量文件。
- `.legion/tasks/const-cloudflare-access/docs/rfc.md` - 设计 Cloudflare Access/Terraform 方案。
- `.legion/tasks/const-cloudflare-access/docs/review-rfc.md` - RFC 对抗审查结果。
- `.legion/tasks/const-cloudflare-access/docs/test-report.md` - 验证记录。
- `.legion/tasks/const-cloudflare-access/docs/review-change.md` - 实现审查结论。
- `.legion/tasks/const-cloudflare-access/docs/report-walkthrough.md` - 交付说明。

## 非范围 (Non-goals)
- 不配置或更换 Cloudflare DNS、Pages、Workers、build pipeline 或部署流程，除非 RFC 证明 Access 保护必须依赖它们。
- 不提交真实 Cloudflare 凭证、真实 Access 用户名单或组织私有身份策略。
- 不实现 `const` 页面中的复杂业务内容或交互；初始页面只需能构建、可访问、可被 Access 保护。
- 不修改现有博客文章、主题视觉系统或已有导航项的语义。
- 不在本任务中执行真实 Terraform apply，除非用户显式提供环境并要求执行。

## 设计索引 (Design Index)
> **Design Source of Truth**: `.legion/tasks/const-cloudflare-access/docs/rfc.md`（待生成）

**摘要**:
- 核心流程: 先通过 RFC 明确 Terraform 目录结构、Cloudflare provider/resource 选择、Access application domain/path 和 policy 变量边界，再实施站点入口与基础设施配置。
- 验证策略: 使用 `shell.nix` 中的项目构建命令 `npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE` 验证站点入口；使用 Terraform fmt/init/validate 验证配置；对 Cloudflare Access 部分在 review 中重点检查 path、domain、policy 和敏感值边界。

## 阶段概览
1. **Phase 1 - RFC**: 调研当前 Zola 入口模式和 Cloudflare Terraform resource 选择，形成短 RFC。
2. **Phase 2 - RFC Review**: 对 Access 鉴权边界、变量设计和回滚策略做对抗审查，必须 PASS 后才能实现。
3. **Phase 3 - Implementation**: 在隔离 worktree 中新增 `const` 页面入口与 Terraform Cloudflare Access 配置。
4. **Phase 4 - Verification**: 运行 Zola 和 Terraform 相关验证，记录通过结果或环境阻塞。
5. **Phase 5 - Delivery Review**: 做代码/安全审查，生成 walkthrough 和 PR body。
6. **Phase 6 - Wiki Writeback**: 将可复用的 Terraform/Access 配置约定写回 `.legion/wiki`。

---
*Created: 2026-06-08 | Updated: 2026-06-08*
