# critique 设计审查

## 结论

PASS

## Anti-Patterns Verdict

- 通过。当前实现没有引入 AI 常见的高声量 widget、卡片化 TOC、悬浮工具条或与主题不一致的控件语言。
- TOC 收起后的展开入口仍然是文本化、低声量、纸面系的辅助导航，不会让文章页退化成“左边空一块”或“多一个盒状按钮”的状态。

## Overall Impression

这次改动解决的是一个真实的版式问题，而不是表层装饰。收起后正文能直接回到文章主线，目录入口仍留在视线边缘，整体比原先“目录没了但空列还在”更像一次经过编辑判断的折叠。

## What's Working

- 收起态的正文左移足够明显，桌面端一眼就能读出“现在按无 TOC 文章对待”。
- 展开入口沿用了 `目录` 的文本语气，没有破坏 Granda / Cone Scroll 的 quiet rail 设计契约。
- 移动端继续保持单列节奏，目录收起后没有额外控件噪音，也没有横向溢出。

## Priority Issues

- 无阻塞问题；本轮在 critique 视角下可通过。

## Minor Observations

- 为了让展开入口更可发现，本轮补充了 hover / focus-visible 状态；这属于正向 polish，不改变整体语气。
- 收起态正文宽度微调回 `70ch`，让“像无 TOC 页面”这件事更彻底。

## Questions to Consider

- 如果后续还要继续做文章页 polish，更值得优先观察的是长标题、超深层 TOC 和评论区加载后的整体重心，而不是再给 TOC 按钮增加视觉修饰。
