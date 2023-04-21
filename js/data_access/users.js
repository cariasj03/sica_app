// fetch("http://127.0.0.1:8000/users")
//   .then((response) => {
//     const usersList = response.json();
//     return usersList;
//   })
//   .then((usersList) => {
//     loadAssets(usersList);
//     selectRow();
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//DOM elements
const viewEditUser = document.getElementById('viewEditUser');

//Function to fetch users
const fetchUsers = async () => {
  try {
    const users = await fetch('http://localhost:8000/users');
    const usersList = await users.json();
    return usersList;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the users in the table
const loadUsers = (usersList) => {
    usersList.forEach(function (user) {
    const table = document.querySelector("table");
    const tableRow = document.createElement("tr");
    const tableRowRadio = document.createElement("td");

    tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';


    const userID = document.createElement("td");
    userID.innerText = `${user.id}`;

    const userFullName = document.createElement("td");
    userFullName.innerText = `${user.firstName}`+" "+`${user.lastName}`;

    const userEmail = document.createElement("td");
    userEmail.innerText = `${user.email}`;

    const userUnit = document.createElement("td");
    userUnit.innerText = `${user.unit}`;

    tableRow.appendChild(tableRowRadio);
    tableRow.appendChild(userID);
    tableRow.appendChild(userFullName);
    tableRow.appendChild(userEmail);
    tableRow.appendChild(userUnit);

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
  
  //Function to get the selected user id
  const getSelectedUserId = () => {
    const tableRadioButtons = document.getElementsByName('tableRadio');
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
    localStorage.setItem('userId', userId);
    window.location.href = '../html/user_individual_information.html';
  };
  
  //Event listeners
  viewEditUser.addEventListener('click', () => {
    const userId = getSelectedUserId();
    if (userId === undefined || userId === null) {
      errorAlert('No ha seleccionado un usuario. Seleccione una para continuar');
    } else {
      storeUserId(userId);
    }
  });
  
  //Async function to fetch users and build the table
  (async () => {
    const usersList = await fetchUsers();
    loadUsers(usersList);
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
    const paginationLimit = 5;
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
