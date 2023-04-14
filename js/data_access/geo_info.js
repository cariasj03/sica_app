//Function to load the provinces in the select
const loadProvinces = async () => {
  try {
    const provinces = await fetch('http://127.0.0.1:8000/provinces');
    const provincesList = await provinces.json();
    buildSelectOptions(provincesList, 'province');
  } catch (error) {
    console.log(error);
  }
};

//Function to load the cantons in the select
const loadCantons = async () => {
  try {
    const provinceSelect = document.getElementById('province');
    const cantons = await fetch(
      `http://127.0.0.1:8000/cantons/${
        provinceSelect.options[provinceSelect.selectedIndex].id
      }`
    );
    const cantonsList = await cantons.json();
    buildSelectOptions(cantonsList, 'canton');
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

    selectOption.id = `${element[`${type}Code`]}`;
    selectOption.value = `${element[`${type}Name`]}`;
    selectOption.innerText = `${element[`${type}Name`]}`;

    switch (type) {
      case 'province':
        provinceSelect.appendChild(selectOption);
        break;
      case 'canton':
        cantonSelect.appendChild(selectOption);
        break;
    }
  });
};
