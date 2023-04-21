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
    const DOB =
      await `${rawDOB.getFullYear()}-${month}-${day}`;
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

//Function to load the user requested
const loadSelectedUser = (selectedUser) => {
  try {
    const idInput = document.getElementById('userId');
    const firstnameInput = document.getElementById('userFirstName');
    const lastNameInput = document.getElementById('userLastName');
    const userEmail = document.getElementById('userEmail');
    const phoneNumber = document.getElementById('userPhoneNumber');    
    // const userRole = document.getElementById('userRole');
    const userDOB = document.getElementById('userDateOfBirth');
    // const userUnit = document.getElementById('userUnit');


    idInput.value = selectedUser.id;
    firstnameInput.value = selectedUser.firstName;
    lastNameInput.value = selectedUser.lastName;
    userEmail.value = selectedUser.email;
    phoneNumber.value = selectedUser.phoneNumber;
    // userRole.value = selectedUser.role;
  
    userDOB.setAttribute("value",selectedUser.dateOfBirth);
    // userUnit.value = selectedUser.unit;;

  } catch (error) {
    console.log(error);
  }
};

//Function to load the user requested role
const loadSelectedUserRole = (selectedUser) => {
    try {
      
      const userRole = document.getElementById('userRole');
      userRole.value = selectedUser.role;
      
    } catch (error) {
      console.log(error);
    }
  };
  
//Function to load the user requested unit
const loadSelectedUnit = (selectedUser) => {
try {
    const userUnit = document.getElementById('userUnit');
    userUnit.value = selectedUser.unit;
} catch (error) {
    console.log(error);
}
};

//Function to run when the page is loaded
window.onload = () => {
  disbleUserFields();
};

//Async function to load the page
(async () => {
    const selectedUser = await fetchUserInformation();
  
    // //Load province information
    // const provinces = await fetchProvinces();
    // buildSelectOptions(provinces.data, 'province');
    loadSelectedUnit(selectedUser);
    loadSelectedUserRole(selectedUser);
    // const province =
    //     document.getElementById('province').options[
    //     document.getElementById('province').selectedIndex
    // ].id;
  
    // //Load canton information
    // const cantons = await fetchCantons(province);
    // buildSelectOptions(cantons.data, 'canton');
    // loadSelectedUnitCanton(selectedUnit);
    // const canton =
    //     document.getElementById('canton').options[
    //     document.getElementById('canton').selectedIndex
    // ].id;
  
    // //Load district information
    // const districts = await fetchDistricts(province, canton);
    // buildSelectOptions(districts.data, 'district');
    // loadSelectedUnitDistrict(selectedUnit);
  
    loadSelectedUser(selectedUser);
  })();


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
    //   userId.classList.add('disabled');
    //   userId.disabled = true;

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
    //   userId.classList.add('disabled');
    //   userId.disabled = false;

    firstName.classList.add('disabled');
    firstName.disabled = false;

    lastName.classList.add('disabled');
    lastName.disabled = false;

    userEmail.classList.add('disabled');
    userEmail.disabled = false;

    phoneNumber.classList.add('disabled');
    phoneNumber.disabled = false;

    userRole.classList.add('disabled');
    userRole.disabled = false;

    userUnit.classList.add('disabled');
    userUnit.disabled = false;

    userDOB.classList.add('disabled');
    userDOB.disabled = false;
};

//Function to get the values of the form fields
const getFormFields = () => {
  const bodyContent = {
    // id: userId.value,
    fstName: firstName.value,
    lstName: lastName.value,
    email: userEmail.value,
    phone: phoneNumber.value,
    role: userRole.value,
    unit: userUnit.value,
    dof: userDOB.value,
  };
  return bodyContent;
};

// //Event listeners
// //Changes on province select
// provinceSelect.addEventListener('change', async (event) => {
//   //Clear canton select
//   cantonSelect.innerHTML = '<option value="" disabled hidden>Cantón</option>';
//   cantonSelect.options[0].selected = true;
//   validationFields.userInfoFormFields.canton = false;

//   //Clear district select
//   districtSelect.innerHTML =
//     '<option value="" disabled hidden>Distrito</option>';
//   districtSelect.options[0].selected = true;
//   validationFields.userInfoFormFields.district = false;

//   //Selected province
//   const province = provinceSelect.options[provinceSelect.selectedIndex].id;

//   //Fetch and load cantons
//   const cantons = await fetchCantons(province);
//   buildSelectOptions(cantons.data, 'canton');
// });

// //Changes on canton select
// cantonSelect.addEventListener('change', async (event) => {
//   //Clear district select
//   districtSelect.innerHTML =
//     '<option value="" disabled hidden>Distrito</option>';
//   districtSelect.options[0].selected = true;
//   validationFields.userInfoFormFields.district = false;

//   //Selected province
//   const province = provinceSelect.options[provinceSelect.selectedIndex].id;

//   //Selected canton
//   const canton = cantonSelect.options[cantonSelect.selectedIndex].id;

//   //Fetch and load districts
//   const districts = await fetchDistricts(province, canton);
//   buildSelectOptions(districts.data, 'district');
// });

//Click on edit information button
userEditButton.addEventListener('click', () => {
  enableUserFields();
  userEditButton.classList.add('disabledButton');
  userEditButton.disabled = true;

  userSaveButton.classList.remove('disabledButton');
  userSaveButton.disabled = false;
});

//Click on save information button
userSaveButton.addEventListener('click', async () => {
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
});
