const selectedUnitId = localStorage.getItem('unitId');
const idInput = document.getElementById('unitId');
const creationDateInput = document.getElementById('unitCreationDate');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const provinceInput = document.getElementById('province');
const cantonInput = document.getElementById('canton');
const districtInput = document.getElementById('district');
const addressInput = document.getElementById('address');

//Function to load the unit requested
const loadSelectedUnit = async () => {
  try {
    const unit = await fetch(`http://127.0.0.1:8000/units/${selectedUnitId}`);
    const unitJson = await unit.json();
    const rawCreationDate = new Date(unitJson[0].creationDate);
    const day = ('0' + (rawCreationDate.getDate() + 1)).slice(-2);
    const month = ('0' + (rawCreationDate.getMonth() + 1)).slice(-2);
    const creationDate =
      await `${day}/${month}/${rawCreationDate.getFullYear()}`;

    idInput.value = await unitJson[0].id;
    nameInput.value = await unitJson[0].name;
    creationDateInput.value = creationDate;
    descriptionInput.value = await unitJson[0].description;
    provinceInput.value = await unitJson[0].province;
    cantonInput.value = await unitJson[0].canton;
    districtInput.value = await unitJson[0].district;
    addressInput.value = await unitJson[0].address;
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await loadProvinces();
  await loadCantons();
  await loadSelectedUnit();
})();
