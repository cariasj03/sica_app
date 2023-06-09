//DOM elements
const reviewRequestButton = document.getElementById(
  'reviewTransferAssetRequestButton'
);

//Function to fetch transfers sorted by  value
const fetchSortedTransfers = async (sortValue) => {
  try {
    const transfers = await fetch(
      `http://127.0.0.1:8000/transfers-requests/sort/by-${sortValue}`
    );
    const transfersList = await transfers.json();
    return transfersList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch filtered transfers
const fetchFilteredTransfers = async (filterType, unit) => {
  try {
    const transfers = await fetch(
      `http://127.0.0.1:8000/transfers-requests/filter/by-${filterType}/${unit}`
    );
    const transfersList = await transfers.json();
    return transfersList;
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

//Function to fetch searched Transfers
const fetchSearchedTransfers = async (searchValue, type) => {
  try {
    const transfers = await fetch(
      `http://127.0.0.1:8000/transfers-requests/search/by-${type}/${searchValue}`
    );
    const transfersList = await transfers.json();
    return transfersList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch asset information
const fetchAssetInformation = async (assetId) => {
  try {
    const asset = await fetch(`http://127.0.0.1:8000/assets/${assetId}`);
    const assetJson = await asset.json();

    return assetJson[0];
  } catch (error) {
    console.log(error);
  }
};

//Function to load the transfers in the table
const loadTransfers = (transfersList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '<tr><th></th><th>ID del traslado</th><th>ID del activo</th><th>Nombre del activo</th><th>Unidad de origen</th><th>Unidad de destino</th></tr>';

  transfersList.forEach(async (transfer) => {
    const tableRow = document.createElement('tr');
    const tableRowRadio = document.createElement('td');

    tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';

    const transferId = document.createElement('td');
    transferId.innerText = `${transfer.transferId}`;

    const assetId = document.createElement('td');
    assetId.innerText = `${transfer.assetId}`;

    const assetName = document.createElement('td');
    assetName.innerText = `${transfer.assetName}`;

    const originUnit = document.createElement('td');
    originUnit.innerText = `${transfer.originUnit}`;

    const targetUnit = document.createElement('td');
    targetUnit.innerText = `${transfer.targetUnit}`;

    tableRow.appendChild(tableRowRadio);
    tableRow.appendChild(transferId);
    tableRow.appendChild(assetId);
    tableRow.appendChild(assetName);
    tableRow.appendChild(originUnit);
    tableRow.appendChild(targetUnit);

    table.appendChild(tableRow);
  });
};

//Function to select a row in the table
const selectRow = () => {
  const tableRadioButtons = document.getElementsByName('tableRadio');
  let userId;
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

//Function to get the selected transfer id
const getSelectedTransferId = () => {
  const tableRadioButtons = document.getElementsByName('tableRadio');
  let transferId;
  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    if (radioButton.checked) {
      transferId = tableRowSelected.children[1].innerText;
    }
  });
  return transferId;
};

//Function to store the transfer id in the local storage
const storeTransferId = (transferId) => {
  localStorage.setItem('transferRequestId', transferId);
  window.location.href = '../html/asset_transfer_request_review.html';
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
    const originUnitSelect = document.getElementById('originUnit');
    const targetUnitSelect = document.getElementById('targetUnit');
    const originSelectOption = document.createElement('option');
    const targetSelectOption = document.createElement('option');

    originSelectOption.id = `${element['id']}`;
    originSelectOption.value = `${element['name']}`;
    originSelectOption.innerText = `${element['name']}`;

    targetSelectOption.id = `${element['id']}`;
    targetSelectOption.value = `${element['name']}`;
    targetSelectOption.innerText = `${element['name']}`;

    originUnitSelect.appendChild(originSelectOption);
    targetUnitSelect.appendChild(targetSelectOption);
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
  const originUnitSelect = document.getElementById('originUnit');
  const targetUnitSelect = document.getElementById('targetUnit');

  originUnitSelect.options[0].selected = true;
  targetUnitSelect.options[0].selected = true;
};

//Function sort the users in the table
const sortTransfers = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('click', async () => {
      clearUnitSelect();
      const sortValue = radioButton.value;
      const transfersList = await fetchSortedTransfers(sortValue);

      buildPage(transfersList);
    });
  });
};

//Function to filter the transfers in the table
const filterTransfers = () => {
  const originUnitSelect = document.getElementById('originUnit');
  const targetUnitSelect = document.getElementById('targetUnit');

  //Event listeners
  originUnitSelect.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();

    targetUnitSelect.options[0].selected = true;

    const transfersList = await fetchFilteredTransfers(
      'origin-unit',
      originUnitSelect.value
    );
    buildPage(transfersList);
  });

  targetUnitSelect.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();

    originUnitSelect.options[0].selected = true;

    const transfersList = await fetchFilteredTransfers(
      'target-unit',
      targetUnitSelect.value
    );
    buildPage(transfersList);
  });
};

//Function to search
const searchTransfer = async (searchInput) => {
  let transfersList;
  if (searchInput.value === '') {
    transfersList = await fetchSortedTransfers('transfer-id');
  } else {
    //Clear the sort radio buttons
    clearSortRadioButtons();

    //Clear the unit select
    clearUnitSelect();

    const searchValue = searchInput.value;
    let type;

    switch (searchInput.id) {
      case 'transferIdSearch':
        type = 'transfer-id';
        break;
      case 'assetIdSearch':
        type = 'asset-id';
        break;
    }
    transfersList = await fetchSearchedTransfers(searchValue, type);
  }
  await buildPage(transfersList);
};

//Function to search the transfers in the table
const searchTransfers = () => {
  //DOM elements
  const searchInputs = document.getElementsByName('searchInput');

  searchInputs.forEach((searchInput) => {
    searchInput.addEventListener('change', () => {
      searchTransfer(searchInput);
    });
    searchInput.addEventListener('keyup', () => {
      searchTransfer(searchInput);
    });
  });
};

//Function to build the page
const buildPage = (transfersList) => {
  loadTransfers(transfersList);
  selectRow();
  pagination();
};

//Event listeners
reviewRequestButton.addEventListener('click', (event) => {
  event.preventDefault();
  const selectedTransferId = getSelectedTransferId();
  if (selectedTransferId === undefined || selectedTransferId === null) {
    errorAlert(
      'No ha seleccionado una solicitud. Seleccione una para continuar.'
    );
  } else {
    storeTransferId(selectedTransferId);
  }
});

//Async function to fetch units and build the table
const buildPageAsync = async function () {
  const unitsList = await fetchSortedUnits('name');
  buildUnitsSelect(unitsList);

  const transfersList = await fetchSortedTransfers('transfer-id');
  buildPage(transfersList);
  sortTransfers();
  filterTransfers();
  searchTransfers();
};

//Function calls
buildPageAsync();
