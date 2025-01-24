(function () {
  "use strict";

  // Theme Toggle Functionality
  const themeToggle = () => {
    const checkbox = document.querySelector('input[name=mode]');

    const trans = () => {
      document.documentElement.classList.add('transition');
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          document.documentElement.classList.remove('transition');
        }, 1000);
      });
    };

    checkbox.addEventListener('change', function () {
      trans();
      document.documentElement.setAttribute('data-theme', this.checked ? 'dark' : 'light');
    });
  };

  // Helper Functions
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => {
          e.addEventListener(type, listener);
          if (type === 'click') e.addEventListener('touchstart', listener); // Add touchstart for iOS
        });
      } else {
        selectEl.addEventListener(type, listener);
        if (type === 'click') selectEl.addEventListener('touchstart', listener); // Add touchstart for iOS
      }
    }
  };

  // Mobile Navigation Toggle
  const mobileNavToggle = () => {
    on('click', '.mobile-nav-toggle', function (e) {
      e.preventDefault();
      const navbar = select('#navbar');
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  };

  // Smooth Scrolling and Section Highlighting
  const handleNavLinkClicks = () => {
    on('click', '#navbar .nav-link', function (e) {
      const section = select(this.hash);
      if (section) {
        e.preventDefault();

        const navbar = select('#navbar');
        const header = select('#header');
        const sections = select('section', true);
        const navlinks = select('#navbar .nav-link', true);

        navlinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }

        if (this.hash === '#header') {
          header.classList.remove('header-top');
          sections.forEach(item => item.classList.remove('section-show'));
          return;
        }

        if (!header.classList.contains('header-top')) {
          header.classList.add('header-top');
          setTimeout(() => {
            sections.forEach(item => item.classList.remove('section-show'));
            section.classList.add('section-show');
          }, 350);
        } else {
          sections.forEach(item => item.classList.remove('section-show'));
          section.classList.add('section-show');
        }

        scrollto(this.hash);
      }
    }, true);
  };

  // Activate Sections on Load with Hash Links
  const activateSectionsOnLoad = () => {
    window.addEventListener('load', () => {
      if (window.location.hash) {
        const initialNav = select(window.location.hash);
        if (initialNav) {
          const header = select('#header');
          const navlinks = select('#navbar .nav-link', true);

          header.classList.add('header-top');
          navlinks.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === window.location.hash);
          });

          setTimeout(() => initialNav.classList.add('section-show'), 350);
          scrollto(window.location.hash);
        }
      }
    });
  };

  // Skills Progress Animation
  const skillsProgress = () => {
    const skillsContent = select('.skills-content');
    if (skillsContent) {
      new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: function (direction) {
          const progress = select('.progress .progress-bar', true);
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    }
  };

  // Testimonials Slider
  const testimonialsSlider = () => {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  };

  // Portfolio Isotope and Filter
  const portfolioFilter = () => {
    window.addEventListener('load', () => {
      const portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        const portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        const portfolioFilters = select('#portfolio-flters li', true);
        on('click', '#portfolio-flters li', function (e) {
          e.preventDefault();
          portfolioFilters.forEach(el => el.classList.remove('filter-active'));
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }, true);
      }
    });
  };

  // Portfolio Lightbox
  const portfolioLightboxInit = () => {
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });

    const portfolioDetailsLightbox = GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
  };

  // Portfolio Details Slider
  const portfolioDetailsSlider = () => {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  };

  // Initialize Pure Counter
  const initPureCounter = () => {
    new PureCounter();
  };

  // Page Load Event
  const pageLoad = () => {
    window.addEventListener('load', function () {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    });
  };

  // Initialize All Functions
  const init = () => {
    themeToggle();
    mobileNavToggle();
    handleNavLinkClicks();
    activateSectionsOnLoad();
    skillsProgress();
    testimonialsSlider();
    portfolioFilter();
    portfolioLightboxInit();
    portfolioDetailsSlider();
    initPureCounter();
    pageLoad();
  };

  // Start Initialization
  init();
})();

