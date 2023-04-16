window.onload = function () {
  //form
  const formId = document.querySelector('form').id;

  switch (formId) {
    case 'userInfoForm':
      // User individual information
      const userFirstName = document.getElementById('userFirstName');
      const userLastName = document.getElementById('userLastName');
      const userEmail = document.getElementById('userEmail');
      const userPhoneNumber = document.getElementById('userPhoneNumber');
      const userRole = document.getElementById('userRole');
      const userDateOfBirth = document.getElementById('userDateOfBirth');
      const userUnit = document.getElementById('userUnit');
      const editButton = document.getElementById('editUserInformation');
      const saveButton = document.getElementById('submit');

      //Functions
      const disbleFields = function () {
        userFirstName.classList.add('disabled');
        userFirstName.disabled = true;

        userLastName.classList.add('disabled');
        userLastName.disabled = true;

        userEmail.classList.add('disabled');
        userEmail.disabled = true;

        userPhoneNumber.classList.add('disabled');
        userPhoneNumber.disabled = true;

        userRole.classList.add('disabled');
        userRole.disabled = true;

        userDateOfBirth.classList.add('disabled');
        userDateOfBirth.disabled = true;

        userUnit.classList.add('disabled');
        userUnit.disabled = true;
      };

      const enableFields = function () {
        userFirstName.classList.remove('disabled');
        userFirstName.disabled = false;

        userLastName.classList.remove('disabled');
        userLastName.disabled = false;

        userEmail.classList.remove('disabled');
        userEmail.disabled = false;

        userPhoneNumber.classList.remove('disabled');
        userPhoneNumber.disabled = false;

        userRole.classList.remove('disabled');
        userRole.disabled = false;

        userDateOfBirth.classList.remove('disabled');
        userDateOfBirth.disabled = false;

        userUnit.classList.remove('disabled');
        userUnit.disabled = false;
      };

      disbleFields();

      // User individual information
      editButton.addEventListener('click', function () {
        enableFields();
        editButton.classList.add('disabledButton');
        editButton.disabled = true;

        saveButton.classList.remove('disabledButton');
        saveButton.disabled = false;
      });

      saveButton.addEventListener('click', function () {
        if (Object.values(validationFields.userInfoFormFields).every(Boolean)) {
          disbleFields();
          saveButton.classList.add('disabledButton');
          saveButton.disabled = true;

          editButton.classList.remove('disabledButton');
          editButton.disabled = false;
        }
      });
      break;

    case 'myProfileForm':
      // My profile
      const profileFirstName = document.getElementById('userFirstName');
      const profileLastName = document.getElementById('userLastName');
      const profileEmail = document.getElementById('userEmail');
      const profilePhoneNumber = document.getElementById('userPhoneNumber');
      const profileDateOfBirth = document.getElementById('userDateOfBirth');
      const profileEditButton = document.getElementById('editUserInformation');
      const profileSaveButton = document.getElementById('submit');

      //Functions
      const profileDisbleFields = function () {
        profileFirstName.classList.add('disabled');
        profileFirstName.disabled = true;

        profileLastName.classList.add('disabled');
        profileLastName.disabled = true;

        profileEmail.classList.add('disabled');
        profileEmail.disabled = true;

        profilePhoneNumber.classList.add('disabled');
        profilePhoneNumber.disabled = true;

        profileDateOfBirth.classList.add('disabled');
        profileDateOfBirth.disabled = true;
      };

      const profileEnableFields = function () {
        profileFirstName.classList.remove('disabled');
        profileFirstName.disabled = false;

        profileLastName.classList.remove('disabled');
        profileLastName.disabled = false;

        profileEmail.classList.remove('disabled');
        profileEmail.disabled = false;

        profilePhoneNumber.classList.remove('disabled');
        profilePhoneNumber.disabled = false;

        profileDateOfBirth.classList.remove('disabled');
        profileDateOfBirth.disabled = false;
      };

      profileDisbleFields();

      // User individual information
      profileEditButton.addEventListener('click', function () {
        profileEnableFields();
        profileEditButton.classList.add('disabledButton');
        profileEditButton.disabled = true;

        profileSaveButton.classList.remove('disabledButton');
        profileSaveButton.disabled = false;
      });

      profileSaveButton.addEventListener('click', function () {
        if (
          Object.values(validationFields.myProfileFormFields).every(Boolean)
        ) {
          profileDisbleFields();
          profileSaveButton.classList.add('disabledButton');
          profileSaveButton.disabled = true;

          profileEditButton.classList.remove('disabledButton');
          profileEditButton.disabled = false;
        }
      });
      break;
  }
};
