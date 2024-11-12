function cargarItems() {
    fetch('/conseguir_items')
    .then(response => response.json())
    .then(data => {
        if (data.success !== false) {

                // Cargar ítems en los selectores
        const items = data.items;
        cargarOpcionesEnSelectsItems(items, ["VLItemAñadir", "VIitemsDisponibles", "VIitemAeliminar", "VLitemAEliminar"]);
   
            
        }

     })
    .catch(error => {
        Swal.fire({
            title: "Error",
            text: "Hubo un problema con la carga de datos",
            icon: 'error'
        });
    });
}

function cargarOpcionesEnSelectsItems(opciones, selectIds) {
    selectIds.forEach(selectId => {
        const select = document.getElementById(selectId);
        
        // Vaciar el select antes de llenarlo
        select.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        
        // Agregar opciones
        opciones.forEach(opcion => {
            const optionElement = document.createElement("option");
            optionElement.value = opcion.iditem;
            optionElement.textContent = opcion.nombreitem;
            select.appendChild(optionElement);
        });
    });
}