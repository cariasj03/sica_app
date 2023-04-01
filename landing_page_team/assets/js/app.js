const scrollUp = document.querySelector("#scroll-up");
const menuIcons = document.querySelectorAll(".menuIcon");
const menuLinks = document.querySelectorAll(".nav-link");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

//Function for the responsive menu functionality
const menuFuncionality = function (icon) {
  const iconId = icon.id;
  const navId = "mainNav";
  const hiddenClass = "hidden";

  switch (iconId) {
    case "openMenuIcon":
      showMenu(navId, hiddenClass);
      break;
    case "closeMenuIcon":
      hideMenu(navId, hiddenClass);
      break;
  }
};

//Fuction to show the menu
const showMenu = function (navId, hiddenClass) {
  document.getElementById("closeMenuIcon").classList.remove(hiddenClass);
  document.getElementById("openMenuIcon").classList.add(hiddenClass);
  document.getElementById(navId).classList.remove(hiddenClass);
};

//Fuction to hide the menu
const hideMenu = function (navId, hiddenClass) {
  document.getElementById("openMenuIcon").classList.remove(hiddenClass);
  document.getElementById("closeMenuIcon").classList.add(hiddenClass);
  document.getElementById(navId).classList.add(hiddenClass);
};

menuIcons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    menuFuncionality(icon);
  });
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    hideMenu("mainNav", "hidden");
  });
});
