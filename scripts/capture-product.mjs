import { chromium } from '@playwright/test';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';

const temporary = await mkdtemp(path.join(tmpdir(), 'tf-site-'));
const root = path.resolve(import.meta.dirname, '..');
const binary = process.env.TF_BINARY || path.resolve(root, '../tkr/bin/tf');
const server = createServer((_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      billing: { available: true, remaining: 93.3826824, unit: '推理积分', source: 'subscription' },
      usage: { today: { requests: 117, total_tokens: 3076385, cost: 0.81240735, actual_cost: 6.4992588 } },
    })
  );
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  const configDir = path.join(temporary, 'config/tf');
  const bin = path.join(temporary, 'bin');
  await mkdir(configDir, { recursive: true });
  await mkdir(bin);
  const harnesses = {
    claude: { key: 'work', slots: { default: 'claude-sonnet-5' } },
    codex: { key: 'work', slots: { default: 'gpt-5.6' } },
    opencode: { key: 'work', slots: { default: 'gemini-3.1-pro-high' } },
    pi: { key: 'work', slots: { default: 'gpt-5.6' } },
  };
  await writeFile(
    path.join(configDir, 'config.json'),
    JSON.stringify({
      version: 1,
      keys: {
        work: {
          host: `http://127.0.0.1:${server.address().port}`,
          models: ['claude-sonnet-5', 'gpt-5.6', 'gemini-3.1-pro-high'],
        },
      },
      harnesses,
    })
  );
  await writeFile(
    path.join(configDir, 'credentials.json'),
    JSON.stringify({ version: 1, credentials: { work: { key: 'sk-example-not-a-real-key' } } }),
    { mode: 0o600 }
  );
  for (const name of Object.keys(harnesses))
    await writeFile(path.join(bin, name), '#!/bin/sh\nprintf "demo\\n"\n', { mode: 0o755 });
  const { stdout } = await promisify(execFile)(binary, ['status'], {
    env: {
      ...process.env,
      PATH: `${bin}:${process.env.PATH}`,
      HOME: temporary,
      XDG_CONFIG_HOME: path.join(temporary, 'config'),
      XDG_CACHE_HOME: path.join(temporary, 'cache'),
      TF_API_KEY: '',
      TF_LANG: 'zh',
      HTTPS_PROXY: '',
      https_proxy: '',
      ALL_PROXY: '',
    },
  });
  const output = stdout.replace(configDir, '~/.tf').trim();
  await mkdir(path.join(root, 'public/assets'), { recursive: true });
  browser = await chromium.launch({ channel: 'chrome' });
  for (const mobile of [false, true]) {
    const page = await browser.newPage({
      viewport: mobile ? { width: 720, height: 1100 } : { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<html><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#151b18;color:#d6e1db;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.terminal{position:absolute;left:${mobile ? '40px' : '290px'};right:${mobile ? '40px' : '210px'};bottom:${mobile ? '40px' : '48px'}}header{font:14px system-ui;color:#92a097;border-bottom:1px solid #36453b;padding:0 0 20px;display:flex;justify-content:space-between}.command{color:#b4ecc6;margin:24px 0;font-size:${mobile ? 26 : 22}px}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:${mobile ? 24 : 21}px;line-height:1.8;margin:0}.tag{color:#91a297}</style></head><body><div class="terminal"><header><span>tf-cli / terminal</span><span>示例账户</span></header><div class="command">❯ tf status</div><pre></pre></div></body></html>`
    );
    await page.locator('pre').textContent();
    await page
      .locator('pre')
      .evaluate((el, text) => (el.textContent = text), mobile ? output.split('\n').slice(0, 5).join('\n') : output);
    await page.screenshot({ path: path.join(root, `public/assets/terminal${mobile ? '-mobile' : ''}.png`) });
    if (!mobile) {
      await page.setViewportSize({ width: 1200, height: 630 });
      await page.locator('.terminal').evaluate((el) => {
        el.style.left = '80px';
        el.style.right = '80px';
        el.style.bottom = '35px';
      });
      await page.evaluate(() => {
        const title = document.createElement('div');
        title.textContent = 'tf-cli';
        title.style.cssText = 'position:absolute;top:28px;left:80px;font:bold 64px system-ui;color:#b4ecc6';
        document.body.append(title);
      });
      await page.screenshot({ path: path.join(root, 'public/assets/social.png') });
    }
    await page.close();
  }
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await icon.setContent(
    '<html><body style="margin:0;display:grid;place-items:center;width:180px;height:180px;background:#193b28;color:#b9edc9;font:bold 96px monospace">tf</body></html>'
  );
  await icon.screenshot({ path: path.join(root, 'public/assets/icon.png') });
  await icon.close();
  console.log('Captured tf status with isolated demo credentials and a local fixture gateway.');
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
  await rm(temporary, { recursive: true, force: true });
}
