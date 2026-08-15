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

1. 同步更新 `package.json`、`theme.yaml`、`CHANGELOG.md`（为该版本写完整条目，不要只写一句摘要）。
2. 提交后打 `vX.Y.Z` 标签并推送；CI 会打包 ZIP，并把 `CHANGELOG.md` 对应章节写入 GitHub Release 正文。
3. 不要跳过中间次版本标签：有 `0.5.0` 提交就要打 `v0.5.0`，否则 Release 列表会看起来像版本号跳号。
4. Release 正文由 `scripts/extract-changelog.mjs` 从 CHANGELOG 生成，不要依赖 `--generate-notes` 的提交对比链接。
