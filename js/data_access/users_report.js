//DOM elements

//Function to fetch users sorted by name
const fetchSortedUsers = async (sortValue) => {
  try {
    const users = await fetch(
      `http://127.0.0.1:8000/users/sort/by-${sortValue}`
    );
    const usersList = await users.json();
    return usersList;
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

//Function to fetch users sorted by roles
const fetchSortedRoles = async (sortValue) => {
  try {
    const roles = await fetch(
      `http://127.0.0.1:8000/users/sort/by-${sortValue}`
    );
    const rolesList = await roles.json();
    return rolesList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch filtered users
const fetchFilteredUnit = async (unit) => {
  try {
    console.log(unit);
    const units = await fetch(
      `http://127.0.0.1:8000/users/filter/unit/${unit}`
    );
    const unitList = await units.json();
    return unitList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch filtered users
const fetchFilteredRole = async (role) => {
  try {
    const users = await fetch(
      `http://127.0.0.1:8000/users/filter/role/${role}`
    );
    const usersList = await users.json();
    return usersList;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the users in the table
const loadUsers = (usersList) => {
  const table = document.querySelector('table');
  table.innerHTML =
    '<tr><th>ID</th><th>Nombre completo</th><th>Correo electrónico</th><th>Teléfono</th><th>Unidad</th><th>Rol</th><th>Fecha de creación</th><th>Aprobado por</th></tr>';
  usersList.forEach(function (user) {
    const tableRow = document.createElement('tr');

    const userID = document.createElement('td');
    userID.innerText = `${user.id}`;

    const userFullName = document.createElement('td');
    userFullName.innerText = `${user.firstName}` + ' ' + `${user.lastName}`;

    const userEmail = document.createElement('td');
    userEmail.innerText = `${user.email}`;

    const userPhone = document.createElement('td');
    userPhone.innerText = `${user.phoneNumber}`;

    const userUnit = document.createElement('td');
    userUnit.innerText = `${user.unit}`;

    const userRole = document.createElement('td');
    userRole.innerText = `${user.role}`;

    const userCreationDate = new Date(user.creationDate);
    const day = ('0' + (userCreationDate.getDate() + 1)).slice(-2);
    const month = ('0' + (userCreationDate.getMonth() + 1)).slice(-2);
    const userDate = document.createElement('td');
    userDate.innerText = `${day}/${month}/${userCreationDate.getFullYear()}`;

    const userApprovedBy = document.createElement('td');
    userApprovedBy.innerText = `${user.approvedBy}`;

    tableRow.appendChild(userID);
    tableRow.appendChild(userFullName);
    tableRow.appendChild(userEmail);
    tableRow.appendChild(userPhone);
    tableRow.appendChild(userUnit);
    tableRow.appendChild(userRole);
    tableRow.appendChild(userDate);
    tableRow.appendChild(userApprovedBy);

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
  const paginationLimit = 6;
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

//Function to build the options in the roles select
const buildRoleSelect = (rolesList) => {
  const uniqueRoles = new Set();
  const roleSelect = document.getElementById('roleSelect');

  rolesList.forEach(function (element) {
    if (!uniqueRoles.has(element.role)) {
      uniqueRoles.add(element.role);

      const selectOption = document.createElement('option');
      selectOption.id = `${element.id}`;
      selectOption.value = `${element.role}`;
      selectOption.innerText = `${element.role}`;
      roleSelect.appendChild(selectOption);
    }
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

//Function to clear role select
const clearRoleSelect = () => {
  const roleSelect = document.getElementById('roleSelect');
  roleSelect.options[0].selected = true;
};

//Function sort the users in the table
const sortUsers = () => {
  const sortRadioButtons = document.getElementsByName('sortRadio');
  const idSortRadio = document.getElementById('idRadio');

  //Set the id radio button as default
  idSortRadio.checked = true;

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', async () => {
      clearUnitSelect();
      clearRoleSelect();
      if (radioButton.checked) {
        const sortValue = radioButton.value;
        const usersList = await fetchSortedUsers(sortValue);
        buildPage(usersList);
      }
    });
  });
};

//Function to filter the users in the table
const filterUsers = () => {
  const unitSelect = document.getElementById('unitSelect');

  //Event listeners
  unitSelect.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();
    clearRoleSelect();

    const userList = await fetchFilteredUnit(unitSelect.value);
    buildPage(userList);
  });

  const roleSelect = document.getElementById('roleSelect');
  //Event listeners
  roleSelect.addEventListener('change', async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();
    clearUnitSelect();

    const usersRoleList = await fetchFilteredRole(roleSelect.value);
    buildPage(usersRoleList);
  });
};

//Function to build the page
const buildPage = async (usersList) => {
  loadUsers(usersList);
  pagination();
};

//Async function to fetch units and build the table
const buildPageAsync = async function () {
  const unitsList = await fetchSortedUnits('name');
  buildUnitsSelect(unitsList);

  const rolesList = await fetchSortedRoles('name');
  buildRoleSelect(rolesList);

  const usersList = await fetchSortedUsers('id');
  buildPage(usersList);

  sortUsers();
  filterUsers();
};

//Function calls
buildPageAsync();
