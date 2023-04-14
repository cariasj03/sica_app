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
    case 'unitInfoForm':
      // Unit individual information
      const name = document.getElementById('name');
      const description = document.getElementById('description');
      const province = document.getElementById('province');
      const canton = document.getElementById('canton');
      const district = document.getElementById('district');
      const address = document.getElementById('address');
      const unitSaveButton = document.getElementById('submit');
      const unitEditButton = document.getElementById('editUnitInformation');

      //Functions
      const disbleUnitFields = function () {
        name.classList.add('disabled');
        name.disabled = true;

        description.classList.add('disabled');
        description.disabled = true;

        province.classList.add('disabled');
        province.disabled = true;

        canton.classList.add('disabled');
        canton.disabled = true;

        district.classList.add('disabled');
        district.disabled = true;

        address.classList.add('disabled');
        address.disabled = true;
      };

      const enableUnitFields = function () {
        name.classList.remove('disabled');
        name.disabled = false;

        description.classList.remove('disabled');
        description.disabled = false;

        province.classList.remove('disabled');
        province.disabled = false;

        canton.classList.remove('disabled');
        canton.disabled = false;

        district.classList.remove('disabled');
        district.disabled = false;

        address.classList.remove('disabled');
        address.disabled = false;
      };

      disbleUnitFields();

      // Unit individual information
      unitEditButton.addEventListener('click', function () {
        enableUnitFields();
        unitEditButton.classList.add('disabledButton');
        unitEditButton.disabled = true;

        unitSaveButton.classList.remove('disabledButton');
        unitSaveButton.disabled = false;
      });

      unitSaveButton.addEventListener('click', function () {
        if (Object.values(validationFields.unitInfoFormFields).every(Boolean)) {
          disbleUnitFields();
          unitSaveButton.classList.add('disabledButton');
          unitSaveButton.disabled = true;

          unitEditButton.classList.remove('disabledButton');
          unitEditButton.disabled = false;

          submitBtn(form);
          successAlert(
            'Información guardada con éxito',
            'La información de la unidad se actualizó exitosamente.'
          );
        } else {
          errorAlert('Hay campos obligatorios sin llenar.');
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
