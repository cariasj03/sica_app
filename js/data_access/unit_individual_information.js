//Local storage variables
const selectedUnitId = localStorage.getItem('unitId');

//Functions
//Function to fetch the unit information
const fetchUnitInformation = async () => {
  try {
    const unit = await fetch(`http://127.0.0.1:8000/units/${selectedUnitId}`);
    const unitJson = await unit.json();
    const rawCreationDate = new Date(unitJson[0].creationDate);
    const day = ('0' + (rawCreationDate.getDate() + 1)).slice(-2);
    const month = ('0' + (rawCreationDate.getMonth() + 1)).slice(-2);
    const creationDate = `${day}/${month}/${rawCreationDate.getFullYear()}`;
    unitJson[0].creationDate = creationDate;

    return unitJson[0];
  } catch (error) {
    console.log(error);
  }
};

//Function to update the unit information
const updateUnitInformation = async (id, body) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/units/${id}`, {
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

//Function to load the unit requested
const loadSelectedUnit = (selectedUnit) => {
  try {
    const idInput = document.getElementById('unitId');
    const creationDateInput = document.getElementById('unitCreationDate');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const addressInput = document.getElementById('address');

    idInput.value = selectedUnit.id;
    nameInput.value = selectedUnit.name;
    creationDateInput.value = selectedUnit.creationDate;
    descriptionInput.value = selectedUnit.description;
    addressInput.value = selectedUnit.address;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the unit requested province
const loadSelectedUnitProvince = (selectedUnit) => {
  try {
    const provinceInput = document.getElementById('province');
    provinceInput.value = selectedUnit.province;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the unit requested canton
const loadSelectedUnitCanton = (selectedUnit) => {
  try {
    const cantonInput = document.getElementById('canton');
    cantonInput.value = selectedUnit.canton;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the unit requested district
const loadSelectedUnitDistrict = (selectedUnit) => {
  try {
    const districtInput = document.getElementById('district');
    districtInput.value = selectedUnit.district;
  } catch (error) {
    console.log(error);
  }
};

//Function to run when the page is loaded
window.onload = () => {
  disbleUnitFields();
};

//Async function to load the page
(async () => {
  const selectedUnit = await fetchUnitInformation();

  //Load province information
  loadSelectedUnitProvince(selectedUnit);
  const province =
    document.getElementById('province').options[
      document.getElementById('province').selectedIndex
    ].id;

  //Load canton information
  const cantons = await fetchCantons(province);
  buildSelectOptions(cantons.data, 'canton');
  loadSelectedUnitCanton(selectedUnit);
  const canton =
    document.getElementById('canton').options[
      document.getElementById('canton').selectedIndex
    ].id;

  //Load district information
  const districts = await fetchDistricts(province, canton);
  buildSelectOptions(districts.data, 'district');
  loadSelectedUnitDistrict(selectedUnit);

  loadSelectedUnit(selectedUnit);
})();

//DOM manipulation
//DOM elements
const unitId = document.getElementById('unitId');
const unitName = document.getElementById('name');
const description = document.getElementById('description');
const address = document.getElementById('address');
const unitSaveButton = document.getElementById('submit');
const unitEditButton = document.getElementById('editUnitInformation');

//Functions
//Function to disable unit fields
const disbleUnitFields = () => {
  unitName.classList.add('disabled');
  unitName.disabled = true;

  description.classList.add('disabled');
  description.disabled = true;

  provinceSelect.classList.add('disabled');
  provinceSelect.disabled = true;

  cantonSelect.classList.add('disabled');
  cantonSelect.disabled = true;

  districtSelect.classList.add('disabled');
  districtSelect.disabled = true;

  address.classList.add('disabled');
  address.disabled = true;
};

//Function to enable unit fields
const enableUnitFields = function () {
  unitName.classList.remove('disabled');
  unitName.disabled = false;

  description.classList.remove('disabled');
  description.disabled = false;

  provinceSelect.classList.remove('disabled');
  provinceSelect.disabled = false;

  cantonSelect.classList.remove('disabled');
  cantonSelect.disabled = false;

  districtSelect.classList.remove('disabled');
  districtSelect.disabled = false;

  address.classList.remove('disabled');
  address.disabled = false;
};

//Function to get the values of the form fields
const getFormFields = () => {
  const bodyContent = {
    name: unitName.value,
    description: description.value,
    province: provinceSelect.value,
    canton: cantonSelect.value,
    district: districtSelect.value,
    address: address.value,
  };
  return bodyContent;
};

//Event listeners

//Turn off validations on province select
provinceSelect.addEventListener('change', async () => {
  validationFields.unitInfoFormFields.canton = false;
  validationFields.unitInfoFormFields.district = false;
});

//Turn off validations on canton select
cantonSelect.addEventListener('change', async () => {
  validationFields.unitInfoFormFields.district = false;
});

//Click on edit information button
unitEditButton.addEventListener('click', () => {
  enableUnitFields();
  unitEditButton.classList.add('disabledButton');
  unitEditButton.disabled = true;

  unitSaveButton.classList.remove('disabledButton');
  unitSaveButton.disabled = false;
});

//Click on save information button
unitSaveButton.addEventListener('click', async (event) => {
  event.preventDefault();
  if (Object.values(validationFields.unitInfoFormFields).every(Boolean)) {
    await updateUnitInformation(unitId.value, getFormFields());
    disbleUnitFields();
    unitSaveButton.classList.add('disabledButton');
    unitSaveButton.disabled = true;

    unitEditButton.classList.remove('disabledButton');
    unitEditButton.disabled = false;
    successAlert(
      'Información guardada con éxito',
      'La información de la unidad se actualizó exitosamente.'
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
  }
});
