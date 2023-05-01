//Local storage variables
const selectedAssetRequestId = localStorage.getItem('assetRequestId');

//DOM elements
const approveButton = document.getElementById('approveAssetRegistration');
const rejectButton = document.getElementById('rejectAssetRegistration');


//Functions
//Function to fetch the user information
const fetchAssetInformation = async () => {
    try {
      const asset = await fetch(
        `http://localhost:8000/assets/${selectedAssetRequestId}`
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
      const response = await fetch(`http://localhost:8000/assets/${id}`, {
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

//Function to delete the asset
const deleteAsset = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/assets-requests/delete/${id}`,
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


//Function to load the asset requested
const loadSelectedAsset = (selectedAsset) => {
    try {
      const idInput = document.getElementById('assetId');
      const nameInput = document.getElementById('assetName');
      const descriptionInput = document.getElementById('assetDescription');
      const assetUnit = document.getElementById('assetUnit');
      const assetLocation = document.getElementById('assetLocation');
      const assetLocationCode= document.getElementById('assetLocationCode');
      const assetStatus = document.getElementById('assetStatus');
      
  
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

  //Function to approve the asset registration(duda)
const approveAssetRegistration = async () => {
    try {
        const idInput = document.getElementById('assetId');
      const body = {
        isApproved: true,
      };
  
      await updateAssetInformation(idInput.value, body);
    } catch (error) {
      console.log(error);
    }
  };

//Function to reject the asset registration
const rejectAssetRegistration = async () => {
    try {
      await deleteAsset(idInput.value);
    } catch (error) {
      console.log(error);
    }
  };


//Event listeners
//Event listener to approve the user registration
approveButton.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      
        confirmationAlert(
          '¿Está seguro de que desea aprobar la solicitud?',
          'Solicitud aprobada.',
          'La solicitud fue aprobada con éxito.',
          '../html/asset_registration_requests_list.html',
          approveAssetRegistration
        );
      
    } catch (error) {
      console.log(error);
      errorAlert('Hubo un error al aprobar el activo.');
    }
  });


//Event listener to reject the user registration
rejectButton.addEventListener('click', async () => {
    try {
      confirmationAlert(
        '¿Está seguro de que desea rechazar la solicitud?',
        'Solicitud rechazada.',
        'La solicitud fue rechazada con éxito.',
        '../html/asset_registration_requests_list.html',
        rejectAssetRegistration
      );
    } catch (error) {
      console.log(error);
      errorAlert('Hubo un error al aprobar el usuario.');
    }
  });


//Async function to load the page
(async () => {
    const selectedAsset = await fetchAssetInformation();
    loadSelectedAsset(selectedAsset);
  })();
  