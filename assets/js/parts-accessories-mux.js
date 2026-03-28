(function () {
  "use strict";

  /* ─────────────────────────────────────────────
     ACCESSORIES DATA — Edit this array to manage pages.
     Each sub-array is one page of items (6 items per page).
     To add/remove items or pages, just edit this array.
  ───────────────────────────────────────────────── */
  const ACCESSORIES_DATA = [
    // ── PAGE 1 ──
    [
      {
        image:
          "assets/images/parts-accessories/mu-x/no-13-5867610250-foot-guide-700x400-new 1.png",
        name: "Foot Guide",
        description:
          "Provides passengers in the 3rd row seat a comfortable foot rest while traveling.",
      },
      {
        image:
          "assets/images/parts-accessories/mu-x/DOOR HANDLE PROTECTOR NEW 1.png",
        name: "Door Handle Protector Set",
        description:
          "Engineered to protect the paint from accidental scratches while opening and closing the door.",
      },
      {
        image:
          "assets/images/parts-accessories/mu-x/no1-5867641270-muffler-cutter-exp-700x400 1.png",
        name: "Muffler Cutter",
        description:
          "Designed to elevate the stylish look of the muffler, giving the MU-X a more sophisticated look.",
      },
      {
        image:
          "assets/images/parts-accessories/mu-x/no12-5867630800-rocker-plate-set-crw-ext-exp-700x400 1.png",
        name: "Rocker Plate Set",
        description:
          "Designed to protect the doorstep from scratches and enhances the overall aesthetics of the vehicle.",
      },
      {
        image:
          "assets/images/parts-accessories/mu-x/no4-5867641080-cargo-net-exp-700x400 1.png",
        name: "Cargo Net",
        description:
          "Gives you an extra storage of your irregularly-shaped items at the rear portion of the vehicle.",
      },
      {
        image:
          "assets/images/parts-accessories/mu-x/no3-5867638130-rubber-floor-tray-set-lhd-700x400 1.png",
        name: "Rubber Floor Tray Set",
        description:
          "Protects the overall flooring of the MU-X against dirt, scratches and liquid spill.",
      },
    ],
    // ── PAGE 2 ── (Add items here)
    [
      {
        image: "assets/images/parts-accessories/mu-x/no8-5867641120-cargo-liner-exp-700x400 1.png",
        name: "Cargo Liner",
        description: "Designed to protect the rear cargo area against damage from dirt or liquid spill. It also lessons abrasion or shock especially when driving on harsh conditions.",
      },
      {
        image: "assets/images/parts-accessories/mu-x/no2-5867638230-carpet-floor-mat-set-lhd-700x400 1.png",
        name: "Cargo Floor Mat Set",
        description: "Elegantly designed to protect the flooring of your car from dirt. This carpet has thicker fabric that provides maximum durability.",
      },
      {
        image: "assets/images/parts-accessories/mu-x/ENGINE HOOD PROTECTOR NEW 1.png",
        name: "Engine Hood Protector",
        description: "The front portion of the vehicle is the most sensitive as it is always exposed to external contaminants, especially while driving. Engine hood protector has the advantage of protecting the front area of the vehicle from stones, insects and small particle ingress. It also enhances the overall aesthetics of the MU-X.",
      },
      {
        image: "assets/images/parts-accessories/mu-x/no5-5867640780-door-visor-set-exp-700x400 1.png",
        name: "Door Visor Set",
        description: "Allows the vehicle windows to be kept open in the event of light rain. It also functions as wind deflector and reduces wind noise inside the cabin.",
      },
      {
        image: "assets/images/parts-accessories/mu-x/no6-5867635730-rear-bumper-garnish-exp-700x400 1.png",
        name: "Rear Bumper Garnish",
        description: "Gives your vehicle a stylish accent and avoids scratches while loading or unloading cargo at the trunk.",
      },
      {
        image: "assets/images/parts-accessories/mu-x/no7-5867641100-tonneau-cover-exp-700x400 1.png",
        name: "Tonneau Cover",
        description: "This ensures that all items stored at the rear portion of the vehicle are organized. It also maximizes the rear space that enables you to load more cargo especially when traveling with your family.",
      },
    ],
  ];

  /* ─────────────────────────────────────────────
     1. PAGINATION
  ───────────────────────────────────────────────── */
  const pagination = {
    currentPage: 0,
    gridEl: null,
    paginationEl: null,

    init() {
      this.gridEl = document.getElementById("muxGrid");
      this.paginationEl = document.getElementById("muxPagination");
      if (!this.gridEl || !this.paginationEl) return;

      this.renderPagination();
      this.renderPage(0);
    },

    renderPagination() {
      this.paginationEl.innerHTML = "";
      const totalPages = ACCESSORIES_DATA.length;

      for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "mux-pagination__btn" + (i === 0 ? " is-active" : "");
        btn.textContent = i + 1;
        btn.setAttribute("aria-label", "Go to page " + (i + 1));
        btn.addEventListener("click", () => this.goToPage(i));
        this.paginationEl.appendChild(btn);
      }
    },

    goToPage(pageIndex) {
      if (pageIndex === this.currentPage) return;
      this.currentPage = pageIndex;

      // Update active button
      this.paginationEl
        .querySelectorAll(".mux-pagination__btn")
        .forEach((btn, i) => {
          btn.classList.toggle("is-active", i === pageIndex);
        });

      // Fade out, swap content, fade in
      this.gridEl.style.opacity = "0";
      this.gridEl.style.transform = "translateY(20px)";

      setTimeout(() => {
        this.renderPage(pageIndex);
        // Trigger reflow
        void this.gridEl.offsetHeight;
        this.gridEl.style.opacity = "1";
        this.gridEl.style.transform = "translateY(0)";

        // Scroll to section title
        const titleEl = document.querySelector(".mux-accessories__title");
        if (titleEl) {
          titleEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    },

    renderPage(pageIndex) {
      const items = ACCESSORIES_DATA[pageIndex] || [];
      this.gridEl.innerHTML = "";

      if (items.length === 0) {
        this.gridEl.innerHTML =
          '<p style="grid-column: 1 / -1; text-align: center; font-family: var(--font-hv); font-size: 20px; color: #797979; padding: 80px 0;">Items coming soon.</p>';
        return;
      }

      items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "mux-card reveal";

        card.innerHTML =
          '<div class="mux-card__img-wrap">' +
          '<img src="' +
          item.image +
          '" alt="' +
          item.name +
          '" class="mux-card__img" onerror="this.style.display=\'none\'">' +
          "</div>" +
          '<h3 class="mux-card__name">' +
          item.name +
          "</h3>" +
          '<p class="mux-card__desc">' +
          item.description +
          "</p>";

        this.gridEl.appendChild(card);
      });

      // Re-trigger scroll reveal for new cards
      scrollReveal.observe(this.gridEl.querySelectorAll(".reveal"));
    },
  };

  /* ─────────────────────────────────────────────
     2. SCROLL REVEAL — IntersectionObserver
  ───────────────────────────────────────────────── */
  const scrollReveal = {
    observer: null,

    init() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale",
      );
      targets.forEach((el) => this.observer.observe(el));
    },

    observe(elements) {
      if (!this.observer) return;
      elements.forEach((el) => {
        el.classList.remove("revealed");
        this.observer.observe(el);
      });
    },
  };

  /* ─────────────────────────────────────────────
     3. HEADER — scroll shadow effect
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
     4. MEGA MENU — click open/close
  ───────────────────────────────────────────────── */
  const megaMenu = {
    init() {
      const navItems = document.querySelectorAll("[data-menu]");

      navItems.forEach((item) => {
        const menuId = item.getAttribute("data-menu");
        const panel = document.getElementById("menu-" + menuId);
        if (!panel) return;

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
     5. SCROLL TO TOP
  ───────────────────────────────────────────────── */
  const scrollToTop = {
    init() {
      const btn = document.getElementById("scrollToTopBtn");
      if (!btn) return;

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
  };

  /* ─────────────────────────────────────────────
     BOOT IT ALL UP
  ───────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    scrollReveal.init();
    headerScroll.init();
    megaMenu.init();
    scrollToTop.init();
    pagination.init();

    // Add transition for grid fade effect
    const grid = document.getElementById("muxGrid");
    if (grid) {
      grid.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }
  });
})();
