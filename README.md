# law28

全新 Hugo 站点骨架，沿用 `law-notes` 内容结构，首页采用“卡片式”样式（类似图二），但展示“最近更新的笔记”（类似图一）。

## 本地启动
```bash
# 1) 准备主题（避免 go modules 问题，推荐子模块方式）
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod

# 2) 启动预览
hugo server -D
```

> 如果你喜欢 Hugo Modules：确保本机装有 Go，然后在 `hugo.toml` 中改为模块导入。

## 部署到 GitHub Pages（项目页）
- 建议仓库名：`law28`
- `baseURL` 已预设为 `https://enn-yaa.github.io/law28/`
- 推送后启用 GitHub Pages（`gh-pages` 分支或 Actions），也可使用 Cloudflare Pages。

## 你可能要改的
- `content/about/_index.md`：改成你的介绍
- `content/search/_index.md`：无需改
- 首页文案：在 `hugo.toml` 的 `[params.home]` 修改
- 保留原有脚本：如果 `scripts/` 已复制过来，不需要动

```bash
# 复制你在 law-notes 中的特定目录（如未自动复制）
rsync -av --progress ../law-notes/content/ ./content/
rsync -av --progress ../law-notes/static/ ./static/
rsync -av --progress ../law-notes/assets/ ./assets/
```
