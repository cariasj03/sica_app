fetch("http://127.0.0.1:8000/assets")
  .then((response) => {
    const assetsList = response.json();
    return assetsList;
  })
  .then((assetsList) => {
    loadAssets(assetsList);
    selectRow();
  })
  .catch((error) => {
    console.log(error);
  });

//Function to load the assets in the table
const loadAssets = (assetsList) => {
  assetsList.forEach(function (asset) {
    const table = document.querySelector("table");
    const tableRow = document.createElement("tr");
    const tableRowRadio = document.createElement("td");

    tableRowRadio.innerHTML = '<input type="radio" name="tableRadio" />';

    const assetId = document.createElement("td");
    assetId.innerText = `${asset.id}`;

    const assetName = document.createElement("td");
    assetName.innerText = `${asset.name}`;

    const assetUnit = document.createElement("td");
    assetUnit.innerText = `${asset.unit}`;

    const assetLocationCode = document.createElement("td");
    assetLocationCode.innerText = `${asset.locationCode}`;

    const assetStatus = document.createElement("td");
    assetStatus.innerText = `${asset.status}`;

    tableRow.appendChild(tableRowRadio);
    tableRow.appendChild(assetId);
    tableRow.appendChild(assetName);
    tableRow.appendChild(assetUnit);
    tableRow.appendChild(assetLocationCode);
    tableRow.appendChild(assetStatus);

    table.appendChild(tableRow);
  });
};

//Function to select a row in the table
const selectRow = () => {
  const tableRadioButtons = document.getElementsByName("tableRadio");

  tableRadioButtons.forEach((radioButton) => {
    const tableRowSelected = radioButton.parentElement.parentElement;
    const assetId = tableRowSelected.children[1].innerText;

    radioButton.addEventListener("change", () => {
      console.log("assetId: ", assetId);
      tableRadioButtons.forEach((radioButton) => {
        radioButton.parentElement.parentElement.classList.remove("selectedRow");
      });
      if (radioButton.checked) {
        tableRowSelected.classList.add("selectedRow");
      }
    });
  });
};
