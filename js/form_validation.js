//Variables
//Stores the form of the page the user is in
const form = document.querySelector("form");
//Stores all the inputs, textareas and selects inside the form of the page the user is in
const formInputs = document.querySelectorAll(
  ".form input, .form textarea, .form select, .form label input, .form label textarea, .form label select"
);
//Stores all the regular expressions to validate the input fields
const regExp = {
  empty: /^.+$/, //Any character
  lettersNumbers: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letters, numbers and spaces, accepts accents
  letters: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces, accepts accents
  numbers: /^[0-9]{1,40}$/, // Numbers
  password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*\W).{8,40}$/, // 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character minimun
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

//Object for asset registration validation
const assetRegistrationFields = {
  assetName: false,
  assetDescription: false,
  assetUnit: false,
  assetLocation: false,
  assetStatus: false,
};

//Object for signup validation
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

//Object for signin validation
const signinRegistrationFields = {
  signinEmail: false,
  signinPassword: false,
};

//Object for user info validation
const userInfoFields = {
  userFirstName: true,
  userLastName: true,
  userDateOfBirth: true,
  userEmail: true,
  userPhoneNumber: true,
  userUnit: true,
  userRole: true,
};

//Object for unit info validation
const unitInfoFields = {
  unitName: true,
  unitDescription: true,
  unitID: true,
  unitCreationDate: true,
  provinceSelect: true,
  cantonSelect: true,
  districtSelect: true,
  additionalGeographicInformation: true,
};

// Object for unit registration validation
const unitRegistrationFields = {
  unitName: false,
  unitDescription: false,
  provinceSelect: false,
  cantonSelect: false,
  districtSelect: false,
  additionalGeographicInformation: false,
};

// Object for asset individual info edit validation
const assetIndividualInformationFields = {
  assetName: true,
  assetDescription: true,
  assetLocation: true,
};

// Object for asset transfer request validation
const assetTransferRequestFields = {
  assetTargetUnit: false,
  assetTargetLocation: false,
  assetTransferReason: false,
  assetRequestDescription: false,
  uploadPictureAsset: false,
};

//Functions
//Validation function for the entire form
const validateForm = function (event) {
  const elementId = event.target.id; //Stores the input or element ID that triggered the event
  const elementValue = event.target.value; //Stores the input or element value
  const errorActiveClass = "formInputErrorActive"; //Stores the class that has to be added for the error message to show up

  //Depending on the input field ID, the code runs certain validations or not
  switch (elementId) {
    //These are only validated not to be empty
    case "assetName":
    case "assetDescription":
    case "assetUnit":
    case "assetLocation":
    case "assetStatus":
    case "userDateOfBirth":
    case "userUnit":
    case "signinPassword":
    case "userRole":
    case "unitDescription":
    case "provinceSelect":
    case "cantonSelect":
    case "districtSelect":
    case "additionalGeographicInformation":
    case "assetTargetUnit":
    case "assetTargetLocation":
    case "assetTransferReason":
    case "assetRequestDescription":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      break;
    //Validates the user inputs a valid email
    case "signinEmail":
      validateEmailField(elementId, elementValue, errorActiveClass);
      break;
    //Validates if the input is empty and if not, validates that the field only contains letters
    case "userFirstName":
    case "userLastName":
    case "unitName":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateLettersField(elementId, elementValue, errorActiveClass);
      }
      break;
    //Validates if the input is empty and if not, validates that the field only contains numbers
    case "userId":
    case "userPhoneNumber":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateNumbersField(elementId, elementValue, errorActiveClass);
      }
      break;
    //Validates if the input is empty and if not, validates that the field contains a valid email
    case "userEmail":
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateEmailField(elementId, elementValue, errorActiveClass);
      }
      break;
    //Validates if the user uploaded a picture when required
    case "userProfilePicture":
    case "uploadPictureAsset":
      validateFileField(elementId, elementValue, errorActiveClass);
      break;
  }
};

//Validation fuction for all fields, validates if the field is empty or not
const validateEmptyField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Compares the regular expression "empty" to see if the value of the input has at least 1 character (doesn't matter which)
  if (!regExp.empty.test(elementValue)) {
    //If the field does not have any characters in its value, calls the fuction that changes the error paragraph to visible and displays the error message we want.
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Este es un campo obligatorio."
    );
    //Returns true if the input is empty
    return true;
  } else {
    //If the field is not empty, calls the fuction that changes the error paragraph to not visible
    errorModifier(elementId, errorActiveClass, false, "");
    //Returns false if the input is not empty
    return false;
  }
};

//Validation fuction for only letters and spaces fields
//Validates a field has only letters and spaces
const validateLettersField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Compares the regular expression "letters" to see if the value of the input has only letters and spaces
  if (!regExp.letters.test(elementValue)) {
    //If the input value has a character that is not a letter or a space, calls the function that displays the error message
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Este campo solo puede contener letras y espacios."
    );
  } else {
    //If not, calls the fuctions that hides the error message.
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Validation fuction for only numbers fields
//Validates a field has only numbers
const validateNumbersField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Compares the regular expression "numbers" to see if the value of the input has only numbers
  if (!regExp.numbers.test(elementValue)) {
    //If the input value has a character that is not a number, calls the function that displays the error message
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Este campo solo puede contener números sin espacios."
    );
  } else {
    //If not, calls the fuctions that hides the error message.
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Validation fuction for email fields
//Validates a field has a valid email
const validateEmailField = function (
  elementId,
  elementValue,
  errorActiveClass
) {
  //Compares the regular expression "email" to see if the value of the input has a valid email
  if (!regExp.email.test(elementValue)) {
    //If the input value does not caontain a valid email, calls the function that displays the error message
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "Ingrese un correo electrónico válido."
    );
  } else {
    //If it does, calls the fuctions that hides the error message
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Validation fuction for file fields
//Validates if the user has uploades a file into the input field
const validateFileField = function (elementId, elementValue, errorActiveClass) {
  //Checks if the file of the input field has a length greater than 0
  if (document.getElementById(elementId).files.length === 0) {
    //If the file does not have a length > 0, calls the fuction that displays the error message
    errorModifier(
      elementId,
      errorActiveClass,
      true,
      "No ha subido ningún archivo."
    );
  } else {
    //If it does, calls the fuctions that hides the error message
    errorModifier(elementId, errorActiveClass, false, "");
  }
};

//Fuction that shows or hides error paragraph and sets its content
const errorModifier = function (elementId, errorActiveClass, status, message) {
  //The status parameter is received as a true or false value, true shows the message, and false hides it
  if (status) {
    //If the status is true means the field has an error, so the fuction changes the error paragraph content to a message set by a parameter passed to the fuction
    document.getElementById(`${elementId}Error`).innerHTML = message;
    //It also adds a class to the paragraph to make it visible
    document
      .getElementById(`${elementId}Error`)
      .classList.add(errorActiveClass);
    //Depending on the form we're in, sets false to the field of that form that has errors, so that the form is not validated
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
      case "userInfoForm":
        userInfoFields[elementId] = false;
        break;
      case "unitInfoForm":
        unitInfoFields[elementId] = false;
        break;
      case "unitRegistrationForm":
        unitRegistrationFields[elementId] = false;
        break;
      case "assetIndividualInformationForm":
        assetIndividualInformationFields[elementId] = false;
        break;
      case "assetTransferRequestValidation":
        assetTransferRequestFields[elementId] = false;
        break;
    }
  } else if (!status) {
    //If the status is true means the field is ok, the fuction hides the error paragraph by removing the visible class
    document
      .getElementById(`${elementId}Error`)
      .classList.remove(errorActiveClass);
    //Depending on the form we're in, sets true to the field of that form that is ok, so that the field for that form is validated
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
      case "userInfoForm":
        userInfoFields[elementId] = true;
        break;
      case "unitInfoForm":
        unitInfoFields[elementId] = true;
        break;
      case "unitRegistrationForm":
        unitRegistrationFields[elementId] = true;
        break;
      case "assetIndividualInformationForm":
        assetIndividualInformationFields[elementId] = true;
        break;
      case "assetTransferRequestValidation":
        assetTransferRequestFields[elementId] = true;
        break;
    }
  }
};

//Submit button function
const submitBtn = function () {
  //Depending on the form the user is in, the function validates different objects and fields
  console.log(assetIndividualInformationFields);

  switch (form.id) {
    case "assetRegistrationForm":
      if (Object.values(assetRegistrationFields).every(Boolean)) {
        successAlert(
          "Registro exitoso",
          "El activo ha sido registrado con éxito."
        );
        form.reset();
        Object.keys(assetRegistrationFields).forEach(
          (attribute) => (assetRegistrationFields[attribute] = false)
        );
      } else {
        errorAlert("Hay campos obligatorios sin llenar.");
      }
      break;

    case "signupForm":
      if (Object.values(signupRegistrationFields).every(Boolean)) {
        successAlert(
          "Registro exitoso",
          "Su solicitud para crear una cuenta ha sido enviada. En caso de ser aprobada le llegará una contraseña temporal al correo electónico registrado."
        );
        form.reset();
        imageDisplay.src = "/images/profile_picture.png";
        Object.keys(signupRegistrationFields).forEach(
          (attribute) => (signupRegistrationFields[attribute] = false)
        );
      } else {
        errorAlert("Hay campos obligatorios sin llenar.");
      }
      break;

    case "signinForm":
      if (Object.values(signinRegistrationFields).every(Boolean)) {
        form.reset();
        Object.keys(signinRegistrationFields).forEach(
          (attribute) => (signinRegistrationFields[attribute] = false)
        );
        window.location.href = "/html/index.html";
      } else {
        errorAlert("Debe ingresar su correo y contraseña para iniciar sesión.");
      }
      break;

    case "assetIndividualInformationForm":
      if (Object.values(assetIndividualInformationFields).every(Boolean)) {
        successAlert("La edición de la información del activo fue exitosa.");
      } else {
        errorAlert("Hay campos obligatorios sin llenar.");
      }
      break;

    case "assetTransferRequestValidation":
      if (Object.values(assetTransferRequestFields).every(Boolean)) {
        successAlert(
          "La solicitud se ha enviado con éxito."
        );
        form.reset();
        Object.keys(assetTransferRequestFields).forEach(
          (attribute) => (assetTransferRequestFields[attribute] = false)
        );
      } else {
        errorAlert("Hay campos obligatorios sin llenar.");
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

switch (form.id) {
  case "assetIndividualInformationForm":
    const saveAssetButton = document.getElementById("saveAssetInformation");
    saveAssetButton.addEventListener("click", submitBtn);
    break;
  case "userInfoForm":
    const saveUserButton = document.getElementById("saveUserInformation");
    saveUserButton.addEventListener("click", submitBtn);
    break;
  case "assetTransferRequestValidation":
    const saveTransferButton = document.getElementById("saveTransferInformation");
    saveTransferButton.addEventListener("click", submitBtn);
    break;
}
