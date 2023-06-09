//Function to fetch sorted units
const fetchSortedUnits = async (sortValue) => {
  try {
    const units = await fetch(
      `http://127.0.0.1:8000/units/sort/by-${sortValue}?id=${sessionUserData.id}`
    );
    const unList = await units.json();
    return unList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch sorted assets
const fetchSortedAssets = async (sortValue) => {
  try {
    const assets = await fetch(
      `http://127.0.0.1:8000/assets/sort/by-${sortValue}?id=${sessionUserData.id}`
    );
    const assetsList = await assets.json();
    return assetsList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch filtered users
const fetchFilteredAsset = async (unit) => {
  try {
    const asset = await fetch(
      `http://127.0.0.1:8000/assets/filter/unit/${unit}?id=${sessionUserData.id}`
    );
    const assetList = await asset.json();
    return assetList;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the assets in the table
const buildAssestTable = (assetsList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '<tr><th>Unidad</th><th>ID</th><th>Nombre</th><th>Estado</th></tr>';

  assetsList.forEach(function (asset) {
    const tableRow = document.createElement('tr');

    const assetUnit = document.createElement('td');
    assetUnit.innerText = `${asset.unit}`;

    const assetId = document.createElement('td');
    assetId.innerText = `${asset.id}`;

    const assetName = document.createElement('td');
    assetName.innerText = `${asset.name}`;

    const assetStatus = document.createElement('td');
    assetStatus.innerText = `${asset.status}`;

    tableRow.appendChild(assetUnit);
    tableRow.appendChild(assetId);
    tableRow.appendChild(assetName);
    tableRow.appendChild(assetStatus);

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

//Function sort the assets in the table
const sortAssets = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');
  const unitSortRadio = document.getElementById('unitRadio');

  //Setting the unit radio button as default
  unitSortRadio.checked = true;

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

// //Function to filter the assets in the table
const filterAssets = () => {
  const unitSelect = document.getElementById('unitSelect');

  //Event listeners
  unitSelect.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();

    const list = await fetchFilteredAsset(unitSelect.value);
    buildPage(list);
  });
};

//Function to clear status select
const clearUnitSelect = () => {
  const unitSelect = document.getElementById('unitSelect');
  unitSelect.options[0].selected = true;
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

//Function to build the page
const buildPage = (assetsList) => {
  buildAssestTable(assetsList);
  pagination();
};

//Async function to fetch assets and build the table
const buildPageAsync = async function () {
  const unitsList = await fetchSortedUnits('name');
  buildUnitsSelect(unitsList);

  const asstsList = await fetchSortedAssets('unit');
  buildPage(asstsList);

  sortAssets();
  filterAssets();
};

//Function calls
buildPageAsync();
