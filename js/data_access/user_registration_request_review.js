//Local storage variables
const selectedUserRequestId = localStorage.getItem('userRequestId');

//DOM elements
const approveButton = document.getElementById('approveUserRegistration');
const rejectButton = document.getElementById('rejectUserRegistration');

//Functions
//Function to fetch the user information
const fetchUserInformation = async () => {
  try {
    const user = await fetch(
      `http://localhost:8000/users/${selectedUserRequestId}`
    );
    const userJson = await user.json();

    const rawDOB = new Date(userJson[0].dateOfBirth);
    const day = ('0' + (rawDOB.getDate() + 1)).slice(-2);
    const month = ('0' + (rawDOB.getMonth() + 1)).slice(-2);
    const DOB = `${day}/${month}/${rawDOB.getFullYear()}`;
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

//Function to delete the user
const deleteUser = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8000/user-requests/delete/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    return response;
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

//Function to update the user Password
const changeUserPassword = async (body) => {
  try {
    const response = await fetch(`http://localhost:8000/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

//Function to load the user requested
const loadSelectedUser = (selectedUser) => {
  try {
    const idInput = document.getElementById('userId');
    const firstnameInput = document.getElementById('userName');
    const lastNameInput = document.getElementById('userLastName');
    const userEmail = document.getElementById('userEmail');
    const phoneNumber = document.getElementById('userPhone');
    const userDOB = document.getElementById('userDateOfBirth');
    const userUnit = document.getElementById('userUnit');
    const userProfilePicture = document.getElementById('profileImageDisplay');

    idInput.value = selectedUser.id;
    firstnameInput.value = selectedUser.firstName;
    lastNameInput.value = selectedUser.lastName;
    userEmail.value = selectedUser.email;
    phoneNumber.value = selectedUser.phoneNumber;
    userDOB.value = selectedUser.dateOfBirth;
    userUnit.value = selectedUser.unit;
    userProfilePicture.src = selectedUser.profilePicture;
  } catch (error) {
    console.log(error);
  }
};

//Function to approve the user registration
const approveUserRegistration = async () => {
  try {
    const idInput = document.getElementById('userId');
    const userRole = document.getElementById('userRole');
    const userUnit = document.getElementById('userUnit');
    const userEmail = document.getElementById('userEmail');

    const body = {
      email: userEmail.value,
      role: userRole.value,
      unit: userUnit.value,
      isApproved: true,
    };

    await updateUserInformation(idInput.value, body);
    await changeUserPassword(body);
  } catch (error) {
    console.log(error);
  }
};

//Function to reject the user registration
const rejectUserRegistration = async () => {
  try {
    const idInput = document.getElementById('userId');

    await deleteUser(idInput.value);
  } catch (error) {
    console.log(error);
  }
};

//Event listeners
//Event listener to approve the user registration
approveButton.addEventListener('click', async (event) => {
  event.preventDefault();
  formInputs.forEach((input) => {
    input.click();
  });
  try {
    if (
      Object.values(
        validationFields.userRegistrationRequestReviewFormFields
      ).every(Boolean)
    ) {
      confirmationAlert(
        '¿Está seguro de que desea aprobar la solicitud?',
        'Solicitud aprobada.',
        'La solicitud fue aprobada con éxito.',
        '../html/user_registration_requests_list.html',
        approveUserRegistration
      );
    } else {
      errorAlert('Hay campos obligatorios sin llenar.');
    }
  } catch (error) {
    console.log(error);
    errorAlert('Hubo un error al aprobar el usuario.');
  }
});

//Event listener to reject the user registration
rejectButton.addEventListener('click', async () => {
  try {
    confirmationAlert(
      '¿Está seguro de que desea rechazar la solicitud?',
      'Solicitud rechazada.',
      'La solicitud fue rechazada con éxito.',
      '../html/user_registration_requests_list.html',
      rejectUserRegistration
    );
  } catch (error) {
    console.log(error);
    errorAlert('Hubo un error al aprobar el usuario.');
  }
});

//Async function to load the page
(async () => {
  const selectedUser = await fetchUserInformation();
  const unitsList = await fetchUnits();
  buildUnitsSelect(unitsList);
  loadSelectedUser(selectedUser);
})();
