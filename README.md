# tf-cli 产品站

[tf-cli](https://github.com/TokenFlux/tf-cli) 的独立营销页，基于 [AstroWind](https://github.com/arthelokyo/astrowind) 和 Astro 构建，部署到 [GitHub Pages](https://tokenflux.github.io/tf-cli-site/)。使用文档统一放在 [TokenDocs](https://docs.tokenflux.dev)，这里不维护第二份文档站。

## 设计语言

视觉对齐 TokenRouter 前端（其本身对齐 OpenRouter）：青蓝主色 `#00D2FF` 只做强调、zinc 中性色、深色 `#0A0A0C → #111113` 渐变背景、边框分层无投影、圆角 4/6/8/12、Plus Jakarta Sans + Geist Mono 字体。深浅双主题，默认跟随系统。

## 双语

英文为默认 locale，路由带前缀：`/en/` 与 `/zh-cn/`。根路径按浏览器语言客户端跳转。文案集中在 `src/i18n/ui.ts`，两个 locale 共用同一套组件；新增文案需要在两个字典里同步加。

## 本地开发

使用 Node.js 24 LTS 和 npm：

```sh
npm ci
npm run dev
```

打开 `http://localhost:4321/tf-cli-site/en/`。页面主体位于 `src/components/HomePage.astro`，安装入口位于 `src/components/Install.astro`，Hero 终端会话数据位于 `src/data/hero-session.ts`，品牌样式位于 `src/assets/styles/product.css`，设计 token 位于 `src/assets/styles/tailwind.css` 与 `src/components/CustomStyles.astro`。

## Hero 终端

`src/components/terminal/Terminal.astro` 按 `hero-session.ts` 的帧序列做打字动画。服务端先渲染最终态，无 JS 与 `prefers-reduced-motion` 场景直接可用；允许动效时才清空重放并循环。终端内容为演示脚本，数字不是产品承诺。

## 版本徽章

Hero 与安装区的版本号在构建时从 GitHub Releases API 读取，失败时回落到 `HomePage.astro` 里的硬编码版本。离线构建也能通过。

## 验证与部署

```sh
npm run check
npm run build
CI=1 npx playwright install chromium && CI=1 npm test   # 本地可用系统 Chrome：npm test
```

推送 `main` 后，`.github/workflows/pages.yml` 会执行检查、构建和浏览器测试，再部署静态产物。仓库的 Pages Source 需设为 GitHub Actions。站点地址和子路径在 `src/config.yaml` 中配置。

测试覆盖双语 × 四种视口的布局与资源、客户端品牌图标、安装方式切换、剪贴板成功与失败、手机导航、减少动态下的终端静态渲染、语言切换和 404。

## 产品图片

`public/assets/social.png` 与 `public/assets/icon.png` 由脚本生成并提交到仓库，部署不依赖截图环境。品牌样式变更后重新生成：

```sh
npm run capture
```

## 模板来源

基于 AstroWind 提交 `8d0090f933b71439c02956f7e8d30d41de804832`，保留其 MIT 许可（见 `LICENSE.md`）。复用其布局骨架、导航、按钮、页脚与配置集成；营销组件已按产品需要重写，移除示例路由、CMS、博客与滚动入场动画。站点不接入统计或第三方运行时脚本。
