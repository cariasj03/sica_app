window.onload = function () {
  // Unit registration information
  const unitName = document.getElementById("unitName");
  const unitDescription = document.getElementById("unitDescription");
  const provinceSelect = document.getElementById("provinceSelect");
  const cantonSelect = document.getElementById("cantonSelect");
  const districtSelect = document.getElementById("districtSelect");
  const additionalGeographicInformation = document.getElementById("additionalGeographicInformation");
  const unitRegisterButton = document.getElementById("registerUnit");

  //Functions
  unitRegisterButton.addEventListener("click", function () {
    if (Object.values(unitRegistrationFields).every(Boolean)) {

      unitRegisterButton.classList.add("disabledButton");
      unitRegisterButton.disabled = true;

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

