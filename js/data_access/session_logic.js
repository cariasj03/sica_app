//DOM elements
const page = document.querySelector('html');
const requestsTab = document.getElementById('requestsTab');
const settingsTab = document.getElementById('settingsTab');
const logoutTab = document.getElementById('logoutTab');

//User data stored in local storage
const sessionUserData = JSON.parse(localStorage.getItem('sessionUserData'));

//Functions
const changeUserDOBFormat = () => {
  const rawDOB = new Date(sessionUserData.dateOfBirth);
  const day = ('0' + (rawDOB.getDate() + 1)).slice(-2);
  const month = ('0' + (rawDOB.getMonth() + 1)).slice(-2);
  const DOB = `${rawDOB.getFullYear()}-${month}-${day}`;
  sessionUserData.dateOfBirth = DOB;
};

const defaultBehavior = () => {
  switch (sessionUserData.role) {
    case 'Encargado de Inventario por Unidad':
      requestsTab.classList.add('hidden');
      settingsTab.classList.add('hidden');
      break;
    case 'Proveeduría':
      settingsTab.addEventListener('click', () => {
        window.location.href = '../html/units.html';
      });
      requestsTab.addEventListener('click', () => {
        window.location.href = '../html/asset_registration_requests_list.html';
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
};

//Checks if user is logged in
if (sessionUserData !== null) {
  switch (page.id) {
    case 'index':
      if (sessionUserData.changePassword) {
        changePassword(false, false, false);
      }
      break;

    case 'user_registration_requests_list':
    case 'user_registration_request_review':
    case 'asset_transfer_requests_list':
    case 'asset_transfer_request_review':
    case 'asset_registration_requests_list':
    case 'asset_registration_request_review':
      //DOM elements
      const usersRequestsTab = document.getElementById('usersRequestsTab');

      //Function calls
      defaultBehavior();

      //Hiding tabs
      switch (sessionUserData.role) {
        case 'Proveeduría':
          usersRequestsTab.classList.add('hidden');
          break;
      }
      break;
    case 'reports':
    case 'reports_warehouse':
    case 'reports_users':
    case 'reports_units':
    case 'reports_history_assets':
    case 'reports_donations':
    case 'reports_assets':
      //DOM elements
      const usersReportsTab = document.getElementById('usersReportsTab');
      const unitsReportsTab = document.getElementById('unitsReportsTab');
      const warehouseReportsTab = document.getElementById(
        'warehouseReportsTab'
      );
      const donationsReportsTab = document.getElementById(
        'donationsReportsTab'
      );
      const historyReportsTab = document.getElementById('historyReportsTab');

      //Function calls
      defaultBehavior();

      //Hiding tabs
      switch (sessionUserData.role) {
        case 'Encargado de Inventario por Unidad':
          usersReportsTab.classList.add('hidden');
          unitsReportsTab.classList.add('hidden');
          warehouseReportsTab.classList.add('hidden');
          donationsReportsTab.classList.add('hidden');
          historyReportsTab.classList.add('hidden');
          break;
        case 'Proveeduría':
          usersReportsTab.classList.add('hidden');
          break;
      }
      break;
    case 'myprofile':
      //DOM elements
      const logoutSideTab = document.getElementById('logoutSideTab');

      //Function calls
      defaultBehavior();

      //Event listeners
      logoutSideTab.addEventListener('click', () => {
        localStorage.removeItem('sessionUserData');
        window.location.href = '../html/signin.html';
      });
      break;
    case 'units':
    case 'unit_registration':
    case 'unit_individual_information':
      switch (sessionUserData.role) {
        case 'Proveeduría':
          const usersTListTab = document.getElementById('usersListTab');

          usersTListTab.classList.add('hidden');
          break;
      }
      break;
    default:
      defaultBehavior();
      break;
  }

  //Event listeners
  logoutTab.addEventListener('click', () => {
    localStorage.removeItem('sessionUserData');
    window.location.href = '../html/signin.html';
  });
} else {
  window.location.href = '../html/signin.html';
}

//Function calls
changeUserDOBFormat();
