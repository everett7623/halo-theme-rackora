# Rackora

[English](README.en.md) | 简体中文

Rackora 是一个面向 Halo 2.x 的内容优先主题，适合独立博客、知识库、技术文档和其他长期维护的内容站点。它采用安静、低图片的出版式布局，提供响应式阅读、明暗模式、文章目录、代码高亮和完整的页面 SEO 输出。

当前版本：`v0.9.3`（Current release: `v0.9.3`）

## 适合什么站点

- 独立出版、技术写作、产品文档和个人知识库。
- 中文长标题、代码、表格和长篇文章较多的站点。
- 希望由主题处理前台结构和样式、由 Halo 插件处理搜索、RSS、评论、链接、缓存和备份的站点。

Rackora 重新实现了 Fuwari 启发的信息层级，没有复制其 Astro 组件或样式源码，也不依赖 Astro、Svelte、Tailwind 或 Pagefind 运行时。Fuwari 使用 MIT License；Rackora 本身使用 GPL-3.0。

## 主要功能

- 首页资料侧栏、社交链接、站点统计、栏目索引和按文章数排序的高频标签。
- 文章、独立页、归档、标签、栏目、作者、友情链接和 404 页面，共 11 个标准 Halo 路由模板；另含 About 和 Documentation 自定义模板。
- 响应式导航、二级菜单、返回顶部、减少动态效果，以及浅色、深色和打印样式。
- 文章作者信息、阅读进度、预计阅读时间、目录、标题锚点、复制链接、相关文章、系列和相邻文章导航。
- Highlight.js 代码高亮、按需语言包、代码复制、响应式表格、正文图片灯箱和 VPS 产品表识别。
- X、Facebook、LinkedIn、Reddit、Telegram、WhatsApp、微博、邮件和复制链接分享，可在后台逐项关闭。
- Halo 评论、搜索、页脚扩展点，以及官方 RSS 和友情链接插件适配。
- 页面级唯一 H1、自指 canonical、Open Graph、Twitter Card、面包屑和 WebSite / Organization / BlogPosting / TechArticle JSON-LD。
- 可选 GA4、Microsoft Clarity、百度统计、ICP 与公网安备信息，以及结构化广告位和推广披露。

## 兼容性

- Halo `>= 2.20.0`
- Node.js 24
- pnpm `10.33.0`

## 安装

### 使用 Release 安装

1. 从 [GitHub Releases](https://github.com/everett7623/halo-theme-rackora/releases) 下载 `theme-rackora-X.Y.Z.zip`。
2. 打开 Halo Console → 主题管理 → 上传主题，选择 ZIP 并安装。
3. 启用 Rackora；已有安装升级后，在主题管理中执行“重新加载配置”，使新增或调整的设置生效。
4. 检查站点标题、副标题、菜单、栏目 description、搜索/评论插件和页面链接。

### 从源码构建

```powershell
pnpm install
pnpm build
```

构建完成后上传 `dist/theme-rackora-X.Y.Z.zip`。主题目录名和 `theme.yaml` 的 `metadata.name` 必须保持为 `theme-rackora`。

## Logo 配置

Logo 上传入口在 **主题设置 → 外观**，不是 SEO 分组中的“站点组织 Logo”。安装或升级后，如果没有看到新字段，请先在主题管理中点击“重新加载配置”。

1. 在“Logo 展示方式”中选择一种模式。
2. 选择 `1:1 方形 Logo + 站点标题`：在下方上传“1:1 方形 Logo”。页头和首页资料卡显示方形图片，并显示 Halo 站点标题与副标题。
3. 选择 `3:1 横向 Logo（图片自带文字）`：在下方上传“3:1 横向 Logo”。页头和首页资料卡直接显示图片，不再重复显示标题文字。

推荐上传 SVG、PNG 或 WebP。当前模式对应的上传控件才会显示；切换模式不会删除另一张图片。未上传时的回退顺序如下：

- 方形模式：主题方形 Logo → Halo“站点设置”中的站点 Logo → Rackora 默认图标。
- 横向模式：主题横向 Logo → 方形 Logo + 站点标题。

SEO 分组中的“站点组织 Logo”只用于 Organization / WebSite 结构化数据，不控制前台页头或首页资料卡。

## 主题设置

后台设置分为 9 组：

| 分组   | 主要内容                                                               |
| ------ | ---------------------------------------------------------------------- |
| 基础   | 界面语言、网站语言/地区、社交链接、RSS、页脚、署名、站点统计和建站日期 |
| 外观   | Logo 模式与上传、配色、强调色、封面、横幅、首页文案、全站宽度和字号    |
| 侧边栏 | 首页侧栏、资料卡、栏目、高频标签和标签数量                             |
| 文章   | 文章侧栏、分享平台、灯箱、相关文章、系列和许可声明                     |
| 插件   | 官方友情链接页面和页脚入口                                             |
| SEO    | 标签/归档索引策略、站点验证和 Organization 实体                        |
| 分析   | GA4、Microsoft Clarity 和百度统计 ID，默认关闭                         |
| 广告   | 开关、披露文案和可排序广告位                                           |
| 备案   | ICP 与公网安备号及跳转地址                                             |

标题、副标题和全站 description 直接使用 Halo 系统资料。主题设置中的旧 `content.*` / `stats.*` 配置仍会兼容读取。

## 插件边界

Rackora 内置前端布局、代码高亮、目录、标签展示、返回顶部、前台统计接入和页面 SEO 结构。它不替代服务端 Sitemap、搜索、RSS、评论、友情链接、缓存、备份、认证或内容存储。

建议保留 Halo 官方 Sitemap、Search Widget、RSS、Comment Widget、Links、Page Static Cache 和 Automatic Backup。旧主题留下的 Time Factor SEO 等插件不是 Rackora 依赖；与 Rackora 同时启用会重复输出 canonical、Open Graph 和文章 JSON-LD。完整职责说明见 [`docs/plugin-compatibility.md`](docs/plugin-compatibility.md)。

## 内容编辑字段

主题提供以下 Halo 元数据字段：

- 文章：主关键词、搜索意图、推广关系、内容核验日期、下次复核日期和人工确认的 Pillar 标识。
- 标签：索引策略和可见简介。
- 栏目：精选文章入口。

主关键词仅用于编辑审核，不输出无 SEO 价值的 `meta keywords`；主题不会根据标签自动猜测 Pillar。

## 开发与验证

```powershell
pnpm install
pnpm check
pnpm build-only
pnpm test
pnpm test:budget
pnpm build
pnpm preview
```

- `src/`：主题源码；修改模板时只改这里，不手改 `templates/`。
- `public/`：不经构建处理的静态资源。
- `templates/`：Vite 构建产物，Halo 实际读取的模板目录。
- `scripts/validate-theme.mjs`：路由、H1、内容契约、设置和扩展点检查。
- `scripts/create-preview.mjs`：生成本地视觉预览夹具，不替代 Halo 运行时测试。

开发 Halo 实例时建议设置 `SPRING_THYMELEAF_CACHE=false`。`pnpm build` 会执行构建、静态检查、性能预算和可复现 ZIP 打包；安装包限制在 `400 KiB` 内，`dist/` 只保留当前版本 ZIP。

## SEO 责任边界

Rackora 输出当前路由的自指 canonical、Open Graph、Twitter Card、可见面包屑、作者/日期语义和 JSON-LD。标签和归档的 `noindex` 策略可在后台配置，但不会修改 Sitemap。

自定义 canonical、内容合并、重定向、Sitemap 管理、反向代理修复和搜索引擎 Rich Results 验证属于站点运维工作。停用冲突的 SEO 插件并清理页面缓存后，请在目标 Halo 实例抽查首页、文章、栏目和标签页的 `<head>`。

## 版本与发布

Rackora 使用语义化版本：修复递增 PATCH，向后兼容的新功能递增 MINOR，不兼容调整递增 MAJOR。发布时同步更新 `package.json`、`theme.yaml`、`README.md`、`README.en.md` 和 [`CHANGELOG.md`](CHANGELOG.md)，创建 `vX.Y.Z` 标签并核对 GitHub Release 中的 ZIP SHA-256。

## 许可证

[GPL-3.0](LICENSE)
