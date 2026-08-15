# 更新日志

Rackora 使用[语义化版本](https://semver.org/lang/zh-CN/)管理版本。每次发布必须同步更新
`package.json`、`theme.yaml` 和本文件，并使用对应的 `vX.Y.Z` Git 标签发布安装包。

## [0.6.3] - 2026-08-15

### 修复

- 归档时间线标题改用 `overflow-wrap: break-word`，避免 `anywhere` 把长标题列宽压成单字竖排。

### 调整

- 归档、友链、关于、栏目/标签、文章列表与分页统一到 `--rack-content` 内容宽，避免有的页 720、有的页 1040。

## [0.6.2] - 2026-08-15

### 调整

- 去掉首页重复的品牌 Hero（标题/副标题与顶栏重复），首页直接以「最新文章」为主内容。
- 侧栏资料卡不再重复 Logo 与站点名，仅保留「关注」社交入口。
- 站点统计并入侧栏轻量指标，去掉页脚统计与刺眼的绿色数字块；移除「页脚显示站点统计」开关。
- 页脚不再默认回退输出站点副标题，仅在填写页脚说明时显示。

## [0.6.1] - 2026-08-15

### 修复

- `BlogPosting` 与 `TechArticle` JSON-LD 现在内嵌完整 publisher 名称、网址和 Logo，避免只引用首页 Organization 导致文章页校验缺少 `publisher.name`。
- 首页 Organization Logo 改为 `ImageObject`，与文章页一致。

### 调整

- 文档将「时间因子 SEO」定性为迁站/旧主题留下的站点侧残留，而非 Rackora 依赖；明确不要植入主题，并给出停用与清缓存步骤。
- 清理 README 中对 Joe3 SEO 补丁与内部 P2 任务的过时表述。
- 文章与文档页补充 `article:published_time` / `article:modified_time`；共享 SEO head 增加 `og:locale`。
- 独立页输出 `WebPage` JSON-LD，关于页输出 `AboutPage`（不再依赖外部 SEO 插件把页面误标成 BlogPosting）。

## [0.6.0] - 2026-08-15

### 新增

- 文章社交一键分享：X、LinkedIn、Telegram、微博，可与复制链接组合开关。
- 文章系列元数据与正文系列目录，支持序号排序。
- 栏目/标签页面包屑；Documentation 模板增加同栏目导航。
- 样式设置支持正文宽度与正文字号。
- Source Serif 4 + IBM Plex Sans 字体组合，首页品牌层级与纸面氛围背景。
- 列表入场、目录激活与返回顶部等微动效。

### 调整

- 打印样式隐藏分享/目录控件，并为外链补充可读地址。
- Highlight.js 增加 SCSS 等别名；系列与相关文章空列表自动隐藏。

## [0.5.0] - 2026-08-15

### 新增

- About 与 Documentation 自定义模板，可在 Halo 后台为页面/文章单独选用。
- 主导航二级子菜单，桌面悬停展开，移动端内联展开。
- 移动端文章目录抽屉，桌面侧栏隐藏后仍可浏览章节。
- 正文图片轻量灯箱，可在主题设置中关闭。
- 文章复制链接、同栏目相关文章；无分类时回退到首个标签推荐。
- 社交图标扩展 LinkedIn、YouTube、Bilibili、Discord、Mastodon、微信等。
- Highlight.js 增加 Python、Go、Rust、Java、SQL、CSS 等常用语言。
- 页脚主题署名开关，以及导航当前页高亮。

### 修复

- 平板宽度下首页侧栏不再压在文章列表之前。
- 自定义强调色在深色模式下自动提亮，避免可读性下降。
- 友情链接页眉、页脚地区文案随界面语言切换。
- 404 页面输出 `noindex,follow`；作者页在有简介时仍显示文章数。

### 调整

- 后台分组对齐主流 Halo 主题：基础、样式、首页、文章、备案、SEO、访问分析、插件、广告。
- 站点统计并入「基础」；封面显示模式移入「样式」；旧 `content.*` / `stats.*` 配置继续回退兼容。
- 依赖字段增加条件显示；字体栈改为系统无衬线，不再引用未加载的 Inter。

## [0.4.2] - 2026-08-15

### 新增

- 可选择 Halo 页脚菜单，并在菜单缺失时安全回退到主题内置导航。
- 首页资料、栏目、标签与正文目录、最新文章的独立显示开关。
- ICP 备案号、公网安备号及各自跳转地址设置。
- 共享 SEO head：为首页、文章、独立页、归档、栏目、标签、作者和友情链接输出唯一绝对 canonical、Open Graph 与 Twitter Card。
- 正文页动态 `BlogPosting` JSON-LD，标题、摘要、作者、发布时间、更新时间和 URL 均来自当前文章。

### 修复

- 修复首次安装未保存配置时，页脚统计空值导致首页响应中断的问题。
- 修复升级配置缺少新侧栏字段时，首页侧栏或正文辅助区行为不一致的问题。
- 修复移动端侧栏信息先于文章列表出现，导致首篇内容需要滚动超过一屏的问题。
- 空 GA4、Clarity 和百度统计 ID 可以保持未启用状态并正常保存。

### 调整

- 手机首页顺序改为标题、最新文章、资料与统计，桌面和平板右侧栏位置保持不变。
- 更新主题截图、后台功能说明和 SEO 职责边界。

## [0.4.1] - 2026-08-14

### 调整

- 移除首页侧栏中与热门标签和页脚导航重复的归档、标签、友情链接快捷区，让侧栏在热门标签后自然结束，减少空白边框和重复入口。

## [0.4.0] - 2026-08-14

### 新增

- 主题界面默认英文，并提供单一后台选项切换简体中文；动态导航、代码复制、阅读时间与运行时间同步切换。
- 首页按文章数降序展示可配置数量的高频标签，标签汇总页继续展示完整列表。
- 正文底部作者、原文地址、发布日期与许可声明，许可名称和地址可在后台设置。
- 插件职责与精简指南，区分主题内置前端能力和必须保留的 Halo 服务插件。
- 首页与正文两套英文本地预览夹具，用于桌面、移动端和暗色模式验收。

### 调整

- 正文标题、行内代码和代码块采用更清晰的 Fuwari 启发式层级，同时保留 Rackora 的单色、低图片技术出版风格。
- 所有文章与标签页的标签名称移除 `#` 前缀。
- `site_language` 默认值调整为 `en-US`，与英文默认界面和结构化数据一致。

## [0.3.0] - 2026-08-14

### 新增

- 通用的 Rackora 默认 SVG 标志，并在 Halo 后台与站点 favicon 回退中使用主题内置资源。
- 网站语言、地区、RSS 地址、页脚说明、可选站点统计/运行时间和 Everett Labs 链接设置。
- 可选 GA4、Microsoft Clarity 与百度统计；默认关闭且只接受服务 ID，不接受任意脚本。
- Organization 站点实体、组织名称、Logo 和关于页面设置。
- Halo 官方链接管理插件的友情链接页面、分组导航和页脚入口。
- 正文侧栏最新文章，以及可选的当前文章最新评论。
- 标签触发的 GitHub Release 自动构建与版本一致性校验。

### 调整

- 主题介绍改为适用于独立出版、知识库和技术写作的英文通用描述。
- 首页站点实体补充社交账号，页头补充 RSS 自动发现及地区信号。
- 页脚增加主题项目、Everett Labs、RSS、友情链接和可选地区信息。
- 发布包固定文件顺序、时间与文本换行，确保 Windows 和 Linux 构建结果一致。

## [0.2.0] - 2026-08-13

### 新增

- 独立的 Halo 2.x 首页、文章、页面、归档、栏目、标签、作者和 404 模板。
- Fuwari 启发的极简双栏布局、轻卡片、暗色模式和低图片模式。
- 作者资料卡与可排序社交链接。
- 文章目录、阅读进度、代码高亮与复制、表格增强及评论、搜索插件适配。
- Google、Bing、百度站点验证，以及标签和归档索引策略。
- `WebSite`、`BlogPosting` 和 `BreadcrumbList` 结构化数据。
- 可排序的首页、侧栏和正文广告位，附带推广披露及安全链接属性。
- 文章 SEO 审核、推广关系、内容核验日期，标签索引策略和栏目精选文章字段。
- 主题校验、性能预算、本地预览和可重复构建的安装包脚本。

### 调整

- 移除三色装饰轨道，统一为单一强调色与克制的轻卡片视觉。
- 默认不展示文章封面和首页横幅，减少图片依赖。

## [0.1.0] - 2026-08-13

### 新增

- Rackora 首个可安装预览版本，包含基础 Halo 路由、极简布局和低图片模式。

[0.6.3]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.6.3
[0.6.2]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.6.2
[0.6.1]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.6.1
[0.6.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.6.0
[0.5.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.5.0
[0.4.2]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.4.2
[0.4.1]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.4.1
[0.4.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.4.0
[0.3.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.3.0
[0.2.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.2.0
[0.1.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.1.0
