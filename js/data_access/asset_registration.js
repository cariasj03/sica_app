//DOM variables
const registerAsset = document.getElementById('submit');
const htmlForm = document.querySelector('form');

//Normal functions
//Function to get the values of the form fields
const getFormFields = () => {
  const formData = new FormData(htmlForm);
  const bodyContent = {};
  bodyContent['locationCode'] = generateAssetLocationCode();
  formData.forEach((value, key) => {
    bodyContent[key] = value;
  });

  return bodyContent;
};

//Fetch unit names from backend
const fetchUnits = async () => {
  try {
    const units = await fetch(
      `http://127.0.0.1:8000/units/sort/by-name?id=${sessionUserData.id}`
    );
    const unitsList = await units.json();
    const unitNames = unitsList.map((unit) => unit.name);
    return unitNames;
  } catch (error) {
    console.log(error);
  }
};

//Function to populate unit names in asset registration form
const populateUnits = async () => {
  const unitNames = await fetchUnits();
  const selectElement = document.getElementById('unit');

  unitNames.forEach((name) => {
    const optionElement = document.createElement('option');
    optionElement.value = name;
    optionElement.textContent = name;
    selectElement.appendChild(optionElement);
  });
};

populateUnits();

//Function to get the location code for each asset
function generateAssetLocationCode() {
  const locationInput = document.getElementById('location').value;
  const nameInput = document.getElementById('unit').value;

  // Lógica para generar el código de ubicación a partir del input de ubicación
  const [piso, estante] = locationInput.match(/\d+/g);
  let locationCode = piso + (estante.length === 1 ? '0' + estante : estante);

  // Lógica para generar el código de ubicación a partir del input de unidad
  const preCode = 'PRO' + nameInput.substring(0, 3).toUpperCase() + 'PIS';

  // Concatenar los códigos de ubicación y unidad para formar el código de activo
  const assetFullCode = preCode + '-' + locationCode;

  console.log('Generated Asset Code: ' + assetFullCode);

  return assetFullCode;
}

//Async functions
//Function to register a new asset
const registerNewAsset = async (body) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/assets?id=${sessionUserData.id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    console.log('asset: ', response);
  } catch (error) {
    console.log(error);
  }
};

//Event listeners

registerAsset.addEventListener('click', async (event) => {
  event.preventDefault();
  //Validates the fields of the form
  if (
    Object.values(validationFields.assetRegistrationFormFields).every(Boolean)
  ) {
    //Makes the request to the server
    await registerNewAsset(getFormFields());

    successAlert('Registro exitoso', 'El activo ha sido registrado con éxito.');
    form.reset();
    Object.keys(validationFields.assetRegistrationFormFields).forEach(
      (attribute) =>
        (validationFields.assetRegistrationFormFields[attribute] = false)
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
  }
});
