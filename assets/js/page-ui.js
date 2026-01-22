(function () {
  const spinner = document.querySelector('.page-spinner');
  const backToTop = document.querySelector('.back-to-top');

  const showSpinner = () => {
    if (spinner) {
      spinner.classList.add('is-active');
    }
  };

  const hideSpinner = () => {
    if (spinner) {
      spinner.classList.remove('is-active');
    }
  };

  const shouldHandleLink = (link) => {
    if (!link) return false;
    const href = link.getAttribute('href');
    if (!href) return false;
    if (link.target === '_blank') return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.startsWith('javascript:')) return false;
    if (href.startsWith('http') && !href.includes(window.location.host)) return false;
    return true;
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!shouldHandleLink(link)) return;
    showSpinner();
  });

  window.addEventListener('pageshow', hideSpinner);
  window.addEventListener('load', hideSpinner);

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
})();
