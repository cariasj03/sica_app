//Variable declarations
const benefitSubtitles = document.querySelectorAll(".section3Subtitle");
const menuIcons = document.querySelectorAll(".menuIcon");
const menuLinks = document.querySelectorAll(".mainNav a");

//Functions

//Function to highlight the select subtitle and change the text accordingly
const selectedSubtitle = function (subtitle) {
  const subtitleId = subtitle.id;
  const selectedClass = "selectedSubtitle";

  document.getElementById(`${subtitleId}`).classList.add(selectedClass);

  switch (subtitleId) {
    case "section3Subtitle1":
      document
        .getElementById("section3Subtitle2")
        .classList.remove(selectedClass);
      document
        .getElementById("section3Subtitle3")
        .classList.remove(selectedClass);
      document.getElementById("section3Text").innerHTML =
        "Realizar el seguimiento manual de los activos de toda la empresa significa sacrificar tiempo y recursos valiosos. Con nuestra plataforma SICA, mejorará la eficiencia en toda su organización, lo que le generará un ahorro de tiempo y dinero.";
      break;
    case "section3Subtitle2":
      document
        .getElementById("section3Subtitle1")
        .classList.remove(selectedClass);
      document
        .getElementById("section3Subtitle3")
        .classList.remove(selectedClass);
      document.getElementById("section3Text").innerHTML =
        "SICA le permite automatizar los procesos de creación de reportes de activos por unidad, histórico de movimientos de activos, activos presentes en bodega y en donaciones, para una toma de decisiones adecuada y basada en evidencia.";
      break;
    case "section3Subtitle3":
      document
        .getElementById("section3Subtitle1")
        .classList.remove(selectedClass);
      document
        .getElementById("section3Subtitle2")
        .classList.remove(selectedClass);
      document.getElementById("section3Text").innerHTML =
        "SICA cuenta con excelentes mecanismos de seguridad para proteger su de amenazas internas y externas. Además, regula acceso mediante roles y requiere atenticación obligatoria para acceder a la aplicación.";
      break;
  }
};

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

//Event Listeners
benefitSubtitles.forEach(function (subtitle) {
  subtitle.addEventListener("click", function () {
    selectedSubtitle(subtitle);
  });
});

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
