window.onload = function(){

    let assetId = document.getElementById("assetId");
    assetId.defaultValue = "000001";
    assetId.disabled = true;

    let assetName = document.getElementById("assetName");
    assetName.defaultValue = "Impresora EPSON F570";
    assetName.disabled = true;

    let assetDescription = document.getElementById("assetDescription");
    assetDescription.defaultValue = "Impresora de gran formato para sublimación de 24 pulgadas. Para impresiones de sublimación en papel de transferencia especializado para medios rígidos y blandos. Posee una bandeja de alimentación automática de 50 hojas y un cortador incorporado.";
    assetDescription.disabled = true;

    let assetUnit = document.getElementById("assetUnit");
    assetUnit.defaultValue = "Heredia";
    assetUnit.disabled = true;

    let assetLocation = document.getElementById("assetLocation");
    assetLocation.defaultValue = "Piso 3, estante 23.";
    assetLocation.disabled = true;

    let assetCodeLocation = document.getElementById("assetCodeLocation");
    assetCodeLocation.defaultValue = "PROHERPIS306";
    assetCodeLocation.disabled = true;

    let assetStatus = document.getElementById("assetStatus");
    assetStatus.defaultValue = "Activo";
    assetStatus.disabled = true;

    let editButton = document.getElementById('editAsset');
    editButton.addEventListener("click", function () {

        assetName.disabled = false;
        assetName.classList.add('enabled');

        assetDescription.disabled = false;
        assetDescription.classList.add('enabled');

        assetLocation.disabled = false;
        assetLocation.classList.add('enabled');

    })

}
