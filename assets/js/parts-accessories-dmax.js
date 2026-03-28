(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     ACCESSORIES DATA — Edit this array to manage pages.
     Each sub-array is one page of items (6 items per page).
     To add/remove items or pages, just edit this array.
  ───────────────────────────────────────────────── */
  const ACCESSORIES_DATA = [
    // ── PAGE 1 ──
    [
      {
        image: 'assets/images/parts-accessories/d-max/placeholder-door-handle-housing-protector.jpg',
        name: 'Door Handle Housing Protector',
        description: 'Engineered to protect the paint from accidental scratches when opening the door. Also accentuates to the overall aesthetics of the D-MAX.'
      },
      {
        image: 'assets/images/parts-accessories/d-max/placeholder-rocket-plate.jpg',
        name: 'Rocket Plate',
        description: 'Provides additional grip and traction as you step in and out of the vehicle. Also contributes to the overall look of the interior.'
      },
      {
        image: 'assets/images/parts-accessories/d-max/placeholder-door-handle-housing-protector-set.jpg',
        name: 'Door Handle Housing Protector Set',
        description: 'Engineered to protect the paint from accidental scratches when opening the door. Also accentuates to the overall aesthetics of the D-MAX.'
      },
      {
        image: 'assets/images/parts-accessories/d-max/placeholder-bed-rubber-mat-crew.jpg',
        name: 'Bed Rubber Mat Crew',
        description: 'Provides overall protection and tight grip on the items being loaded on the cargo box.'
      },
      {
        image: 'assets/images/parts-accessories/d-max/placeholder-rocket-plate-set.jpg',
        name: 'Rocket Plate Set',
        description: 'Provides additional grip and traction as you step in and out of the vehicle. Also contributes to the overall look of the interior.'
      },
      {
        image: 'assets/images/parts-accessories/d-max/placeholder-car-cover.jpg',
        name: 'Car Cover',
        description: 'Makes your vehicle safe from dings, scratches, pollen, insects and bird droppings. It also lessens the number of car washes as it uses water-repellent material.'
      }
    ],
    // ── PAGE 2 ── (Add items here)
    [],
    // ── PAGE 3 ── (Add items here)
    [],
    // ── PAGE 4 ── (Add items here)
    [],
    // ── PAGE 5 ── (Add items here)
    []
  ];

  /* ─────────────────────────────────────────────
     1. PAGINATION
  ───────────────────────────────────────────────── */
  const pagination = {
    currentPage: 0,
    gridEl: null,
    paginationEl: null,

    init() {
      this.gridEl = document.getElementById('dmaxGrid');
      this.paginationEl = document.getElementById('dmaxPagination');
      if (!this.gridEl || !this.paginationEl) return;

      this.renderPagination();
      this.renderPage(0);
    },

    renderPagination() {
      this.paginationEl.innerHTML = '';
      const totalPages = ACCESSORIES_DATA.length;

      for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'dmax-pagination__btn' + (i === 0 ? ' is-active' : '');
        btn.textContent = i + 1;
        btn.setAttribute('aria-label', 'Go to page ' + (i + 1));
        btn.addEventListener('click', () => this.goToPage(i));
        this.paginationEl.appendChild(btn);
      }
    },

    goToPage(pageIndex) {
      if (pageIndex === this.currentPage) return;
      this.currentPage = pageIndex;

      // Update active button
      this.paginationEl.querySelectorAll('.dmax-pagination__btn').forEach((btn, i) => {
        btn.classList.toggle('is-active', i === pageIndex);
      });

      // Fade out, swap content, fade in
      this.gridEl.style.opacity = '0';
      this.gridEl.style.transform = 'translateY(20px)';

      setTimeout(() => {
        this.renderPage(pageIndex);
        // Trigger reflow
        void this.gridEl.offsetHeight;
        this.gridEl.style.opacity = '1';
        this.gridEl.style.transform = 'translateY(0)';

        // Scroll to section title
        const titleEl = document.querySelector('.dmax-accessories__title');
        if (titleEl) {
          titleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    },

    renderPage(pageIndex) {
      const items = ACCESSORIES_DATA[pageIndex] || [];
      this.gridEl.innerHTML = '';

      if (items.length === 0) {
        this.gridEl.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-family: var(--font-hv); font-size: 20px; color: #797979; padding: 80px 0;">Items coming soon.</p>';
        return;
      }

      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dmax-card reveal';

        card.innerHTML =
          '<div class="dmax-card__img-wrap">' +
            '<img src="' + item.image + '" alt="' + item.name + '" class="dmax-card__img" onerror="this.style.display=\'none\'">' +
          '</div>' +
          '<h3 class="dmax-card__name">' + item.name + '</h3>' +
          '<p class="dmax-card__desc">' + item.description + '</p>';

        this.gridEl.appendChild(card);
      });

      // Re-trigger scroll reveal for new cards
      scrollReveal.observe(this.gridEl.querySelectorAll('.reveal'));
    }
  };


  /* ─────────────────────────────────────────────
     2. SCROLL REVEAL — IntersectionObserver
  ───────────────────────────────────────────────── */
  const scrollReveal = {
    observer: null,

    init() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      targets.forEach(el => this.observer.observe(el));
    },

    observe(elements) {
      if (!this.observer) return;
      elements.forEach(el => {
        el.classList.remove('revealed');
        this.observer.observe(el);
      });
    }
  };


  /* ─────────────────────────────────────────────
     3. HEADER — scroll shadow effect
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
     4. MEGA MENU — click open/close
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
     5. SCROLL TO TOP
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
     BOOT IT ALL UP
  ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    scrollReveal.init();
    headerScroll.init();
    megaMenu.init();
    scrollToTop.init();
    pagination.init();

    // Add transition for grid fade effect
    const grid = document.getElementById('dmaxGrid');
    if (grid) {
      grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
  });

})();
