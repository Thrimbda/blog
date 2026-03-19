const { test, expect } = require('@playwright/test');
const path = require('node:path');

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

test.describe.configure({ mode: 'serial' });

test('Playwright 验收：至少 5 个页面', async ({ browser }) => {
  const lightContext = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const lightPage = await lightContext.newPage();
  const lightPageErrors = [];
  lightPage.on('pageerror', (error) => {
    lightPageErrors.push(String(error));
  });

  await lightPage.goto(`${baseURL}/`);
  await waitForPageReady(lightPage);
  await expect(lightPage.locator('header .logo')).toBeVisible();
  await expect(lightPage.locator('main')).toBeVisible();

  const homeOrderedMarker = await lightPage.locator('.home-intro ol > li').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  expect(homeOrderedMarker).not.toBe('none');

  const homeUnorderedMarker = await lightPage.locator('.home-secondary ul > li').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  expect(homeUnorderedMarker).toContain('»');

  const homeMarkerMetrics = await lightPage.evaluate(() => {
    const ordered = document.querySelector('.home-intro ol > li');
    const unordered = document.querySelector('.home-secondary ul > li');
    if (!ordered || !unordered) {
      return null;
    }

    return {
      orderedPaddingLeft: getComputedStyle(ordered).paddingLeft,
      unorderedPaddingLeft: getComputedStyle(unordered).paddingLeft,
      orderedMarkerWidth: getComputedStyle(ordered, '::before').width,
      unorderedMarkerWidth: getComputedStyle(unordered, '::before').width,
    };
  });
  expect(homeMarkerMetrics).toBeTruthy();
  expect(homeMarkerMetrics.orderedPaddingLeft).toBe(homeMarkerMetrics.unorderedPaddingLeft);
  expect(homeMarkerMetrics.orderedMarkerWidth).toBe(homeMarkerMetrics.unorderedMarkerWidth);

  await screenshot(lightPage, 'playwright-home-desktop.png');

  await lightPage.goto(`${baseURL}/blog/`);
  await waitForPageReady(lightPage);
  await expect(lightPage.locator('main .post-list li').first()).toBeVisible();
  await expect(lightPage.locator('main .post-link').first()).toBeVisible();
  await screenshot(lightPage, 'playwright-blog-index-desktop.png');

  await lightPage.goto(`${baseURL}/about/`);
  await waitForPageReady(lightPage);
  await expect(lightPage.locator('.page-article h1')).toBeVisible();
  await screenshot(lightPage, 'playwright-about-desktop.png');

  await lightPage.goto(`${baseURL}/diary/`);
  await waitForPageReady(lightPage);
  await expect(lightPage.locator('main .post-list li').first()).toBeVisible();
  await screenshot(lightPage, 'playwright-diary-index-desktop.png');

  await lightPage.goto(`${baseURL}/tags/`);
  await waitForPageReady(lightPage);
  await expect(lightPage.locator('main')).toBeVisible();
  await screenshot(lightPage, 'playwright-tags-desktop.png');

  await lightPage.goto(`${baseURL}/blog/markdown-render-showcase/`);
  await waitForPageReady(lightPage);
  await expect(lightPage.locator('.page-article h1')).toContainText('Cone Scroll 主题 Markdown 渲染展示');

  const unorderedMarker = await lightPage.locator('.page-article ul:not(.is-task-list) > li').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  expect(unorderedMarker).toContain('»');

  const orderedMarker = await lightPage.locator('.page-article ol:not(.is-task-list) > li').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  expect(orderedMarker).not.toBe('none');

  const taskItemMarker = await lightPage.locator('.page-article .is-task-item').first().evaluate((element) => {
    return getComputedStyle(element, '::before').content;
  });
  expect(taskItemMarker === 'none' || taskItemMarker === 'normal' || taskItemMarker === '""').toBeTruthy();

  await expect(lightPage.locator('.page-article .is-task-item input[type="checkbox"]').first()).toBeChecked();

  const highlightedCode = lightPage.locator('.page-article pre code.hljs').first();
  await expect(highlightedCode).toBeVisible();
  const codeColors = await lightPage.evaluate(() => {
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

    return null;
  });
  expect(codeColors).toBeTruthy();
  expect(codeColors.spanCount).toBeGreaterThan(0);
  expect(codeColors.tokenColor).toBeTruthy();
  expect(codeColors.tokenColor).not.toBe(codeColors.preColor);
  expect(lightPageErrors).toHaveLength(0);
  await screenshot(lightPage, 'playwright-markdown-showcase-light.png');

  await lightContext.close();

  const darkContext = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  await darkContext.addInitScript(() => {
    window.localStorage.setItem('theme-preference', 'dark');
  });
  const darkPage = await darkContext.newPage();
  const darkPageErrors = [];
  darkPage.on('pageerror', (error) => {
    darkPageErrors.push(String(error));
  });
  await darkPage.goto(`${baseURL}/blog/markdown-render-showcase/`);
  await waitForPageReady(darkPage);

  const theme = await darkPage.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(theme).toBe('dark');
  await expect(darkPage.locator('.page-article pre code.hljs').first()).toBeVisible();
  const darkCodeColors = await darkPage.evaluate(() => {
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

    return null;
  });
  expect(darkCodeColors).toBeTruthy();
  expect(darkCodeColors.spanCount).toBeGreaterThan(0);
  expect(darkCodeColors.tokenColor).toBeTruthy();
  expect(darkCodeColors.tokenColor).not.toBe(darkCodeColors.preColor);
  expect(darkPageErrors).toHaveLength(0);
  await screenshot(darkPage, 'playwright-markdown-showcase-dark.png');

  await darkContext.close();
});
