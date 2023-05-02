//Local storage variables
const selectedAssetId = localStorage.getItem('assetId');

//DOM elements
const assetId = document.getElementById('assetId');
const assetName = document.getElementById('name');
const assetDescription = document.getElementById('description');
const assetUnit = document.getElementById('unit');
const assetLocation = document.getElementById('location');
const assetLocationCode = document.getElementById('locationCode');
const assetStatus = document.getElementById('status');
const assetSaveButton = document.getElementById('submit');
const assetEditButton = document.getElementById('editAsset');

//Functions
//Function to fetch the unit information
const fetchAssetInformation = async () => {
  try {
    const asset = await fetch(
      `http://127.0.0.1:8000/assets/${selectedAssetId}`
    );
    const assetJson = await asset.json();

    return assetJson[0];
  } catch (error) {
    console.log(error);
  }
};

//Function to update the asset information
const updateAssetInformation = async (id, body) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/assets/${id}`, {
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

//Function to load the asset requested
const loadSelectedAsset = (selectedAsset) => {
  try {
    const idInput = document.getElementById('assetId');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const assetUnit = document.getElementById('unit');
    const assetLocation = document.getElementById('location');
    const assetLocationCode = document.getElementById('locationCode');
    const assetStatus = document.getElementById('status');

    idInput.value = selectedAsset.id;
    nameInput.value = selectedAsset.name;
    descriptionInput.value = selectedAsset.description;
    assetUnit.value = selectedAsset.unit;
    assetLocation.value = selectedAsset.location;
    assetLocationCode.value = selectedAsset.locationCode;
    assetStatus.value = selectedAsset.status;
  } catch (error) {
    console.log(error);
  }
};

//Function to run when the page is loaded
window.onload = () => {
  disableAssetFields();
};

//Functions
//Function to disable unit fields
const disableAssetFields = () => {
  assetId.classList.add('disabled');
  assetId.disabled = true;

  assetName.classList.add('disabled');
  assetName.disabled = true;

  assetDescription.classList.add('disabled');
  assetDescription.disabled = true;

  assetUnit.classList.add('disabled');
  assetUnit.disabled = true;

  assetLocation.classList.add('disabled');
  assetLocation.disabled = true;

  assetLocationCode.classList.add('disabled');
  assetLocationCode.disabled = true;

  assetStatus.classList.add('disabled');
  assetStatus.disabled = true;
};

//Function to enable unit fields
const enableAssetFields = function () {
  assetName.classList.remove('disabled');
  assetName.disabled = false;

  assetDescription.classList.remove('disabled');
  assetDescription.disabled = false;

  assetLocation.classList.remove('disabled');
  assetLocation.disabled = false;
};

//Function to get the location code for each asset
const generateAssetLocationCode = (location, unit) => {
  // Lógica para generar el código de ubicación a partir del input de ubicación
  const [piso, estante] = location.match(/\d+/g);
  let locationCode = piso + (estante.length === 1 ? '0' + estante : estante);

  // Lógica para generar el código de ubicación a partir del input de unidad
  const preCode = 'PRO' + unit.substring(0, 3).toUpperCase() + 'PIS';

  // Concatenar los códigos de ubicación y unidad para formar el código de activo
  const assetFullCode = preCode + '-' + locationCode;

  console.log('Generated Asset Code: ' + assetFullCode);

  return assetFullCode;
};

//Function to get the values of the form fields
const getFormFields = () => {
  const bodyContent = {
    name: assetName.value,
    description: assetDescription.value,
    location: assetLocation.value,
    locationCode: generateAssetLocationCode(
      assetLocation.value,
      assetUnit.value
    ),
  };
  console.log(`Valores del new location code ${assetLocation.value}`);
  return bodyContent;
};

//Event listeners
//Click on edit information button
assetEditButton.addEventListener('click', () => {
  enableAssetFields();
  assetEditButton.classList.add('disabledButton');
  assetEditButton.disabled = true;

  assetSaveButton.classList.remove('disabledButton');
  assetSaveButton.disabled = false;
});

//Click on save information button
assetSaveButton.addEventListener('click', async (event) => {
  event.preventDefault();
  if (
    Object.values(validationFields.assetIndividualInformationFormFields).every(
      Boolean
    )
  ) {
    await updateAssetInformation(assetId.value, getFormFields());
    disableAssetFields();
    loadPage();
    assetSaveButton.classList.add('disabledButton');
    assetSaveButton.disabled = true;

    assetEditButton.classList.remove('disabledButton');
    assetEditButton.disabled = false;
    successAlert(
      'Información guardada con éxito',
      'La información del activo se actualizó exitosamente.'
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
  }
});

//Async function to load the page
const loadPage = async function () {
  const selectedAsset = await fetchAssetInformation();
  loadSelectedAsset(selectedAsset);
};

//Function calls
loadPage();
