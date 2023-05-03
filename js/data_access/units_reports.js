//DOM elements

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
const fetchFilteredUnit = async (province) => {
  try {
    const units = await fetch(
      `http://127.0.0.1:8000/units/filter/province/${province}`
    );
    const unitList = await units.json();
    return unitList;
  } catch (error) {
    console.log(error);
  }
};

const fetchProvinces = async () => {
  try {
    const provinces = await fetch(
      'https://api.pruebayerror.com/locaciones/v1/provincias'
    );
    const provincesList = await provinces.json();
    return provincesList;
  } catch (error) {
    console.log(error);
  }
};

//Function to build the options in the select
const buildProvinceSelect = async () => {
  const provinces = await fetchProvinces();

  provinces.data.forEach((province) => {
    const provinceSelect = document.getElementById('provinceSelect');
    const selectOption = document.createElement('option');

    selectOption.id = `${province['numero']}`;
    selectOption.value = `${province['nombre']}`;
    selectOption.innerText = `${province['nombre']}`;

    provinceSelect.appendChild(selectOption);
  });
};

//Function to clear unit select
const clearProvinceSelect = () => {
  const provinceSelect = document.getElementById('provinceSelect');
  provinceSelect.options[0].selected = true;
};

//Function to build the page
const buildPage = (unitsList) => {
  loadUnits(unitsList);
  pagination();
};

//Function to build the table rows
const loadUnits = (unitsList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '<tr><th>ID</th><th>Nombre</th><th>Fecha de creación</th><th>Provincia</th></tr>';
  unitsList.forEach(function (unit) {
    const tableRow = document.createElement('tr');

    const unitId = document.createElement('td');
    unitId.innerText = `${unit.id}`;

    const name = document.createElement('td');
    name.innerText = `${unit.name}`;

    const unitCreationDate = new Date(unit.creationDate);
    const day = ('0' + (unitCreationDate.getDate() + 1)).slice(-2);
    const month = ('0' + (unitCreationDate.getMonth() + 1)).slice(-2);
    const unitDate = document.createElement('td');
    unitDate.innerText = `${day}/${month}/${unitCreationDate.getFullYear()}`;

    const unitProvince = document.createElement('td');
    unitProvince.innerText = `${unit.province}`;

    tableRow.appendChild(unitId);
    tableRow.appendChild(name);
    tableRow.appendChild(unitDate);
    tableRow.appendChild(unitProvince);

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

//Function sort the units in the table
const sortUnits = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');
  const idSortRadio = document.getElementById('idRadio');

  //Setting the id radio button as default
  idSortRadio.checked = true;

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', async () => {
      clearProvinceSelect();
      if (radioButton.checked) {
        const sortValue = radioButton.value;
        const unitssList = await fetchSortedUnits(sortValue);
        buildPage(unitssList);
      }
    });
  });
};

const filterUnits = () => {
  const provinceSelect = document.getElementById('provinceSelect');
  //Event listeners
  provinceSelect.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();
    const usList = await fetchFilteredUnit(provinceSelect.value);
    buildPage(usList);
  });
};

//Async function to fetch units and build the table
const buildPageAsync = async function () {
  await buildProvinceSelect();

  const unitsL = await fetchSortedUnits('id');
  buildPage(unitsL);
  sortUnits();
  filterUnits();
};

//Function calls
buildPageAsync();
