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
          "assets/images/parts-accessories/d-max/15. DOOR HANDLE HOUSING PROTECTOR FR EXP (1) 1.png",
        name: "Door Handle Housing Protector",
        description:
          "Engineered to protect the paint from accidental scratches when opening the door. Also accentuates to the overall aesthetics of the D-MAX.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/18. ROCKER PLATE FR REG EXP 1.png",
        name: "Rocket Plate",
        description:
          "Provides additional grip and traction as you step in and out of the vehicle. Also contributes to the overall look of the interior.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/16. DOOR HANDLE HOUSING PROTECTOR SET EXP 1.png",
        name: "Door Handle Housing Protector Set",
        description:
          "Engineered to protect the paint from accidental scratches when opening the door. Also accentuates to the overall aesthetics of the D-MAX.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/10-10.1 BED RUBBER MAT CRW EXP 1.png",
        name: "Bed Rubber Mat Crew",
        description:
          "Provides overall protection and tight grip on the items being loaded on the cargo box.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/19. ROCKER PLATE SET CRW EXT EXP 1.png",
        name: "Rocket Plate Set",
        description:
          "Provides additional grip and traction as you step in and out of the vehicle. Also contributes to the overall look of the interior.",
      },
      {
        image: "assets/images/parts-accessories/d-max/13. CAR COVER EXP 1.png",
        name: "Car Cover",
        description:
          "Makes your vehicle safe from dings, scratches, pollen, insects and bird droppings. It also lessens the number of car washes as it uses water-repellent material.",
      },
    ],
    // ── PAGE 2 ── (Add items here)
    [
      {
        image:
          "assets/images/parts-accessories/d-max/14. ENGINE HOOD PROTECTOR  EXP 1.png",
        name: "Engine Hood Protector",
        description:
          "The front portion of the vehicle is the most sensitive as it is always exposed to external contaminants, especially when driving. Engine hood protector has the advantage of protecting the front area of the vehicle from stones, insects and small particle ingress. It alo enhances the overall aesthetics of the D-MAX.",
      },
      {
        image: "assets/images/parts-accessories/d-max/24. DC OUTLET 1.png",
        name: "DC Outlet Set",
        description:
          "Provides additional power source for your equipment, especially when going outdoor or camping.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/29. RUP EXTENSION ASM EXP 1.png",
        name: "Rup Extension",
        description:
          "Enhances the aerodynamic capabilities of the D-MAX and contributes to its overall aesthetics.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/21. ILLUMINATE ROCKER PLATE FR REG EXT EXP 1.png",
        name: "Illuminated Rocker Plate",
        description:
          "Provides additional grip, traction and illumination as you step in and out of the vehicle. Also contributes to the overall look of the interior.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/02. BED LINER OVER RAIL SET CRW 1.png",
        name: "Bed Liner Over Rail Set Crew",
        description:
          "Keeps the cargo box inside protected, It prevents scratches and damages from the things being loaded on the cargo box. It comes in 2 types -under rail and over rail. Marked with Isuzu logo at the front the walling.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/01. BED LINER UNDER RAIL SET CRW EXP 1.png",
        name: "Bed Liner Under Rail Set Crew",
        description:
          "Keeps the cargo box inside protected. It prevents scratches and damages from the things being loaded on the cargo box. It comes in 2 types -under rail and over rail. Marked with Isuzu logo at the front the walling.",
      },
    ],
    // ── PAGE 3 ── (Add items here)
    [
      {
        image:
          "assets/images/parts-accessories/d-max/26-tub-light-2p-set (1) 2.png",
        name: "Tub Light 2P Set",
        description:
          "Provides illumination on the cargo box, giving you vision on your cargo at night.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/26-tub-light-2p-set (1) 1.png",
        name: "Illuminated Rocker Plate Set Crew",
        description:
          "Provides additional grip, traction and illumination as you step in and out of the vehicle. Also contributes to the overall look of the interior.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/25-tub-light-4p-set 1.png",
        name: "Tub Light 4P Set",
        description:
          "Provides illumination on the cargo box, giving you vision on your cargo at night.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/31. NUDGE BAR WO FPA  ALLOY EXP (1) 1.png",
        name: "Nudge Bar W/O FPA Alloy",
        description:
          "Designed to protect the front area of your vehicle in case of minor collision, absorbing the impact. It is functionally compatible with the air bag safety performance of the vehicle.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/33. NUDGE BAR WO FPA  BLACK EXP 1.png",
        name: "Nudge Bar W/O FPA Black",
        description:
          "Designed to protect the front area of the vehicle in case of minor collision, absorbing the impact. It is functionally compatible with the air bag safety performance of the vehicle.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/22. SIDE BAR SET STEEL EXP 1.png",
        name: "Side Bar Set Steel",
        description:
          "Designed to protect the rocket panel for unforeseen road obstructions. Also comes with a very functional non-slip steps to prevent lose footing when getting in and out of the vehicle. Tested to be strong to scary heavy weights and uses rust-resistant materials",
      },
    ],
    // ── PAGE 4 ── (Add items here)
    [
      {
        image:
          "assets/images/parts-accessories/d-max/30. NUDGE BAR WITH FPA ALLOY EXP 1.png",
        name: "Nudge Bar With FPA Black",
        description:
          "Designed to protect the front area of the vehicle in case of minor collision, absorbing the impact. It is functionally compatible with the air bag safety performance of the vehicle.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/32. NUDGE BAR WITH FPA  BLACK EXP 1.png",
        name: "Nudge Bar With FPA Black",
        description:
          "Designed to protect the front area of the vehicle in case of minor collision, absorbing the impact. It is functionally compatible with the air bag safety performance of the vehicle.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/23. SIDE BAR SET STAINLESS EXP 1.png",
        name: "Side Bar Set Stainless",
        description:
          "Designed to protect the rocker panel for unforeseen road obstructions. Also comes with a very functional non-slip steps to prevent lose footing when getting in and out of the vehicle. Tested to be strong to carry heavy weights and uses rust-resistant materials.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/17. OVER FENDER SET EXP 1.png",
        name: "Over Fender Set",
        description:
          "Provides additional safety from rocks and other elements that might hit your vehicle, especially when you're doing off-road. It also adds styling and more \"macho\" look to the D-MAX.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/35. SPORT BAR BLACK CRW EXP 1.png",
        name: "Sports Bar Black Crew Polish",
        description:
          "Sporty and tough-looking appearance with overall functionality for your outdoor needs. It comes with installation kit that doesn't require welding or punching holes. Compatible with the under rail bed liner.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/34. SPORT BAR CRW POLISH EXP 1.png",
        name: "Sports Bar Crew Polish",
        description:
          "Sporty and tough-looking appearance with overall functionality for your outdoor needs. It comes with installation kit that doesn't require welding or punching holes. Compatible with the under rail bed liner.",
      },
    ],
    // ── PAGE 5 ── (Add items here)
    [
      {
        image:
          "assets/images/parts-accessories/d-max/27. SAILPLANE SET CRW EXP 1.png",
        name: "Sailplane Set Crew",
        description:
          "Improves the aerodynamic capabilities of the D-MAX and contributes to its overall aesthetics.",
      },
      {
        image:
          "assets/images/parts-accessories/d-max/28. SHUTTER LID CRW EXP 1.png",
        name: "Shutter Lid Crew",
        description:
          "Designed to be durable and resistant to extreme weather conditions. It will keep your cargo protected, especially from water and dust ingress.",
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
      this.gridEl = document.getElementById("dmaxGrid");
      this.paginationEl = document.getElementById("dmaxPagination");
      if (!this.gridEl || !this.paginationEl) return;

      this.renderPagination();
      this.renderPage(0);
    },

    renderPagination() {
      this.paginationEl.innerHTML = "";
      const totalPages = ACCESSORIES_DATA.length;

      for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "dmax-pagination__btn" + (i === 0 ? " is-active" : "");
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
        .querySelectorAll(".dmax-pagination__btn")
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
        const titleEl = document.querySelector(".dmax-accessories__title");
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
        card.className = "dmax-card reveal";

        card.innerHTML =
          '<div class="dmax-card__img-wrap">' +
          '<img src="' +
          item.image +
          '" alt="' +
          item.name +
          '" class="dmax-card__img" onerror="this.style.display=\'none\'">' +
          "</div>" +
          '<h3 class="dmax-card__name">' +
          item.name +
          "</h3>" +
          '<p class="dmax-card__desc">' +
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
    const grid = document.getElementById("dmaxGrid");
    if (grid) {
      grid.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }
  });
})();
