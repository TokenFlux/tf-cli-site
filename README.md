# tf-cli 产品站

[tf-cli](https://github.com/TokenFlux/tf-cli) 的独立营销页，基于 [AstroWind](https://github.com/arthelokyo/astrowind) 和 Astro 构建，部署到 [GitHub Pages](https://tokenflux.github.io/tf-cli-site/)。使用文档统一放在 [TokenDocs](https://docs.tokenflux.dev)，这里不维护第二份文档站。

## 本地开发

使用 Node.js 24 LTS 和 npm：

```sh
npm ci
npm run dev
```

打开 `http://localhost:4321/tf-cli-site/`。首页位于 `src/pages/index.astro`，安装入口位于 `src/components/Install.astro`，品牌样式位于 `src/assets/styles/product.css`。

## 验证与部署

```sh
npm run check
npm run build
npx playwright install chromium
CI=1 npm test
```

推送 `main` 后，`.github/workflows/pages.yml` 会执行检查、构建和浏览器测试，再部署静态产物。仓库的 Pages Source 需设为 GitHub Actions。站点地址和子路径在 `src/config.yaml` 中配置。

测试覆盖桌面与手机布局、安装方式切换、剪贴板成功与失败、手机导航、减少动态效果和 404 返回。

## 产品图片

`public/assets/terminal*.png` 来自真实 `tf status` 输出，使用本地假网关与临时示例凭据，不读取真实账户。截图中的数字不是产品承诺。更换本机 CLI 二进制后可以重新生成：

```sh
TF_BINARY=/path/to/tf npm run capture
```

截图脚本需要本机 Google Chrome；生成后的图片提交到仓库，部署不依赖 CLI 或截图环境。社交分享图与站点图标一并生成。

## 模板来源

基于 AstroWind 提交 `8d0090f933b71439c02956f7e8d30d41de804832`，保留其 MIT 许可（见 `LICENSE.md`）。复用导航、Hero、Features、FAQ、按钮、内容容器和页脚，移除示例路由、CMS、滚动入场动画和额外压缩插件。站点不接入统计或第三方运行时脚本。
