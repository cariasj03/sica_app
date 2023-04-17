//DOM variables
const registerUnit = document.getElementById('submit');

//Normal functions
//Function to get the values of the form fields
const getFormFields = (nextId) => {
  const formData = new FormData(form);
  const bodyContent = {};
  bodyContent['id'] = nextId;
  bodyContent['creationDate'] = new Date();
  formData.forEach((value, key) => {
    bodyContent[key] = value;
  });

  return bodyContent;
};

//Function to pad the zeros to the id
const padZeros = (num) => {
  if (typeof num !== 'string') {
    num = num.toString();
  }
  const paddedNum = num.padStart(6, '0');
  return paddedNum;
};

//Function to get the next id
const getNextId = (num) => {
  num++;
  return padZeros(num);
};

//Async functions
//Function to register a new unit
const registerNewUnit = async (body) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/units', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log('unit: ', response);
  } catch (error) {
    console.log(error);
  }
};

//Function to get the unit id
const getUnitId = async () => {
  try {
    const units = await fetch('http://127.0.0.1:8000/units');
    const unitsList = await units.json();
    const unitIds = await unitsList.map((unit) => {
      return Number(unit.id);
    });
    const lastId = await Math.max(...unitIds);
    const nextId = await getNextId(lastId);
    return nextId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Event listeners

//Turn off validations on province select
provinceSelect.addEventListener('change', async () => {
  validationFields.unitRegistrationFormFields.canton = false;
  validationFields.unitRegistrationFormFields.district = false;
});

//Turn off validations on canton select
cantonSelect.addEventListener('change', async () => {
  validationFields.unitRegistrationFormFields.district = false;
});

registerUnit.addEventListener('click', async (event) => {
  event.preventDefault();
  //Get the next id
  const nextId = await getUnitId();
  getFormFields(nextId);

  //Validates the fields of the form
  if (
    Object.values(validationFields.unitRegistrationFormFields).every(Boolean)
  ) {
    //Makes the request to the server
    await registerNewUnit(getFormFields(nextId));

    successAlert('Registro exitoso', 'La unidad ha sido registrada con éxito.');
    form.reset();
    clearCantonSelect();
    clearDistrictSelect();
    Object.keys(validationFields.unitRegistrationFormFields).forEach(
      (attribute) =>
        (validationFields.unitRegistrationFormFields[attribute] = false)
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
  }
});
