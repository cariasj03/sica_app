//Function to fetch assets sorted by name
const fetchSortedAssets = async (sortValue) => {
  try {
    const assets = await fetch(
      `http://127.0.0.1:8000/assets/donations/sort/by-${sortValue}`
    );
    const assetsList = await assets.json();
    return assetsList;
  } catch (error) {
    console.log(error);
  }
};

//Function to build the page
const buildPage = (assetsList) => {
  buildWarehouseTable(assetsList);
  pagination();
};

//Function to load the assets in the table
const buildWarehouseTable = (assetsList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '</th><th>ID</th><th>Nombre</th><th>Código de ubicación</th><th>Estado</th></tr>';

  assetsList.forEach(function (asset) {
    const tableRow = document.createElement('tr');

    const assetId = document.createElement('td');
    assetId.innerText = `${asset.id}`;

    const assetName = document.createElement('td');
    assetName.innerText = `${asset.name}`;

    const assetLocationCode = document.createElement('td');
    assetLocationCode.innerText = `${asset.locationCode}`;

    const assetStatus = document.createElement('td');
    assetStatus.innerText = `${asset.status}`;

    tableRow.appendChild(assetId);
    tableRow.appendChild(assetName);
    tableRow.appendChild(assetLocationCode);
    tableRow.appendChild(assetStatus);

    table.appendChild(tableRow);
  });
};

//Function to handle pagination
const pagination = () => {
  //DOM elements
  const paginationNumbers = document.getElementById('paginationNumbers');
  const paginatedTable = document.getElementById('paginatedTable');
  const tableRows = paginatedTable.querySelectorAll('tr');
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');

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
    paginationNumbers.innerHTML = '';
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

//Function sort the Assets in the table
const sortAssets = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');
  const idSortRadio = document.getElementById('idRadio');

  //Setting the id radio button as default
  idSortRadio.checked = true;

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', async () => {
      if (radioButton.checked) {
        const sortValue = radioButton.value;
        const assetsList = await fetchSortedAssets(sortValue);
        buildPage(assetsList);
      }
    });
  });
};

//Async function to fetch units and build the table
const buildPageAsync = async function () {
  const assetsList = await fetchSortedAssets('id');
  buildPage(assetsList);
  sortAssets();
};

//Function calls
buildPageAsync();
