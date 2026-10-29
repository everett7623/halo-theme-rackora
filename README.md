<div align="center">

<img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/public/assets/images/rackora-mark.svg" alt="Rackora" width="96" height="96" />

# Rackora

[English](README.en.md) | 简体中文

</div>

Rackora 是一个面向 Halo 2.x 的内容优先主题，适合独立博客、知识库、技术文档和其他长期维护的内容站点。它采用安静、低图片的出版式布局，提供响应式阅读、明暗模式、文章目录、代码高亮和完整的页面 SEO 输出。

当前版本：`v0.9.9`

Current release: `v0.9.9`

- 许可证：[GPL-3.0](LICENSE)（免费主题，无应用市场内购）
- 兼容 Halo：`>= 2.20.0`
- 问题反馈：[GitHub Issues](https://github.com/everett7623/halo-theme-rackora/issues)
- 源码仓库：[halo-theme-rackora](https://github.com/everett7623/halo-theme-rackora)
- 在线预览：[1vps.top](https://1vps.top/)

![Rackora 应用市场封面](https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/marketplace-cover.png)

## 界面预览

### 前台页面

|                                                                           首页（浅色）                                                                           |                                                                    首页（深色）                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------: |
|       <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/home-light.png" alt="首页浅色模式" width="600" />       | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/home-dark.png" alt="首页深色模式" width="600" /> |
|                                                                            **文章页**                                                                            |                                                                     **手机端**                                                                      |
| <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/post.png" alt="文章页：目录、分享栏与版权声明" width="600" /> | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/home-mobile.png" alt="手机端首页" width="240" /> |
|                                                                            **归档页**                                                                            |                                                                     **关于页**                                                                      |
|           <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/archives.png" alt="归档页" width="600" />           |      <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/about.png" alt="关于页" width="600" />      |
|                                                                            **分类页**                                                                            |                                                                    **标签列表**                                                                     |
|           <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/category.png" alt="分类页" width="600" />           |     <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/tags.png" alt="标签列表" width="600" />      |

### 后台设置

|                                                                                主题详情                                                                                |                                                                           基础                                                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/console-theme-detail.png" alt="Console 中的主题详情" width="600" /> |   <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-basic.png" alt="基础设置" width="600" />   |
|                                                                                **外观**                                                                                |                                                                        **侧边栏**                                                                        |
|       <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-appearance.png" alt="外观设置" width="600" />        | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-sidebar.png" alt="侧边栏设置" width="600" /> |
|                                                                                **文章**                                                                                |                                                                         **插件**                                                                         |
|          <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-post.png" alt="文章设置" width="600" />           |  <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-plugins.png" alt="插件设置" width="600" />  |
|                                                                                **SEO**                                                                                 |                                                                         **分析**                                                                         |
|           <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-seo.png" alt="SEO 设置" width="600" />           | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-analytics.png" alt="分析设置" width="600" /> |
|                                                                                **广告**                                                                                |                                                                         **备案**                                                                         |
|           <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-ads.png" alt="广告设置" width="600" />           |  <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-filing.png" alt="备案设置" width="600" />   |

分析与广告分组默认关闭，截图为开启后显示的完整选项。

## 适合什么站点

- 独立出版、技术写作、产品文档和个人知识库。
- 中文长标题、代码、表格和长篇文章较多的站点。
- 希望由主题处理前台结构和样式，由 Halo 插件处理搜索、RSS、评论、友情链接、缓存和备份的站点。

Rackora 的信息层级受到 [Fuwari](https://github.com/saicaca/fuwari)（Astro 静态博客主题，MIT License）启发，使用独立的 Halo / Thymeleaf 实现。它不是任何 Halo 主题的 Fork，也没有复制 Fuwari 的 Astro 组件或样式源码，运行时不依赖 Astro、Svelte、Tailwind 或 Pagefind。

## 主要功能

- 首页资料侧栏、社交链接、站点统计、分类索引和按文章数排序的高频标签。
- 文章、独立页、归档、标签、分类、作者、友情链接和 404 页面，共 11 个标准 Halo 路由模板；另含关于页（About）和文档（Documentation）自定义模板。
- 响应式导航、二级菜单、返回顶部、减少动态效果，以及浅色、深色和打印样式。
- 文章作者信息、阅读进度、预计阅读时间、目录、标题锚点、复制链接、相关文章、系列和相邻文章导航。
- Highlight.js 代码高亮（内置 Bash、CSS、Dockerfile、Go、INI、Java、JavaScript、JSON、Nginx、Python、Rust、SCSS、SQL、TypeScript、HTML/XML、YAML 共 16 种语言，其他语言保持纯文本显示）、代码复制、响应式表格、正文图片灯箱。
- X、Facebook、LinkedIn、Reddit、Telegram、WhatsApp、微博、邮件和复制链接分享，可在后台逐项关闭。
- Halo 评论、搜索、页脚扩展点，以及官方 RSS 和友情链接插件适配。
- 页面级唯一 H1、自指 canonical、Open Graph、Twitter Card、面包屑和 WebSite / Organization / BlogPosting / TechArticle JSON-LD。
- 可选 GA4、Microsoft Clarity、百度统计、ICP 与公网安备信息，以及结构化广告位和推广披露；上述能力默认关闭。

## 兼容与依赖

**运行时只需要 Halo `>= 2.20.0`。** Node.js 和 pnpm 仅用于从源码构建，安装 ZIP 后不需要。

主题可单独安装、启用、切换和卸载。下列官方插件均为可选，未安装时对应入口隐藏，不影响阅读主路径：

| 能力     | 插件                                                        | 未安装时的表现     |
| -------- | ----------------------------------------------------------- | ------------------ |
| 站内搜索 | [Search Widget](https://www.halo.run/store/apps/app-DlacW)  | 不显示搜索按钮     |
| 评论     | [Comment Widget](https://www.halo.run/store/apps/app-YXyaD) | 不渲染评论区       |
| RSS      | [RSS](https://www.halo.run/store/apps/app-KhIVw)            | 不输出订阅发现链接 |
| 友情链接 | [友情链接](https://www.halo.run/store/apps/app-hfbQg)       | `/links` 无数据    |
| Sitemap  | [Sitemap](https://www.halo.run/store/apps/app-QDFMI)        | 主题不生成 Sitemap |

建议同时保留官方页面静态缓存和自动备份。完整职责说明见 [`docs/plugin-compatibility.md`](docs/plugin-compatibility.md)。

## 安装

1. 从 [GitHub Releases](https://github.com/everett7623/halo-theme-rackora/releases) 下载 `theme-rackora-X.Y.Z.zip`。不要解压后再打包；上传的必须是发布产物本身。
2. 打开 Halo Console → 主题 → 上传主题，选择 ZIP 并安装。
3. 启用 Rackora。
4. 在主题管理中执行“重新加载配置”，使设置表单和默认值生效。
5. 检查站点标题、副标题、主菜单、分类描述，以及搜索 / 评论 / RSS / 友情链接插件是否按需启用。

主题目录名和 `theme.yaml` 的 `metadata.name` 必须保持为 `theme-rackora`。

安装后默认界面语言是简体中文，网站语言默认为 `zh-CN`。若需要英文主题文案，到 **主题设置 → 基础 → 主题界面语言** 选择 English，并把「网站语言」改为 `en-US`。站点标题、文章和菜单内容仍使用 Halo 里已有的内容，不会被这项设置改写。

## 使用

1. 在 Halo「外观 → 菜单」配置主菜单；主题读取主菜单，并支持二级菜单。
2. 在 **主题设置 → 外观** 选择 Logo 展示方式并上传对应图片，见下方 [Logo 配置](#logo-配置)。
3. 按需填写基础、侧边栏、文章、SEO、备案等分组。标题、副标题和全站 description 使用 Halo 系统站点资料，不要在主题设置里重复填写。
4. 需要「关于」页时：新建独立页，模板选择 **关于页（About）**。该模板会显示资料卡、社交链接和所选 Logo。
5. 需要文档式长文时：编辑文章，模板选择 **文档（Documentation）**。该模板保持目录常驻，适合技术说明。
6. 友情链接页依赖官方友情链接插件；启用插件后访问 `/links`。
7. 评论和搜索由对应官方插件提供；主题只在插件可用时显示入口。

## Logo 配置

Logo 上传入口在 **主题设置 → 外观**，不是 SEO 分组中的“站点组织 Logo”。安装或升级后如果没有看到新字段，请先在主题管理中点击“重新加载配置”。

1. 在“Logo 展示方式”中选择一种模式。
2. 选择 `1:1 方形 Logo + 站点标题`：上传“1:1 方形 Logo”。页头、首页资料卡和 About 模板显示方形图片，并显示 Halo 站点标题与副标题。
3. 选择 `3:1 横向 Logo（图片自带文字）`：上传“3:1 横向 Logo”。页头、首页资料卡和 About 模板直接显示图片；页头与资料卡不再重复显示标题文字。

推荐上传 SVG、PNG 或 WebP。当前模式对应的上传控件才会显示；切换模式不会删除另一张图片。未上传时的回退顺序：

- 方形模式：主题方形 Logo → Halo「站点设置」中的站点 Logo → Rackora 默认图标。
- 横向模式：主题横向 Logo → 方形 Logo + 站点标题。

SEO 分组中的“站点组织 Logo”只用于 Organization / WebSite 结构化数据，不控制前台页头、首页资料卡或 About 模板。

## 主题设置

后台设置分为 9 组，均有可安全使用的默认值：

| 分组   | 主要内容                                                               |
| ------ | ---------------------------------------------------------------------- |
| 基础   | 界面语言、网站语言/地区、社交链接、RSS、页脚、署名、站点统计和建站日期 |
| 外观   | Logo 模式与上传、配色、强调色、封面、横幅、首页文案、全站宽度和字号    |
| 侧边栏 | 首页侧栏、资料卡、分类、高频标签和标签数量                             |
| 文章   | 文章侧栏、分享平台、灯箱、相关文章、系列和许可声明                     |
| 插件   | 官方友情链接页面和页脚入口                                             |
| SEO    | 标签/归档索引策略、站点验证和 Organization 实体                        |
| 分析   | GA4、Microsoft Clarity 和百度统计 ID，默认关闭                         |
| 广告   | 开关、披露文案和可排序广告位，默认关闭                                 |
| 备案   | ICP 与公网安备号及跳转地址                                             |

主题设置中的旧 `content.*` / `stats.*` 配置在升级后仍会兼容读取。

## 升级

1. 备份 Halo 数据，或确认自动备份可用。
2. 上传新版本 ZIP，或在后续上架应用市场后通过应用市场更新。
3. 在主题管理中执行“重新加载配置”。
4. 抽查首页、文章、分类、标签、归档、独立页和 404。
5. 若启用了页面静态缓存，升级后清理缓存再复查 `<head>`。

已有设置键会保留。新增字段使用主题默认值，不会清空旧配置。从其他主题切到 Rackora，或从 Rackora 切走再切回，都不需要手工修复内容。

## 停用与卸载

1. 先切换到其他主题，确认前台可访问。
2. 再停用或卸载 Rackora。
3. 卸载主题不会删除文章、独立页、附件、评论或菜单。
4. 文章 / 标签 / 分类上的 Rackora 元数据字段会留在 Halo 内容对象中，但不影响其他主题渲染。
5. 主题配置保存在 Halo ConfigMap 中；卸载后如需彻底清理，在备份后再按 Halo 常规方式处理。

## 插件边界

Rackora 负责前端布局、代码高亮、目录、标签展示、返回顶部、前台统计接入和页面 SEO 结构。它不替代服务端 Sitemap、搜索、RSS、评论、友情链接、缓存、备份、认证或内容存储。

旧主题可能留下 Time Factor SEO 等插件。它们不是 Rackora 依赖；同时启会重复输出 canonical、Open Graph 和文章 JSON-LD。请停用这类冲突插件，清理页面缓存，再抽查首页、文章、分类和标签页的 `<head>`。

## 内容编辑字段

主题为 Halo 内容模型附加以下元数据，供编辑审核使用：

- 文章：主关键词、搜索意图、推广关系、内容核验日期、下次复核日期、人工确认的 Pillar 标识和系列。
- 标签：索引策略和可见简介。
- 分类：精选文章入口。

主关键词仅用于编辑审核，不输出无 SEO 价值的 `meta keywords`；主题不会根据标签自动猜测 Pillar。

## 隐私、统计与外部服务

### 主题自身的行为

- 主题不设置 Cookie，不收集、上传或出售访客信息、站点内容、评论或访问日志，也没有自建统计接口。
- 字体、图标和代码高亮随主题打包，从站点自身域名加载；默认安装不请求任何第三方域名。
- 访客手动切换明暗模式时，选择以 `rackora-color-scheme`（值为 `light` 或 `dark`）保存在浏览器 `localStorage` 中，只在本机生效，不会发送到服务器；清除该站点的浏览器数据即可删除。
- 「复制链接」和「复制代码」只在访客点击时写入本机剪贴板。
- 分享按钮是普通链接，页面加载时不请求社交平台，访客点击后才跳转到所选平台。
- 文章阅读量和首页站点统计由 Halo 自身记录，评论、搜索、RSS 由 Halo 或对应插件处理，主题只读取并展示。

### 需要管理员开启的外部服务

| 能力              | 设置位置 | 外部地址                       | 默认 |
| ----------------- | -------- | ------------------------------ | ---- |
| GA4               | 分析     | `www.googletagmanager.com`     | 关闭 |
| Microsoft Clarity | 分析     | `www.clarity.ms`               | 关闭 |
| 百度统计          | 分析     | `hm.baidu.com`                 | 关闭 |
| 站点验证 meta     | SEO      | 无网络请求，只输出验证标签     | 空   |
| 主题广告位        | 广告     | 仅在填写了跳转地址时链到该地址 | 关闭 |
| 社交分享按钮      | 文章     | 点击后跳转到对应用户选择的平台 | 开启 |

### 第三方统计的数据处理

开启「启用第三方访问分析」并填写服务 ID 后，访客浏览器会直接从服务方加载脚本，并把访问数据发送给服务方。这些数据不经过主题，也不保存在 Halo 中，主题无法查看或删除。数据类别、保存期限和删除方式由各服务方决定；以下内容依据服务方公开文档整理，请以其最新说明为准。

**Google Analytics 4**（脚本：`www.googletagmanager.com/gtag/js`）

- 数据类别：页面地址与标题、来源页、设备、浏览器、操作系统、屏幕与语言、根据 IP 推断的大致位置，以及页面浏览、滚动、外链点击等事件（取决于 GA 后台的增强型衡量设置）。Google 说明 Google Analytics 不记录或存储 IP 地址。
- 浏览器存储：`_ga`、`_ga_<ID>` 等第一方 Cookie，用于区分访客与会话。
- 保存与删除：数据保存在 Google 服务器。用户级和事件级数据的保留期在 GA 后台「数据保留」中设置（标准媒体资源为 2 或 14 个月），到期自动删除，标准汇总报告不受此设置影响；单个访客的数据可通过「用户探索」或 User Deletion API 删除，也可以删除整个媒体资源。
- 政策与说明：[Google 隐私权政策](https://policies.google.com/privacy) · [Google Analytics 数据保护](https://support.google.com/analytics/answer/6004245) · [数据保留](https://support.google.com/analytics/answer/7667196)

**Microsoft Clarity**（脚本：`www.clarity.ms/tag/<项目 ID>`）

- 数据类别：点击、滚动、鼠标移动、窗口尺寸变化等交互事件，用于会话回放和热图的页面结构与内容（输入框内容始终遮盖），页面性能与错误信息，设备与浏览器信息，以及根据 IP 推断的地理位置。
- 浏览器存储：`_clck`、`_clsk` 等 Cookie，完整列表见 Clarity Cookie 说明。
- 保存与删除：数据存储在 Microsoft Azure。站点所有者可在录制后 30 天内查看数据，收藏和随机抽样的录制最长保留 9 个月。Clarity 不支持删除单个访客或单条录制，只能删除整个项目，删除后无法恢复。
- 政策与说明：[Microsoft 隐私声明](https://privacy.microsoft.com/privacystatement) · [Clarity 常见问题](https://learn.microsoft.com/clarity/faq) · [数据收集说明](https://learn.microsoft.com/clarity/setup-and-installation/clarity-data) · [Cookie 说明](https://learn.microsoft.com/clarity/setup-and-installation/clarity-cookies)

**百度统计**（脚本：`hm.baidu.com/hm.js?<站点 ID>`）

- 数据类别：访问的页面与来源、访问时间，以及 IP 地址、浏览器类型与语言、操作系统、设备信息等日志信息。
- 浏览器存储：`HMACCOUNT`（访客 ID）、`Hm_lvt_<站点 ID>`（历史访问时间，1 年）、`Hm_lpvt_<站点 ID>`（本次访问时间，会话结束失效）等 Cookie。
- 保存与删除：百度统计隐私政策说明，个人信息存储在中华人民共和国境内，并在使用服务期间持续保存；其服务条款约定，站点所有者不得要求百度统计删除已收集的数据。访客可以删除浏览器 Cookie，或按隐私政策中的联系方式提出请求。
- 政策与说明：[百度统计隐私政策](https://tongji.baidu.com/web/help/article?id=330&type=0) · [服务条款](https://tongji.baidu.com/holmes/Analytics/%E9%9A%90%E7%A7%81%E5%90%88%E8%A7%84%E6%8C%87%E5%8D%97/%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1%E6%9C%8D%E5%8A%A1%E6%9D%A1%E6%AC%BE) · [Cookie 列表](https://tongji.baidu.com/holmes/Analytics/%E9%9A%90%E7%A7%81%E5%90%88%E8%A7%84%E6%8C%87%E5%8D%97/%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1%E7%9B%B8%E5%85%B3Cookie%E5%88%97%E8%A1%A8)

### 关闭与告知

- 关闭「启用第三方访问分析」或清空服务 ID 后，前台立即停止输出对应脚本（启用了页面静态缓存时需先清理缓存），不再产生新数据；已发送给服务方的数据不会因此删除，需要按上述方式在服务方处理。
- 主题不提供 Cookie 同意横幅。启用统计前，请在站点隐私政策中列出所用服务及其数据处理方式；面向欧盟、英国等要求事先同意的地区时，还需自行接入同意管理方案。
- 主题广告位只显示管理员填写的文字、图片和链接，不加载第三方广告脚本。

## 第三方资源与许可证

Rackora 使用 [GPL-3.0](LICENSE)。安装包内还包含以下可分发资源：

| 资源           | 用途            | 许可证       |
| -------------- | --------------- | ------------ |
| IBM Plex Sans  | 界面字体        | OFL-1.1      |
| Source Serif 4 | 标题 / 正文衬线 | OFL-1.1      |
| Highlight.js   | 代码高亮        | BSD-3-Clause |
| Lucide         | 图标            | ISC          |

这些资源随主题本地打包，不通过 CDN 加载；完整的版权声明与许可证原文随安装包附带在 `THIRD_PARTY_LICENSES.txt`。Fuwari 仅作为信息层级参考，其源码不包含在本主题中。

## 故障排查

- **升级后看不到新设置：** 主题管理 → 重新加载配置，然后刷新 Console。
- **页头 Logo 不对：** 到「外观」分组上传，不要改 SEO 里的组织 Logo。
- **中文界面仍显示英文文案：** 「基础 → 主题界面语言」改为简体中文（从旧版本升级的站点会保留原来的英文设置）。
- **英文站点显示中文文案：** 新安装默认简体中文，「基础 → 主题界面语言」改为 English，并把「网站语言」改为 `en-US`。
- **没有搜索 / 评论 / RSS / 友情链接：** 安装并启用对应官方插件；主题不会在插件缺失时报错。
- **canonical 或 JSON-LD 重复：** 停用 Time Factor SEO 等重复注入插件，清理页面缓存。
- **前台样式未更新：** 清浏览器缓存，或确认页面静态缓存已刷新。Halo 开发实例建议设置 `SPRING_THYMELEAF_CACHE=false`。
- **ZIP 安装失败：** 使用 GitHub Release 中的 `theme-rackora-X.Y.Z.zip`，不要上传源码目录或二次压缩包。

## 从源码构建

```powershell
pnpm install
pnpm build
```

构建完成后上传 `dist/theme-rackora-X.Y.Z.zip`。开发依赖为 Node.js 24 和 pnpm `10.33.0`。

```powershell
pnpm check
pnpm build-only
pnpm test
pnpm test:budget
pnpm preview
```

- `src/`：主题源码；修改模板时只改这里，不手改 `templates/`。
- `public/`：不经构建处理的静态资源。
- `templates/`：Vite 构建产物，Halo 实际读取的模板目录。
- `scripts/validate-theme.mjs`：路由、H1、内容契约、设置和扩展点检查。
- `scripts/create-preview.mjs`：生成本地视觉预览夹具，不替代 Halo 运行时测试。

`pnpm build` 会执行构建、静态检查、性能预算和可复现 ZIP 打包。安装包限制在 `400 KiB` 内，`dist/` 只保留当前版本 ZIP。

## SEO 责任边界

Rackora 输出当前路由的自指 canonical、Open Graph、Twitter Card、可见面包屑、作者/日期语义和 JSON-LD。首页、分类、标签、作者和归档的第 2 页及以后会在 canonical 与标题中带上页码，并输出 `rel="prev"` / `rel="next"`。标签和归档的 `noindex` 策略可在后台配置，但不会修改 Sitemap。

自定义 canonical、内容合并、重定向、Sitemap 管理、反向代理修复和搜索引擎 Rich Results 验证属于站点运维工作。

## 版本与发布

Rackora 使用语义化版本：修复递增 PATCH，向后兼容的新功能递增 MINOR，不兼容调整递增 MAJOR。发布时同步更新 `package.json`、`theme.yaml`、`README.md`、`README.en.md` 和 [`CHANGELOG.md`](CHANGELOG.md)，创建 `vX.Y.Z` 标签并核对 GitHub Release 中的 ZIP SHA-256。

## 许可证

[GPL-3.0](LICENSE)
