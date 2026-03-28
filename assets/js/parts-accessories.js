(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. SCROLL REVEAL — IntersectionObserver
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
     2. HEADER — scroll shadow effect
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
     3. MEGA MENU — click open/close
  ───────────────────────────────────────────────── */
  const megaMenu = {
    init() {
      const header = document.querySelector('.site-header');
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
     4. FORM — placeholder behavior & focus
  ───────────────────────────────────────────────── */
  const formBehavior = {
    init() {
      const inputs = document.querySelectorAll('.parts-form__input, .parts-form__textarea');

      inputs.forEach(input => {
        const placeholder = input.parentElement.querySelector('.parts-form__placeholder');
        if (!placeholder) return;

        input.addEventListener('focus', () => {
          placeholder.style.opacity = '0';
        });

        input.addEventListener('blur', () => {
          if (!input.value) {
            placeholder.style.opacity = '1';
          }
        });

        // Initialize on load
        if (input.value) {
          placeholder.style.opacity = '0';
        }
      });
    }
  };


  /* ─────────────────────────────────────────────
     5. FORM SUBMISSION
  ───────────────────────────────────────────────── */
  const formSubmit = {
    init() {
      const form = document.getElementById('partsInquiryForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const consent = document.getElementById('consentCheckbox');
        if (!consent.checked) {
          alert('Please agree to the Privacy Statement and Privacy Notice to proceed.');
          return;
        }

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log('Parts Inquiry Submitted:', data);

        alert('Thank you for your inquiry! We will get back to you soon.');
        form.reset();

        // Reset placeholder visibility
        document.querySelectorAll('.parts-form__placeholder').forEach(p => {
          p.style.opacity = '1';
        });
      });
    }
  };


  /* ─────────────────────────────────────────────
     6. SCROLL TO TOP
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
     7. SMOOTH ANCHOR LINKS
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
    formBehavior.init();
    formSubmit.init();
    scrollToTop.init();
  });

})();
