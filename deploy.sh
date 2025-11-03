#!/bin/bash
# ============ Hugo 一键部署脚本 (for law-notes) ============
# 作者：xuufaa / Enn-Yaa
# 功能：自动构建 Hugo 博客并推送到 GitHub main 分支
# ============================================================

set -e

# 1️⃣ 构建站点
echo "🧱 构建 Hugo 博客中..."
hugo --cleanDestinationDir

# 2️⃣ 检查是否有更改
echo "🔍 检查 Git 状态..."
if [[ -z $(git status --porcelain) ]]; then
  echo "✅ 没有检测到更改，无需提交。"
else
  echo "📝 添加修改文件..."
  git add .

  # 自动生成提交信息（含时间戳）
  commit_msg="update: 自动部署于 $(date '+%Y-%m-%d %H:%M:%S')"
  git commit -m "$commit_msg"

  echo "📤 提交更改..."
  git push origin main && echo "🚀 推送成功！"
fi

# 3️⃣ 结束信息
echo "✅ 博客已更新并推送至 GitHub Pages 🎉"
