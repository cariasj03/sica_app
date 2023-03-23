const form = document.getElementById("form");
const formInputs = document.querySelectorAll("#form input, #form textarea");

const expressions = {
  empty: /^.+$/, //Any character
  letterNumbers: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letters, numbers and spaces, accepts accents
  letters: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces, accepts accents
};

const validateForm = function (event) {
  const elementId = event.target.id;
  const elementValue = event.target.value;
  const errorActiveClass = "form-input-error-active";
  console.log(elementId);

  if (event.target.id == elementId) {
    //Validates if the input is empty
    if (!expressions.empty.test(elementValue)) {
      document.getElementById(`${elementId}-error`).innerHTML =
        "Este es un campo obligatorio.";
      document
        .getElementById(`${elementId}-error`)
        .classList.add(errorActiveClass);
    } else {
      switch (elementId) {
        //Validates the name input specifically
        case "asset-name":
          if (!expressions.letterNumbers.test(elementValue)) {
            document.getElementById(`${elementId}-error`).innerHTML =
              "Este campo solo puede contener letras, números y espacios.";
            document
              .getElementById(`${elementId}-error`)
              .classList.add(errorActiveClass);
          } else {
            document
              .getElementById(`${elementId}-error`)
              .classList.remove("form-input-error-active");
          }
          break;
        //Default option
        default:
          document
            .getElementById(`${elementId}-error`)
            .classList.remove(errorActiveClass);
          break;
      }
    }
  }
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

formInputs.forEach(function (input) {
  input.addEventListener("blur", validateForm);
  input.addEventListener("keyup", validateForm);
});
