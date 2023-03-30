const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("nav");
const navLink = document.querySelectorAll("#nav-link");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

hamburger.addEventListener("click", toggleMenu);

navLink.forEach((n) => n.addEventListener("click", closeMenu));