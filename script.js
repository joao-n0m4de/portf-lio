"use strict";

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const year = document.querySelector("[data-year]");
const copyButton = document.querySelector("[data-copy-email]");
const toast = document.querySelector("[data-toast]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function setMenu(open) {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  setMenu(willOpen);

  if (willOpen) {
    navigation?.querySelector("a")?.focus();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

let scrollFrame = 0;

function updateScrollState() {
  const scrollTop = window.scrollY;
  header?.classList.toggle("is-scrolled", scrollTop > 16);

  const sectionLinks = navLinks
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href")),
    }))
    .filter((item) => item.section);

  const checkpoint = scrollTop + Math.min(window.innerHeight * 0.34, 280);
  let active = null;

  sectionLinks.forEach((item) => {
    if (item.section.offsetTop <= checkpoint) active = item;
  });

  sectionLinks.forEach((item) => {
    const isActive = item === active;
    item.link.classList.toggle("is-active", isActive);

    if (isActive) item.link.setAttribute("aria-current", "location");
    else item.link.removeAttribute("aria-current");
  });

  scrollFrame = 0;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
  },
  { passive: true },
);

updateScrollState();

const revealElements = [...document.querySelectorAll(".reveal")];

revealElements.forEach((element) => {
  const delayStep = Number(element.dataset.revealDelay || 0);
  element.style.setProperty("--reveal-delay", `${delayStep * 85}ms`);
});

if (!reduceMotion && "IntersectionObserver" in window) {
  revealElements.forEach((element) => element.classList.add("reveal-pending"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("reveal-visible"));
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const temporaryInput = document.createElement("textarea");
  temporaryInput.value = value;
  temporaryInput.setAttribute("readonly", "");
  temporaryInput.style.position = "fixed";
  temporaryInput.style.opacity = "0";
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  document.execCommand("copy");
  temporaryInput.remove();
}

let toastTimer;

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  if (!email) return;

  const label = copyButton.querySelector("small");

  try {
    await copyText(email);
    if (label) label.textContent = "copiado";
    toast?.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast?.classList.remove("is-visible");
      if (label) label.textContent = "copiar";
    }, 2200);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});
