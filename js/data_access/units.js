//DOM elements
const viewEditUnit = document.getElementById('viewEditUnit');

//Function to fetch units
const fetchUnits = async () => {
  try {
    const units = await fetch('http://127.0.0.1:8000/units');
    const unitsList = await units.json();
    return unitsList;
  } catch (error) {
    console.log(error);
  }
};

//Function to build the table rows
const buildTableRows = (unitsList) => {
  unitsList.forEach(function (unit) {
    const table = document.querySelector('table');
    const tableRow = document.createElement('tr');
    const tableRowRadio = document.createElement('td');

    tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';

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

    const unitCanton = document.createElement('td');
    unitCanton.innerText = `${unit.canton}`;

    tableRow.appendChild(tableRowRadio);
    tableRow.appendChild(unitId);
    tableRow.appendChild(name);
    tableRow.appendChild(unitDate);
    tableRow.appendChild(unitProvince);
    tableRow.appendChild(unitCanton);

    table.appendChild(tableRow);
  });
};

//Function to select a row in the table
const selectRow = () => {
  const tableRadioButtons = document.getElementsByName('tableRadio');
  let unitId;
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

//Function to get the selected unit id
const getSelectedUnitId = () => {
  const tableRadioButtons = document.getElementsByName('tableRadio');
  let unitId;
  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    if (radioButton.checked) {
      unitId = tableRowSelected.children[1].innerText;
    }
  });
  return unitId;
};

//Function to store the unit id in the local storage
const storeUnitId = (unitId) => {
  localStorage.setItem('unitId', unitId);
  window.location.href = '../html/unit_individual_information.html';
};

//Event listeners
viewEditUnit.addEventListener('click', () => {
  const unitId = getSelectedUnitId();
  if (unitId === undefined || unitId === null) {
    errorAlert('No ha seleccionado una unidad. Seleccione una para continuar');
  } else {
    storeUnitId(unitId);
  }
});

//Async function to fetch units and build the table
(async () => {
  const unitsList = await fetchUnits();
  buildTableRows(unitsList);
  selectRow();
  pagination();
})();

//////// Pagination ////////
const pagination = () => {
  //DOM elements
  const paginationNumbers = document.getElementById('paginationNumbers');
  const paginatedTable = document.getElementById('paginatedTable');
  const tableRows = paginatedTable.querySelectorAll('tr');
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');

  //Pagination variables
  console.log(tableRows);
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
