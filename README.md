# Rackora

Rackora is a minimal, content-first Halo 2.x theme for independent publishing, knowledge bases,
and technical writing. It combines a Fuwari-inspired information hierarchy with the low-image
article flow, dark mode, and responsive reading experience common to modern publishing themes.

## 设计原则

- 适合独立博客、知识库、技术文档和内容型站点，并能承载中文长标题。
- 借鉴 [Fuwari](https://github.com/saicaca/fuwari) 的信息层级，不依赖 Astro、Svelte、
  Tailwind 或 Pagefind 运行时。
- 默认不显示横幅、列表封面和正文封面；图片可继续用于分享或由站点主动开启。
- 首页标签云不枚举全部标签，避免放大站点当前的标签结构债务。
- 文章列表采用分隔线而非卡片墙，使用安静的技术出版风；VPS 配置表、代码、目录和核验
  信息优先。
- SEO 元数据由 Halo 注入，主题不重复输出 canonical、description、Open Graph 或
  Twitter Card。
- 栏目是一级内容类型导航，标签只做受控的二级筛选；主题不根据标签猜测 Pillar。
- 合并、`noindex`、canonical 和重定向由内容治理决定，不由页面模板硬编码。

Fuwari 采用 MIT License。Rackora 没有复制其 Astro 组件或样式源码，仅将布局与交互模式
重新实现为 Halo Thymeleaf 模板。

## 功能

- 首页可选横幅、带可排序社交链接的站点资料侧栏、栏目索引和低图片文章流。
- 首页、文章、独立页、归档、标签、栏目、作者、友情链接和 404 共 11 个 Halo 路由模板。
- 响应式导航、明暗模式、返回顶部和减少动态效果适配。
- 文章署名、阅读进度、预计阅读时间、自动目录、标题锚点和相邻文章导航。
- Highlight.js 按需语言包、代码复制、横向表格容器和 VPS 产品表识别。
- 评论插件、搜索组件和 Halo 页脚扩展点。
- Halo 官方友情链接插件、RSS 自动发现，以及可选 GA4、Microsoft Clarity 和百度统计。
- 栏目页唯一 H1，并复用 Halo 栏目 description。
- Affiliate 披露样式和已有 `rel="sponsored"` 链接标记，不自动误判普通资料外链。
- 浅色、深色、打印和移动端样式。

## 兼容性

- Halo `>= 2.20.0`
- Node.js 24
- pnpm 10.33.0

## 安装

1. 从 Release 下载主题 ZIP，或在仓库根目录执行 `pnpm install && pnpm build`。
2. 在 Halo Console 的主题管理中上传生成的 ZIP 并安装。
3. 启用前检查站点菜单、Logo、标题、副标题、栏目 description 和搜索/评论插件。
4. 启用后分别验证首页、文章、独立页、归档、栏目、标签、作者和 404 页面。

主题目录名和 `theme.yaml` 的 `metadata.name` 必须保持为 `theme-rackora`。

## 主题设置

主题后台按职责分为 7 组：

| 分组       | 设置                                                         |
| ---------- | ------------------------------------------------------------ |
| 资料       | 社交账号、语言、地区、RSS、页脚说明、可选站点统计/运行时间   |
| 外观       | 默认配色、强调色、可选首页横幅                               |
| 内容       | 文章封面模式、首页侧栏、正文侧栏文章和评论                   |
| SEO        | 标签/归档索引策略、站点验证、Organization 实体               |
| 统计       | 可选 GA4、Microsoft Clarity 和百度统计，默认关闭             |
| 集成       | Halo 官方友情链接页面和页脚入口                              |
| 广告与联盟 | 总开关、统一披露文案、可排序广告位、位置、图片和推广跳转地址 |

首页横幅留空、文章封面选择“不显示”即为默认少图方案。目录、阅读时间和代码复制按内容
自动启用。站点标题、Logo、副标题、全站 description、canonical、Open Graph 和 Twitter
Card 直接复用 Halo 系统资料，避免主题设置产生两套互相冲突的数据。

页脚统计默认关闭；开启后复用 Halo 的文章、评论与访问量统计。建站日期使用 `YYYY-MM-DD`
即可显示运行天数，不调用外部统计接口。

统计设置只接受 GA4 Measurement ID、Clarity Project ID 或百度统计站点 ID，不接受任意脚本。启用统计前请根据
访问者所在地完成隐私政策、Cookie 告知和同意管理。RSS 依赖 Halo 官方 RSS 插件，友情链接
依赖 Halo 官方链接管理插件；插件不存在时主题不会渲染对应入口。

广告位支持首页文章区顶部、首页右侧栏、正文前和正文后。主题只接受结构化文字/图片广告，
不会执行广告脚本；推广地址自动增加 `sponsored nofollow noopener noreferrer`，广告总开关
默认关闭。

## 内容编辑字段

主题通过 Halo 元数据表单提供与内容治理相关的字段：

- 文章：主关键词、搜索意图、推广关系、内容核验日期、下次复核日期和已审核 Pillar 标识。
- 标签：索引策略与可见简介，可为保留标签单独允许索引。
- 栏目：精选文章，用于栏目页的“精选内容”入口。

这些字段出现在对应文章、标签和栏目编辑页，不集中堆放在主题设置中。主关键词只用于编辑
审核，不输出无 SEO 价值的 `meta keywords`；Pillar 只接受人工确认值，主题不根据标签猜测。

## 开发

```powershell
pnpm install
pnpm build-only
pnpm test
pnpm test:budget
pnpm preview
```

- `src/`：主题源码，包含页面、局部模板、CSS 和 TypeScript。
- `public/`：不经构建处理的静态资源。
- `templates/`：Vite 构建输出，Halo 实际读取的模板目录。
- `scripts/validate-theme.mjs`：路由、H1、内容契约、配置和扩展点静态检查。
- `scripts/check-performance-budget.mjs`：构建后 CSS/JS gzip 预算检查。
- `scripts/create-preview.mjs`：生成不进入主题包的本地视觉夹具，不替代 Halo 运行时测试。

`pnpm dev` 持续构建 `templates/`。开发 Halo 实例建议设置
`SPRING_THYMELEAF_CACHE=false`。

## 版本与发布

Rackora 使用语义化版本：修复递增补丁号，向后兼容的新功能递增次版本号，不兼容调整递增主版本号。
每次发布必须同步修改 `package.json`、`theme.yaml` 和 [`CHANGELOG.md`](CHANGELOG.md)，提交后创建
`vX.Y.Z` 标签，并将 `dist/theme-rackora-X.Y.Z.zip` 附加到同版本 GitHub Release。`pnpm test`
会阻止两个版本号不一致的提交。

## SEO 边界

主题已覆盖 Joe3 `1.5.1-seo.3` 补丁中的唯一 H1、栏目简介与临时标签
`noindex,follow` 策略，并在正文中输出作者、摘要、发布时间、更新时间、内容核验日期、可见
面包屑、`BlogPosting` 和 `BreadcrumbList`。标签可以逐项覆盖全局索引策略。索引、合并、
canonical 和重定向仍必须由内容治理结果决定。下列工作不属于主题单独可完成的范围：

- 从 Halo sitemap 移除低价值标签 URL。
- 为保留标签和栏目撰写独立简介、精选内容与真实 meta description。
- 修复反向代理或 Halo 路由层的 HEAD 404。
- 在线验证 BlogPosting、Breadcrumb、canonical 和 Rich Results。
- 迁移、合并或删除历史标签引用。
- 在 P2-03 完成前渲染或推断 Pillar / Cluster 新字段。

部署前后的操作门禁和站点任务仍以 `D:\EvenFrank\Workspace\Halo\1vps.top\plan` 为准。

## 许可证

[GPL-3.0](LICENSE)
