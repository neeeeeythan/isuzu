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
        image: "assets/images/parts-accessories/select-parts/Top_1 1.png",  // PLACEHOLDER: Replace with actual ISP product image
        title: "Hard Alloy in 1st ring groove",
        bullets: ["Prevent wear", "Prevent output reduction"],
        desc: "ISP uses hard alloy 1st Ring groove as same as genuine parts so that when the combustion takes place, it will prevent from getting worn by 1st Ring collide with ring groove."
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Top_2 1.png",  // PLACEHOLDER: Replace with actual aftermarket product image
        title: "NO Alloy in 1st ring groove",
        bullets: ["Wear in the early stage", "Engine output reduce"],
        desc: "Poor quality aftermarket brand does not have alloy to ring groove so when the combustion takes place, 1st ring collide with ring groove and wear will spread faster."
      }
    },
    {
      isp: {
        image: "assets/images/parts-accessories/select-parts/Top_1 1.png",
        title: "Thick Alloy",
        bullets: ["Prevent heat expansion"],
        desc: "Alloy is used in bottom area of combustion chamber to control piston expansion.\n\u2022 Clearance between piston and cylinder liner will be maintained.\n\u2022 Control deterioration of fuel consumption."
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Top_2 1.png",
        title: "Thin Alloy",
        bullets: ["The wear increase around the outer surface of piston"],
        desc: "Alloy is used in bottom area of combustion chamber to control piston expansion.\n\u2022 Clearance between piston and cylinder liner will be maintained.\n\u2022 Control deterioration of fuel consumption."
      }
    },
    {
      isp: {
        image: "assets/images/parts-accessories/select-parts/Top_1 1.png",
        title: "Have Appropriate Casting Process",
        bullets: ["Enough strength&durability of piston"],
        desc: "Prevent from piston to get cracked by having appropriate casting process."
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Top_2 1.png",
        title: "Cast Cavity Appears",
        bullets: ["Increase the possibility of damaging piston"],
        desc: "Many casting cavities appears so it is easy to get cracked."
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
        image: "assets/images/parts-accessories/select-parts/Bottom_1 1.png",  // PLACEHOLDER: Replace with actual ISP product image
        title: "Thick Filter Paper",
        bullets: ["High Filter Paper Strength"],
        desc: ""
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Bottom_2 1.png",  // PLACEHOLDER: Replace with actual aftermarket product image
        title: "ISUZU REPLACEMENT PARTS",
        bullets: ["Reduce Filter Paper Area", "Low Filter Paper Strength"],
        desc: ""
      }
    },
    {
      isp: {
        image: "assets/images/parts-accessories/select-parts/Bottom_3 1.png",
        title: "",
        bullets: ["Seal"],
        desc: ""
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Bottom_5 1.png",
        title: "",
        bullets: ["Inner coating", "Protector"],
        desc: ""
      }
    },
    {
      isp: {
        image: "assets/images/parts-accessories/select-parts/Bottom_7 1.png",
        title: "",
        bullets: [],
        desc: "There is adhesion rubber so the string and body of the belt does not get peeled off easily."
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Bottom_9 1.png",
        title: "",
        bullets: [],
        desc: "ISP hardly crack because the cord is thin and has great flexibility."
      }
    },
    {
      isp: {
        image: "assets/images/parts-accessories/select-parts/Bottom_4 1.png",
        title: "",
        bullets: ["No Seal"],
        desc: ""
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Bottom_6 1.png",
        title: "",
        bullets: ["No inner coating", "No irotector"],
        desc: ""
      }
    },
    {
      isp: {
        image: "assets/images/parts-accessories/select-parts/Bottom_8 1.png",
        title: "",
        bullets: [],
        desc: "There is no adhesion rubber so the string and body of the belt get peeled off easily. This will lead to vehicle downtime due to belt breakage."
      },
      replacement: {
        image: "assets/images/parts-accessories/select-parts/Bottom_10 1.png",
        title: "",
        bullets: [],
        desc: "Poor quality parts easily crack because cord is thick and space in between is large. This will lead to vehicle downtime due to belt breakage."
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

    // Description (supports line breaks via \n)
    const descEl = containerEl.querySelector('.sp-comparison__slide-desc');
    if (descEl) {
      if (cardData.desc) {
        descEl.innerHTML = cardData.desc.replace(/\n/g, '<br>');
        descEl.style.display = 'block';
      } else {
        descEl.innerHTML = '';
        descEl.style.display = 'none';
      }
    }
  }

  function initPagination(sectionId, data) {
    var currentPage = 0;
    var totalPages = data.length;
    var animating = false;

    var section = document.getElementById(sectionId);
    if (!section) return;

    var ispCard = section.querySelector('.sp-comparison--isp');
    var repCard = section.querySelector('.sp-comparison--replacement');
    var ispBody = ispCard.querySelector('.sp-comparison__body');
    var repBody = repCard.querySelector('.sp-comparison__body');
    var prevBtn = section.querySelector('.sp-pagination__btn--prev');
    var nextBtn = section.querySelector('.sp-pagination__btn--next');
    var indicator = section.querySelector('.sp-pagination__indicator');

    function render() {
      var pageData = data[currentPage];
      renderCard(ispCard, pageData.isp, 'isp');
      renderCard(repCard, pageData.replacement, 'replacement');
      indicator.textContent = (currentPage + 1) + ' / ' + totalPages;

      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage === totalPages - 1;
    }

    function animateTransition(direction) {
      if (animating) return;
      animating = true;

      var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
      var inClass = direction === 'next' ? 'slide-in' : 'slide-in-left';

      // Fade out current content
      ispBody.classList.add(outClass);
      repBody.classList.add(outClass);

      setTimeout(function () {
        // Swap content while hidden
        render();

        // Remove fade-out, add fade-in start position
        ispBody.classList.remove(outClass);
        repBody.classList.remove(outClass);
        ispBody.classList.add(inClass);
        repBody.classList.add(inClass);

        // Force reflow so the browser registers the start position
        void ispBody.offsetWidth;

        // Animate to visible
        ispBody.classList.remove(inClass);
        repBody.classList.remove(inClass);

        setTimeout(function () {
          animating = false;
        }, 350);
      }, 350);
    }

    prevBtn.addEventListener('click', function () {
      if (currentPage > 0 && !animating) {
        currentPage--;
        animateTransition('prev');
      }
    });

    nextBtn.addEventListener('click', function () {
      if (currentPage < totalPages - 1 && !animating) {
        currentPage++;
        animateTransition('next');
      }
    });

    // Initial render (no animation)
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
