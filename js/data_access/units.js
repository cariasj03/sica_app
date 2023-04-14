//DOM elements
const viewEditUnit = document.getElementById('viewEditUnit');

//Function to load the units in the table
const loadUnits = async () => {
  try {
    const units = await fetch('http://127.0.0.1:8000/units');
    const unitsList = await units.json();
    buildTableRows(unitsList);
    await selectRow();
  } catch (error) {
    console.log(error);
  }
};

//Function to build the table rows
const buildTableRows = (unitsList) => {
  unitsList.forEach(function (unit) {
    const table = document.querySelector('table');
    const tableRow = document.createElement('tr');
    const tableRowRadio = document.createElement('td');

    tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';

    const unitId = document.createElement('td');
    unitId.innerText = `${unit.id}`;

    const name = document.createElement('td');
    name.innerText = `${unit.name}`;

    const unitCreationDate = new Date(unit.creationDate);
    const day = ('0' + (unitCreationDate.getDate() + 1)).slice(-2);
    const month = ('0' + (unitCreationDate.getMonth() + 1)).slice(-2);
    const unitDate = document.createElement('td');
    unitDate.innerText = `${day}/${month}/${unitCreationDate.getFullYear()}`;

    const unitProvince = document.createElement('td');
    unitProvince.innerText = `${unit.province}`;

    const unitCanton = document.createElement('td');
    unitCanton.innerText = `${unit.canton}`;

    tableRow.appendChild(tableRowRadio);
    tableRow.appendChild(unitId);
    tableRow.appendChild(name);
    tableRow.appendChild(unitDate);
    tableRow.appendChild(unitProvince);
    tableRow.appendChild(unitCanton);

    table.appendChild(tableRow);
  });
};

//Function to select a row in the table
const selectRow = () => {
  const tableRadioButtons = document.getElementsByName('tableRadio');
  let unitId;
  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    radioButton.addEventListener('change', () => {
      tableRadioButtons.forEach((radioButton) => {
        radioButton.parentElement.parentElement.classList.remove('selectedRow');
      });
      if (radioButton.checked) {
        tableRowSelected.classList.add('selectedRow');
      }
    });
  });
};

//Function to get the selected unit id
const getSelectedUnitId = () => {
  const tableRadioButtons = document.getElementsByName('tableRadio');
  let unitId;
  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    if (radioButton.checked) {
      unitId = tableRowSelected.children[1].innerText;
    }
  });
  return unitId;
};

//Function to store the unit id in the local storage
const storeUnitId = (unitId) => {
  localStorage.setItem('unitId', unitId);
  window.location.href = '../html/unit_individual_information.html';
};

//Event listeners
viewEditUnit.addEventListener('click', () => {
  const unitId = getSelectedUnitId();
  if (unitId === undefined || unitId === null) {
    errorAlert('No ha seleccionado una unidad. Seleccione una para continuar');
  } else {
    storeUnitId(unitId);
  }
});

//Function call to load the units in the table
loadUnits();
