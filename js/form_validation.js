//Variables
const form = document.getElementById("form");
const formInputs = document.querySelectorAll(
  "#form input, #form textarea, #form select"
);
const expressions = {
  empty: /^.+$/, //Any character
  letterNumbers: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letters, numbers and spaces, accepts accents
  letters: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces, accepts accents
};

const assetRegistrationFields = {
  assetName: false,
  assetDescription: false,
  assetUnit: false,
  assetLocation: false,
  assetStatus: false,
};

//Functions
//Validation fuction for the entire form
const validateForm = function (event) {
  const elementId = event.target.id;
  const elementValue = event.target.value;
  const errorActiveClass = "formInputErrorActive";

  switch (elementId) {
    case "assetName":
      validateField(elementId, elementValue, errorActiveClass, "assetName");
      break;
    case "assetDescription":
      validateField(
        elementId,
        elementValue,
        errorActiveClass,
        "assetDescription"
      );
      break;
    case "assetUnit":
      validateField(elementId, elementValue, errorActiveClass, "assetUnit");
      break;
    case "assetLocation":
      validateField(elementId, elementValue, errorActiveClass, "assetLocation");
      break;
    case "assetStatus":
      validateField(elementId, elementValue, errorActiveClass, "assetStatus");
      break;
  }
};

//Validation fuction for all fields
const validateField = function (
  elementId,
  elementValue,
  errorActiveClass,
  field
) {
  //Validates if the input field is empty
  if (!expressions.empty.test(elementValue)) {
    document.getElementById(`${elementId}Error`).innerHTML =
      "Este es un campo obligatorio.";
    document
      .getElementById(`${elementId}Error`)
      .classList.add(errorActiveClass);
    assetRegistrationFields[field] = false;
  } else {
    document
      .getElementById(`${elementId}Error`)
      .classList.remove(errorActiveClass);
    assetRegistrationFields[field] = true;
  }
};

//Asset registration button
const assetRegistrationBtn = function () {
  if (
    assetRegistrationFields.assetName &&
    assetRegistrationFields.assetDescription &&
    assetRegistrationFields.assetUnit &&
    assetRegistrationFields.assetLocation &&
    assetRegistrationFields.assetStatus
  ) {
    successAlert("Registro exitoso", "El activo ha sido registrado con éxito.");
    form.reset();
    assetRegistrationFields.assetName = false;
    assetRegistrationFields.assetDescription = false;
    assetRegistrationFields.assetUnit = false;
    assetRegistrationFields.assetLocation = false;
    assetRegistrationFields.assetStatus = false;
  } else {
    errorAlert("Hay campos obligatorios sin llenar.");
  }
};

//Event Listeners
form.addEventListener("submit", function (event) {
  event.preventDefault();
  assetRegistrationBtn();
});

const validation = function () {
  formInputs.forEach(function (input) {
    input.addEventListener("blur", validateForm);
    input.addEventListener("keyup", validateForm);
    input.addEventListener("click", validateForm);
  });
};

//Function calls
validation();
