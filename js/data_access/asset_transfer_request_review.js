//Local storage variables
const selectedTransferRequestId = localStorage.getItem('transferRequestId');

//DOM elements
const approveButton = document.getElementById('approveAssetTransfer');
const rejectButton = document.getElementById('rejectAssetTrasfer');

//Functions
//Function to fetch the transfer information
const fetchTransferInformation = async () => {
    try {
      const transfer = await fetch(
        `http://localhost:8000/transfers_requests/${selectedTransferRequestId}`
      );
      const transferJson = await transfer.json()
  
      return transferJson[0];
    } catch (error) {
      console.log(error);
    }
  };


  //Function to update the transfer information
const updateTransferInformation = async (id, body) => {
    try {
      const response = await fetch(`http://localhost:8000/transfers/${id}`, {
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
const deleteTransfer= async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tranfers-requests/delete/${id}`,
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


  //Function to load the user requested
const loadSelectedUser = (selectedTransfer) => {
    try {
      const idTransfer = document.getElementById('transferId');
      const nameTransfer = document.getElementById('transferName');
      const unitOrigin = document.getElementById('transferUnitOrigin');
      const unitDestination= document.getElementById('transferUnitDestination');
      const locationTransfer = document.getElementById('transferLocationDestination');
      const locationCodeTransfer = document.getElementById('transferLocationDestinationCode');
      const reasonTransfer = document.getElementById('transferReason');
      const descriptionTransfer = document.getElementById('transferDescription');
      //const transferPictureOne = document.getElementById('transferPictureOne');
      //const transferPictureTwo = document.getElementById('transferPictureTwo');
  
      idTransfer.value = selectedTransfer.transferId;
      nameTransfer.value = selectedTransfer.transferName;
      unitOrigin.value = selectedTransfer.transferUnitOrigin;
      unitDestination.value = selectedTransfer.transferUnitDestination;
      locationTransfer.value = selectedTransfer.transferLocationDestination;
      locationCodeTransfer.value = selectedTransfer.transferLocationDestinationCode;
      reasonTransfer.value = selectedTransfer.transferReason;
      descriptionTransfer.value = selectedTransfer.transferDescription;
      //transferPictureOne.src = selectedTransfer.transferPictureOne;
      //transferPictureTwo.src = selectedTransfer.transferPictureTwo;
    } catch (error) {
      console.log(error);
    }
  };
  

//Function to approve the asset Transfer
const approveTransfer = async () => {
    try {
      const idInput = document.getElementById('transferId');
    
      const body = {
        isApproved: true,
      };
  
      await updateTransferInformation(idInput.value, body);
    } catch (error) {
      console.log(error);
    }
  };
  

//Function to reject the asset Transfer
const rejectTransfer = async () => {
    try {
      const idInput = document.getElementById('transferId');
  
      await deleteTransfer(idInput.value);
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
          validationFields.assetTransferRequestReviewFormFields
        ).every(Boolean)
      ) {
        confirmationAlert(
          '¿Está seguro de que desea aprobar la solicitud?',
          'Solicitud aprobada.',
          'La solicitud fue aprobada con éxito.',
          '../html/asset_transfer_requests_list.html',
          approveTransferRegistration
        );
      } else {
        errorAlert('Hay campos obligatorios sin llenar.');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Hubo un error al aprobar el usuario.');
    }
  });
  

  //Event listener to reject the asset transfer
rejectButton.addEventListener('click', async () => {
    try {
      confirmationAlert(
        '¿Está seguro de que desea rechazar la solicitud?',
        'Solicitud rechazada.',
        'La solicitud fue rechazada con éxito.',
        '../html/user_registration_requests_list.html',
        rejectTransfer
      );
    } catch (error) {
      console.log(error);
      errorAlert('Hubo un error al aprobar el usuario.');
    }
  });

  //Async function to load the page
(async () => {
    const selectedTransfer = await fetchTransferInformation();
    loadSelectedTransfer(selectedTransfer);
  })();