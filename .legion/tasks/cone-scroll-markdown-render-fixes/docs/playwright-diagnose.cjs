const { chromium } = require('playwright');

const baseURL = 'http://127.0.0.1:4174';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', (message) => {
    consoleMessages.push({ type: message.type(), text: message.text() });
  });

  page.on('pageerror', (error) => {
    pageErrors.push(String(error));
  });

  await page.goto(`${baseURL}/blog/markdown-render-showcase/`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);

  const result = await page.evaluate(() => {
    const article = document.querySelector('.page-article');
    const firstListItem = article?.querySelector('ul > li');
    const firstOrderedItem = article?.querySelector('ol > li');
    const taskInput = article?.querySelector('input[type="checkbox"]');
    const taskItem = taskInput?.closest('li');
    const code = article?.querySelector('pre code');
    const pre = article?.querySelector('pre');
    const keyword = pre?.querySelector('.hljs-keyword, .hljs-title, .hljs-built_in, .hljs-string');

    return {
      location: window.location.href,
      theme: document.documentElement.getAttribute('data-theme'),
      readyState: document.readyState,
      scriptSources: Array.from(document.scripts).map((script) => script.src || '[inline]'),
      stylesheetHrefs: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((link) => link.href),
      hasHljsGlobal: typeof window.hljs !== 'undefined',
      taskListClassCount: article?.querySelectorAll('.is-task-list').length ?? 0,
      taskItemClassCount: article?.querySelectorAll('.is-task-item').length ?? 0,
      checkboxCount: article?.querySelectorAll('input[type="checkbox"]').length ?? 0,
      firstListItemText: firstListItem?.textContent?.trim() ?? null,
      firstListItemBefore: firstListItem ? getComputedStyle(firstListItem, '::before').content : null,
      firstOrderedItemText: firstOrderedItem?.textContent?.trim() ?? null,
      firstOrderedItemBefore: firstOrderedItem ? getComputedStyle(firstOrderedItem, '::before').content : null,
      taskItemBefore: taskItem ? getComputedStyle(taskItem, '::before').content : null,
      taskItemClasses: taskItem?.className ?? null,
      codeClass: code?.className ?? null,
      codeSpanCount: code?.querySelectorAll('span').length ?? 0,
      preColor: pre ? getComputedStyle(pre).color : null,
      tokenColor: keyword ? getComputedStyle(keyword).color : null,
    };
  });

  console.log(JSON.stringify({ result, consoleMessages, pageErrors }, null, 2));
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
