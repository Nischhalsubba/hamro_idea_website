import { gsap } from "gsap";

// new Glider(document.querySelector(".work"));

const initGlider = (sectionSelector, sliderSelector, options) => {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const slider = section.querySelector(sliderSelector);
  if (!slider) return;

  const prev = section.querySelector(".glider-prev");
  const next = section.querySelector(".glider-next");
  const dots = section.querySelector(".dots");

  new Glider(slider, {
    ...options,
    arrows: {
      prev,
      next,
    },
    dots,
  });
};

initGlider(".work", ".card-slider", {
  slidesToShow: 3,
  draggable: true,
});

initGlider(".technology", ".card-slider", {
  slidesToShow: 5,
  draggable: true,
});

initGlider(".testimonial", ".card-slider", {
  slidesToShow: 1,
  draggable: true,
});

// Hedear

// Header Sticky Logic - Kept from original
document.addEventListener("DOMContentLoaded", function (event) {
  const nav = document.querySelector(".navbar");
  const setNavHeight = () => {
    if (!nav) return;
    document.documentElement.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
  };

  setNavHeight();
  window.addEventListener("resize", setNavHeight);

  let isSticky = false;
  window.addEventListener("scroll", function () {
    if (nav) {
      const shouldStick = window.scrollY > 10;
      if (shouldStick && !isSticky) {
        nav.classList.add("sticky");
        gsap.fromTo(
          nav,
          { y: -12 },
          { y: 0, duration: 0.45, ease: "back.out(1.6)" }
        );
        isSticky = true;
      } else if (!shouldStick && isSticky) {
        nav.classList.remove("sticky");
        isSticky = false;
      }
    }
  });

  // Mobile Menu Logic
  const mobileToggle = document.querySelector('.navbar__toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    mobileClose.addEventListener('click', () => {
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Mobile Submenu Logic
  const menuWithSub = document.querySelectorAll('.mobile-nav-list .has-submenu');
  menuWithSub.forEach(item => {
    item.addEventListener('click', function () {
      const submenu = this.querySelector('.submenu');
      if (submenu) {
        submenu.classList.toggle('open');
      }
    });
  });

  // Desktop Mega Menu Logic (detached panels)
  const megaMenuItems = document.querySelectorAll(".navbar__menu-desktop .has-mega-menu");
  const megaMenus = document.querySelectorAll(".mega-menus .mega-menu");
  let megaCloseTimeout;

  const closeMegaMenus = () => {
    megaMenuItems.forEach((item) => item.classList.remove("is-open"));
    megaMenus.forEach((menu) => menu.classList.remove("is-open"));
  };

  const openMegaMenu = (key) => {
    closeMegaMenus();
    const menu = document.querySelector(`.mega-menus .mega-menu[data-mega="${key}"]`);
    const item = document.querySelector(`.navbar__menu-desktop [data-mega-target="${key}"]`);
    if (menu) {
      menu.classList.add("is-open");
    }
    if (item) {
      item.classList.add("is-open");
    }
  };

  megaMenuItems.forEach((item) => {
    const key = item.getAttribute("data-mega-target");
    const link = item.querySelector(".nav-link");

    item.addEventListener("mouseenter", () => {
      clearTimeout(megaCloseTimeout);
      if (key) {
        openMegaMenu(key);
      }
    });

    item.addEventListener("mouseleave", () => {
      megaCloseTimeout = setTimeout(() => {
        if (!document.querySelector(".mega-menus .mega-menu.is-open:hover")) {
          closeMegaMenus();
        }
      }, 120);
    });

    if (link) {
      link.addEventListener("click", (e) => {
        const isOpen = item.classList.contains("is-open");
        if (!isOpen) {
          e.preventDefault();
          openMegaMenu(key);
        }
      });
    }
  });

  megaMenus.forEach((menu) => {
    menu.addEventListener("mouseenter", () => {
      clearTimeout(megaCloseTimeout);
    });

    menu.addEventListener("mouseleave", () => {
      megaCloseTimeout = setTimeout(closeMegaMenus, 120);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && !e.target.closest(".mega-menus")) {
      closeMegaMenus();
    }
  });
});

// Import and Run GSAP Animations
import './animations.js';
