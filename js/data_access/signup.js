//DOM variables
const registerUser = document.getElementById('submit');
const userFirstNameInput = document.getElementById('userFirstName');
const userLastNameInput = document.getElementById('userLastName');
const userIdInput = document.getElementById('userId');
const userDateOfBirthInput = document.getElementById('userDateOfBirth');
const userEmailInput = document.getElementById('userEmail');
const userPhoneNumberInput = document.getElementById('userPhoneNumber');
const userUnitInput = document.getElementById('userUnit');

//Normal functions
//Function to get the values of the form fields
const getFormFields = () => {
  const bodyContent = {
    firstName: userFirstNameInput.value,
    lastName: userLastNameInput.value,
    id: userIdInput.value,
    dateOfBirth: userDateOfBirthInput.value,
    email: userEmailInput.value,
    phoneNumber: userPhoneNumberInput.value,
    unit: userUnitInput.value,
    profilePicture: 'profile_picture.png',
    isApproved: false,
  };
  return bodyContent;
};

//Function to build the options in the units select
const buildUnitsSelect = (unitsList) => {
  unitsList.forEach(function (element) {
    const userUnitSelect = document.getElementById('userUnit');
    const selectOption = document.createElement('option');

    selectOption.id = `${element['id']}`;
    selectOption.value = `${element['name']}`;
    selectOption.innerText = `${element['name']}`;

    userUnitSelect.appendChild(selectOption);
  });
};

//Async functions
// Function to register a new user
const registerNewUser = async (body) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/users/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log('user: ', await response.json());
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch sorted units
const fetchSortedUnits = async (sortValue) => {
  try {
    const units = await fetch(
      `http://127.0.0.1:8000/units/sort/by-${sortValue}`
    );
    const unitsList = await units.json();
    return unitsList;
  } catch (error) {
    console.log(error);
  }
};

//Event listeners

registerUser.addEventListener('click', async (event) => {
  // Validates the fields of the form
  event.preventDefault();
  if (Object.values(validationFields[`signupFormFields`]).every(Boolean)) {
    await registerNewUser(getFormFields());
    successAlert(
      'Registro exitoso',
      'Su solicitud para crear una cuenta ha sido enviada. En caso de ser aprobada le llegará una contraseña temporal al correo electónico registrado.'
    );
    form.reset();
    const imageDisplaySignup = document.getElementById('imageDisplay');
    imageDisplaySignup.src = '../images/profile_picture.png';
    Object.keys(validationFields[`signupFormFields`]).forEach(
      (attribute) => (validationFields[`signupFormFields`][attribute] = false)
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
    console.log('error');
  }
});

//Function calls
(async () => {
  const unitsList = await fetchSortedUnits('name');
  buildUnitsSelect(unitsList);
})();
