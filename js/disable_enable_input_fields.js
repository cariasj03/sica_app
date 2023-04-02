window.onload = function () {
  //form
  const formId = document.querySelector("form").id;
  // User individual information
  const userFirstName = document.getElementById("userFirstName");
  const userLastName = document.getElementById("userLastName");
  const userEmail = document.getElementById("userEmail");
  const userPhoneNumber = document.getElementById("userPhoneNumber");
  const userRole = document.getElementById("userRole");
  const userDateOfBirth = document.getElementById("userDateOfBirth");
  const userUnit = document.getElementById("userUnit");
  const editButton = document.getElementById("editUserInformation");
  const saveButton = document.getElementById("saveUserInformation");

  switch (formId) {
    case "userInfoForm":
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

      // User individual information
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
        }
      });
      break;
    case "unitInfoForm":
      // Unit individual information
      const unitName = document.getElementById("unitName");
      const unitDescription = document.getElementById("unitDescription");
      const provinceSelect = document.getElementById("provinceSelect");
      const cantonSelect = document.getElementById("cantonSelect");
      const districtSelect = document.getElementById("districtSelect");
      const additionalGeographicInformation = document.getElementById(
        "additionalGeographicInformation"
      );
      const unitSaveButton = document.getElementById("saveUnitInformation");
      const unitEditButton = document.getElementById("editUnitInformation");

      //Functions
      const disbleUnitFields = function () {
        unitName.classList.add("disabled");
        unitName.disabled = true;

        unitDescription.classList.add("disabled");
        unitDescription.disabled = true;

        provinceSelect.classList.add("disabled");
        provinceSelect.disabled = true;

        cantonSelect.classList.add("disabled");
        cantonSelect.disabled = true;

        districtSelect.classList.add("disabled");
        districtSelect.disabled = true;

        additionalGeographicInformation.classList.add("disabled");
        additionalGeographicInformation.disabled = true;
      };

      const enableUnitFields = function () {
        unitName.classList.remove("disabled");
        unitName.disabled = false;

        unitDescription.classList.remove("disabled");
        unitDescription.disabled = false;

        provinceSelect.classList.remove("disabled");
        provinceSelect.disabled = false;

        cantonSelect.classList.remove("disabled");
        cantonSelect.disabled = false;

        districtSelect.classList.remove("disabled");
        districtSelect.disabled = false;

        additionalGeographicInformation.classList.remove("disabled");
        additionalGeographicInformation.disabled = false;
      };

      disbleUnitFields();

      // Unit individual information
      unitEditButton.addEventListener("click", function () {
        console.log("edit");
        enableUnitFields();
        unitEditButton.classList.add("disabledButton");
        unitEditButton.disabled = true;

        unitSaveButton.classList.remove("disabledButton");
        unitSaveButton.disabled = false;
      });

      unitSaveButton.addEventListener("click", function () {
        console.log("save");
        if (Object.values(unitInfoFields).every(Boolean)) {
          disbleUnitFields();
          unitSaveButton.classList.add("disabledButton");
          unitSaveButton.disabled = true;

          unitEditButton.classList.remove("disabledButton");
          unitEditButton.disabled = false;
        }
      });
      break;
  }
};
