function cargarItemsPorLugar(fklugar) {
    // Limpiar el select de items antes de cargar nuevos datos
    const selectItems = document.getElementById("VLitemAEliminar");
    selectItems.innerHTML = '<option value="" disabled selected>Seleccionar item</option>';

    if (!fklugar) return;  
    fetch('/obtener_items_por_lugar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fklugar: fklugar })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Llenar el select con los items
            data.items.forEach(item => {
                const option = document.createElement("option");
                option.value = item.iditem;
                option.textContent = item.nombreitem;
                selectItems.appendChild(option);
            });
        } else {
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error al cargar los items:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema con la carga de items",
            icon: 'error'
        });
    });
}

// Evento para cargar los items cuando se selecciona un lugar
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("VLlugarConElItem").addEventListener("change", function() {
        const fklugar = this.value;
        cargarItemsPorLugar(fklugar);
    });
});

function eliminarelitem(){
    const fklugar = document.getElementById("VLlugarConElItem").value;
    const fkitem = document.getElementById("VLitemAEliminar").value;

    // Validar que ambos campos estén seleccionados
    if (!fklugar || !fkitem) {
        Swal.fire({
            title: "Error",
            text: "Selecciona un lugar y un item para eliminar",
            icon: 'warning'
        });
        return;
    }

    const data = {
        fklugar: fklugar,
        fkitem: fkitem
    };

    const botones = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    botones.fire({
        title: `¿Seguro que quiere eliminar el item de esta zona?`,
        icon: "warning",
        showCancelButton: true,
    
        showCancelButton: true,
        confirmButtonText: "Aceptar",
    
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
    }).then((result)=>{
    
        if(result.isConfirmed){
            document.getElementById("VLlugarConElItem").value = "";

    fetch('/eliminar_item_lugar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: "Éxito",
                text: data.message,
                icon: 'success'
            });
            // Opcional: Actualizar la lista de items para el lugar seleccionado
            cargarItemsPorLugar(fklugar);
        } else {
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error al eliminar el item:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el item",
            icon: 'error'
        });
    });
} 

document.getElementById("VLlugarConElItem").value = "";
document.getElementById("VLitemAEliminar").value = "";
});  
}

function eliminarlugarcompleto(){


    const idlugar = document.getElementById("VLlugarAeliminar").value;

    if (!idlugar) {
        Swal.fire({
            title: "Error",
            text: "Selecciona un lugar para eliminar",
            icon: 'warning'
        });
        return;
    }

    const botones = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    botones.fire({
        title: `¿Seguro que quiere eliminar totalmente el lugar? No podras recuperarlo despues`,
        icon: "warning",
        showCancelButton: true,
    
        showCancelButton: true,
        confirmButtonText: "SI, ELIMINAR",
    
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
    }).then((result)=>{
    
        if(result.isConfirmed){
            
document.getElementById("VLlugarAeliminar").value = "";
            fetch('/eliminar_lugar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idlugar: idlugar })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire("Eliminado", data.message, "success");
                    cargarLugares();  // Actualiza la lista de lugares después de eliminar
                } else {
                    Swal.fire("Error", data.message, "error");
                }
            })
            .catch(error => {
                console.error('Error al eliminar el lugar:', error);
                Swal.fire("Error", "Hubo un problema al eliminar el lugar", "error");
            });
} 

document.getElementById("VLlugarAeliminar").value = "";
});  
}