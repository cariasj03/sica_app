//Local storage variables
const selectedAssetId = localStorage.getItem('assetId');

//DOM elements
const assetIdInput = document.getElementById('assetId');
const assetNameInput = document.getElementById('assetName');
const originUnitInput = document.getElementById('originUnit');
const targetUnitInput = document.getElementById('targetUnit');
const targetLocationInput = document.getElementById('targetLocation');
const transferReasonInput = document.getElementById('transferReason');
const transferDescriptionInput = document.getElementById('transferDescription');
const transferImage1Input = document.getElementById('transferImageDisplay1');
const transferImage2Input = document.getElementById('transferImageDisplay2');
const requestTransferButton = document.getElementById('submit');

//Functions
//Function to fetch the asset information
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

//Function to request the asset transfer
const requestTransfer = async (body) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/transfers?id=${sessionUserData.id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Fetch unit names from backend
const fetchUnits = async () => {
  try {
    const units = await fetch('http://127.0.0.1:8000/units/sort/by-name');
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
  const selectElement = document.getElementById('targetUnit');

  unitNames.forEach((name) => {
    const optionElement = document.createElement('option');
    optionElement.value = name;
    optionElement.textContent = name;
    selectElement.appendChild(optionElement);
  });
};

//Function to load the asset requested
const loadSelectedAsset = (selectedAsset) => {
  try {
    assetIdInput.value = selectedAsset.id;
    assetNameInput.value = selectedAsset.name;
    originUnitInput.value = selectedAsset.unit;
  } catch (error) {
    console.log(error);
  }
};

//Functions
//Function to get the new asset status
const getAssetNewStatus = (transferReason) => {
  let assetNewStatus = '';
  switch (transferReason) {
    case 'Daño':
      assetNewStatus = 'Dañado';
      break;
    case 'Desuso':
      assetNewStatus = 'Desuso';
      break;
    case 'Donación':
      assetNewStatus = 'Donado';
      break;
    case 'Otro':
      assetNewStatus = 'Activo';
      break;
  }
  return assetNewStatus;
};

//Function to build the asset updated information
const getFormFields = () => {
  try {
    const bodyContent = {
      assetUpdatedInfo: {
        unit: targetUnitInput.value,
        location: targetLocationInput.value,
        locationCode: generateLocationCode(
          targetLocationInput.value,
          targetUnitInput.value
        ),
        status: getAssetNewStatus(transferReasonInput.value),
      },
      transferInfo: {
        assetId: assetIdInput.value,
        assetName: assetNameInput.value,
        originUnit: originUnitInput.value,
        targetUnit: targetUnitInput.value,
        targetLocation: targetLocationInput.value,
        targetLocationCode: generateLocationCode(targetLocationInput.value),
        transferReason: transferReasonInput.value,
        transferDescription: transferDescriptionInput.value,
        transferImage1: transferImage1Input.src,
        transferImage2: transferImage2Input.src,
        requestedBy: sessionUserData.id,
      },
    };
    return bodyContent;
  } catch (error) {
    console.log(error);
  }
};

function generateLocationCode(locationInput) {
  const [piso, estante] = locationInput.match(/\d+/g).map((n) => parseInt(n));
  const locationCode = piso + (estante <= 9 ? '0' + estante : estante);
  const prefix = 'PRO' + targetUnit.value.substring(0, 3).toUpperCase() + 'PIS';
  const assetFullCode = `${prefix}-${locationCode}`;
  console.log(`Generated Asset Code: ${assetFullCode}`);
  return assetFullCode;
}

//Event listeners
requestTransferButton.addEventListener('click', async (event) => {
  event.preventDefault();
  if (
    Object.values(validationFields.assetTransferRequestFormFields).every(
      Boolean
    )
  ) {
    await requestTransfer(getFormFields());
    successAlertRedirect(
      'Solicitud enviada con éxito.',
      'La solicitud de traslado del activo se realizó exitosamente.',
      '../html/assets.html'
    );
  } else {
    errorAlert('Hay campos obligatorios sin llenar.');
  }
});

//Async function to load the page
const loadPage = async function () {
  await populateUnits();
  const selectedAsset = await fetchAssetInformation();
  loadSelectedAsset(selectedAsset);
};

//Function calls
loadPage();
