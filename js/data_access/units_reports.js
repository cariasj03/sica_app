//DOM elements

//Function to fetch units
const fetchUnits = async (sortValue) =>  {
  try {
    const units = await fetch(`http://127.0.0.1:8000/units/sort/by-${sortValue}`);
    const uList = await units.json();
    return uList;
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


//Function to fetch searched units
const fetchSearchedUnits = async (searchValue, type) => {
  try {
    const units = await fetch(
      `http://127.0.0.1:8000/units/search/by-${type}/${searchValue}`
    );
    const uniList = await units.json();
    return uniList;
  } catch (error) {
    console.log(error);
  }
};



//Function to fetch filtered users
const fetchFilteredUnit = async (unit) => {
    try {
      const units = await fetch(
        `http://127.0.0.1:8000/units/filter/name/${unit}`
      );
      const unitList = await units.json();
      return unitList;
    } catch (error) {
      console.log(error);
    }
};

//Function to build the options in the units select
const buildUnitsSelect = (unitsList) => {
    const uniqueUnits = new Set();
    const unitSelect = document.getElementById('unitSelect');

    unitsList.forEach(function (element) {
        if (!uniqueUnits.has(element.name)) {
        uniqueUnits.add(element.name);

        const selectOption = document.createElement('option');
        selectOption.id = `${element.id}`;
        selectOption.value = `${element.name}`;
        selectOption.innerText = `${element.name}`;
        unitSelect.appendChild(selectOption);
        }
    });

};

//Function to clear unit select
const clearUnitSelect = () => {
    const unitSelect = document.getElementById("unitSelect");
    unitSelect.options[0].selected = true;
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
    '<tr><th>ID</th><th>Nombre</th><th>Fecha de creación</th><th>Aprobado por</th></tr>';
  console.log(unitsList);
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

    const unitApprovedBy = document.createElement("td");
    unitApprovedBy.innerText = `${unit.approvedBy}`;


    tableRow.appendChild(unitId);
    tableRow.appendChild(name);
    tableRow.appendChild(unitDate);
    tableRow.appendChild(unitApprovedBy);

    table.appendChild(tableRow);
  });
};





//////// Pagination ////////
const pagination = () => {
    //DOM elements
    const paginationNumbers = document.getElementById("paginationNumbers");
    const paginatedTable = document.getElementById("paginatedTable");
    const tableRows = paginatedTable.querySelectorAll("tr");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
  
    //Reset pagination numbers
    paginationNumbers.innerHTML = "";
  
    //Pagination variables
    const paginationLimit = 11;
    const pageCount = Math.ceil(tableRows.length / paginationLimit);
    let currentPage;
  
    const appendPageNumber = (index) => {
        const pageNumber = document.createElement("a");
        pageNumber.innerHTML = index;
        pageNumber.classList.add("paginationNumber");
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);
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
        row.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
          row.classList.remove("hidden");
        }
  
        if (index === 0) {
          row.classList.remove("hidden");
        }
      });
    };
  
    //Function to handle active page number
    const handleActivePageNumber = () => {
      document.querySelectorAll(".paginationNumber").forEach((number) => {
        number.classList.remove("active");
  
        const pageIndex = Number(number.getAttribute("page-index"));
        if (pageIndex === currentPage) {
          number.classList.add("activePage");
        } else {
          number.classList.remove("activePage");
        }
      });
    };
  
    //Function to disable prev and next buttons
    const disableButton = (button) => {
      button.classList.add("disabledPageButton");
      button.setAttribute("disabled", true);
    };
  
    //Function to enable prev and next buttons
    const enableButton = (button) => {
      button.classList.remove("disabledPageButton");
      button.removeAttribute("disabled");
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
    const paginationNumbersList = document.querySelectorAll(".paginationNumber");
    paginationNumbersList.forEach((number) => {
      const pageIndex = Number(number.getAttribute("page-index"));
  
      if (pageIndex) {
        number.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  
    prevButton.addEventListener("click", () => {
      setCurrentPage(currentPage - 1);
    });
  
    nextButton.addEventListener("click", () => {
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

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', async () => {
      clearUnitSelect();
      if (radioButton.checked) {
        const sortValue = radioButton.value;
        const unitssList = await fetchSortedUnits(sortValue);
        buildPage(unitssList);
      }
    });
  });
};


//Function to search
const searchUnit = async (searchInput) => {
  let unitsList;
  if (searchInput.value === '') {
    unitsList = await fetchUnits();
  } else {
    //Clear the sort radio buttons
    clearSortRadioButtons();

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
    unitsList = await fetchSearchedUnits(searchValue, type);
  }
  buildPage(unitsList);
};

//Function to search the units in the table
const searchUnits = () => {
  //DOM elements
  clearSortRadioButtons();
  const idSearchInput = document.getElementById('idSearch');
  const nameSearchInput = document.getElementById('nameSearch');

  //Event listeners
  idSearchInput.addEventListener('change', async () => {
    searchUnit(idSearchInput);
  });
  idSearchInput.addEventListener('keyup', async () => {
    searchUnit(idSearchInput);
  });

  nameSearchInput.addEventListener('change', async () => {
    searchUnit(nameSearchInput);
  });
  nameSearchInput.addEventListener('keyup', async () => {
    searchUnit(nameSearchInput);
  });
};

const filterUnits = () => {
    const unitSelected = document.getElementById("unitSelect");
    //Event listeners
    unitSelected.addEventListener("change", async () => {
      //Reset the sort radio buttons
      clearSortRadioButtons();
      console.log("unit selected is: "+unitSelected.value)
      const usList = await fetchFilteredUnit(unitSelected.value);
      buildPage(usList);
    });
  
};



//Async function to fetch units and build the table
const buildPageAsync = async function () {

    const unitsList = await fetchSortedUnits('name');
    buildUnitsSelect(unitsList);
    
    const unitsL = await fetchUnits('name');
    buildPage(unitsL);
    sortUnits();
    filterUnits();
    searchUnits();
};

//Function calls
buildPageAsync();
