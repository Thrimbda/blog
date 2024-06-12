const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeSound = document.getElementById("theme-sound");

// Function to update the theme icon based on the current theme
const updateThemeIcon = (isDarkMode) => {
  const themeMode = isDarkMode ? "darkMode" : "lightMode";
  const iconPath = themeIcon
    .querySelector("use")
    .getAttribute("href")
    .replace(/#.*$/, `#${themeMode}`);
  themeIcon.querySelector("use").setAttribute("href", iconPath);
};

// Function to update the theme based on the current mode
const updateTheme = (isDarkMode) => {
  const theme = isDarkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(isDarkMode);
  setHightlightJsTheme(isDarkMode);
  setGitcusTheme(isDarkMode);
};

const setHightlightJsTheme = (isDarkMode) => {
  let link = document.createElement("link");
  link.rel = "stylesheet";

  link.href = isDarkMode
    ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark-dimmed.min.css"
    : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";
  document.head.appendChild(link);
};

const setGitcusTheme = (isDarkMode) => {
  const theme = isDarkMode ? "dark" : "light";

  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
};

// Function to toggle the theme
const toggleTheme = () => {
  const isDarkMode = toggleButton.checked;
  updateTheme(isDarkMode);
  themeSound.play();
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Add transition class to body for smooth transition
  document.body.classList.add("theme-transition");
  setTimeout(() => {
    document.body.classList.remove("theme-transition");
  }, 300);
};

// Event listener for theme toggle
toggleButton.addEventListener("change", toggleTheme);

// Function to initialize the theme based on the stored preference
const initializeTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDarkMode = storedTheme === "dark" || (!storedTheme && prefersDark);
  toggleButton.checked = isDarkMode;
  updateTheme(isDarkMode);
};

// Initialize the theme
initializeTheme();

// Listen for changes in system preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", initializeTheme);

const ELS = (selector, parent) =>
  (parent || document).querySelectorAll(selector);
const EL = (selector, parent) => (parent || document).querySelector(selector);
const mod = (n, m) => ((n % m) + m) % m;

ELS(".slider-container").forEach((EL_parent) => {
  const EL_slider = EL(".slider", EL_parent);
  const ELS_items = ELS(".slider-item", EL_parent);
  const ELS_dots = ELS(".slider-dot", EL_parent);
  const total = ELS_items.length;
  let c = 0;
  let startX = 0;
  let distance = 0;

  const setDotActive = () => {
    ELS_dots.forEach((EL_dot, i) => {
      EL_dot.classList.toggle("slider-dot-active", i === c);
    });
  };

  setDotActive();

  const anim = () => {
    EL_slider.style.transform = `translateX(-${c * 100}%)`;
  };
  const prev = () => {
    distance = 0;
    startX = 0;
    c = mod(c - 1, total);
    setDotActive();
    anim();
  };
  const next = () => {
    distance = 0;
    startX = 0;
    c = mod(c + 1, total);
    setDotActive();
    anim();
  };

  EL(".slider-prev", EL_parent).addEventListener("click", prev);
  EL(".slider-next", EL_parent).addEventListener("click", next);

  ELS(".slider-dot", EL_parent).forEach((dot, i) => {
    dot.addEventListener("click", () => {
      c = i;
      setDotActive();
      anim();
    });
  });

  // touch event listener
  EL_slider.addEventListener("touchstart", (e) => {
    if (e.target.tagName !== "IMG") {
      return;
    }
    startX = e.touches[0].clientX;
  });

  EL_slider.addEventListener("touchmove", (e) => {
    if (e.target.tagName !== "IMG") {
      return;
    }
    distance = e.touches[0].clientX - startX;
    EL_slider.style.transform = `translateX(-${
      c * 100 - (distance / EL_slider.offsetWidth) * 100
    }%)`;
  });

  EL_slider.addEventListener("touchend", (e) => {
    if (e.target.tagName !== "IMG") {
      return;
    }
    if (distance / EL_slider.offsetWidth > 0.3) {
      c = mod(c - 1, total);
    } else if (distance / EL_slider.offsetWidth < -0.3) {
      c = mod(c + 1, total);
    }
    setDotActive();
    anim();
  });
});
