(function() {
  "use strict";

  // Toggle header visibility
  const toggleHeader = (() => {
    const btn = document.querySelector('.header-toggle');
    const header = document.querySelector('#header');
    return () => {
      header.classList.toggle('header-show');
      btn.classList.toggle('bi-list');
      btn.classList.toggle('bi-x');
    };
  })();

  document.querySelector('.header-toggle').addEventListener('click', toggleHeader);

  // Close mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(link => 
    link.addEventListener('click', () => {
      if (document.querySelector('.header-show')) toggleHeader();
    })
  );

  // Dropdown toggle
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Preloader removal
  const preloader = document.querySelector('#preloader');
  if (preloader) window.addEventListener('load', () => preloader.remove());

  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  const handleScrollTop = () => {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  };

  scrollTopBtn?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', handleScrollTop);
  document.addEventListener('scroll', handleScrollTop);

  // Initialize animations on scroll
  window.addEventListener('load', () => AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false }));

  // Initialize typed.js
  const typedElement = document.querySelector('.typed');
  if (typedElement) {
    new Typed('.typed', {
      strings: typedElement.getAttribute('data-typed-items').split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Initialize Pure Counter
  new PureCounter();

  // Skill bar animation
  document.querySelectorAll('.skills-animation').forEach(skill => {
    new Waypoint({
      element: skill,
      offset: '80%',
      handler: function() {
        skill.querySelectorAll('.progress .progress-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  // Initialize GLightbox
  GLightbox({ selector: '.glightbox' });

  // Initialize isotope layout
  document.querySelectorAll('.isotope-layout').forEach(isotope => {
    imagesLoaded(isotope.querySelector('.isotope-container'), () => {
      let instance = new Isotope(isotope.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: isotope.getAttribute('data-layout') ?? 'masonry',
        filter: isotope.getAttribute('data-default-filter') ?? '*',
        sortBy: isotope.getAttribute('data-sort') ?? 'original-order'
      });
      isotope.querySelectorAll('.isotope-filters li').forEach(filter => {
        filter.addEventListener('click', function() {
          isotope.querySelector('.filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          instance.arrange({ filter: this.getAttribute('data-filter') });
        });
      });
    });
  });

  // Initialize Swiper sliders
  window.addEventListener('load', () => {
    document.querySelectorAll('.init-swiper').forEach(swiper => {
      new Swiper(swiper, JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim()));
    });
  });

  // Scroll to hash on page load
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        window.scrollTo({ top: section.offsetTop - parseInt(getComputedStyle(section).scrollMarginTop), behavior: 'smooth' });
      }, 100);
    }
  });

  // Navigation menu scrollspy
  function updateNavMenu() {
    document.querySelectorAll('.navmenu a').forEach(link => {
      if (!link.hash) return;
      let section = document.querySelector(link.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(active => active.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', updateNavMenu);
  document.addEventListener('scroll', updateNavMenu);

})();
