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

//Function to fetch filtered users
const fetchFilteredUsers = async (unit) => {
  try {
    const users = await fetch(
      `http://127.0.0.1:8000/users/filter/unit/${unit}`
    );
    const usersList = await users.json();
    return usersList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch searched users
const fetchSearchedUsers = async (searchValue, type) => {
  try {
    const users = await fetch(
      `http://127.0.0.1:8000/users/search/by-${type}/${searchValue}`
    );
    const usersList = await users.json();
    return usersList;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the users in the table
const loadUsers = (usersList) => {
  const table = document.querySelector("table");
  table.innerHTML =
    "<tr><th>Identificación</th><th>Nombre Completo</th><th>Correo electrónico</th><th>Teléfono</th><th>Unidad</th><th>Rol</th><th>Fecha de creación</th><th>Aprobado por</th></tr>";
  usersList.forEach(function (user) {
    const tableRow = document.createElement("tr");

    const userID = document.createElement("td");
    userID.innerText = `${user.id}`;

    const userFullName = document.createElement("td");
    userFullName.innerText = `${user.firstName}` + " " + `${user.lastName}`;

    const userEmail = document.createElement("td");
    userEmail.innerText = `${user.email}`;

    const userPhone = document.createElement("td");
    userPhone.innerText = `${user.phoneNumber}`;

    const userUnit = document.createElement("td");
    userUnit.innerText = `${user.unit}`;

    const userRole = document.createElement("td");
    userRole.innerText = `${user.role}`;

    const userCreationDate = document.createElement("td");
    userCreationDate.innerText = `${user.creationDate}`;

    const userApprovedBy = document.createElement("td");
    userApprovedBy.innerText = `${user.approvedBy}`;

    tableRow.appendChild(userID);
    tableRow.appendChild(userFullName);
    tableRow.appendChild(userEmail);
    tableRow.appendChild(userPhone);
    tableRow.appendChild(userUnit);
    tableRow.appendChild(userRole);
    tableRow.appendChild(userCreationDate);
    tableRow.appendChild(userApprovedBy);

    table.appendChild(tableRow);
  });
};

//Function to select a row in the table
const selectRow = () => {
  const tableRadioButtons = document.getElementsByName("tableRadio");
  let userId;
  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    radioButton.addEventListener("change", () => {
      tableRadioButtons.forEach((radioButton) => {
        radioButton.parentElement.parentElement.classList.remove("selectedRow");
      });
      if (radioButton.checked) {
        tableRowSelected.classList.add("selectedRow");
      }
    });
  });
};

//Function to get the selected user id
const getSelectedUserId = () => {
  const tableRadioButtons = document.getElementsByName("tableRadio");
  let userId;
  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    if (radioButton.checked) {
      userId = tableRowSelected.children[1].innerText;
    }
  });
  return userId;
};

//Function to store the user id in the local storage
const storeUserId = (userId) => {
  localStorage.setItem("userId", userId);
  window.location.href = "../html/user_individual_information.html";
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

//Function to build the options in the units select
const buildUnitsSelect = (unitsList) => {
  unitsList.forEach(function (element) {
    const unitSelect = document.getElementById("unitSelect");
    const selectOption = document.createElement("option");

    selectOption.id = `${element["id"]}`;
    selectOption.value = `${element["name"]}`;
    selectOption.innerText = `${element["name"]}`;

    unitSelect.appendChild(selectOption);
  });
};

//Function to clear de sort radio buttons
const clearSortRadioButtons = () => {
  const sortRadioButtons = document.getElementsByName("sortRadio");
  sortRadioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });
};

//Function to clear unit select
const clearUnitSelect = () => {
  const unitSelect = document.getElementById("unitSelect");
  unitSelect.options[0].selected = true;
};

// Function to clear the status select
const clearStatusSelect = () => {
  const statusSelect = document.getElementById("statusSelect");
  statusSelect.options[0].selected = true;
};

//Function sort the users in the table
const sortUsers = () => {
  const nameRadioButton = document.getElementById("nameUserUser");
  const sortRadioButtons = document.getElementsByName("sortRadio");

  //Set the default sort radio button
  nameRadioButton.checked = true;

  //Event listeners
  sortRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", async () => {
      clearUnitSelect();
      clearStatusSelect();
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
  const unitSelect = document.getElementById("unitSelect");
  //Event listeners
  unitSelect.addEventListener("change", async () => {
    //Reset the sort radio buttons
    clearSortRadioButtons();

    const usersList = await fetchFilteredUsers(unitSelect.value);
    buildPage(usersList);
  });
};

//Function to search
const searchUser = async (searchInput) => {
  let usersList;
  if (searchInput.value === "") {
    usersList = await fetchSortedUsers("name");
  } else {
    //Clear the sort radio buttons
    clearSortRadioButtons();

    //Clear the unit select
    clearUnitSelect();

    const searchValue = searchInput.value;
    let type;

    switch (searchInput.id) {
      case "idSearch":
        type = "id";
        break;
      case "nameSearch":
        type = "name";
        break;
      case "emailSearch":
        type = "email";
        break;
    }
    usersList = await fetchSearchedUsers(searchValue, type);
  }
  buildPage(usersList);
};

//Function to search the users in the table
const searchUsers = () => {
  //DOM elements
  const searchInputs = document.getElementsByName("searchInput");

  searchInputs.forEach((searchInput) => {
    searchInput.addEventListener("change", async () => {
      searchUser(searchInput);
    });
    searchInput.addEventListener("keyup", async () => {
      searchUser(searchInput);
    });
  });
};

//Function to build the page
const buildPage = async (usersList) => {
  loadUsers(usersList);
  selectRow();
  pagination();
};

//Async function to fetch units and build the table
const buildPageAsync = async function () {
  const usersList = await fetchSortedUsers("name");
  buildPage(usersList);
  sortUsers();
  filterUsers();
  searchUsers();
  searchUsers();
};

//Function calls
buildPageAsync();
