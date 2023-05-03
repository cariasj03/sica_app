//Function to fetch transfers sorted by id
const fetchSortedTransfers = async () => {
  try {
    const transfers = await fetch('http://127.0.0.1:8000/transfers/sort/by-id');
    const transfersJson = await transfers.json();

    transfersJson.forEach((transfer) => {
      const rawCreationDate = new Date(transfer.creationDate);
      const day = ('0' + (rawCreationDate.getDate() + 1)).slice(-2);
      const month = ('0' + (rawCreationDate.getMonth() + 1)).slice(-2);
      const CD = `${rawCreationDate.getFullYear()}-${month}-${day}`;
      transfer.creationDate = CD;
    })

    return transfersJson;
  } catch (error) {
    console.log(error);
  }
};

//Function to build the page
const buildPage = (transfersList) => {
  buildTableRows(transfersList);
  pagination();
};

//Function to load the assets in the table
const buildTableRows = (transfersList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '<tr><th>Solicitado por</th><th>Aprobado por</th><th>Unidad de Origen</th><th>Unidad de Destino</th><th>Fecha de Traslado</th><th>Motivo del Traslado</th></th></tr>';

  transfersList.forEach(function (transfer) {
    const tableRow = document.createElement('tr');

    const userRequestId = document.createElement('td');
    userRequestId.innerText = `${transfer.requestedBy}`;

    const userApprovalId = document.createElement('td');
    userApprovalId.innerText = `${transfer.approvedBy}`;

    const unitOrigin = document.createElement('td');
    unitOrigin.innerText = `${transfer.originUnit}`;

    const unitTarget = document.createElement('td');
    unitTarget.innerText = `${transfer.targetUnit}`;

    const transferDate = document.createElement('td');
    transferDate.innerText = `${transfer.creationDate}`;

    const transferReason = document.createElement('td');
    transferReason.innerText = `${transfer.transferReason}`;

    tableRow.appendChild(userRequestId);
    tableRow.appendChild(userApprovalId);
    tableRow.appendChild(unitOrigin);
    tableRow.appendChild(unitTarget);
    tableRow.appendChild(transferDate);
    tableRow.appendChild(transferReason);


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

//Async function to build page
const buildPageAsync = async function () {
  const transfersList = await fetchSortedTransfers();
  buildPage(transfersList);
};

//Function calls
buildPageAsync();