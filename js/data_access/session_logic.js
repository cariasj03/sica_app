//User data stored in local storage
const sessionUserData = JSON.parse(localStorage.getItem('sessionUserData'));
const pageId = document.querySelector('html').id;

//DOM elements
////////////Main tabs////////////
const page = document.querySelector('html');
const requestsTab = document.getElementById('requestsTab');
const settingsTab = document.getElementById('settingsTab');
const logoutTab = document.getElementById('logoutTab');

////////////Side tabs////////////
//Requests tabs
const usersRequestsTab = document.getElementById('usersRequestsTab');

//Reports tabs
const usersReportsTab = document.getElementById('usersReportsTab');
const unitsReportsTab = document.getElementById('unitsReportsTab');
const warehouseReportsTab = document.getElementById('warehouseReportsTab');
const donationsReportsTab = document.getElementById('donationsReportsTab');
const historyReportsTab = document.getElementById('historyReportsTab');

//Settings tabs
const usersListTab = document.getElementById('usersListTab');

////////////Pages////////////
const requestPages = document.querySelectorAll('.requestPage');
const reportPages = document.querySelectorAll('.reportPage');
const settingsPages = document.querySelectorAll('.settingsPage');

//Functions
const changeUserDOBFormat = () => {
  const rawDOB = new Date(sessionUserData.dateOfBirth);
  const day = ('0' + (rawDOB.getDate() + 1)).slice(-2);
  const month = ('0' + (rawDOB.getMonth() + 1)).slice(-2);
  const DOB = `${rawDOB.getFullYear()}-${month}-${day}`;
  sessionUserData.dateOfBirth = DOB;
};

const defaultBehavior = () => {
  if (sessionUserData !== null) {
    changeUserDOBFormat();
    if (sessionUserData.changePassword) {
      changePassword(false, false, false);
      sessionUserData.changePassword = false;
      localStorage.setItem('sessionUserData', JSON.stringify(sessionUserData));
    }

    switch (sessionUserData.role) {
      case 'Encargado de Inventario por Unidad':
        requestsTab.classList.add('hidden');
        settingsTab.classList.add('hidden');

        reportPages.forEach(() => {
          usersReportsTab.classList.add('hidden');
          unitsReportsTab.classList.add('hidden');
          warehouseReportsTab.classList.add('hidden');
          donationsReportsTab.classList.add('hidden');
          historyReportsTab.classList.add('hidden');
        });

        break;
      case 'Proveeduría':
        settingsTab.addEventListener('click', () => {
          window.location.href = '../html/units.html';
        });
        requestsTab.addEventListener('click', () => {
          window.location.href =
            '../html/asset_registration_requests_list.html';
        });

        requestPages.forEach(() => {
          usersRequestsTab.classList.add('hidden');
        });

        reportPages.forEach(() => {
          usersReportsTab.classList.add('hidden');
        });

        settingsPages.forEach(() => {
          usersListTab.classList.add('hidden');
        });

        break;
      case 'Jefatura':
        settingsTab.addEventListener('click', () => {
          window.location.href = '../html/users.html';
        });
        requestsTab.addEventListener('click', () => {
          window.location.href = '../html/user_registration_requests_list.html';
        });
        break;
    }
  } else {
    console.log('No session data found');
    window.location.href = '../html/signin.html';
  }
};

//Event listeners
logoutTab.addEventListener('click', () => {
  localStorage.removeItem('sessionUserData');
  window.location.href = '../html/signin.html';
});

if (pageId === 'myprofile') {
  const logoutSideTab = document.getElementById('logoutSideTab');

  logoutSideTab.addEventListener('click', () => {
    localStorage.removeItem('sessionUserData');
    window.location.href = '../html/signin.html';
  });
}

//Function calls
defaultBehavior();
