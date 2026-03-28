(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     PRODUCT DATA — Edit these arrays to add/remove/update slides.
     Each entry is one paginated "page" containing an ISP card
     and a corresponding Replacement Parts card.
     ═══════════════════════════════════════════════════════════════ */

  /**
   * SECTION 1 — Top comparison carousel
   * Each item = { isp: {...}, replacement: {...} }
   *
   * isp / replacement fields:
   *   image:   path to image (or "" for placeholder)
   *   title:   bold heading on the card
   *   bullets: array of bullet-point strings
   *   desc:    paragraph description (optional, can be "")
   */
  const section1Data = [
    {
      isp: {
        image: "",  // PLACEHOLDER: Replace with actual ISP product image
        title: "Hard Alloy in 1st ring groove",
        bullets: ["Prevent wear", "Prevent output reduction"],
        desc: "ISP uses hard alloy 1st Ring groove as same as genuine parts so that when the combustion takes place, it will prevent from getting worn by 1st Ring collide with ring groove."
      },
      replacement: {
        image: "",  // PLACEHOLDER: Replace with actual aftermarket product image
        title: "NO Alloy in 1st ring groove",
        bullets: ["Wear in the early stage", "Engine output reduce"],
        desc: "Poor quality aftermarket brand does not have alloy to ring groove so when the combustion takes place, 1st ring collide with ring groove and wear will spread faster."
      }
    },
    {
      isp: {
        image: "",
        title: "Placeholder ISP Slide 2",
        bullets: ["Benefit 1", "Benefit 2"],
        desc: "Description for ISP slide 2."
      },
      replacement: {
        image: "",
        title: "Placeholder Replacement Slide 2",
        bullets: ["Drawback 1", "Drawback 2"],
        desc: "Description for replacement slide 2."
      }
    },
    {
      isp: {
        image: "",
        title: "Placeholder ISP Slide 3",
        bullets: ["Benefit 1", "Benefit 2"],
        desc: "Description for ISP slide 3."
      },
      replacement: {
        image: "",
        title: "Placeholder Replacement Slide 3",
        bullets: ["Drawback 1", "Drawback 2"],
        desc: "Description for replacement slide 3."
      }
    }
  ];

  /**
   * SECTION 2 — Bottom comparison carousel
   * Same structure as section1Data.
   */
  const section2Data = [
    {
      isp: {
        image: "",  // PLACEHOLDER: Replace with actual ISP product image
        title: "Thick Filter Paper",
        bullets: ["High Filter Paper Strength"],
        desc: ""
      },
      replacement: {
        image: "",  // PLACEHOLDER: Replace with actual aftermarket product image
        title: "ISUZU REPLACEMENT PARTS",
        bullets: ["Reduce Filter Paper Area", "Low Filter Paper Strength"],
        desc: ""
      }
    },
    {
      isp: {
        image: "",
        title: "Placeholder ISP Slide 2",
        bullets: ["Benefit 1"],
        desc: ""
      },
      replacement: {
        image: "",
        title: "Placeholder Replacement Slide 2",
        bullets: ["Drawback 1"],
        desc: ""
      }
    },
    {
      isp: {
        image: "",
        title: "Placeholder ISP Slide 3",
        bullets: ["Benefit 1"],
        desc: ""
      },
      replacement: {
        image: "",
        title: "Placeholder Replacement Slide 3",
        bullets: ["Drawback 1"],
        desc: ""
      }
    },
    {
      isp: {
        image: "",
        title: "Placeholder ISP Slide 4",
        bullets: ["Benefit 1"],
        desc: ""
      },
      replacement: {
        image: "",
        title: "Placeholder Replacement Slide 4",
        bullets: ["Drawback 1"],
        desc: ""
      }
    },
    {
      isp: {
        image: "",
        title: "Placeholder ISP Slide 5",
        bullets: ["Benefit 1"],
        desc: ""
      },
      replacement: {
        image: "",
        title: "Placeholder Replacement Slide 5",
        bullets: ["Drawback 1"],
        desc: ""
      }
    }
  ];


  /* ═══════════════════════════════════════════════════════════════
     PAGINATION ENGINE
     ═══════════════════════════════════════════════════════════════ */

  function renderCard(containerEl, cardData, type) {
    if (!containerEl) return;

    // Image
    const imageWrap = containerEl.querySelector('.sp-comparison__image');
    if (imageWrap) {
      if (cardData.image) {
        imageWrap.innerHTML = '<img src="' + cardData.image + '" alt="' + cardData.title + '">';
      } else {
        imageWrap.innerHTML = '<div class="sp-comparison__image-placeholder">PLACEHOLDER<br>Replace with product image</div>';
      }
    }

    // Title
    const titleEl = containerEl.querySelector('.sp-comparison__slide-title');
    if (titleEl) titleEl.textContent = cardData.title;

    // Bullets
    const bulletList = containerEl.querySelector('.sp-comparison__bullet-list');
    if (bulletList) {
      bulletList.innerHTML = cardData.bullets
        .map(function (b) { return '<li>' + b + '</li>'; })
        .join('');
    }

    // Description
    const descEl = containerEl.querySelector('.sp-comparison__slide-desc');
    if (descEl) {
      descEl.textContent = cardData.desc || '';
      descEl.style.display = cardData.desc ? 'block' : 'none';
    }
  }

  function initPagination(sectionId, data) {
    var currentPage = 0;
    var totalPages = data.length;

    var section = document.getElementById(sectionId);
    if (!section) return;

    var ispCard = section.querySelector('.sp-comparison--isp');
    var repCard = section.querySelector('.sp-comparison--replacement');
    var prevBtn = section.querySelector('.sp-pagination__btn--prev');
    var nextBtn = section.querySelector('.sp-pagination__btn--next');
    var indicator = section.querySelector('.sp-pagination__indicator');

    function render() {
      var pageData = data[currentPage];
      renderCard(ispCard, pageData.isp, 'isp');
      renderCard(repCard, pageData.replacement, 'replacement');
      indicator.textContent = (currentPage + 1) + ' / ' + totalPages;

      // Disable buttons at bounds
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage === totalPages - 1;
    }

    prevBtn.addEventListener('click', function () {
      if (currentPage > 0) {
        currentPage--;
        render();
      }
    });

    nextBtn.addEventListener('click', function () {
      if (currentPage < totalPages - 1) {
        currentPage++;
        render();
      }
    });

    // Initial render
    render();
  }


  /* ─────────────────────────────────────────────
     SCROLL REVEAL — IntersectionObserver
  ───────────────────────────────────────────────── */
  const scrollReveal = {
    init() {
      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      if (!targets.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      targets.forEach(el => observer.observe(el));
    }
  };


  /* ─────────────────────────────────────────────
     HEADER — scroll shadow effect
  ───────────────────────────────────────────────── */
  const headerScroll = {
    header: document.querySelector('.site-header'),
    init() {
      if (!this.header) return;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.header.classList.toggle('scrolled', window.scrollY > 10);
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  };


  /* ─────────────────────────────────────────────
     MEGA MENU — click open/close
  ───────────────────────────────────────────────── */
  const megaMenu = {
    init() {
      const navItems = document.querySelectorAll('[data-menu]');

      navItems.forEach(item => {
        const menuId = item.getAttribute('data-menu');
        const panel = document.getElementById('menu-' + menuId);
        if (!panel) return;

        item.addEventListener('click', e => {
          e.stopPropagation();
          const isOpen = panel.classList.contains('is-open');
          this.closeAll();
          if (!isOpen) {
            panel.classList.add('is-open');
            item.classList.add('menu-open');
          }
        });
      });

      document.addEventListener('click', e => {
        if (!e.target.closest('.site-header')) this.closeAll();
      });
    },

    closeAll() {
      document.querySelectorAll('.mega-menu.is-open, .nav-dropdown.is-open')
        .forEach(p => p.classList.remove('is-open'));
      document.querySelectorAll('.nav-item.menu-open')
        .forEach(n => n.classList.remove('menu-open'));
    }
  };


  /* ─────────────────────────────────────────────
     SCROLL TO TOP
  ───────────────────────────────────────────────── */
  const scrollToTop = {
    init() {
      const btn = document.getElementById('scrollToTopBtn');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };


  /* ─────────────────────────────────────────────
     SMOOTH ANCHOR LINKS
  ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─────────────────────────────────────────────
     BOOT IT ALL UP
  ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    scrollReveal.init();
    headerScroll.init();
    megaMenu.init();
    scrollToTop.init();

    // Initialize both paginated sections
    initPagination('section1', section1Data);
    initPagination('section2', section2Data);
  });

})();
