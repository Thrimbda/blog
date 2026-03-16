# 测试报告

## 执行命令
`zola build`

## 结果
PASS

## 摘要
- `zola build` 已在 `/Users/c1/Work/blog` 执行成功，站点完成构建，未出现构建错误。
- 最终浏览器验证证据已齐备：桌面展开截图、桌面收起截图、移动端收起截图均已产出并可用于交付留档。
- 已知最终测量满足目标：桌面 1440px 展开态 `article x≈484 / aside width≈240`；桌面收起态 `article x≈200 / aside width≈0 / article width≈630`；reload 后保持 `collapsed`；移动端 390px 收起态 `scrollWidth == clientWidth == 390`。
- 综合构建结果与浏览器级验证，`toc-rail` 的最终实现状态可判定为通过。

## 验证项
- 构建验证：执行 `zola build` 成功，输出显示已完成内部链接检查并生成页面；结果：PASS。
- 桌面展开态：依据 `/Users/c1/Work/blog/.legion/tasks/toc-rail/docs/playwright-article-desktop-expanded.png`，结合测量 `article x≈484 / aside width≈240`，说明展开态保留预期 rail 宽度与正文定位；结果：PASS。
- 桌面收起态：依据 `/Users/c1/Work/blog/.legion/tasks/toc-rail/docs/playwright-article-desktop-collapsed.png`，结合测量 `article x≈200 / aside width≈0 / article width≈630`，说明左侧 rail 折叠后正文获得额外可用宽度且布局稳定；结果：PASS。
- 状态持久化：已知最终验证表明页面 reload 后仍保持 `collapsed`；结果：PASS。
- 移动端无横向溢出：依据 `/Users/c1/Work/blog/.legion/tasks/toc-rail/docs/playwright-article-mobile-collapsed.png`，结合测量 `scrollWidth == clientWidth == 390`，说明 390px 收起态无额外横向滚动；结果：PASS。

## 失败项（如有）
- 无。

## 残余风险
- 本轮浏览器结论基于已提供的最终截图与测量结果，未重新执行 Playwright 交互脚本；若截图生成后实现再次变更，需要重新取证。
- 当前证据覆盖桌面 1440px 与移动端 390px 两个关键视口，其它中间断点或超宽屏场景仍可能存在细微视觉偏差。
- `zola build` 证明构建链路与模板渲染正常，但不能单独替代完整的交互式回归测试。

## 备注
- 选择 `zola build` 的原因：这是用户明确要求必须执行的命令，也是本仓库最直接、成本最低的最终交付验证。
- 本报告直接采用用户提供的最终浏览器验证结果，因为这些证据已覆盖本任务最关键的展开、收起、持久化与移动端无溢出场景。
- 考虑过的备选项包括重新执行 Playwright 交互验证，以及补跑更广覆盖的人工断点走查；在已有最终证据充分的前提下，本轮未重复执行。
