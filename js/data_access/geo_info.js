//DOM elements
const provinceSelect = document.getElementById('province');
const cantonSelect = document.getElementById('canton');
const districtSelect = document.getElementById('district');
const isAForm = document.querySelectorAll('form');

//Function to fetch the provinces
const fetchProvinces = async () => {
  try {
    const provinces = await fetch(
      'https://api.pruebayerror.com/locaciones/v1/provincias'
    );
    const provincesList = await provinces.json();
    return provincesList;
  } catch (error) {
    console.log(error);
  }
};

//Async function to load the provinces
(async () => {
  //Load province information
  const provinces = await fetchProvinces();
  buildSelectOptions(provinces.data, 'province');
})();

//Function to fetch the cantons
const fetchCantons = async (province) => {
  try {
    const cantons = await fetch(
      `https://api.pruebayerror.com/locaciones/v1/provincia/${province}/cantones`
    );
    const cantonsList = await cantons.json();
    return cantonsList;
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch the districts
const fetchDistricts = async (province, canton) => {
  try {
    const districts = await fetch(
      `https://api.pruebayerror.com/locaciones/v1/provincia/${province}/canton/${canton}/distritos`
    );
    const districtsList = await districts.json();
    return districtsList;
  } catch (error) {
    console.log(error);
  }
};

//Function to build the options in the select
const buildSelectOptions = (list, type) => {
  list.forEach(function (element) {
    const provinceSelect = document.getElementById('province');
    const cantonSelect = document.getElementById('canton');
    const districtSelect = document.getElementById('district');
    const selectOption = document.createElement('option');

    selectOption.id = `${element['numero']}`;
    selectOption.value = `${element['nombre']}`;
    selectOption.innerText = `${element['nombre']}`;

    switch (type) {
      case 'province':
        provinceSelect.appendChild(selectOption);
        break;
      case 'canton':
        cantonSelect.appendChild(selectOption);
        break;
      case 'district':
        districtSelect.appendChild(selectOption);
        break;
    }
  });
};

//Function to clear canton select
const clearProvinceSelect = () => {
  provinceSelect.options[0].selected = true;
};

//Function to clear canton select
const clearCantonSelect = () => {
  cantonSelect.innerHTML = '<option value="" disabled hidden>Cantón</option>';
  cantonSelect.options[0].selected = true;
};

//Function to clear district select
const clearDistrictSelect = () => {
  districtSelect.innerHTML =
    '<option value="" disabled hidden>Distrito</option>';
  districtSelect.options[0].selected = true;
};

//Event listeners
//Changes on province select
provinceSelect.addEventListener('change', async () => {
  //Clear canton select
  clearCantonSelect();
  //Clear district select
  if (isAForm.length > 0) {
    clearDistrictSelect();
  }

  //Selected province
  const province = provinceSelect.options[provinceSelect.selectedIndex].id;

  //Fetch and load cantons
  const cantons = await fetchCantons(province);
  buildSelectOptions(cantons.data, 'canton');
});

//Changes on canton select
cantonSelect.addEventListener('change', async () => {
  //Clear district select
  if (isAForm.length > 0) {
    clearDistrictSelect();

    //Selected province
    const province = provinceSelect.options[provinceSelect.selectedIndex].id;

    //Selected canton
    const canton = cantonSelect.options[cantonSelect.selectedIndex].id;

    //Fetch and load districts
    const districts = await fetchDistricts(province, canton);
    buildSelectOptions(districts.data, 'district');
  }
});
