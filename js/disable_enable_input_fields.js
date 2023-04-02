window.onload = function () {
  const userFirstName = document.getElementById("userFirstName");
  const userLastName = document.getElementById("userLastName");
  const userEmail = document.getElementById("userEmail");
  const userPhoneNumber = document.getElementById("userPhoneNumber");
  const userRole = document.getElementById("userRole");
  const userDateOfBirth = document.getElementById("userDateOfBirth");
  const userUnit = document.getElementById("userUnit");
  const editButton = document.getElementById("editUserInformation");
  const saveButton = document.getElementById("saveUserInformation");

  //Functions
  const disbleFields = function () {
    userFirstName.classList.add("disabled");
    userFirstName.disabled = true;

    userLastName.classList.add("disabled");
    userLastName.disabled = true;

    userEmail.classList.add("disabled");
    userEmail.disabled = true;

    userPhoneNumber.classList.add("disabled");
    userPhoneNumber.disabled = true;

    userRole.classList.add("disabled");
    userRole.disabled = true;

    userDateOfBirth.classList.add("disabled");
    userDateOfBirth.disabled = true;

    userUnit.classList.add("disabled");
    userUnit.disabled = true;
  };

  const enableFields = function () {
    userFirstName.classList.remove("disabled");
    userFirstName.disabled = false;

    userLastName.classList.remove("disabled");
    userLastName.disabled = false;

    userEmail.classList.remove("disabled");
    userEmail.disabled = false;

    userPhoneNumber.classList.remove("disabled");
    userPhoneNumber.disabled = false;

    userRole.classList.remove("disabled");
    userRole.disabled = false;

    userDateOfBirth.classList.remove("disabled");
    userDateOfBirth.disabled = false;

    userUnit.classList.remove("disabled");
    userUnit.disabled = false;
  };

  disbleFields();

  editButton.addEventListener("click", function () {
    enableFields();
    editButton.classList.add("disabledButton");
    editButton.disabled = true;

    saveButton.classList.remove("disabledButton");
    saveButton.disabled = false;
  });

  saveButton.addEventListener("click", function () {
    if (Object.values(userInfoFields).every(Boolean)) {
      disbleFields();
      saveButton.classList.add("disabledButton");
      saveButton.disabled = true;

      editButton.classList.remove("disabledButton");
      editButton.disabled = false;

      submitBtn(form);
      successAlert(
        "Información guardada con éxito",
        "La información del usuario se actualizó exitosamente."
      );
    } else {
      errorAlert("Hay campos obligatorios sin llenar.");
    }
  });
};
