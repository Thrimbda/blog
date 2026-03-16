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

    if (readStoredOutlineState() === "collapsed") {
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

  const initialTheme = getThemePreference();
  applyTheme(initialTheme);
  initPageOutline();
  window.addEventListener("pageshow", initPageOutline);

  document.addEventListener("DOMContentLoaded", function () {
    updateToggleButton(initialTheme);

    const button = document.getElementById("theme-toggle");
    if (button) {
      button.addEventListener("click", toggleTheme);
    }

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
        if (!localStorage.getItem(storageKey)) {
          const theme = event.matches ? "dark" : "light";
          applyTheme(theme);
          updateToggleButton(theme);
        }
      });
    }

    initEmblaCarousels();
  });
})();
