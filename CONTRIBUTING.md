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
