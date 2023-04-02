window.onload = function () {
  let assetId = document.getElementById("assetId");
  assetId.defaultValue = "000001";
  assetId.classList.add("disabled");

  let assetUnit = document.getElementById("assetOriginUnit");
  assetUnit.defaultValue = "Heredia";
  assetUnit.classList.add("disabled");

  let assetName = document.getElementById("assetName");
  assetName.defaultValue = "Impresora EPSON F570";
  assetName.classList.add("disabled");

  assetId.disabled = true;

  assetUnit.disabled = true;

  assetName.disabled = true;
};
