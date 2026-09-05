import { test, expect } from '@playwright/test';

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 1280, height: 720 },
  { width: 390, height: 844 },
  { width: 320, height: 667 },
]) {
  test(`layout and assets at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto('./');
    await expect(page).toHaveTitle('tf-cli · AI 编程工具的统一入口');
    await expect(page.locator('h1')).toHaveText('tf-cli');
    await expect(page.locator('h1')).toHaveCSS('opacity', '1');
    expect(await page.locator('html').getAttribute('lang')).toBe('zh-CN');
    expect(
      await page.locator('picture img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
    ).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const hero = await page.locator('#product').boundingBox();
    expect(hero!.y + hero!.height).toBeLessThan(viewport.height);
    for (const href of await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')!))) {
      if (href.length > 1) expect(await page.locator(href).count()).toBe(1);
    }
    await expect(page.locator('a[href="https://docs.tokenflux.dev"]').first()).toBeAttached();
    await page.screenshot({ path: `test-results/site-${viewport.width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('installation selection and copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./#install');
  await page.getByLabel('安装方式').selectOption('shell');
  await expect(page.locator('#command-shell')).toBeVisible();
  await expect(page.locator('#command-npm')).toBeHidden();
  await page.getByRole('button', { name: '复制 macOS / Linux 安装命令' }).click();
  await expect(page.locator('#copy-feedback')).toHaveText('已复制命令');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'curl -fsSL https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.sh | sh'
  );
  await page.getByLabel('安装方式').selectOption('once');
  await expect(page.locator('#command-once')).toHaveText('npx @tokenflux/tf status');
  await expect(page.locator('#copy-feedback')).toBeEmpty();
});

test('clipboard denial gives selectable fallback', async ({ page }) => {
  await page.goto('./#install');
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, 'writeText', { value: () => Promise.reject(new Error('denied')) })
  );
  await page.getByRole('button', { name: '复制 npm 安装命令' }).click();
  await expect(page.locator('#copy-feedback')).toHaveText('无法访问剪贴板，命令已选中');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('npm install -g @tokenflux/tf');
});

test('mobile navigation opens and closes after anchor selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const menu = page.getByRole('button', { name: '切换导航菜单' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '安装', exact: true }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#install$/);
  await expect(page.locator('#install-method')).toBeVisible();
});

test('reduced motion and missing page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('h1')).toHaveCSS('animation-name', 'none');
  await page.goto('./404.html');
  await expect(page.getByRole('heading', { name: '这个页面不存在。' })).toBeVisible();
  await page.getByRole('link', { name: '返回首页' }).click();
  await expect(page.locator('h1')).toHaveText('tf-cli');
});
