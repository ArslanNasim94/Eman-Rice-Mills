const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navActions = document.querySelector(".nav-actions");
const heroBg = document.querySelector(".hero-bg");

function setScrolledState() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 80);
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.16}px)`;
  }
}

setScrolledState();
window.addEventListener("scroll", setScrolledState, { passive: true });

if (menuToggle && navLinks && navActions) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    navLinks.classList.toggle("open", isOpen);
    navActions.classList.toggle("open", isOpen);
    navbar.classList.toggle("nav-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  });

  [...navLinks.querySelectorAll("a"), ...navActions.querySelectorAll("a")].forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      navActions.classList.remove("open");
      navbar.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    });
  });
}

document.querySelectorAll(".nav-links a").forEach((link, index) => {
  link.style.setProperty("--nav-delay", index);
});

const revealItems = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
revealItems.forEach((item, index) => {
  if (!item.style.getPropertyValue("--delay")) {
    item.style.setProperty("--delay", `${Math.min(index % 8, 6) * 70}ms`);
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealItems.forEach((item) => revealObserver.observe(item));

const filterTabs = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    filterTabs.forEach((item) => item.classList.toggle("active", item === tab));
    productCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

document.querySelectorAll("[data-product-variant]").forEach((variant) => {
  const image = variant.querySelector("[data-variant-image]");
  const buttons = variant.querySelectorAll("[data-variant-src]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!image) return;

      image.style.opacity = "0";
      window.setTimeout(() => {
        image.src = button.dataset.variantSrc;
        image.alt = button.dataset.variantAlt;
        image.style.opacity = "1";
      }, 120);

      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
    });
  });
});
