const path = require('node:path');
const { chromium } = require('playwright');

const baseURL = 'http://127.0.0.1:4174';
const docsDir = __dirname;

async function waitForPageReady(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1200);
}

async function screenshot(page, fileName) {
  await page.screenshot({
    path: path.join(docsDir, fileName),
    fullPage: true,
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const findings = [];

  const light = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await light.newPage();
  const lightPageErrors = [];
  page.on('pageerror', (error) => {
    lightPageErrors.push(String(error));
  });

  await page.goto(`${baseURL}/`);
  await waitForPageReady(page);
  findings.push({
    page: '/',
    ok: await page.locator('header .logo').isVisible(),
    note: '首页 header/logo 正常渲染',
  });
  await screenshot(page, 'playwright-home-desktop.png');

  await page.goto(`${baseURL}/blog/`);
  await waitForPageReady(page);
  findings.push({
    page: '/blog/',
    ok: await page.locator('main .post-list li').first().isVisible(),
    note: '博客列表页条目正常显示',
  });
  await screenshot(page, 'playwright-blog-index-desktop.png');

  await page.goto(`${baseURL}/about/`);
  await waitForPageReady(page);
  findings.push({
    page: '/about/',
    ok: await page.locator('.page-article h1').isVisible(),
    note: 'About 页面正常渲染',
  });
  await screenshot(page, 'playwright-about-desktop.png');

  await page.goto(`${baseURL}/diary/`);
  await waitForPageReady(page);
  findings.push({
    page: '/diary/',
    ok: await page.locator('main .post-list li').first().isVisible(),
    note: '日志列表页条目正常显示',
  });
  await screenshot(page, 'playwright-diary-index-desktop.png');

  await page.goto(`${baseURL}/tags/`);
  await waitForPageReady(page);
  findings.push({
    page: '/tags/',
    ok: await page.locator('main').isVisible(),
    note: '标签页正常渲染',
  });
  await screenshot(page, 'playwright-tags-desktop.png');

  await page.goto(`${baseURL}/blog/markdown-render-showcase/`);
  await waitForPageReady(page);
  const unorderedMarker = await page.locator('.page-article ul:not(.is-task-list) > li').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  const orderedMarker = await page.locator('.page-article ol:not(.is-task-list) > li').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  const taskMarker = await page.locator('.page-article .is-task-item').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  const firstCheckboxChecked = await page.locator('.page-article .is-task-item input[type="checkbox"]').first().isChecked();
  const codeInfo = await page.evaluate(() => {
    const blocks = Array.from(document.querySelectorAll('.page-article pre'));
    for (const pre of blocks) {
      const code = pre.querySelector('code.hljs');
      const token = pre.querySelector('.hljs-keyword, .hljs-title, .hljs-built_in, .hljs-string');
      if (code && token) {
        return {
          codeClass: code.className,
          spanCount: code.querySelectorAll('span').length,
          preColor: getComputedStyle(pre).color,
          tokenColor: getComputedStyle(token).color,
        };
      }
    }

    return {
      codeClass: null,
      spanCount: 0,
      preColor: null,
      tokenColor: null,
    };
  });
  findings.push({
    page: '/blog/markdown-render-showcase/',
    ok:
      unorderedMarker.includes('»') &&
      orderedMarker !== 'none' &&
      (taskMarker === 'none' || taskMarker === 'normal' || taskMarker === '""') &&
      firstCheckboxChecked &&
      codeInfo.codeClass &&
      codeInfo.codeClass.includes('hljs') &&
      codeInfo.spanCount > 0 &&
      codeInfo.tokenColor &&
      codeInfo.tokenColor !== codeInfo.preColor &&
      lightPageErrors.length === 0,
    note: `showcase 文章：ul marker=${unorderedMarker}, ol marker=${orderedMarker}, task marker=${taskMarker}, code spans=${codeInfo.spanCount}, pageErrors=${lightPageErrors.length}`,
  });
  await screenshot(page, 'playwright-markdown-showcase-light.png');

  await light.close();

  const dark = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  await dark.addInitScript(() => {
    window.localStorage.setItem('theme-preference', 'dark');
  });
  const darkPage = await dark.newPage();
  const darkPageErrors = [];
  darkPage.on('pageerror', (error) => {
    darkPageErrors.push(String(error));
  });
  await darkPage.goto(`${baseURL}/blog/markdown-render-showcase/`);
  await waitForPageReady(darkPage);
  const darkTheme = await darkPage.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const darkCodeInfo = await darkPage.evaluate(() => {
    const blocks = Array.from(document.querySelectorAll('.page-article pre'));
    for (const pre of blocks) {
      const code = pre.querySelector('code.hljs');
      const token = pre.querySelector('.hljs-keyword, .hljs-title, .hljs-built_in, .hljs-string');
      if (code && token) {
        return {
          spanCount: code.querySelectorAll('span').length,
          preColor: getComputedStyle(pre).color,
          tokenColor: getComputedStyle(token).color,
        };
      }
    }

    return {
      spanCount: 0,
      preColor: null,
      tokenColor: null,
    };
  });
  findings.push({
    page: '/blog/markdown-render-showcase/ (dark)',
    ok:
      darkTheme === 'dark' &&
      darkCodeInfo.spanCount > 0 &&
      !!darkCodeInfo.tokenColor &&
      darkCodeInfo.tokenColor !== darkCodeInfo.preColor &&
      darkPageErrors.length === 0,
    note: `dark theme=${darkTheme}, dark token color=${darkCodeInfo.tokenColor}, code spans=${darkCodeInfo.spanCount}, pageErrors=${darkPageErrors.length}`,
  });
  await screenshot(darkPage, 'playwright-markdown-showcase-dark.png');

  await dark.close();
  await browser.close();

  const failed = findings.filter((item) => !item.ok);
  console.log(JSON.stringify({ ok: failed.length === 0, findings }, null, 2));
  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
