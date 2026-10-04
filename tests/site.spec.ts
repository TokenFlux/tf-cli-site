import { test, expect } from '@playwright/test';

const locales = [
  {
    path: 'en/',
    lang: 'en',
    title: 'tf · One command for every AI coding client',
    h1: /One command/,
    methodLabel: 'Install method',
    copyName: /Copy command: macOS/,
    copied: 'Command copied',
    copyFailed: 'Clipboard unavailable — command selected',
    toggleMenu: 'Toggle navigation menu',
    mainNav: 'Main navigation',
    installLink: 'Install',
    clients: ['Claude Code', 'Codex', 'OpenCode', 'Pi'],
  },
  {
    path: 'zh-cn/',
    lang: 'zh-cn',
    title: 'tf · AI 编程工具的统一入口',
    h1: /一条命令/,
    methodLabel: '安装方式',
    copyName: /复制命令: macOS/,
    copied: '已复制命令',
    copyFailed: '无法访问剪贴板，命令已选中',
    toggleMenu: '切换导航菜单',
    mainNav: '主导航',
    installLink: '安装',
    clients: ['Claude Code', 'Codex', 'OpenCode', 'Pi'],
  },
];

for (const locale of locales) {
  test.describe(locale.path, () => {
    for (const viewport of [
      { width: 1920, height: 900 },
      { width: 1280, height: 720 },
      { width: 390, height: 844 },
      { width: 320, height: 667 },
    ]) {
      test(`layout at ${viewport.width}x${viewport.height}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('response', (response) => {
          if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
        });
        await page.goto(`./${locale.path}`);
        await expect(page).toHaveTitle(locale.title);
        await expect(page.locator('h1')).toHaveText(locale.h1);
        expect(await page.locator('html').getAttribute('lang')).toBe(locale.lang);
        // 终端最终态由服务端渲染，无 JS 也可见
        await expect(page.locator('.terminal-body .term-line').first()).toBeVisible();
        // 无横向溢出
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        // 页内锚点都能落到存在的 section
        for (const href of await page
          .locator('a[href*="#"]')
          .evaluateAll((links) => links.map((link) => link.getAttribute('href')!).filter((h) => h.split('#')[1]))) {
          const id = href.split('#')[1];
          expect(await page.locator(`#${id}`).count()).toBe(1);
        }
        await expect(page.locator('a[href="https://docs.tokenflux.dev"]').first()).toBeAttached();
        // 版本徽章指向 release
        await expect(page.locator('.release-badge')).toHaveAttribute(
          'href',
          /github\.com\/TokenFlux\/tf-cli\/releases/
        );
        await page.screenshot({ path: `test-results/${locale.path.replace('/', '')}-${viewport.width}.png` });
        expect(errors).toEqual([]);
      });
    }

    test('client strip uses the four dedicated brand marks', async ({ page }) => {
      await page.goto(`./${locale.path}`);
      for (const name of ['claudecode', 'codex', 'opencode', 'pi']) {
        const icon = page.locator(`.client-chip [data-icon="client-${name}"]`);
        await expect(icon).toHaveCount(1);
        await expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
      }
      await expect(page.locator('.client-chip')).toHaveText(locale.clients, { useInnerText: true });
    });

    test('installation selection and copy', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.goto(`./${locale.path}#install`);
      await page.getByLabel(locale.methodLabel).selectOption('shell');
      await expect(page.locator('#command-shell')).toBeVisible();
      await expect(page.locator('#command-npm')).toBeHidden();
      await page.getByRole('button', { name: locale.copyName }).click();
      await expect(page.locator('#copy-feedback')).toHaveText(locale.copied);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        'curl -fsSL https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.sh | sh'
      );
      await page.getByLabel(locale.methodLabel).selectOption('powershell');
      await expect(page.locator('#command-powershell')).toContainText('install.ps1');
      await expect(page.locator('#copy-feedback')).toBeEmpty();
    });

    test('clipboard denial gives selectable fallback', async ({ page }) => {
      await page.goto(`./${locale.path}#install`);
      await page.evaluate(() =>
        Object.defineProperty(navigator.clipboard, 'writeText', { value: () => Promise.reject(new Error('denied')) })
      );
      await page.getByRole('button', { name: /Copy command: npm|复制命令: npm/ }).click();
      await expect(page.locator('#copy-feedback')).toHaveText(locale.copyFailed);
      expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('npm install -g @tokenflux/tf');
    });

    test('mobile navigation opens and closes after anchor selection', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`./${locale.path}`);
      const menu = page.getByRole('button', { name: locale.toggleMenu });
      await menu.click();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await page
        .getByRole('navigation', { name: locale.mainNav })
        .getByRole('link', { name: locale.installLink, exact: true })
        .click();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await expect(page).toHaveURL(/#install$/);
      await expect(page.locator('#install-method')).toBeVisible();
    });

    test('terminal replays with motion and rests with reduced motion', async ({ page }) => {
      // 减少动态：服务端渲染的完整会话原样保留（clear 帧变成静态分隔行）
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`./${locale.path}`);
      await expect(page.locator('.terminal-body .term-line').last()).toBeVisible();
      const reducedCount = await page.locator('.terminal-body .term-line').count();
      expect(reducedCount).toBeGreaterThan(10);
    });
  });
}

test('root redirects by browser language', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveURL(/\/(en|zh-cn)\/$/);
});

test('locale switcher links to the other language', async ({ page }) => {
  await page.goto('./en/');
  await page.getByRole('link', { name: '中文' }).first().click();
  await expect(page).toHaveURL(/\/zh-cn\/$/);
  await page.getByRole('link', { name: 'English' }).first().click();
  await expect(page).toHaveURL(/\/en\/$/);
});

test('missing page returns 404', async ({ page }) => {
  await page.goto('./404.html');
  await expect(page.getByRole('heading', { name: '这个页面不存在。' })).toBeVisible();
});
