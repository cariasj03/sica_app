//Local storage variables
const selectedTransferRequestId = localStorage.getItem('transferRequestId');

//DOM elements
const transferIdInput = document.getElementById('transferId');
const requestCreationDateInput = document.getElementById('requestCreationDate');
const assetIdInput = document.getElementById('assetId');
const assetNameInput = document.getElementById('assetName');
const originUnitInput = document.getElementById('originUnit');
const targetUnitInput = document.getElementById('targetUnit');
const transferReasonInput = document.getElementById('transferReason');
const targetLocationInput = document.getElementById('targetLocation');
const transferDescriptionInput = document.getElementById('transferDescription');
const transferImage1 = document.getElementById('assetTransferPicture1');
const transferImage2 = document.getElementById('assetTransferPicture2');

const approveButton = document.getElementById('approveAssetTransfer');
const rejectButton = document.getElementById('rejectAssetTrasfer');

//Functions
//Function to fetch the transfer information
const fetchTransferInformation = async () => {
  try {
    const transfer = await fetch(
      `http://localhost:8000/transfers-requests/${selectedTransferRequestId}`
    );
    const transferJson = await transfer.json();

    const rawDOB = new Date(transferJson[0].creationDate);
    const day = ('0' + (rawDOB.getDate() + 1)).slice(-2);
    const month = ('0' + (rawDOB.getMonth() + 1)).slice(-2);
    const DOB = `${day}/${month}/${rawDOB.getFullYear()}`;
    transferJson[0].creationDate = DOB;

    return transferJson[0];
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

//Function to update the transfer information
const updateTransferInformation = async (id, body) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/transfers/${id}`, {
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

//Function to delete the transfer request
const deleteTransferRequest = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8000/transfers-requests/delete/${id}`,
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

//Function to load the user requested
const loadSelectedTransfer = (selectedTransfer) => {
  try {
    transferIdInput.value = selectedTransfer.transferId;
    requestCreationDateInput.value = selectedTransfer.creationDate;
    assetIdInput.value = selectedTransfer.assetId;
    assetNameInput.value = selectedTransfer.assetName;
    originUnitInput.value = selectedTransfer.originUnit;
    targetUnitInput.value = selectedTransfer.targetUnit;
    transferReasonInput.value = selectedTransfer.transferReason;
    targetLocationInput.value = selectedTransfer.targetLocation;
    transferDescriptionInput.value = selectedTransfer.transferDescription;
    transferImage1.src = selectedTransfer.transferImage1;
    transferImage2.src = selectedTransfer.transferImage2;
  } catch (error) {
    console.log(error);
  }
};

//Function to get the location code for each asset
const generateAssetLocationCode = (location, unit) => {
  const [piso, estante] = location.match(/\d+/g);
  let locationCode = piso + (estante.length === 1 ? '0' + estante : estante);
  const preCode = 'PRO' + unit.substring(0, 3).toUpperCase() + 'PIS';
  const assetFullCode = preCode + '-' + locationCode;

  console.log('Generated Asset Code: ' + assetFullCode);

  return assetFullCode;
};

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
const assetUpdatedInformation = () => {
  try {
    const bodyContent = {
      unit: targetUnitInput.value,
      location: targetLocationInput.value,
      locationCode: generateAssetLocationCode(
        targetLocationInput.value,
        targetUnitInput.value
      ),
      status: getAssetNewStatus(transferReasonInput.value),
    };
    return bodyContent;
  } catch (error) {
    console.log(error);
  }
};

//Function to build the transfer updated information
const transferUpdatedInformation = () => {
  try {
    const bodyContent = {
      isApproved: true,
      approvedBy: sessionUserData.id,
    };
    return bodyContent;
  } catch (error) {
    console.log(error);
  }
};

//Function to approve the asset Transfer
const approveTransfer = async () => {
  try {
    await updateTransferInformation(
      transferIdInput.value,
      transferUpdatedInformation()
    );

    await updateAssetInformation(assetIdInput.value, assetUpdatedInformation());
  } catch (error) {
    console.log(error);
  }
};

//Function to reject the asset Transfer
const rejectTransfer = async () => {
  try {
    await deleteTransferRequest(transferIdInput.value);
  } catch (error) {
    console.log(error);
  }
};

//Event listeners
//Event listener to approve the transfer

approveButton.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
    {
      confirmationAlert(
        '¿Está seguro de que desea aprobar el traslado?',
        'Traslado aprobado.',
        'El traslado fue aprobado con éxito.',
        '../html/asset_transfer_requests_list.html',
        approveTransfer
      );
    }
  } catch (error) {
    console.log(error);
    errorAlert('Hubo un error al aprobar el traslado.');
  }
});

//Event listener to reject the asset transfer
rejectButton.addEventListener('click', async () => {
  try {
    confirmationAlert(
      '¿Está seguro de que desea rechazar el traslado?',
      'Traslado rechazado.',
      'El traslado fue rechazado con éxito.',
      '../html/asset_transfer_requests_list.html',
      rejectTransfer
    );
  } catch (error) {
    console.log(error);
    errorAlert('Hubo un error al rechazar el traslado.');
  }
});

//Async function to load the page
(async () => {
  const selectedTransfer = await fetchTransferInformation();
  loadSelectedTransfer(selectedTransfer);
})();
