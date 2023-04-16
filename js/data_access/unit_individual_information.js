const selectedUnitId = localStorage.getItem('unitId');

//Function to fetch the unit information
const fetchUnitInformation = async () => {
  try {
    const unit = await fetch(`http://127.0.0.1:8000/units/${selectedUnitId}`);
    const unitJson = await unit.json();
    const rawCreationDate = new Date(unitJson[0].creationDate);
    const day = ('0' + (rawCreationDate.getDate() + 1)).slice(-2);
    const month = ('0' + (rawCreationDate.getMonth() + 1)).slice(-2);
    const creationDate =
      await `${day}/${month}/${rawCreationDate.getFullYear()}`;
    unitJson[0].creationDate = creationDate;

    return unitJson[0];
  } catch (error) {
    console.log(error);
  }
};

//Function to load the unit requested
const loadSelectedUnit = (selectedUnit) => {
  try {
    const idInput = document.getElementById('unitId');
    const creationDateInput = document.getElementById('unitCreationDate');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const provinceInput = document.getElementById('province');
    const cantonInput = document.getElementById('canton');
    const districtInput = document.getElementById('district');
    const addressInput = document.getElementById('address');

    idInput.value = selectedUnit.id;
    nameInput.value = selectedUnit.name;
    creationDateInput.value = selectedUnit.creationDate;
    descriptionInput.value = selectedUnit.description;
    /*  provinceInput.value = selectedUnit.province; */

    addressInput.value = selectedUnit.address;
  } catch (error) {
    console.log(error);
  }
};

//Function to load the unit requested
const loadSelectedUnitProvince = (selectedUnit) => {
  try {
    const provinceInput = document.getElementById('province');
    provinceInput.value = selectedUnit.province;
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  const selectedUnit = await fetchUnitInformation();
  const provinces = await fetchProvinces();
  buildSelectOptions(provinces.data, 'province');
  /*   loadSelectedUnitProvince(selectedUnit);
  const provinceInput = document.getElementById('province');
  console.log(provinceInput.options[provinceInput.selectedValue].id); */
  /* const cantons = await fetchCantons(); */
  /*   await buildSelectOptions(cantons.data, 'canton'); */
  loadSelectedUnit(selectedUnit);
})();
