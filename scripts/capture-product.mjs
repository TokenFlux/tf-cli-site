// 生成社交分享图与站点图标，不依赖 tf 二进制或真实账户。
import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
await mkdir(path.join(root, 'public/assets'), { recursive: true });

const logoData = `data:image/svg+xml;base64,${await readFile(path.join(root, 'public/assets/logo.svg'), 'utf8').then((s) => Buffer.from(s).toString('base64'))}`;

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const social = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await social.setContent(`<html><body style="margin:0;width:1200px;height:630px;background:#0A0A0C;color:#FAFAFA;font-family:system-ui,sans-serif;position:relative;overflow:hidden">
    <div style="position:absolute;inset:0;background:radial-gradient(at 40% 0%, rgba(0,210,255,0.16) 0px, transparent 55%),radial-gradient(at 85% 20%, rgba(139,221,248,0.10) 0px, transparent 50%)"></div>
    <div style="position:absolute;inset:0;background-image:radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);background-size:28px 28px"></div>
    <div style="position:absolute;left:90px;top:100px">
      <div style="display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(0,210,255,0.35);background:rgba(0,210,255,0.10);color:#8BDDF8;border-radius:9999px;padding:7px 16px;font-size:20px;font-weight:600">Open source · Apache-2.0</div>
      <div style="margin-top:34px;font-size:84px;font-weight:750;letter-spacing:-2px;line-height:1.05">One command.<br>Every AI coding client.</div>
      <div style="margin-top:26px;font-size:27px;color:#A6A6AF;font-family:ui-monospace,Menlo,monospace">$ tf claude</div>
      <div style="margin-top:14px;font-size:22px;color:#77777F">Claude Code · Codex · OpenCode · Pi</div>
    </div>
    <div style="position:absolute;left:90px;bottom:56px;display:flex;align-items:center;gap:12px">
      <img src="${logoData}" style="width:44px;height:44px;border-radius:8px">
      <span style="font-size:24px;font-weight:650">tf-cli <span style="color:#55555C;font-weight:500">by TokenFlux</span></span>
    </div>
  </body></html>`);
  await social.screenshot({ path: path.join(root, 'public/assets/social.png') });
  await social.close();

  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await icon.setContent(
    `<html><body style="margin:0;width:180px;height:180px"><img src="${logoData}" style="width:180px;height:180px;display:block"></body></html>`
  );
  await icon.locator('img').evaluate((img) => img.complete || img.decode());
  await icon.screenshot({ path: path.join(root, 'public/assets/icon.png') });
  await icon.close();
  console.log('Generated social.png and icon.png with the dark cyan brand skin.');
} finally {
  await browser.close();
}
