document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const topbar = document.getElementById("topbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("siteNav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  const handleTopbar = () => {
    if (!topbar) return;
    if (window.scrollY > 10) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  };

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("nav-open");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    nav.classList.add("nav-open");
    body.classList.add("menu-open");
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("nav-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  handleTopbar();
  window.addEventListener("scroll", handleTopbar);
});