//Local storage variables
const selectedAssetId = localStorage.getItem("assetId");
console.log(selectedAssetId);

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

//Fetch unit names from backend
const fetchUnits = async () => {
  try {
    const units = await fetch("http://127.0.0.1:8000/units/sort/by-name");
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
  const selectElement = document.getElementById("transferUnitDestination");

  unitNames.forEach((name) => {
    const optionElement = document.createElement("option");
    optionElement.value = name;
    optionElement.textContent = name;
    selectElement.appendChild(optionElement);
  });
};

populateUnits();

//Function to update the asset information
const updateTransferInformation = async (id, body) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/transfers/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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
    const assetId = document.getElementById("transferId");
    const nameInput = document.getElementById("transferName");
    const assetUnitOrigin = document.getElementById("transferUnitOrigin");


    assetId.value = selectedAsset.id;
    nameInput.value = selectedAsset.name;
    assetUnitOrigin.value = selectedAsset.unit;
  
  } catch (error) {
    console.log(error);
  }
};

//Function to run when the page is loaded
window.onload = () => {
  disableTransferFields();
};

//DOM manipulation
//DOM elements
const idInput = document.getElementById("transferId");
const nameInput = document.getElementById("transferName");
const unitOriginInput = document.getElementById("transferUnitOrigin");
const unitPreviousLocation = selectedAsset.locationCode;
const unitDestinationInput = document.getElementById("transferUnitDestination");
const locationDestinationInput = document.getElementById("transferLocationDestination");
const reasonInput = document.getElementById("transferReason");
const descriptionInput = document.getElementById("transferDescription");
// const uploadPictureAsset1Input = document.getElementById("transferPictureOne");
// const uploadPictureAsset2Input = document.getElementById("transferPictureTwo");
const transferSaveButton = document.getElementById("submit2");

//Functions
//Function to disable transfer fields
const disableTransferFields = () => {

  idInput.classList.add("disabled");
  idInput.disabled = true;

  nameInput.classList.add("disabled");
  nameInput.disabled = true;

  unitOriginInput.classList.add("disabled");
  unitOriginInput.disabled = true;

};

//Function to get the values of the form fields
const getFormFields = () => {
  const bodyContent = {
    transferUnitDestination: unitDestinationInput.value,
    transferLocationDestination: locationDestinationInput.value,
    transferLocationDestinationCode: updateLocationCode(locationDestinationInput.value, unitPreviousLocation),
    transferReason: reasonInput.value,
    transferDescription: descriptionInput.value,
    // pictureOne: uploadPictureAsset1Input.value,
    // pictureTwo: uploadPictureAsset2Input.value,
  };
  console.log(`Valores del new location code ${transferLocationDestinationCode.value}`);
  return bodyContent;
};


function generateLocationCode(userInput) {
  const [piso, estante] = userInput.match(/\d+/g).map(n => parseInt(n));
  const locationCode = piso + (estante <= 9 ? "0" + estante : estante);
  const prefix = "PRO" + assetUnit.value.substring(0, 3).toUpperCase() + "PIS";
  const assetFullCode = `${prefix}-${locationCode}`;
  console.log(`Generated Asset Code: ${assetFullCode}`);
  return assetFullCode;
}

function updateLocationCode(userInput, currentLocationCode) {
  const newCode = generateLocationCode(userInput);
  if (currentLocationCode === newCode) {
    console.log("Location code is already up to date.");
    return currentLocationCode;
  } else {
    console.log(`Updated location code: ${newCode}`);
    return newCode;
  }
}

//Event listeners
//Click on save information button
transferSaveButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (
    Object.values(validationFields.assetTransferRequestValidationFields).every(
      Boolean
    )
  ) {
    await updateTransferInformation(idInput.value, getFormFields());
    successAlert(
      "Información guardada con éxito",
      "La información del activo se actualizó exitosamente."
    );
  } else {
    errorAlert("Hay campos obligatorios sin llenar.");
  }
});

//Async function to load the page
const loadPage = async function () {
  const selectedAsset = await fetchAssetInformation();
  console.log(selectedAsset);
  loadSelectedAsset(selectedAsset);
};

//Function calls
loadPage();
