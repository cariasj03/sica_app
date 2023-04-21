//DOM variables
const registerUnit = document.getElementById('submit');

//Normal functions
//Function to get the values of the form fields
const getFormFields = () => {
  const formData = new FormData(form);
  const bodyContent = {};
  formData.forEach((value, key) => {
    bodyContent[key] = value;
  });

  return bodyContent;
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
  try {
    //Validates the fields of the form
    if (
      Object.values(validationFields.unitRegistrationFormFields).every(Boolean)
    ) {
      //Makes the request to the server
      await registerNewUnit(getFormFields());

      successAlert(
        'Registro exitoso',
        'La unidad ha sido registrada con éxito.'
      );
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
  } catch (error) {
    errorAlert('Ha ocurrido un error al registrar la unidad.');
  }
});
