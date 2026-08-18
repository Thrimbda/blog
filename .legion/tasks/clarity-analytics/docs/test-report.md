# Test Report — clarity-analytics

## 目标

验证 Clarity 分析脚本能正确注入生成页面，且 `zola build` 无错误。

## 环境

- zola 0.21.0（与 CI `.github/workflows/pages.yaml` 锁定的版本一致）
- 构建目录: `.worktrees/clarity-analytics`

## 命令

```bash
zola build
```

## 结果

- 构建成功: `Creating 257 pages (0 orphan) and 9 sections`，无报错，internal link check 通过。
- 首页 `public/index.html` 的 `<head>` 中已包含 Clarity 条件块：

```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "vg7b9rsa98");
</script>
```

- 项目 ID `vg7b9rsa98` 已由 `{{ config.extra.clarity }}` 正确注入，非硬编码。

## 结论

PASS。
