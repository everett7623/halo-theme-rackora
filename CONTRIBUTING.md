# 贡献指南

## 范围

Rackora 服务独立出版、知识库、技术写作和其他内容型站点。新增功能应改善信息扫描、阅读、可访问性、SEO 或性能，不添加纯装饰组件。

## 修改要求

1. 只修改 `src/` 源码，不直接修改 `templates/`。
2. 不引入 Web Font、jQuery、整套 UI 框架或未经审计的外部 CDN。
3. 不自动给所有外链添加 `nofollow` 或 `sponsored`。
4. 新增 JavaScript 必须可以在无 JavaScript 时安全退化。
5. 新增 Halo 字段或 Finder API 前先核对当前官方文档。

提交前执行：

```bash
pnpm check
pnpm build-only
pnpm test
pnpm test:budget
```

## 发布

每次对外更新必须完整执行以下动作，不能只改源码或只推送提交：

1. 开始前检查工作区，拉取 `origin` 并确认本地/远程没有未处理的分叉。
2. 根据语义化版本确定新版本：修复升 PATCH，兼容新功能升 MINOR，不兼容调整升 MAJOR。
3. 只修改 `src/` 源码；同步补充验证，界面变更还要更新本地预览夹具。
4. 执行 `pnpm check`、`pnpm build-only`、`pnpm test`、`pnpm test:budget`。
5. 界面变更必须在桌面与移动视口进行浏览器验收；涉及颜色时同时抽查明暗模式。
6. 同步更新 `package.json`、`theme.yaml`、`README.md`、`CHANGELOG.md`，四处版本一致。
7. 执行 `pnpm build` 生成本地 `dist/theme-rackora-X.Y.Z.zip`，检查包内版本、配置、模板和本次改动，并记录大小与 SHA-256。
8. 审阅完整 diff 与 `git diff --check`，提交后创建带说明的 `vX.Y.Z` 标签。
9. 依次推送 `main` 和标签；等待 `Release theme` 工作流成功，不以“已触发”代替完成。
10. 确认 GitHub Release 正文来自 `CHANGELOG.md`，且远程包含同名 ZIP。
11. 比较本地与远程 ZIP 的 SHA-256；不一致时不得宣布发布完成。
12. 最后确认工作区干净，`main`、`origin/main` 和标签指向同一发布提交。

不要跳过中间版本标签。Release 正文由 `scripts/extract-changelog.mjs` 从 CHANGELOG 生成，
不要依赖 `--generate-notes` 的提交对比链接。自动化代理还必须遵守仓库根目录
[`AGENTS.md`](AGENTS.md) 的完成门槛。
