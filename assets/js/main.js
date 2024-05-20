
(function() {
  "use strict";

  var checkbox = document.querySelector('input[name=mode]');

  checkbox.addEventListener('change', function() {
      if(this.checked) {
          trans()
          document.documentElement.setAttribute('data-theme', 'dark')
      } else {
          trans()
          document.documentElement.setAttribute('data-theme', 'light')
      }
  })

  let trans = () => {
      document.documentElement.classList.add('transition');
      window.setTimeout(() => {
          document.documentElement.classList.remove('transition');
      }, 1000)
  }

  function copyText() {
    // Get the div element
    var divElement = document.getElementById("copytextid");
  
    // Create a range object
    var range = document.createRange();
  
    // Select the contents of the div element
    range.selectNode(divElement);
  
    // Add the range to the user's selection
    window.getSelection().addRange(range);
  
    // Copy the selected text to the clipboard
    document.execCommand("copy");
  
    // Give a visual feedback to the user that the text has been copied
    alert("Text has been copied!");
  }


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

//Functionality to handle smooth scrolling and section highlighting when clicking on navigation links
on('click', '#navbar .nav-link', function(e) { 
  let section = select(this.hash); // Retrieve the target section based on the clicked link's hash
  
  if (section) { // Check if the target section exists
    e.preventDefault(); // Prevent the default action (navigating to a new page)

    // Select necessary elements
    let navbar = select('#navbar');
    let header = select('#header');
    let sections = select('section', true);
    let navlinks = select('#navbar .nav-link', true);

    // Remove the 'active' class from all navigation links
    navlinks.forEach((item) => {
      item.classList.remove('active');
    });

    // Add the 'active' class to the clicked navigation link, highlighting it as active
    this.classList.add('active');

    // Toggle the mobile navigation menu if it's open
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      let navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }

    // Adjust header and section classes based on whether the target section is the header or not
    if (this.hash == '#header') { // If the target section is the header
      header.classList.remove('header-top'); // Remove the 'header-top' class from the header
      sections.forEach((item) => { // Remove the 'section-show' class from all sections
        item.classList.remove('section-show');
      });
      return; 
    }

    // If the target section is not the header
    if (!header.classList.contains('header-top')) { // If the header does not have the 'header-top' class
      header.classList.add('header-top'); // Add the 'header-top' class to the header
      setTimeout(function() { 
        sections.forEach((item) => { // Remove the 'section-show' class from all sections
          item.classList.remove('section-show');
        });
        section.classList.add('section-show'); // Add the 'section-show' class to the target section

      }, 350); // Delay in milliseconds
    } else { 
      sections.forEach((item) => { // Remove the 'section-show' class from all sections
        item.classList.remove('section-show');
      });
      section.classList.add('section-show'); // Add the 'section-show' class to the target section
    }

    scrollto(this.hash); // Scroll to the target section
  }
}, true); // Use capturing phase for the event listener


  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
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

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
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

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()