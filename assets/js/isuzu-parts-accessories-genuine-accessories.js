/* ═══════════════════════════════════
   GENUINE ACCESSORIES - JAVASCRIPT
═══════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(".reveal, .reveal-scale");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── HEADER SCROLL SHADOW ── */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  /* ── MEGA MENU ── */
  const navItems = document.querySelectorAll("[data-menu]");
  const megaMenus = document.querySelectorAll(".mega-menu");
  let activeMenu = null;
  let closeTimeout = null;

  function openMenu(menuId) {
    clearTimeout(closeTimeout);
    megaMenus.forEach((m) => m.classList.remove("is-open"));
    const menu = document.getElementById("menu-" + menuId);
    if (menu) {
      menu.classList.add("is-open");
      activeMenu = menuId;
    }
  }

  function scheduleClose() {
    closeTimeout = setTimeout(() => {
      megaMenus.forEach((m) => m.classList.remove("is-open"));
      activeMenu = null;
    }, 200);
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => openMenu(item.dataset.menu));
    item.addEventListener("mouseleave", scheduleClose);
  });

  megaMenus.forEach((menu) => {
    menu.addEventListener("mouseenter", () => clearTimeout(closeTimeout));
    menu.addEventListener("mouseleave", scheduleClose);
  });

  /* ── MOBILE MENU ── */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close mobile menu on overlay click
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  /* ── SCROLL TO TOP ── */
  const scrollTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── PARALLAX ON VEHICLE BANNERS ── */
  const banners = document.querySelectorAll(".ga-vehicle-banner");
  if (banners.length && window.innerWidth > 1024) {
    window.addEventListener("scroll", () => {
      banners.forEach((banner) => {
        const rect = banner.getBoundingClientRect();
        const speed = 0.15;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (rect.top - window.innerHeight / 2) * speed;
          const img = banner.querySelector(".ga-vehicle-banner__img");
          if (img) {
            img.style.transform = `translateY(${offset}px) scale(1.05)`;
          }
        }
      });
    });
  }
});
