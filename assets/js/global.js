(function () {
  "use strict";
  /* ─────────────────────────────────────────────
               3. SCROLL REVEAL — IntersectionObserver
            ───────────────────────────────────────────────── */
  const scrollReveal = {
    init() {
      const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale",
      );
      if (!targets.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target); // animate once
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      targets.forEach((el) => observer.observe(el));
    },
  };

  scrollReveal.init();

  /* ─────────────────────────────────────────────
               5. SMOOTH ANCHOR LINKS
            ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

(function () {
  "use strict";

  /* ─────────────────────────────────────────────
         1. HERO SLIDER — auto-play, dots, progress bar
      ───────────────────────────────────────────────── */
  const heroSlider = {
    slides: document.querySelectorAll(".hero-slide"),
    dotsContainer: document.getElementById("heroDots"),
    progressBar: document.getElementById("heroProgress"),
    current: 0,
    interval: null,
    duration: 6000, // 6 seconds per slide
    progressStart: 0,
    rafId: null,

    init() {
      if (!this.slides.length) return;

      // Build dots
      this.slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "hero-dot " + "hero-dot--sm";
        dot.dataset.index = i;
        dot.addEventListener("click", () => this.goTo(i));
        this.dotsContainer.appendChild(dot);
      });

      this.updateDots();
      this.startAutoPlay();

      // Trigger entrance animation for first slide's button
      const firstBtn = this.slides[0].querySelector(".hero-slide__btn");
      if (firstBtn) firstBtn.classList.add("is-entering");

      // Pause on hover
      const hero = document.getElementById("heroSlider");
      hero.addEventListener("mouseenter", () => this.pause());
      hero.addEventListener("mouseleave", () => this.startAutoPlay());

      // Touch/swipe support
      let touchStartX = 0;
      hero.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true },
      );
      hero.addEventListener(
        "touchend",
        (e) => {
          const diff = e.changedTouches[0].screenX - touchStartX;
          if (Math.abs(diff) > 50) {
            diff > 0 ? this.prev() : this.next();
          }
        },
        { passive: true },
      );
    },

    goTo(index) {
      const oldBtn =
        this.slides[this.current].querySelector(".hero-slide__btn");
      if (oldBtn) oldBtn.classList.remove("is-entering");
      this.slides[this.current].classList.remove("active");
      this.current = index;
      this.slides[this.current].classList.add("active");
      const newBtn =
        this.slides[this.current].querySelector(".hero-slide__btn");
      if (newBtn) {
        void newBtn.offsetWidth; // force reflow to restart animation
        newBtn.classList.add("is-entering");
      }
      this.updateDots();
      this.resetProgress();
    },

    next() {
      this.goTo((this.current + 1) % this.slides.length);
    },

    prev() {
      this.goTo((this.current - 1 + this.slides.length) % this.slides.length);
    },

    updateDots() {
      const dots = this.dotsContainer.querySelectorAll(".hero-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("hero-dot--active", i === this.current);
        dot.classList.toggle("hero-dot--inactive", i !== this.current);
      });
    },

    startAutoPlay() {
      this.pause();
      this.progressStart = Date.now();
      this.animateProgress();
      this.interval = setInterval(() => this.next(), this.duration);
    },

    pause() {
      clearInterval(this.interval);
      cancelAnimationFrame(this.rafId);
    },

    resetProgress() {
      this.progressStart = Date.now();
    },

    animateProgress() {
      const elapsed = Date.now() - this.progressStart;
      const pct = Math.min((elapsed / this.duration) * 100, 100);
      this.progressBar.style.width = pct + "%";
      this.rafId = requestAnimationFrame(() => this.animateProgress());
    },
  };

  /* ─────────────────────────────────────────────
         2. NEWS CAROUSEL — arrows, drag, snap
      ───────────────────────────────────────────────── */
  const newsCarousel = {
    track: document.getElementById("newsTrack"),
    prevBtn: document.getElementById("newsPrev"),
    nextBtn: document.getElementById("newsNext"),
    cards: null,
    position: 0,
    maxShift: 0,
    cardWidth: 0,
    isDragging: false,
    startX: 0,
    currentX: 0,

    init() {
      if (!this.track) return;
      this.cards = this.track.querySelectorAll(".news-card");

      this.calculateDimensions();
      this.updateArrows();

      this.prevBtn &&
        this.prevBtn.addEventListener("click", () => this.slide("prev"));
      this.nextBtn &&
        this.nextBtn.addEventListener("click", () => this.slide("next"));

      // Drag support
      this.track.addEventListener("mousedown", (e) => this.dragStart(e));
      this.track.addEventListener("mousemove", (e) => this.dragMove(e));
      this.track.addEventListener("mouseup", () => this.dragEnd());
      this.track.addEventListener("mouseleave", () => this.dragEnd());

      // Touch drag
      this.track.addEventListener("touchstart", (e) => this.dragStart(e), {
        passive: true,
      });
      this.track.addEventListener("touchmove", (e) => this.dragMove(e), {
        passive: true,
      });
      this.track.addEventListener("touchend", () => this.dragEnd());

      window.addEventListener("resize", () => this.calculateDimensions());
    },

    calculateDimensions() {
      if (!this.cards.length) return;
      const gap = 25;
      this.cardWidth = this.cards[0].offsetWidth + gap;
      this.maxShift = Math.max(
        0,
        this.cards.length * this.cardWidth -
          gap -
          this.track.parentElement.offsetWidth,
      );
    },

    slide(direction) {
      const step = this.cardWidth;
      if (direction === "next") {
        this.position = Math.min(this.position + step, this.maxShift);
      } else {
        this.position = Math.max(this.position - step, 0);
      }
      this.track.style.transform = "translateX(-" + this.position + "px)";
      this.updateArrows();
    },

    updateArrows() {
      if (this.prevBtn)
        this.prevBtn.style.opacity = this.position <= 0 ? "0.3" : "1";
      if (this.nextBtn)
        this.nextBtn.style.opacity =
          this.position >= this.maxShift ? "0.3" : "1";
    },

    dragStart(e) {
      this.isDragging = true;
      this.startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      this.currentX = this.position;
      this.track.style.transition = "none";
      this.track.style.cursor = "grabbing";
    },

    dragMove(e) {
      if (!this.isDragging) return;
      const x = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      const diff = this.startX - x;
      const newPos = Math.max(0, Math.min(this.currentX + diff, this.maxShift));
      this.track.style.transform = "translateX(-" + newPos + "px)";
      this.position = newPos;
    },

    dragEnd() {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.track.style.transition =
        "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      this.track.style.cursor = "";

      // Snap to nearest card
      const snapped =
        Math.round(this.position / this.cardWidth) * this.cardWidth;
      this.position = Math.max(0, Math.min(snapped, this.maxShift));
      this.track.style.transform = "translateX(-" + this.position + "px)";
      this.updateArrows();
    },
  };

  /* ─────────────────────────────────────────────
         3. SCROLL REVEAL — IntersectionObserver
      ───────────────────────────────────────────────── */
  const scrollReveal = {
    init() {
      const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale",
      );
      if (!targets.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target); // animate once
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      targets.forEach((el) => observer.observe(el));
    },
  };

  /* ─────────────────────────────────────────────
         4. HEADER — scroll shadow effect
      ───────────────────────────────────────────────── */
  const headerScroll = {
    header: document.querySelector(".site-header"),
    init() {
      if (!this.header) return;
      let ticking = false;
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              this.header.classList.toggle("scrolled", window.scrollY > 10);
              ticking = false;
            });
            ticking = true;
          }
        },
        { passive: true },
      );
    },
  };

  /* ─────────────────────────────────────────────
         5. SMOOTH ANCHOR LINKS
      ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ─────────────────────────────────────────────
         5. MEGA MENU — hover open/close
      ───────────────────────────────────────────────── */
  const megaMenu = {
    init() {
      const header = document.querySelector(".site-header");
      const navItems = document.querySelectorAll("[data-menu]");

      navItems.forEach((item) => {
        const menuId = item.getAttribute("data-menu");
        const panel = document.getElementById("menu-" + menuId);
        if (!panel) return;

        // For simple dropdowns: set left position relative to header
        if (panel.classList.contains("nav-dropdown")) {
          const setPos = () => {
            const r = item.getBoundingClientRect();
            const h = header.getBoundingClientRect();
            panel.style.left = r.left - h.left + "px";
          };
          setPos();
          window.addEventListener("resize", setPos);
        }

        // Toggle on click
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = panel.classList.contains("is-open");
          this.closeAll();
          if (!isOpen) {
            panel.classList.add("is-open");
            item.classList.add("menu-open");
          }
        });
      });

      // Close on outside click
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".site-header")) this.closeAll();
      });
    },

    closeAll() {
      document
        .querySelectorAll(".mega-menu.is-open, .nav-dropdown.is-open")
        .forEach((p) => p.classList.remove("is-open"));
      document
        .querySelectorAll(".nav-item.menu-open")
        .forEach((n) => n.classList.remove("menu-open"));
    },
  };

  /* ─────────────────────────────────────────────
         BOOT IT ALL UP
      ───────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    heroSlider.init();
    newsCarousel.init();
    scrollReveal.init();
    headerScroll.init();
    megaMenu.init();
  });
})();
