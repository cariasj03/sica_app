window.onload = async function () {
  const response = await fetch('http://127.0.0.1:8000/units');
  const unitsList = await response.json();

  unitsList.forEach(function (unit) {
    const table = document.querySelector('table');
    const tableRow = document.createElement('tr');
    const tableRowRadio = document.createElement('td');

    tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';

    const unitId = document.createElement('td');
    unitId.innerText = `${unit.id}`;

    const unitName = document.createElement('td');
    unitName.innerText = `${unit.name}`;

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
    tableRow.appendChild(unitName);
    tableRow.appendChild(unitDate);
    tableRow.appendChild(unitProvince);
    tableRow.appendChild(unitCanton);

    table.appendChild(tableRow);
  });
};
