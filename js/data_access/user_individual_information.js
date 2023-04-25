//Local storage variables
const selectedUserId = localStorage.getItem('userId');

//Functions
//Function to fetch the user information
const fetchUserInformation = async () => {
  try {
    const user = await fetch(`http://localhost:8000/users/${selectedUserId}`);
    const userJson = await user.json();

    const rawDOB = new Date(userJson[0].dateOfBirth);
    const day = ('0' + (rawDOB.getDate() + 1)).slice(-2);
    const month = ('0' + (rawDOB.getMonth() + 1)).slice(-2);
    const DOB = await `${rawDOB.getFullYear()}-${month}-${day}`;
    userJson[0].dateOfBirth = DOB;

    return userJson[0];
  } catch (error) {
    console.log(error);
  }
};

//Function to update the user information
const updateUserInformation = async (id, body) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch units
const fetchUnits = async () => {
  try {
    const units = await fetch('http://127.0.0.1:8000/units/sort/by-name');
    const unitsList = await units.json();
    return unitsList;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the user requested
const loadSelectedUser = (selectedUser) => {
  try {
    const idInput = document.getElementById('userId');
    const firstnameInput = document.getElementById('userFirstName');
    const lastNameInput = document.getElementById('userLastName');
    const userEmail = document.getElementById('userEmail');
    const phoneNumber = document.getElementById('userPhoneNumber');
    const userRole = document.getElementById('userRole');
    const userDOB = document.getElementById('userDateOfBirth');
    const userUnit = document.getElementById('userUnit');

    idInput.value = selectedUser.id;
    firstnameInput.value = selectedUser.firstName;
    lastNameInput.value = selectedUser.lastName;
    userEmail.value = selectedUser.email;
    phoneNumber.value = selectedUser.phoneNumber;
    userRole.value = selectedUser.role;
    userDOB.value = selectedUser.dateOfBirth;
    userUnit.value = selectedUser.unit;
  } catch (error) {
    console.log(error);
  }
};

//DOM manipulation
//DOM elements
const userId = document.getElementById('userId');
const firstName = document.getElementById('userFirstName');
const lastName = document.getElementById('userLastName');
const userEmail = document.getElementById('userEmail');
const phoneNumber = document.getElementById('userPhoneNumber');
const userRole = document.getElementById('userRole');
const userUnit = document.getElementById('userUnit');
const userDOB = document.getElementById('userDateOfBirth');

const userSaveButton = document.getElementById('submit');
const userEditButton = document.getElementById('editUserInformation');

//Functions
//Function to disable unit fields
const disbleUserFields = () => {
  userId.classList.add('disabled');
  userId.disabled = true;

  firstName.classList.add('disabled');
  firstName.disabled = true;

  lastName.classList.add('disabled');
  lastName.disabled = true;

  userEmail.classList.add('disabled');
  userEmail.disabled = true;

  phoneNumber.classList.add('disabled');
  phoneNumber.disabled = true;

  userRole.classList.add('disabled');
  userRole.disabled = true;

  userUnit.classList.add('disabled');
  userUnit.disabled = true;

  userDOB.classList.add('disabled');
  userDOB.disabled = true;
};

//Function to enable unit fields
const enableUserFields = function () {
  firstName.classList.remove('disabled');
  firstName.disabled = false;

  lastName.classList.remove('disabled');
  lastName.disabled = false;

  userEmail.classList.remove('disabled');
  userEmail.disabled = false;

  phoneNumber.classList.remove('disabled');
  phoneNumber.disabled = false;

  userRole.classList.remove('disabled');
  userRole.disabled = false;

  userUnit.classList.remove('disabled');
  userUnit.disabled = false;

  userDOB.classList.remove('disabled');
  userDOB.disabled = false;
};

//Function to get the values of the form fields
const getFormFields = () => {
  const bodyContent = {
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: userDOB.value,
    email: userEmail.value,
    phoneNumber: phoneNumber.value,
    unit: userUnit.value,
    role: userRole.value,
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

//Click on edit information button
userEditButton.addEventListener('click', () => {
  enableUserFields();
  userEditButton.classList.add('disabledButton');
  userEditButton.disabled = true;

  userSaveButton.classList.remove('disabledButton');
  userSaveButton.disabled = false;
});

//Click on save information button
userSaveButton.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
    if (Object.values(validationFields.userInfoFormFields).every(Boolean)) {
      await updateUserInformation(userId.value, getFormFields());
      disbleUserFields();
      userSaveButton.classList.add('disabledButton');
      userSaveButton.disabled = true;

      userEditButton.classList.remove('disabledButton');
      userEditButton.disabled = false;
      successAlert(
        'Información guardada con éxito',
        'La información del usuario se actualizó exitosamente.'
      );
    } else {
      errorAlert('Hay campos obligatorios sin llenar.');
    }
  } catch (error) {
    errorAlert('Hubo un error al actualizar la información del usuario.');
  }
});

//Function to run when the page is loaded
window.onload = () => {
  disbleUserFields();
};

//Async function to load the page
(async () => {
  const selectedUser = await fetchUserInformation();
  const units = await fetchUnits();

  buildUnitsSelect(units);
  loadSelectedUser(selectedUser);
})();
