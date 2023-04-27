//Variables
//Stores the form of the page the user is in
const form = document.querySelector('form');
//Stores all the inputs, textareas and selects inside the form of the page the user is in
const formInputs = document.querySelectorAll(
  'form input, form textarea, form select, form label input, form label textarea, form label select'
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

const validationFields = {
  //Object for asset registration validation
  assetRegistrationFormFields: {
    name: false,
    description: false,
    unit: false,
    location: false,
    status: false,
  },
  //Object for signup validation
  signupFormFields: {
    userFirstName: false,
    userLastName: false,
    userId: false,
    userDateOfBirth: false,
    userEmail: false,
    userPhoneNumber: false,
    userUnit: false,
    userProfilePicture: false,
  },
  //Object for signin validation
  signinFormFields: {
    signinEmail: false,
    signinPassword: false,
  },
  //Object for user info validation
  userInfoFormFields: {
    userFirstName: true,
    userLastName: true,
    userDateOfBirth: true,
    userEmail: true,
    userPhoneNumber: true,
    userUnit: true,
    userRole: true,
  },
  //Object for unit info validation
  unitInfoFormFields: {
    name: true,
    description: true,
    unitID: true,
    unitCreationDate: true,
    province: true,
    canton: true,
    district: true,
    address: true,
  },
  // Object for unit registration validation
  unitRegistrationFormFields: {
    name: false,
    description: false,
    province: false,
    canton: false,
    district: false,
    address: false,
  },
  // Object for asset individual info edit validation
  assetIndividualInformationFormFields: {
    name: true,
    description: true,
    location: true,
  },
  // Object for asset transfer request validation
  assetTransferRequestValidationFields: {
    assetTargetUnit: false,
    assetTargetLocation: false,
    assetTransferReason: false,
    assetRequestDescription: false,
    uploadPictureAsset1: false,
    uploadPictureAsset2: false,
  },
  // Object for user registration request validation
  userRegistrationRequestReviewFormFields: {
    userRole: false,
    userUnit: true,
  },
  //Object for user info validation
  myProfileFormFields: {
    userFirstName: true,
    userLastName: true,
    userDateOfBirth: true,
    userEmail: true,
    userPhoneNumber: true,
  },
};

//Functions
//Validation function for the entire form
const validateForm = function (event) {
  const elementId = event.target.id; //Stores the input or element ID that triggered the event
  const elementValue = event.target.value; //Stores the input or element value
  const errorActiveClass = 'formInputErrorActive'; //Stores the class that has to be added for the error message to show up

  /* console.log(validationFields[`${form.id}Fields`]); */

  //Depending on the input field ID, the code runs certain validations or not
  switch (elementId) {
    //These are only validated not to be empty
    case 'description':
    case 'unit':
    case 'location':
    case 'status':
    case 'userDateOfBirth':
    case 'userUnit':
    case 'signinPassword':
    case 'userRole':
    case 'description':
    case 'province':
    case 'canton':
    case 'district':
    case 'address':
    case 'assetTargetUnit':
    case 'assetTargetLocation':
    case 'assetTransferReason':
    case 'assetRequestDescription':
      validateEmptyField(elementId, elementValue, errorActiveClass);
      break;
    //Validates the user inputs a valid email
    case 'signinEmail':
      validateEmailField(elementId, elementValue, errorActiveClass);
      break;
    //Validates if the input is empty and if not, validates that the field only contains letters
    case 'userFirstName':
    case 'userLastName':
    case 'name':
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateLettersField(elementId, elementValue, errorActiveClass);
      }
      break;
    //Validates if the input is empty and if not, validates that the field only contains numbers
    case 'userId':
    case 'userPhoneNumber':
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateNumbersField(elementId, elementValue, errorActiveClass);
      }
      break;
    //Validates if the input is empty and if not, validates that the field contains a valid email
    case 'userEmail':
      validateEmptyField(elementId, elementValue, errorActiveClass);
      if (!validateEmptyField(elementId, elementValue, errorActiveClass)) {
        validateEmailField(elementId, elementValue, errorActiveClass);
      }
      break;
    //Validates if the user uploaded a picture when required
    case 'userProfilePicture':
    case 'uploadPictureAsset1':
    case 'uploadPictureAsset2':
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
      'Este es un campo obligatorio.'
    );
    //Returns true if the input is empty
    return true;
  } else {
    //If the field is not empty, calls the fuction that changes the error paragraph to not visible
    errorModifier(elementId, errorActiveClass, false, '');
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
      'Este campo solo puede contener letras y espacios.'
    );
  } else {
    //If not, calls the fuctions that hides the error message.
    errorModifier(elementId, errorActiveClass, false, '');
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
      'Este campo solo puede contener números sin espacios.'
    );
  } else {
    //If not, calls the fuctions that hides the error message.
    errorModifier(elementId, errorActiveClass, false, '');
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
      'Ingrese un correo electrónico válido.'
    );
  } else {
    //If it does, calls the fuctions that hides the error message
    errorModifier(elementId, errorActiveClass, false, '');
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
      'No ha subido ningún archivo.'
    );
  } else {
    //If it does, calls the fuctions that hides the error message
    errorModifier(elementId, errorActiveClass, false, '');
  }
};

//Fuction that shows or hides error paragraph and sets its content
const errorModifier = function (elementId, errorActiveClass, status, message) {
  //The status parameter is received as a true or false value, true shows the message, and false hides it
  if (status) {
    //If the status is true means the field has an error, so the fuction changes the error paragraph content to a message set by a parameter passed to the fuction
    document.getElementById(`${elementId}Error`).innerHTML = message;
    //It also adds a class to the paragraph to make it visible
    document.getElementById(`${elementId}Error`).classList.add(errorActiveClass);
    //Depending on the form we're in, sets false to the field of that form that has errors, so that the form is not validated
    validationFields[`${form.id}Fields`][`${elementId}`] = false;
  } else if (!status) {
    //If the status is true means the field is ok, the fuction hides the error paragraph by removing the visible class
    document.getElementById(`${elementId}Error`).classList.remove(errorActiveClass);
    //Depending on the form we're in, sets true to the field of that form that is ok, so that the field for that form is validated
    validationFields[`${form.id}Fields`][`${elementId}`] = true;
  }
};

//Submit button function
const submitBtn = function () {
  //Depending on the form the user is in, the function validates different objects and fields

  switch (form.id) {
    case 'assetRegistrationForm':
      if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        successAlert(
          'Registro exitoso',
          'El activo ha sido registrado con éxito.'
        );
        form.reset();
        Object.keys(validationFields[`${form.id}Fields`]).forEach(
          (attribute) =>
            (validationFields[`${form.id}Fields`][attribute] = false)
        );
      } else {
        errorAlert('Hay campos obligatorios sin llenar.');
      }
      break;

    case 'signinForm':
      if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        form.reset();
        Object.keys(validationFields[`${form.id}Fields`]).forEach(
          (attribute) =>
            (validationFields[`${form.id}Fields`][attribute] = false)
        );
        window.location.href = '../html/index.html';
      } else {
        errorAlert('Debe ingresar su correo y contraseña para iniciar sesión.');
      }
      break;

    case 'assetIndividualInformationForm':
      if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        successAlert('La edición de la información del activo fue exitosa.');
      } else {
        errorAlert('Hay campos obligatorios sin llenar.');
      }
      break;

    case 'assetTransferRequestValidation':
      if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        successAlert('La solicitud se ha enviado con éxito.');
        form.reset();
        const assetImageDisplay1 =
          document.getElementById('assetImageDisplay1');
        assetImageDisplay1.src = '../images/upload_picture_icon.jpeg';
        const assetImageDisplay2 =
          document.getElementById('assetImageDisplay2');
        assetImageDisplay2.src = '../images/upload_picture_icon.jpeg';
        Object.keys(validationFields[`${form.id}Fields`]).forEach(
          (attribute) =>
            (validationFields[`${form.id}Fields`][attribute] = false)
        );
      } else {
        errorAlert('Hay campos obligatorios sin llenar.');
      }
      break;

    case 'userInfoForm':
      if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        successAlert(
          'La información se guardó con éxito',
          'La actualización de la información del usuario se ha realizado exitosamente.'
        );
      } else {
        errorAlert('Hay campos obligatorios sin llenar.');
      }
      break;

    case 'myProfileForm':
      if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
        successAlert(
          'La información se guardó con éxito',
          'La actualización de su información se ha realizado exitosamente.'
        );
      } else {
        errorAlert('Hay campos obligatorios sin llenar.');
      }
      break;
  }
};

/* const submitButton = document.getElementById('submit');
const submit = function () {
  submitButton.addEventListener('click', () => {
    if (Object.values(validationFields[`${form.id}Fields`]).every(Boolean)) {
      successAlert(
        'Registro exitoso',
        'El activo ha sido registrado con éxito.'
      );
      form.reset();
      Object.keys(validationFields[`${form.id}Fields`]).forEach(
        (attribute) => (validationFields[`${form.id}Fields`][attribute] = false)
      );
    } else {
      errorAlert('Hay campos obligatorios sin llenar.');
    }
  });
}; */

const validation = function () {
  formInputs.forEach(function (input) {
    input.addEventListener('blur', validateForm);
    input.addEventListener('keyup', validateForm);
    input.addEventListener('click', validateForm);
  });
};

//Function calls
validation();
