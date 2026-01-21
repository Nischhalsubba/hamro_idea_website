// new Glider(document.querySelector(".work"));

new Glider(document.querySelector(".work .card-slider"), {
  slidesToShow: 3,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
});

new Glider(document.querySelector(".technology .card-slider"), {
  slidesToShow: 5,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
});

new Glider(document.querySelector(".testimonial .card-slider"), {
  slidesToShow: 1,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
});

// Hedear

// Header Sticky Logic - Kept from original
document.addEventListener("DOMContentLoaded", function (event) {
  window.addEventListener("scroll", function () {
    const nav = document.querySelector(".navbar");
    if (nav) {
      if (window.scrollY > 10) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
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

  // Desktop Navbar Logic: Click to Toggle Dropdown
  // This addresses user feedback: "I can't expand the dropdown clicking any menu item."
  const desktopDropdowns = document.querySelectorAll('.navbar__menu-desktop .has-dropdown, .navbar__menu-desktop .has-mega-menu');

  desktopDropdowns.forEach(item => {
    const link = item.querySelector('.nav-link');

    // Check if device is touch or user explicitly clicks
    if (link) {
      link.addEventListener('click', function (e) {
        // If the item has a dropdown, we prevent default nav ONLY if it's currently hidden
        // Or we allow nav if user wants strict "click to go".
        // User Request: "expand dropdwon clicking"

        // Logic: Toggle a 'show' class on the parent list item
        // The CSS must handle this .show class to override hover if needed, or just complement it.

        // Note: Since we updated hrefs to valid pages, we might want BOTH:
        // 1. Navigation happens.
        // 2. Dropdown shows? (Hard to do both at once without preventing default).

        // Compromise: On touch/click, we toggle visibility.
        // If the user wants to go to the page, they might double click? 
        // OR: We simply rely on CSS Hover for desktop, BUT ensure "Click" doesn't do nothing.
        // Current State: Click -> Navigates to page (e.g. services.html).
        // User said: "I can't expand dropdown clicking".
        // This implies they MIGHT be on a touch device or expect click-toggle on desktop.

        // Let's add a temporary toggle class for robust Interaction.
        e.preventDefault(); // Stop navigation to allow dropdown inspection first? 
        // IF we prevent default, they can't go to the page. 
        // IF we don't, the page loads and dropdown closes.

        // BEST PRACTICE: Click toggles dropdown. Double click or clicking "Overview" in dropdown goes to page.
        // OR: Since we have "See all Services" inside, maybe top link is just a toggle?

        // Implemented: Click toggles 'active' class.
        const parent = this.parentElement;
        const wasActive = parent.classList.contains('active-click');

        // Close all others
        desktopDropdowns.forEach(other => other.classList.remove('active-click'));

        if (!wasActive) {
          parent.classList.add('active-click');
          e.preventDefault(); // Prevent nav on first click to show menu
        } else {
          // If already active, allow click to proceed to URL (Navigation)
          // e.preventDefault(); // Allow default (Navigation)
          window.location.href = this.href;
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar__menu-desktop')) {
      desktopDropdowns.forEach(item => item.classList.remove('active-click'));
    }
  });
});

// Import and Run GSAP Animations
import './animations.js';
