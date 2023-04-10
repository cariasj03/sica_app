window.onload = function () {
  // Unit individual information
  const unitName = document.getElementById("unitName");
  const unitDescription = document.getElementById("unitDescription");
  const provinceSelect = document.getElementById("provinceSelect");
  const cantonSelect = document.getElementById("cantonSelect");
  const districtSelect = document.getElementById("districtSelect");
  const additionalGeographicInformation = document.getElementById("additionalGeographicInformation");
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
    enableUnitFields();
    unitEditButton.classList.add("disabledButton");
    unitEditButton.disabled = true;

    unitSaveButton.classList.remove("disabledButton");
    unitSaveButton.disabled = false;
  });

  unitSaveButton.addEventListener("click", function () {
    if (Object.values(unitInfoFields).every(Boolean)) {
      disbleUnitFields();
      unitSaveButton.classList.add("disabledButton");
      unitSaveButton.disabled = true;

      unitEditButton.classList.remove("disabledButton");
      unitEditButton.disabled = false;

      submitBtn(form);
      successAlert(
        "Información guardada con éxito",
        "La información de la unidad se actualizó exitosamente."
      );
    } else {
      errorAlert("Hay campos obligatorios sin llenar.");
    }
  });
};

