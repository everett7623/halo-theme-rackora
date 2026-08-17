# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Rackora 是一个 Halo 2.x 主题，使用 Vite + TypeScript 构建 Thymeleaf 模板。主题专注于内容优先的独立出版和技术写作。

**技术栈**：

- Thymeleaf 模板引擎
- Vite 8 + TypeScript 5
- vite-plus (内置 lint/fmt)
- @halo-dev/vite-plugin-halo-theme
- pnpm 10.33.0
- Node.js 24

## 常用命令

### 开发流程

```bash
# 安装依赖
pnpm install

# 开发模式（监听 src/ 并持续构建到 templates/）
pnpm dev

# 仅构建（不验证）
pnpm build-only

# 完整构建（包含测试和打包）
pnpm build

# 本地预览（生成静态夹具）
pnpm preview
```

### 测试与验证

```bash
# 主题验证（路由、H1、SEO、配置一致性）
pnpm test

# 性能预算检查（CSS ≤48KB, JS ≤120KB gzip）
pnpm test:budget

# 代码检查和格式化
pnpm check
```

### 单独运行构建步骤

```bash
# TypeScript 编译
tsc

# Vite 构建
vp build

# 打包主题 ZIP
theme-package
```

## 目录结构

```
src/
├── index.html              # 首页
├── post.html               # 文章页
├── post_docs.html          # 文档模板（自定义）
├── page.html               # 独立页
├── page_about.html         # About 模板（自定义）
├── archives.html           # 归档
├── tags.html / tag.html    # 标签索引/详情
├── categories.html / category.html  # 栏目索引/详情
├── author.html             # 作者页
├── links.html              # 友情链接
├── error/404.html          # 404 页面
├── partials/               # 可复用局部模板
│   ├── layout.html         # 主布局（导航、页脚）
│   ├── seo-head.html       # SEO meta 标签
│   ├── post-card.html      # 文章卡片
│   ├── pagination.html     # 分页组件
│   └── ...
├── css/main.css            # 主样式表
└── js/
    ├── main.ts             # 全局脚本（导航、主题切换、标签排序）
    └── post.ts             # 文章页脚本（目录、灯箱、分享）

templates/                  # Vite 构建输出（Halo 读取此目录）
public/                     # 静态资源（不经构建）
scripts/                    # 构建和验证脚本
theme.yaml                  # Halo 主题元数据
settings.yaml               # 主题设置表单（9 个分组）
annotation-setting.yaml     # 内容编辑字段（文章/标签/栏目）
```

## 核心架构

### 模板构建流程

1. **源码**：`src/*.html` 使用 Thymeleaf 语法 + Vite 占位符
2. **Vite 处理**：`@halo-dev/vite-plugin-halo-theme` 转换模板并注入资源
3. **输出**：`templates/` 包含可部署的 Thymeleaf 模板 + 构建后的 CSS/JS

### 主题验证（scripts/validate-theme.mjs）

构建时自动检查：

- 11 个必需路由模板是否存在
- 每个页面必须有且仅有一个 H1
- SEO 元素（canonical、Open Graph、JSON-LD）
- 配置一致性（theme.yaml、settings.yaml、package.json 版本同步）
- 内容契约（分类、标签、作者、系列、广告位）
- 无 localhost URL 泄露

### 性能预算（scripts/check-performance-budget.mjs）

构建后检查 `templates/assets/` 的 gzip 大小：

- CSS: ≤ 48KB
- JS: ≤ 120KB
- 总计: ≤ 160KB

超出预算会导致构建失败。

### 同步冲突检测（scripts/check-sync-conflicts.mjs）

构建前阻止包含云同步冲突副本的文件（如 OneDrive/Dropbox 冲突文件）进入源码和安装包。

## 关键约束

### 主题标识

- **目录名**和 `theme.yaml` 的 `metadata.name` 必须是 `theme-rackora`
- 修改会导致 Halo 无法识别主题

### 版本同步

版本号必须在以下三处保持一致：

- `package.json` `version`
- `theme.yaml` `spec.version`
- `CHANGELOG.md` 对应章节

`pnpm test` 会验证此约束。

### 开发环境

- Halo 开发实例建议设置 `SPRING_THYMELEAF_CACHE=false` 以禁用模板缓存
- 修改 `src/` 后运行 `pnpm dev` 或 `pnpm build-only` 才会同步到 `templates/`

### SEO 和结构化数据

主题自行输出：

- 唯一 H1（每页一个）
- 绝对自指 canonical（基于当前路由）
- Open Graph / Twitter Card
- JSON-LD（WebSite、Organization、BlogPosting、TechArticle）

不依赖外部 SEO 插件，避免重复注入。

### 配置分组

`settings.yaml` 按主流 Halo 主题习惯分为 9 组：

- basic（基础）
- appearance（样式）
- home（侧边栏）
- post（文章）
- compliance（备案）
- seo（SEO）
- analytics（访问分析）
- integrations（插件）
- monetization（广告）

### 内容治理字段（annotation-setting.yaml）

通过元数据表单提供：

- 文章：主关键词、搜索意图、推广关系、内容核验日期、已审核 Pillar 标识
- 标签：索引策略、可见简介
- 栏目：精选文章

这些字段不集中在主题设置中，而是附加到对应的 Halo 内容模型。

## 调试技巧

### 查看构建输出

```bash
# 检查 Vite 是否正确处理了模板
cat templates/index.html

# 验证资源注入
ls -lh templates/assets/
```

### 查看具体验证失败

```bash
# 运行验证脚本会输出详细断言错误
node scripts/validate-theme.mjs
```

### 修改模板后未生效

1. 确认修改的是 `src/` 而非 `templates/`
2. 运行 `pnpm build-only` 重新构建
3. 在 Halo 后台"重新加载配置"
4. 清除浏览器缓存或使用无痕模式

## 发布流程

1. 同步版本号（`package.json`、`theme.yaml`、`CHANGELOG.md`）
2. 运行 `pnpm build`（会自动执行验证和打包）
3. 生成 `dist/theme-rackora-X.Y.Z.zip`
4. 创建 git 标签 `vX.Y.Z`
5. 将 ZIP 附加到 GitHub Release

## 兼容性

- Halo >= 2.20.0
- Node.js 24
- pnpm 10.33.0
- 依赖官方 RSS 插件和友情链接插件（可选）
