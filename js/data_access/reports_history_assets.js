//Function to fetch transfers sorted by id
const fetchSortedTransfers = async (sortValue) =>  {
  try {
    const transfers = await fetch(
      `http://127.0.0.1:8000/transfers/sort/by-${sortValue}`
    );
    const transfersJson = await transfers.json();
    return transfersJson;
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
    const unList = await units.json();
    return unList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch filtered users
const fetchFilteredOriginTransfers = async (unitO) => {
  console.log(unitO)
  try {
    const users = await fetch(
      `http://127.0.0.1:8000/transfers/filter/originUnit/${unitO}`
    );
    const originList = await users.json();
    return originList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch filtered users
const fetchFilteredTargetTransfers = async (unitT) => {
  
  try {
    console.log(unitT)
    const users = await fetch(
      `http://127.0.0.1:8000/transfers/filter/targetUnit/${unitT}`
    );
    const targetList = await users.json();
    return targetList;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the transfers in the table
const buildTransfersTable = (transferList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '<tr><th>Fecha de traslado</th><th>ID del activo</th><th>Nombre del activo</th><th>Unidad de origen</th><th>Unidad de destino</th><th>Motivo del traslado</th><th>Solicitado por</th><th>Aprobado por</th></tr>';
  transferList.forEach(function (transfer) {
    const tableRow = document.createElement('tr');

    const transferDate = new Date(transfer.creationDate);
    const day = ('0' + (transferDate.getDate() + 1)).slice(-2);
    const month = ('0' + (transferDate.getMonth() + 1)).slice(-2);
    const transDate = document.createElement('td');
    transDate.innerText = `${day}/${month}/${transferDate.getFullYear()}`;

    const assetId = document.createElement('td');
    assetId.innerText = `${transfer.assetId}`;

    const assetName = document.createElement('td');
    assetName.innerText = `${transfer.assetName}`;

    const unitOrigin = document.createElement('td');
    unitOrigin.innerText = `${transfer.originUnit}`;

    const unitTarget = document.createElement('td');
    unitTarget.innerText = `${transfer.targetUnit}`;

    const transferReason = document.createElement('td');
    transferReason.innerText = `${transfer.transferReason}`;

    const userRequestId = document.createElement('td');
    userRequestId.innerText = `${transfer.requestedBy}`;

    const userApprovalId = document.createElement('td');
    userApprovalId.innerText = `${transfer.approvedBy}`;

    tableRow.appendChild(transDate);
    tableRow.appendChild(assetId);
    tableRow.appendChild(assetName);
    tableRow.appendChild(unitOrigin);
    tableRow.appendChild(unitTarget);
    tableRow.appendChild(transferReason);
    tableRow.appendChild(userRequestId);
    tableRow.appendChild(userApprovalId);

    table.appendChild(tableRow);
  });
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

//Function to clear de sort radio buttons
const clearSortRadioButtons = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');
  sortRadioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });
};

//Function to clear unit select
const clearOriginUnitSelect = () => {
  const originUnit = document.getElementById('originUnit');
  originUnit.options[0].selected = true;
};

//Function to clear role select
const clearTargetUnitSelect = () => {
  const targetUnit = document.getElementById('targetUnit');
  targetUnit.options[0].selected = true;
};

//Function sort the Transfers in the table
const sortTransfers = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', async () => {
      clearOriginUnitSelect();
      clearTargetUnitSelect();
      if (radioButton.checked) {
        const sortValue = radioButton.value;
        const transList = await fetchSortedTransfers(sortValue);
        buildPage(transList);
      }
    });
  });
};

// //Function to filter the Transfers in the table
const filterTransfers = () => {
  const originUnit = document.getElementById('originUnit');

  //Event listeners
  originUnit.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();
    clearTargetUnitSelect();
    const unitOriginList = await fetchFilteredOriginTransfers(originUnit.value);
    console.log(unitOriginList);
    buildPage(unitOriginList);
  });

  const targetUnit = document.getElementById('targetUnit');
  //Event listeners
  targetUnit.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();
    clearOriginUnitSelect();
    const unitTargetList = await fetchFilteredTargetTransfers(targetUnit.value);
    console.log(unitTargetList);
    buildPage(unitTargetList);
  });
};

//Function to build the options in the units select
const buildUnitsOriginSelect = (unitsList) => {
  
  unitsList.forEach(function (element) {
    
    const originUnit = document.getElementById('originUnit');
    const selectOption = document.createElement('option');

    selectOption.id = `${element['id']}`;
    selectOption.value = `${element['name']}`;
    selectOption.innerText = `${element['name']}`;

    originUnit.appendChild(selectOption);
  });
};

//Function to build the options in the units select
const buildUnitsTargetSelect = (unitsList) => {
  
  unitsList.forEach(function (element) {
    const targetUnit = document.getElementById('targetUnit');
    const selectOption = document.createElement('option');

    selectOption.id = `${element['id']}`;
    selectOption.value = `${element['name']}`;
    selectOption.innerText = `${element['name']}`;

    targetUnit.appendChild(selectOption);
  });
};

//Function to build the page
const buildPage = (transferList) => {
  buildTransfersTable(transferList);
  pagination();
};

//Async function to fetch transfers and build the table
const buildPageAsync = async function () {

  const unitsOriginList = await fetchSortedUnits('name');
  buildUnitsOriginSelect(unitsOriginList);

  const unitsTargetList = await fetchSortedUnits('name');
  buildUnitsTargetSelect(unitsTargetList);

  const transferList = await fetchSortedTransfers('assetId');
  buildPage(transferList);

  sortTransfers();
  filterTransfers();
};

//Function calls
buildPageAsync();
