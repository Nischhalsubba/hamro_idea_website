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
});

// Import and Run GSAP Animations
import './animations.js';
