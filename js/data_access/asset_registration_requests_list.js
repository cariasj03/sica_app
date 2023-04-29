//DOM elements
const reviewAssetsRequestButton = document.getElementById('reviewAssetsRequestButton');

//Function to fetch assets sorted by name
const fetchSortedAssets = async (sortValue) => {
    try {
      const assets = await fetch(
        `http://127.0.0.1:8000/assets-requests/sort/by-${sortValue}`
      );
      const assetsList = await assets.json();
      return assetsList;
    } catch (error) {
      console.log(error);
    }
  };


//Function to fetch filtered assets
const fetchFilteredAssets = async (asset) => {
    try {
      const assets = await fetch(
        `http://127.0.0.1:8000/assets-requests/filter/unit/${unit}`
      );
      const assetsList = await assets.json();
      return assetsList;
    } catch (error) {
      console.log(error);
    }
  };

//Function to fetch sorted units
const fetchSortedUnits = async (sortValue) => {
    try {
      const units = await fetch(
        `http://127.0.0.1:8000/units/sort/by-${sortValue}`
      );
      const unitsList = await units.json();
      return unitsList;
    } catch (error) {
      console.log(error);
    }
  };

//Function to fetch searched assets
const fetchSearchedAssets = async (searchValue, type) => {
    try {
      const assets = await fetch(
        `http://127.0.0.1:8000/assets-requests/search/by-${type}/${searchValue}`
      );
      const assetsList = await assets.json();
      return assetsList;
    } catch (error) {
      console.log(error);
    }
  };


  //Function to load the assets in the table
const loadAssets = (assetsList) => {
    const table = document.querySelector('table');
    table.innerHTML =
      '<tr><th></th><th>ID</th><th>Nombre</th><th>Unidad</th><th>Código de ubicación</th><th>Estado</th></tr>';
    assetsList.forEach(function (asset) {
      const tableRow = document.createElement('tr');
      const tableRowRadio = document.createElement('td');
  
      tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';
  
      const assetID = document.createElement('td');
      assetID.innerText = `${asset.id}`;
  
      const assetName = document.createElement('td');
      assetName.innerText = `${asset.name}`;
  
      const assetUnit = document.createElement('td');
      assetUnit.innerText = `${asset.unit}`;

      const assetLocationCode = document.createElement('td');
      assetLocationCode.innerText = `${asset.locationCode}`;
  
      tableRow.appendChild(tableRowRadio);
      tableRow.appendChild(assetID);
      tableRow.appendChild(assetName);
      tableRow.appendChild(assetUnit);
      tableRow.appendChild(assetLocationCode);
  
      table.appendChild(tableRow);
    });
  };

//Function to select a row in the table
const selectRow = () => {
    const tableRadioButtons = document.getElementsByName('tableRadio');
    let assetId;
    tableRadioButtons.forEach((radioButton) => {
      const tableRowSelected = radioButton.parentElement.parentElement;
      radioButton.addEventListener('change', () => {
        tableRadioButtons.forEach((radioButton) => {
          radioButton.parentElement.parentElement.classList.remove('selectedRow');
        });
        if (radioButton.checked) {
          tableRowSelected.classList.add('selectedRow');
        }
      });
    });
  };

//Function to get the selected asset id
const getSelectedAssetId = () => {
    const tableRadioButtons = document.getElementsByName('tableRadio');
    let assetId;
    tableRadioButtons.forEach((radioButton) => {
      const tableRowSelected = radioButton.parentElement.parentElement;
      if (radioButton.checked) {
        assetId = tableRowSelected.children[1].innerText;
      }
    });
    return assetId;
  };
  
//Function to store the asset id in the local storage
const storeAssetId = (assetId) => {
    localStorage.setItem('assetRequestId', assetId);
    window.location.href = '../html/asset_registration_request_review.html';
  };

//////// Pagination ////////
const pagination = () => {
    //DOM elements
    const paginationNumbers = document.getElementById('paginationNumbers');
    const paginatedTable = document.getElementById('paginatedTable');
    const tableRows = paginatedTable.querySelectorAll('tr');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
  
    //Reset pagination numbers
    paginationNumbers.innerHTML = '';
  
    //Pagination variables
    const paginationLimit = 11;
    const pageCount = Math.ceil(tableRows.length / paginationLimit);
    let currentPage;
  
    const appendPageNumber = (index) => {
      const pageNumber = document.createElement('a');
      pageNumber.innerHTML = index;
      pageNumber.classList.add('paginationNumber');
      pageNumber.setAttribute('page-index', index);
      pageNumber.setAttribute('aria-label', 'Page ' + index);
      paginationNumbers.appendChild(pageNumber);
    };
  
    //Function to build the pagination numbers
    const buildPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
      }
    };
  
    //Function to set the current page
    const setCurrentPage = (pageNum) => {
      currentPage = pageNum;
  
      handleActivePageNumber();
      handlePageButtonsStatus();
  
      const prevRange = (pageNum - 1) * paginationLimit;
      const currRange = pageNum * paginationLimit;
      tableRows.forEach((row, index) => {
        row.classList.add('hidden');
        if (index >= prevRange && index < currRange) {
          row.classList.remove('hidden');
        }
  
        if (index === 0) {
          row.classList.remove('hidden');
        }
      });
    };
  
    //Function to handle active page number
    const handleActivePageNumber = () => {
      document.querySelectorAll('.paginationNumber').forEach((number) => {
        number.classList.remove('active');
  
        const pageIndex = Number(number.getAttribute('page-index'));
        if (pageIndex === currentPage) {
          number.classList.add('activePage');
        } else {
          number.classList.remove('activePage');
        }
      });
    };
  
    //Function to disable prev and next buttons
    const disableButton = (button) => {
      button.classList.add('disabledPageButton');
      button.setAttribute('disabled', true);
    };
  
    //Function to enable prev and next buttons
    const enableButton = (button) => {
      button.classList.remove('disabledPageButton');
      button.removeAttribute('disabled');
    };
  
    //Function to handle page buttons status
    const handlePageButtonsStatus = () => {
      if (currentPage === 1) {
        disableButton(prevButton);
      } else {
        enableButton(prevButton);
      }
      if (pageCount === currentPage) {
        disableButton(nextButton);
      } else {
        enableButton(nextButton);
      }
    };
  
    //Function calls
    buildPaginationNumbers();
    setCurrentPage(1);
  
    //Event listeners
    const paginationNumbersList = document.querySelectorAll('.paginationNumber');
    paginationNumbersList.forEach((number) => {
      const pageIndex = Number(number.getAttribute('page-index'));
  
      if (pageIndex) {
        number.addEventListener('click', () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  
    prevButton.addEventListener('click', () => {
      setCurrentPage(currentPage - 1);
    });
  
    nextButton.addEventListener('click', () => {
      setCurrentPage(currentPage + 1);
    });
  };
  
  //Function to build the options in the units select
  const buildUnitsSelect = (unitsList) => {
    unitsList.forEach(function (element) {
      const unitSelect = document.getElementById('unitSelect');
      const selectOption = document.createElement('option');
  
      selectOption.id = `${element['id']}`;
      selectOption.value = `${element['name']}`;
      selectOption.innerText = `${element['name']}`;
  
      unitSelect.appendChild(selectOption);
    });
  };

 //Function to clear de sort radio buttons
const clearSortRadioButtons = () => {
    const sortRadioButtons = document.getElementsByName('sortRadio');
    sortRadioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
  };

//Function to clear unit select
const clearUnitSelect = () => {
    const unitSelect = document.getElementById('unitSelect');
    unitSelect.options[0].selected = true;
  };

//Function sort the Assets in the table
const sortAssets = () => {
    const nameRadioButton = document.getElementById('nameRadio');
    const sortRadioButtons = document.getElementsByName('sortRadio');
  
    //Set the default sort radio button
    nameRadioButton.checked = true;
  
    //Event listeners
    sortRadioButtons.forEach((radioButton) => {
      radioButton.addEventListener('change', async () => {
        clearUnitSelect();
        if (radioButton.checked) {
          const sortValue = radioButton.value;
          const assetsList = await fetchSortedAssets(sortValue);
          buildPage(assetsList);
        }
      });
    });
  };


//Function to filter the users in the table
const filterAssets= () => {
    const unitSelect = document.getElementById('unitSelect');
    //Event listeners
    assetSelect.addEventListener('change', async () => {
      //Reset the sort radio buttons
      clearSortRadioButtons();
  
      const assetsList = await fetchFilteredAssets(unitSelect.value);
      buildPage(assetsList);
    });
  };


//Function to search
const searchAsset = async (searchInput) => {
    let assetsList;
    if (searchInput.value === '') {
      assetsList = await fetchSortedAssets('name');
    } else {
      //Clear the sort radio buttons
      clearSortRadioButtons();
  
      //Clear the unit select
      clearUnitSelect();
  
      const searchValue = searchInput.value;
      let type;
  
      switch (searchInput.id) {
        case 'idSearch':
          type = 'id';
          break;
        case 'nameSearch':
          type = 'name';
          break;
       
      }
      assetsList = await fetchSearchedAssets(searchValue, type);
    }
    buildPage(assetsList);
  };

//Function to search the users in the table
const searchAssets = () => {
    //DOM elements
    const searchInputs = document.getElementsByName('searchInput');
  
    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener('change', async () => {
        searchAsset(searchInput);
      });
      searchInput.addEventListener('keyup', async () => {
        searchAsset(searchInput);
      });
    });
  };

//Function to build the page
const buildPage = async (assetsList) => {
    loadAssets(assetsList);
    selectRow();
    pagination();
  };


//Event listeners
reviewAssetsRequestButton.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedAssetId = getSelectedAssetId();
    if (selectedAssetId === undefined || selectedAssetId === null) {
      errorAlert(
        'No ha seleccionado una solicitud. Seleccione una para continuar.'
      );
    } else {
      storeAssetId(selectedAssetId);
    }
  });


//Async function to fetch units and build the table
const buildPageAsync = async function () {
  const unitsList = await fetchSortedUnits('name');
  buildUnitsSelect(unitsList);

  const assetsList = await fetchSortedAssets('name');
  buildPage(assetsList);
  sortAssets();
  filterAssets();
  searchAsset();
  searchAssets();
};

//Function calls
buildPageAsync();