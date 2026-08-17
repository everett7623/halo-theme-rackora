# Rackora

Rackora is a minimal, content-first Halo 2.x theme for independent publishing, knowledge bases,
and technical writing. It combines a Fuwari-inspired information hierarchy with the low-image
article flow, dark mode, and responsive reading experience common to modern publishing themes.

Current release: `v0.7.0`.

## 设计原则

- 适合独立博客、知识库、技术文档和内容型站点，并能承载中文长标题。
- 借鉴 [Fuwari](https://github.com/saicaca/fuwari) 的信息层级，不依赖 Astro、Svelte、
  Tailwind 或 Pagefind 运行时。
- 默认不显示横幅、列表封面和正文封面；图片可继续用于分享或由站点主动开启。
- 首页标签云不枚举全部标签，避免放大站点当前的标签结构债务。
- 文章列表采用分隔线而非卡片墙，使用安静的技术出版风；VPS 配置表、代码、目录和核验
  信息优先。
- Halo 注入标准 description；主题按路由输出唯一自指 canonical、Open Graph 和
  Twitter Card，并在正文页输出动态 `BlogPosting` JSON-LD。
- 栏目是一级内容类型导航，标签只做受控的二级筛选；主题不根据标签猜测 Pillar。
- 合并、`noindex`、自定义 canonical 和重定向由内容治理决定；主题只输出当前路由的自指 canonical。

Fuwari 采用 MIT License。Rackora 没有复制其 Astro 组件或样式源码，仅将布局与交互模式
重新实现为 Halo Thymeleaf 模板。

## 功能

- 首页可选横幅、带可排序社交链接的站点资料侧栏、原生站点统计、栏目索引和低图片文章流。
- 主题界面默认英文，可在后台切换简体中文；站点内容与菜单保持原语言。
- 首页按文章数展示可配置数量的高频标签，标签汇总页保留完整列表，标签名称不添加 `#`。
- 首页、文章、独立页、归档、标签、栏目、作者、友情链接和 404 共 11 个 Halo 路由模板，另含 About / Documentation 自定义模板。
- 归档按日期、标题和主分类三列展示，移动端将分类移至标题下方。
- 响应式导航支持二级子菜单、长菜单滚动和 `Esc` 关闭，并适配明暗模式、返回顶部和减少动态效果。
- 文章署名、阅读进度、预计阅读时间、自动目录（含移动端抽屉）、标题锚点、复制链接、相关文章和相邻文章导航。
- 分享栏支持 X、Facebook、LinkedIn、Reddit、Telegram、WhatsApp、微博、邮件与复制链接，并可在后台逐项开关。
- 桌面文章侧栏使用轻量表面、强调边与更高文字对比度，目录、最新文章和评论更易扫描。
- Fuwari 启发的正文标题标记、行内代码、代码块和文末作者/许可声明。
- Highlight.js 按需语言包（含 Python/Go/Rust/Java/SQL/CSS 等）、代码复制、横向表格容器、正文图片灯箱和 VPS 产品表识别。
- 评论插件、搜索组件和 Halo 页脚扩展点。
- Halo 官方友情链接插件、RSS 自动发现，以及可选 GA4、Microsoft Clarity 和百度统计。
- 可选择 Halo 菜单作为页脚导航，并支持可选 ICP 与公网安备信息。
- 主导航当前页高亮，以及可关闭的主题署名。
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
3. 更新已有安装时，在主题管理中执行“重新加载配置”，使新增设置分组生效。
4. 启用前检查站点菜单、Logo、标题、副标题、栏目 description 和搜索/评论插件。
5. 启用后分别验证首页、文章、独立页、归档、栏目、标签、作者和 404 页面。

主题目录名和 `theme.yaml` 的 `metadata.name` 必须保持为 `theme-rackora`。

## 主题设置

主题后台按主流 Halo 主题习惯分为 9 组：

| 分组     | 设置                                                           |
| -------- | -------------------------------------------------------------- |
| 基础     | 界面/网站语言、地区、社交、RSS、页脚、署名、站点统计与建站日期 |
| 样式     | 配色、强调色、封面、横幅、首页眉题/短句、正文宽度与字号        |
| 侧边栏   | 首页侧栏总开关、资料卡、分类、高频标签及数量                   |
| 文章     | 侧栏、分享平台、灯箱、相关文章、系列、许可声明                 |
| 备案     | 可选 ICP 与公网安备号及跳转链接                                |
| SEO      | 标签/归档索引策略、站点验证、Organization 实体                 |
| 访问分析 | 可选 GA4、Microsoft Clarity 和百度统计，默认关闭               |
| 插件     | Halo 官方友情链接页面和页脚入口                                |
| 广告     | 总开关、统一披露文案、可排序广告位                             |

命名对齐 Earth / Stack / Hao 等常见主题（基础、样式、文章、备案、插件），首页侧栏独立为「侧边栏」页签，并保留 SEO 能力。从旧版升级后请“重新加载配置”；旧 `content.*` / `stats.*` 仍会回退读取。

首页横幅留空、文章封面选择“不显示”即为默认少图方案。目录、阅读时间和代码复制按内容
自动启用。站点标题、Logo、副标题和全站 description 直接复用 Halo 系统资料；主题基于
实际路由生成 canonical、Open Graph 和 Twitter Card，避免后台再维护一套重复 SEO 数据。

首页站点统计默认开启，在首页侧栏以轻量指标展示访问、文章、评论和分类累计数据；页脚不再重复统计。建站日期使用 `YYYY-MM-DD` 即可在统计区域显示运行天数，
不调用外部统计接口。

页脚菜单留空时使用主题自带的归档、栏目、标签等链接，也可以选择 Halo 中已有的菜单。备案号为空时
不会生成备案区域；公网安备链接建议填写对应备案记录的官方详情地址。

访问分析设置只接受 GA4 Measurement ID、Clarity Project ID 或百度统计站点 ID，不接受任意脚本。启用访问分析前请根据
访问者所在地完成隐私政策、Cookie 告知和同意管理。RSS 依赖 Halo 官方 RSS 插件，友情链接
依赖 Halo 官方链接管理插件；插件不存在时主题不会渲染对应入口。

已安装插件的职责边界与精简顺序见
[`docs/plugin-compatibility.md`](docs/plugin-compatibility.md)。Rackora 内置代码高亮、目录、
标签展示、返回顶部和前端统计接入，但不替代 Sitemap、搜索、RSS、评论、缓存、备份与数据存储。

从旧主题或其他内容栈迁过来的站点，后台常残留「时间因子 SEO」等与主题无关的插件。它们不是
Rackora 依赖，也不应植入主题；与 Rackora 同开会重复 canonical / Open Graph / 文章 JSON-LD。
停用后清页面静态缓存，再抽查文章、栏目和标签页的 `<head>`。

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
pnpm build
pnpm preview
```

- `src/`：主题源码，包含页面、局部模板、CSS 和 TypeScript。
- `public/`：不经构建处理的静态资源。
- `templates/`：Vite 构建输出，Halo 实际读取的模板目录。
- `scripts/validate-theme.mjs`：路由、H1、内容契约、配置和扩展点静态检查。
- `scripts/check-performance-budget.mjs`：构建后 CSS/JS gzip 预算检查。
- `scripts/check-sync-conflicts.mjs`：构建前阻止同步冲突副本进入源码与安装包。
- `scripts/create-preview.mjs`：生成不进入主题包的本地视觉夹具，不替代 Halo 运行时测试。

`pnpm build` 会依次执行 TypeScript/Vite 构建、主题校验、性能预算检查和可复现 ZIP 打包。
`pnpm dev` 持续构建 `templates/`。开发 Halo 实例建议设置 `SPRING_THYMELEAF_CACHE=false`。

## 版本与发布

Rackora 使用语义化版本：修复递增补丁号，向后兼容的新功能递增次版本号，不兼容调整递增主版本号。
每次发布必须同步修改 `package.json`、`theme.yaml` 和 [`CHANGELOG.md`](CHANGELOG.md)，提交后创建
`vX.Y.Z` 标签，并将 `dist/theme-rackora-X.Y.Z.zip` 附加到同版本 GitHub Release。`pnpm test`
会阻止两个版本号不一致的提交。

## SEO 边界

Rackora 自行输出：唯一 H1、绝对自指 canonical、Open Graph / Twitter Card（含文章
`article:published_time` / `article:modified_time`）、可见面包屑、作者与日期语义、
`WebSite` / `Organization` / 动态 `BlogPosting`（文档模板为 `TechArticle`）JSON-LD。
标签可逐项覆盖全局 `noindex` 策略；主关键词与 Pillar 字段仅供编辑审核，不输出无效的
`meta keywords`，也不根据标签自动推断结构。

自定义 canonical、内容合并、重定向，以及百度 / 字节等平台专用注入，不属于主题范围。下列工作
仍须在站点侧完成：

- 停用与主题冲突的旧 SEO 插件（见插件兼容文档），并清理页面缓存。
- 用官方 Sitemap 管理 URL 收录；主题的 `noindex` 不会改 sitemap。
- 为保留标签和栏目撰写真实简介与精选内容。
- 修复反向代理或路由层的 HEAD 404，并在线验证 Rich Results。

部署前后请在目标 Halo 实例验证主题配置、插件列表、页面响应和 SEO 输出。

## 许可证

[GPL-3.0](LICENSE)
