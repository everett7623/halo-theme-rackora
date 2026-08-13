# 更新日志

Rackora 使用[语义化版本](https://semver.org/lang/zh-CN/)管理版本。每次发布必须同步更新
`package.json`、`theme.yaml` 和本文件，并使用对应的 `vX.Y.Z` Git 标签发布安装包。

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

[0.3.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.3.0
[0.2.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.2.0
[0.1.0]: https://github.com/everett7623/halo-theme-rackora/releases/tag/v0.1.0
