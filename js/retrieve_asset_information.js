//INCOMPLETE

window.onload = function() {
    //Se crea un array de la informacion en la fila correspondiente al radio input que selecciona el usuario
    const table = document.querySelector('table');
    const radioButtons = table.querySelectorAll('input[type="radio"]');
    const tableArray = [];

    for (let i = 1; i < table.rows.length; i++){
        const cells = table.rows[i].cells;
        const row = [table.rows[i].getAttribute('data-id')];
        for (let j = 1; j < cells.length; j++){
            row.push(cells[j].textContent);
        }
        tableArray.push(row);
    }

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('click', function () {
            const selectedRow = this.parentNode.parentNode;
            const selectedRowId = selectedRow.getAttribute('data-id');
            const selectedRowIndex = tableArray.findIndex(row => row[0] === selectedRowId);
            const selectedRowData = tableArray[selectedRowIndex];
            console.log(selectedRowData);
        })
    }

    //Boton de ver o editar llevar a la pagina del HTML correcta para visualizar la informacion aislada de la tabla
    const showEditButton = document.getElementById('showEditAssetInformation');

    showEditButton.addEventListener('click', function() {
        window.location.href = '/html/asset_individual_information.html';
    });

    //Crear elementos HTML para la info extraida de la tabla
//    selectedRowData.forEach(function() {
//        const assetID = document.createElement("input");
        //UNFINISHED
//    })

}