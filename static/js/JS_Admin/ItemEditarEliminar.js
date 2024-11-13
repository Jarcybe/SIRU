function CargarlosItemsenlistas() {
    fetch('/conseguir_items')
    .then(response => response.json())
    .then(data => {
        if (data.success !== false) {

                // Cargar ítems en los selectores
        const items = data.items;
        cargarOpcionesEnSelectsItems(items, ["VLItemAñadir", "VIitemsDisponibles", "VIitemAeliminar"]);
   
            
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

function editaritem(){
    const idItem = document.getElementById("VIitemsDisponibles").value;
    const nuevoNombre = document.getElementById("VInuevoNombre").value.trim();

    // Validar que ambos campos estén llenos
    if (!idItem || !nuevoNombre) {
        Swal.fire({
            title: "Error",
            text: "Selecciona un item y escribe un nuevo nombre",
            icon: 'warning'
        });
        return;
    }

    // Enviar datos al backend
    const data = {
        id_item: idItem,
        nuevo_nombre: nuevoNombre
    };

    
    const botones = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    botones.fire({
        title: `¿Seguro que quiere cambiar el nombre a ${nuevoNombre}?`,
        icon: "warning",
        showCancelButton: true,
    
        showCancelButton: true,
        confirmButtonText: "Aceptar",
    
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
    }).then((result)=>{
    
        if(result.isConfirmed){
            document.getElementById("VIitemsDisponibles").value = "";
            document.getElementById("VInuevoNombre").value = "";

            

    fetch('/editar_nombre_item', {
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

            CargarlosItemsenlistas();
        } else {
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: 'error'
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error",
            text: "Hubo un problema con el servidor",
            icon: 'error'
        });
    });
  
} 
document.getElementById("VIitemsDisponibles").value = "";
            document.getElementById("VInuevoNombre").value = "";
});
}

function eliminaritemcompleto(){
    const iditem = document.getElementById("VIitemAeliminar").value;

    if (!iditem) {
        Swal.fire({
            title: "Error",
            text: "Selecciona un item para eliminar",
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
        title: `¿Seguro que quiere eliminar totalmente el item? No podras recuperarlo despues`,
        icon: "warning",
        showCancelButton: true,
    
        showCancelButton: true,
        confirmButtonText: "SI, ELIMINAR",
    
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
    }).then((result)=>{
    
        if(result.isConfirmed){
            
            document.getElementById("VIitemAeliminar").value = "";
            fetch('/eliminar_item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ iditem: iditem })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire("Eliminado", data.message, "success"); 

                    CargarlosItemsenlistas(); // Actualiza la lista de items después de eliminar
                } else {
                    Swal.fire("Error", data.message, "error");
                }
            })
            .catch(error => {
                console.error('Error al eliminar el item:', error);
                Swal.fire("Error", "Hubo un problema al eliminar el item", "error");
            });
} 

document.getElementById("VIitemAeliminar").value = "";
});  
}