(function () {
  const storageKey = "theme-preference";
  const outlineStoragePrefix = "page-outline:";
  let giscusObserver;

  function getOutlineStorageKey() {
    return outlineStoragePrefix + window.location.pathname;
  }

  function readStoredOutlineState() {
    try {
      const state = localStorage.getItem(getOutlineStorageKey());
      return state === "collapsed" || state === "expanded" ? state : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredOutlineState(state) {
    try {
      localStorage.setItem(getOutlineStorageKey(), state);
    } catch (error) {
      return;
    }
  }

  function syncOutlineShellState(shell, details) {
    if (!shell || !details) {
      return;
    }

    const state = details.open ? "expanded" : "collapsed";
    shell.setAttribute("data-outline-state", state);
    shell.classList.toggle("is-outline-collapsed", state === "collapsed");
    writeStoredOutlineState(state);
  }

  function initPageOutline() {
    const shell = document.querySelector("[data-outline-shell]");
    if (!shell) {
      return;
    }

    const details = shell.querySelector("[data-page-outline-panel]");
    if (!details) {
      return;
    }

    const storedOutlineState = readStoredOutlineState();
    const shouldCollapseByViewport =
      !storedOutlineState &&
      window.matchMedia &&
      window.matchMedia("(max-width: 600px)").matches;

    if (storedOutlineState === "collapsed" || shouldCollapseByViewport) {
      details.open = false;
    }

    syncOutlineShellState(shell, details);
    if (shell.getAttribute("data-outline-bound") === "true") {
      return;
    }

    shell.setAttribute("data-outline-bound", "true");

    details.addEventListener("toggle", function () {
      syncOutlineShellState(shell, details);
    });
  }

  function getThemePreference() {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return stored;
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    ensureGiscusThemeSync();
  }

  function getResolvedTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function updateToggleButton(theme) {
    const button = document.getElementById("theme-toggle");
    if (!button) {
      return;
    }

    const prefix = button.getAttribute("data-theme-prefix") || "theme";
    const lightState = button.getAttribute("data-light-state") || "light";
    const darkState = button.getAttribute("data-dark-state") || "dark";

    button.textContent = prefix + ": " + (theme === "dark" ? darkState : lightState);
    button.setAttribute("data-theme-state", theme);
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.setAttribute(
      "aria-label",
      theme === "dark"
        ? button.getAttribute("data-light-label") || "Switch to light mode"
        : button.getAttribute("data-dark-label") || "Switch to dark mode"
    );
  }

  function updateGiscusTheme(theme) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) {
      return false;
    }

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: theme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );

    return true;
  }

  function ensureGiscusThemeSync() {
    if (updateGiscusTheme(getResolvedTheme())) {
      if (giscusObserver) {
        giscusObserver.disconnect();
        giscusObserver = undefined;
      }
      return;
    }

    if (giscusObserver || !document.body) {
      return;
    }

    giscusObserver = new MutationObserver(function () {
      if (updateGiscusTheme(getResolvedTheme())) {
        giscusObserver.disconnect();
        giscusObserver = undefined;
      }
    });

    giscusObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function toggleTheme() {
    const current = getThemePreference();
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, next);
    applyTheme(next);
    updateToggleButton(next);
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme: next } }));
  }

  function bindThemeToggle() {
    const button = document.getElementById("theme-toggle");
    if (!button || button.getAttribute("data-theme-bound") === "true") {
      return;
    }

    button.setAttribute("data-theme-bound", "true");
    button.addEventListener("click", toggleTheme);
  }

  function initMarkdownTaskLists() {
    document.querySelectorAll(".page-article, .daily-entry-content").forEach((article) => {
      article.querySelectorAll("li").forEach((item) => {
        const checkbox = item.querySelector(':scope > input[type="checkbox"]');
        if (!checkbox) {
          return;
        }

        item.classList.add("is-task-item");
        const list = item.parentElement;
        if (list && (list.tagName === "UL" || list.tagName === "OL")) {
          list.classList.add("is-task-list");
        }
      });
    });
  }

  function initCodeHighlighting() {
    if (typeof hljs === "undefined") {
      return;
    }

    document.querySelectorAll(".page-article pre code, .daily-entry-content pre code").forEach((block) => {
      if (block.closest("pre.mermaid") || block.classList.contains("language-mermaid")) {
        return;
      }

      if (block.dataset.highlighted === "yes") {
        return;
      }

      hljs.highlightElement(block);
    });
  }

  function initEmblaCarousels() {
    if (typeof EmblaCarousel === "undefined" || typeof EmblaCarouselAutoplay === "undefined") {
      return;
    }

    const allImages = Array.from(document.querySelectorAll("img"));
    const groups = new Map();

    allImages
      .filter((img) => !img.closest(".embla") && !img.closest(".slider-container"))
      .forEach((img) => {
        const parent = img.parentElement;
        if (!parent) {
          return;
        }

        if (!groups.has(parent)) {
          groups.set(parent, []);
        }
        groups.get(parent).push(img);
      });

    Array.from(groups.values())
      .filter((group) => group.length > 1)
      .forEach((group) => {
        const parent = group[0].parentElement;
        if (!parent || parent.closest(".embla") || parent.closest(".slider-container")) {
          return;
        }

        const outer = document.createElement("div");
        outer.classList.add("embla");

        const inner = document.createElement("div");
        inner.classList.add("embla__container");
        outer.appendChild(inner);

        parent.appendChild(outer);

        group.forEach((img) => {
          img.parentElement.removeChild(img);
          const slide = document.createElement("div");
          slide.classList.add("embla__slide");
          slide.appendChild(img);
          inner.appendChild(slide);
        });

        EmblaCarousel(outer, { loop: true }, [EmblaCarouselAutoplay()]);
      });
  }

  function initInteractiveControls() {
    updateToggleButton(getResolvedTheme());
    bindThemeToggle();
    initMarkdownTaskLists();
    initCodeHighlighting();
    initEmblaCarousels();
  }

  function initDailyArchive() {
    document.querySelectorAll("[data-daily-archive]").forEach((archive) => {
      if (archive.getAttribute("data-infinite-bound") === "true") {
        return;
      }

      const list = archive.querySelector("[data-infinite-list]");
      const nextLink = archive.querySelector("[data-infinite-next]");
      const status = archive.querySelector("[data-infinite-status]");
      const sentinel = archive.querySelector("[data-infinite-sentinel]");

      if (!list) {
        return;
      }

      archive.setAttribute("data-infinite-bound", "true");
      let loading = false;
      let loadingPromise;
      let finished = !nextLink || !nextLink.getAttribute("href");
      let lastAutoLoadY = -Infinity;

      function setStatus(message) {
        if (status) {
          status.textContent = message;
        }
      }

      async function loadNext(event) {
        if (event) {
          event.preventDefault();
        }

        if (loading) {
          return loadingPromise;
        }

        const nextUrl = nextLink ? nextLink.getAttribute("href") : "";
        if (loading || finished || !nextUrl) {
          return false;
        }

        loading = true;
        archive.setAttribute("aria-busy", "true");
        if (nextLink) {
          nextLink.textContent = "加载中";
        }
        setStatus("正在加载下一页");

        loadingPromise = (async function () {
          try {
            const response = await fetch(nextUrl, {
              headers: {
                "X-Requested-With": "daily-archive",
              },
            });

            if (!response.ok) {
              throw new Error("Failed to load next archive page");
            }

            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            const incomingList = doc.querySelector("[data-infinite-list]");
            const incomingItems = incomingList ? Array.from(incomingList.children) : [];
            const incomingNext = doc.querySelector("[data-infinite-next]");

            incomingItems.forEach((item) => {
              list.appendChild(document.importNode(item, true));
            });

            if (incomingNext && incomingNext.getAttribute("href")) {
              nextLink.setAttribute("href", incomingNext.getAttribute("href"));
              nextLink.textContent = "继续加载";
              setStatus(`已加载 ${incomingItems.length} 则`);
            } else if (nextLink) {
              finished = true;
              nextLink.removeAttribute("href");
              nextLink.hidden = true;
              setStatus("已经到底");
            }

            initInteractiveControls();
            return incomingItems.length > 0;
          } catch (error) {
            setStatus("加载失败，可以使用分页链接继续浏览");
            if (nextLink) {
              nextLink.textContent = "打开下一页";
            }
            return false;
          } finally {
            loading = false;
            loadingPromise = undefined;
            archive.removeAttribute("aria-busy");
          }
        })();

        return loadingPromise;
      }

      function getAnchorTarget(anchor) {
        const target = document.getElementById(anchor);
        return target && archive.contains(target) ? target : null;
      }

      function updateHash(link) {
        if (!link || !history.pushState) {
          return;
        }

        try {
          history.pushState(null, "", link.getAttribute("href"));
        } catch (error) {
          return;
        }
      }

      function scrollToAnchorTarget(anchor, link) {
        const target = getAnchorTarget(anchor);
        if (!target) {
          return false;
        }

        updateHash(link);
        const prefersReducedMotion =
          window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({
          block: "start",
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        if (typeof target.focus === "function") {
          target.focus({ preventScroll: true });
        }
        setStatus("已定位到目标日期");
        return true;
      }

      async function resolveDailyAnchor(anchor, link) {
        if (!anchor || scrollToAnchorTarget(anchor, link)) {
          return;
        }

        setStatus("正在加载目标日期");
        while (!finished) {
          const loaded = await loadNext();
          if (!loaded || scrollToAnchorTarget(anchor, link)) {
            return;
          }
        }

        setStatus("未找到目标日期，可以使用单日链接打开");
      }

      archive.querySelectorAll("[data-daily-anchor-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const anchor = link.getAttribute("data-daily-anchor") || link.hash.slice(1);
          resolveDailyAnchor(anchor, link);
        });
      });

      if (window.location.hash) {
        resolveDailyAnchor(decodeURIComponent(window.location.hash.slice(1)));
      }

      if (nextLink) {
        nextLink.addEventListener("click", loadNext);
      }

      if (sentinel && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          const movedSinceLastAutoLoad = Math.abs(window.scrollY - lastAutoLoadY) > 240;
          if (entries.some((entry) => entry.isIntersecting) && movedSinceLastAutoLoad) {
            lastAutoLoadY = window.scrollY;
            loadNext();
          }
        }, { rootMargin: "360px 0px" });

        observer.observe(sentinel);
      }
    });
  }

  const initialTheme = getThemePreference();
  applyTheme(initialTheme);
  initPageOutline();

  if (document.readyState === "loading" || document.readyState === "interactive") {
    document.addEventListener("DOMContentLoaded", function () {
      initInteractiveControls();
      initDailyArchive();
    }, { once: true });
  } else {
    initInteractiveControls();
    initDailyArchive();
  }

  window.addEventListener("pageshow", function () {
    initPageOutline();
    initInteractiveControls();
    initDailyArchive();
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
      if (!localStorage.getItem(storageKey)) {
        const theme = event.matches ? "dark" : "light";
        applyTheme(theme);
        updateToggleButton(theme);
      }
    });
  }
})();
