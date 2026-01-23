(() => {
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
    const href = link?.getAttribute('href');
    if (!link || !href) return false;
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
})();
