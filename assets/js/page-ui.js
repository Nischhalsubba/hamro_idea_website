(() => {
  let globalListenersInitialized = false;
  let scrollHandler;
  let clickHandler;
  let backToTopClickHandler;

  const getSpinner = () => document.querySelector('.page-spinner');
  const getBackToTop = () => document.querySelector('.back-to-top');

  const showSpinner = () => {
    const spinner = getSpinner();
    if (spinner) {
      spinner.classList.add('is-active');
    }
  };

  const hideSpinner = () => {
    const spinner = getSpinner();
    if (spinner) {
      spinner.classList.remove('is-active');
    }
  };

  const shouldHandleLink = (link) => {
    const href = link?.getAttribute('href');
    if (!link || !href) return false;
    if (link.target === '_blank') return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.startsWith('javascript:')) return false;
    if (href.startsWith('http') && !href.includes(window.location.host)) return false;
    return true;
  };

  const toggleBackToTop = () => {
    const backToTop = getBackToTop();
    if (!backToTop) return;
    if (window.scrollY > 600) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };

  const initGlobalListeners = () => {
    if (globalListenersInitialized) return;

    clickHandler = (event) => {
      const link = event.target.closest('a');
      if (shouldHandleLink(link)) {
        showSpinner();
      }
    };

    backToTopClickHandler = (event) => {
      const button = event.target.closest('.back-to-top');
      if (!button) return;
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    scrollHandler = () => {
      toggleBackToTop();
    };

    document.addEventListener('click', clickHandler);
    document.addEventListener('click', backToTopClickHandler);
    window.addEventListener('pageshow', hideSpinner);
    window.addEventListener('load', hideSpinner);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    globalListenersInitialized = true;
  };

  const initPageUI = () => {
    initGlobalListeners();
    toggleBackToTop();

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

    const whyChoose = document.querySelector('.why-choose');
    if (whyChoose) {
      const cards = Array.from(whyChoose.querySelectorAll('.why-choose__card'));
      const media = whyChoose.querySelector('.why-choose__media');
      const mediaImg = media?.querySelector('img');

      if (cards.length > 0 && mediaImg) {
        const defaultSrc = mediaImg.getAttribute('src');
        const defaultAlt = mediaImg.getAttribute('alt');

        const swapMedia = (card) => {
          const nextSrc = card.dataset.media;
          const nextAlt = card.dataset.mediaAlt || defaultAlt;
          if (!nextSrc || nextSrc === mediaImg.getAttribute('src')) {
            return;
          }

          media?.classList.add('is-switching');
          mediaImg.addEventListener(
            'load',
            () => {
              media?.classList.remove('is-switching');
            },
            { once: true }
          );
          mediaImg.setAttribute('src', nextSrc);
          mediaImg.setAttribute('alt', nextAlt);

          cards.forEach((item) => {
            item.classList.toggle('is-active', item === card);
          });
        };

        const resetMedia = () => {
          media?.classList.add('is-switching');
          mediaImg.addEventListener(
            'load',
            () => {
              media?.classList.remove('is-switching');
            },
            { once: true }
          );
          mediaImg.setAttribute('src', defaultSrc);
          mediaImg.setAttribute('alt', defaultAlt);
          cards.forEach((item, index) => {
            item.classList.toggle('is-active', index === 0);
          });
        };

        cards.forEach((card, index) => {
          if (index === 0) {
            card.classList.add('is-active');
          }
          card.addEventListener('mouseenter', () => swapMedia(card));
          card.addEventListener('focusin', () => swapMedia(card));
        });

        const list = whyChoose.querySelector('.why-choose__list');
        list?.addEventListener('mouseleave', resetMedia);
      }
    }

    const projectForm = document.querySelector('#project-form');
    if (projectForm) {
      const params = new URLSearchParams(window.location.search);
      const service = params.get('service');
      const projectType = params.get('projectType');

      const serviceSelect = projectForm.querySelector('#service-type');
      if (serviceSelect && service) {
        const option = serviceSelect.querySelector(`option[value="${service}"]`);
        if (option) {
          serviceSelect.value = service;
        }
      }

      if (projectType) {
        const types = projectForm.querySelectorAll(`input[name="projectType"][value="${projectType}"]`);
        types.forEach((input) => {
          input.checked = true;
        });
      }
    }
  };

  window.initPageUI = initPageUI;
  document.addEventListener('DOMContentLoaded', initPageUI);
})();
