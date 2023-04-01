window.onload = function () {
  let assetId = document.getElementById("assetId");
  assetId.defaultValue = "000001";

  let assetUnit = document.getElementById("assetOriginUnit");
  assetUnit.defaultValue = "Heredia";

  let assetName = document.getElementById("assetName");
  assetName.defaultValue = "Impresora EPSON F570";

  assetId.disabled = true;

  assetUnit.disabled = true;

  assetName.disabled = true;
};
