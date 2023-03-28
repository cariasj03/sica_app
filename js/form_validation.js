//Variables
const form = document.querySelector("form");
const formInputs = document.querySelectorAll(
  ".form input, .form textarea, .form select"
);
const regExp = {
  empty: /^.+$/, //Any character
  lettersNumbers: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letters, numbers and spaces, accepts accents
  letters: /^[a-zA-Z\s]{1,40}$/, // Letters and spaces, does no accept accents
  numbers: /^[0-9]{1,40}$/, // Numbers
  password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*\W).{8,40}$/, // 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character minimun
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/, // 7 a 14 numeros.
};

//Asset object for validation
const assetRegistrationFields = {
  assetName: false,
  assetDescription: false,
  assetUnit: false,
  assetLocation: false,
  assetStatus: false,
};

//Signup object for validation
const signupRegistrationFields = {
  userFirstName: false,
  userLastName: false,
  userId: false,
  userDateOfBirth: false,
  userEmail: false,
  userPhoneNumber: false,
  userUnit: false,
  userProfilePicture: false,
};

//Signup object for validation
const signinRegistrationFields = {
  signinEmail: false,
  signinPassword: false,
};

//Functions
//Validation fuction for the entire form
const validateForm = function (event) {
  const elementId = event.target.id;
  const elementValue = event.target.value;
  const errorActiveClass = "formInputErrorActive";

  switch (elementId) {
    case "assetName":
    case "assetDescription":
    case "assetUnit":
    case "assetLocation":
    case "assetStatus":
    case "userDateOfBirth":
    case "userUnit":
    case "signinPassword":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      break;
    case "signinEmail":
      validateEmailField(elementId, elementValue, errorActiveClass);
      break;
    case "userFirstName":
    case "userLastName":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateLettersField(elementId, elementValue, errorActiveClass);
      }
      break;
    case "userId":
    case "userPhoneNumber":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateNumbersField(elementId, elementValue, errorActiveClass);
      }
      break;
    case "userEmail":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateEmailField(elementId, elementValue, errorActiveClass);
      }
      break;
    case "userProfilePicture":
      validateFileField(elementId, elementValue, errorActiveClass);
      break;
  }
};

//Validation fuction for all fields
const validateEmptyField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  console.log(signinRegistrationFields);
  //Validates if the input field is empty
  if (!regExp.empty.test(elementValue)) {
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Este es un campo obligatorio."
    );
    return true;
  } else {
    errorModifier(elementId, errorActiveClass, false, "");
    return false;
  }
};

//Validation fuction for only letters and spaces fields
const validateLettersField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Validates if the input field only contains letters
  if (!regExp.letters.test(elementValue)) {
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Este campo solo puede contener letras y espacios."
    );
  } else {
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Validation fuction for only numbers fields
const validateNumbersField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Validates if the input field only contains numbers
  if (!regExp.numbers.test(elementValue)) {
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Este campo solo puede contener números sin espacios."
    );
  } else {
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Validation fuction for email fields
const validateEmailField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Validates if the input field contains a valid email
  if (!regExp.email.test(elementValue)) {
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Ingrese un correo electrónico válido."
    );
  } else {
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Validation fuction for file fields
const validateFileField = function (elementId, elementValue, errorActiveClass) {
  //Validates if the input field has a loaded file
  if (document.getElementById(elementId).files.length === 0) {
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "No ha subido ningún archivo."
    );
  } else {
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

const errorModifier = function (elementId, errorActiveClass, status, message) {
  if (status) {
    document.getElementById(`${elementId}Error`).innerHTML = message;
    document
      .getElementById(`${elementId}Error`)
      .classList.add(errorActiveClass);
    switch (form.id) {
      case "assetRegistrationForm":
        assetRegistrationFields[elementId] = false;
        break;
      case "signupForm":
        signupRegistrationFields[elementId] = false;
        break;
      case "signinForm":
        signinRegistrationFields[elementId] = false;
        break;
    }
  } else if (!status) {
    document
      .getElementById(`${elementId}Error`)
      .classList.remove(errorActiveClass);
    switch (form.id) {
      case "assetRegistrationForm":
        assetRegistrationFields[elementId] = true;
        break;
      case "signupForm":
        signupRegistrationFields[elementId] = true;
        break;
      case "signinForm":
        signinRegistrationFields[elementId] = true;
        break;
    }
  }
};

//Asset registration button
const submitBtn = function () {
  switch (form.id) {
    case "assetRegistrationForm":
      if (
        assetRegistrationFields.assetName &&
        assetRegistrationFields.assetDescription &&
        assetRegistrationFields.assetUnit &&
        assetRegistrationFields.assetLocation &&
        assetRegistrationFields.assetStatus
      ) {
        successAlert(
          "Registro exitoso",
          "El activo ha sido registrado con éxito."
        );
        form.reset();
        assetRegistrationFields.assetName = false;
        assetRegistrationFields.assetDescription = false;
        assetRegistrationFields.assetUnit = false;
        assetRegistrationFields.assetLocation = false;
        assetRegistrationFields.assetStatus = false;
      } else {
        errorAlert("Hay campos obligatorios sin llenar.");
      }
      break;
    case "signupForm":
      if (
        signupRegistrationFields.userFirstName &&
        signupRegistrationFields.userLastName &&
        signupRegistrationFields.userId &&
        signupRegistrationFields.userDateOfBirth &&
        signupRegistrationFields.userEmail &&
        signupRegistrationFields.userPhoneNumber &&
        signupRegistrationFields.userUnit &&
        signupRegistrationFields.userProfilePicture
      ) {
        successAlert(
          "Registro exitoso",
          "Su solicitud para crear una cuenta ha sido enviada. En caso de ser aprobada le llegará una contraseña temporal al correo electónico registrado."
        );
        form.reset();
        imageDisplay.src = "/images/profile_picture.png";
        signupRegistrationFields.userFirstName = false;
        signupRegistrationFields.userLastName = false;
        signupRegistrationFields.userId = false;
        signupRegistrationFields.userDateOfBirth = false;
        signupRegistrationFields.userEmail = false;
        signupRegistrationFields.userPhoneNumber = false;
        signupRegistrationFields.userUnit = false;
      } else {
        errorAlert("Hay campos obligatorios sin llenar.");
      }
      break;

    case "signinForm":
      if (
        signinRegistrationFields.signinEmail &&
        signinRegistrationFields.signinPassword
      ) {
        form.reset();
        signinRegistrationFields.signinEmail = false;
        signinRegistrationFields.signinPassword = false;
        window.location.href = "/html/index.html";
      } else {
        errorAlert("Debe ingresar su correo y contraseña para iniciar sesión.");
      }
      break;
  }
};

const submit = function () {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitBtn(form);
  });
};

const validation = function () {
  formInputs.forEach(function (input) {
    input.addEventListener("blur", validateForm);
    input.addEventListener("keyup", validateForm);
    input.addEventListener("click", validateForm);
  });
};

//Function calls
validation();
submit();
