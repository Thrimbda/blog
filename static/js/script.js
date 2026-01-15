const {
  defaultIfEmpty,
  fromEvent,
  withLatestFrom,
  tap,
  last,
  animationFrames,
  switchMap,
  map,
  takeUntil,
  repeat,
} = rxjs;

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

 /*
 ELS(".slider-container").forEach((EL_parent) => {
   const EL_slider = EL(".slider", EL_parent);
   const ELS_items = ELS(".slider-item", EL_parent);
   const ELS_dots = ELS(".slider-dot", EL_parent);
   const total = ELS_items.length;
   let c = 0;

   const setDotActive = () => {
     ELS_dots.forEach((EL_dot, i) => {
       EL_dot.classList.toggle("slider-dot-active", i === c);
     });
   };

   setDotActive();

   const anim = () => {
     EL_slider.style.transform = `translateX(-${c * EL_slider.offsetWidth}px)`;
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
 */

// Embla Carousel initialization
function renderEmblaCarousels() {
  // Only initialize if EmblaCarousel is available
  if (typeof EmblaCarousel === 'undefined' || typeof EmblaCarouselAutoplay === 'undefined') {
    console.warn('Embla Carousel libraries not loaded yet');
    return;
  }

  console.log('Initializing Embla Carousels...');
  
  // Get all images
  const allImages = Array.from(document.querySelectorAll('img'));
  
  // Skip images that are already inside Embla or slider containers
  const filteredImages = allImages.filter(img => 
    !img.closest('.embla') && 
    !img.closest('.slider-container')
  );
  
  console.log(`Found ${filteredImages.length} images to process`);
  
  // Group images by their immediate parent element (like CZON does)
  const groups = new Map();
  
  filteredImages.forEach(img => {
    const parent = img.parentElement;
    if (!groups.has(parent)) {
      groups.set(parent, []);
    }
    groups.get(parent).push(img);
  });
  
  // Debug: log all groups
  console.log('Image groups:');
  groups.forEach((images, parent) => {
    console.log(`  Parent: ${parent.tagName}${parent.className ? '.' + parent.className : ''}${parent.id ? '#' + parent.id : ''}, Images: ${images.length}`);
  });
  
  // Convert to array and filter out groups with only 1 image
  const imageGroups = Array.from(groups.values()).filter(group => group.length > 1);
  
  console.log(`Found ${imageGroups.length} image groups with multiple images`);
  
  // Create carousels for each group
  imageGroups.forEach(imageGroup => {
    const parent = imageGroup[0].parentElement;
    
    // Skip if container already has Embla or slider classes
    if (parent.classList.contains('embla') || 
        parent.classList.contains('slider-container') ||
        parent.closest('.embla') || 
        parent.closest('.slider-container')) {
      return;
    }
    
    console.log(`Creating carousel with ${imageGroup.length} images in`, parent);
    
    // Create Embla structure
    const outer = document.createElement('div');
    outer.classList.add('embla');
    parent.appendChild(outer);
    
    const inner = document.createElement('div');
    inner.classList.add('embla__container');
    outer.appendChild(inner);
    
    imageGroup.forEach(img => {
      // Remove image from its current position
      img.parentElement.removeChild(img);
      
      const slide = document.createElement('div');
      slide.classList.add('embla__slide');
      slide.appendChild(img);
      inner.appendChild(slide);
    });
    
    // Initialize Embla Carousel with autoplay
    try {
      EmblaCarousel(outer, { loop: true }, [EmblaCarouselAutoplay()]);
      console.log('Embla carousel initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Embla Carousel:', error);
    }
  });
}

// Initialize Embla when both libraries are loaded
function initEmblaCarousels() {
  if (typeof EmblaCarousel !== 'undefined' && typeof EmblaCarouselAutoplay !== 'undefined') {
    renderEmblaCarousels();
  } else {
    // Wait for scripts to load
    const emblaLib = document.getElementById('embla-lib');
    const emblaAutoplayLib = document.getElementById('embla-autoplay-lib');
    
    if (emblaLib && emblaAutoplayLib) {
      Promise.all([
        new Promise(resolve => emblaLib.addEventListener('load', resolve)),
        new Promise(resolve => emblaAutoplayLib.addEventListener('load', resolve))
      ]).then(() => {
        console.log('Embla Carousel and Autoplay loaded');
        renderEmblaCarousels();
      }).catch(error => {
        console.error('Error loading Embla libraries:', error);
      });
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmblaCarousels);
} else {
  initEmblaCarousels();
}


