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
