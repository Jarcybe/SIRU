function CrearLugar(){
const nombre = document.getElementById("VLCrearLugar").value.trim();

if (!nombre){
    Swal.fire({
        title: "Esta vacio no se puede hacer nada",
        icon: 'warning'
    })
    return
}

const lugar={

    nombrelugar: nombre,
};


const botones = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});


botones.fire({
    title: `¿Seguro que quiere crear el lugar "${nombre}"?`,
    icon: "warning",
    showCancelButton: true,

    showCancelButton: true,
    confirmButtonText: "Crear",

    cancelButtonText: "No, Cancelar",
    reverseButtons: true
}).then((result)=>{

    if(result.isConfirmed){
        document.getElementById("VLCrearLugar").value = "";

        fetch('/crear_lugar',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(lugar),
        })
        .then(response => response.json())
        .then(data=>{
            if(data.success){
                Swal.fire({
                    title: "Exito",
                    text: "Lugar Creado con exito",
                    icon: 'success'
                });

                SelectsLugares= ["VLlugarSinItems", "VLLugarCopiaraitems", "VLlugarAcopiar", "VLlugarAcambiarnombre", "VLlugarConElItem", "VLlugarAeliminar" ];

                SelectsLugares.forEach(id => {
                    const selectLista = document.getElementById(id);
                    const nuevoLugarOption = document.createElement("option");
                    nuevoLugarOption.value = nombre;  // Usa el nombre como valor
                    nuevoLugarOption.textContent = nombre;  // Muestra el nombre en la lista
                    selectLista.appendChild(nuevoLugarOption);
                });

            }else{
                Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: 'error'
                });
            }
        })
        .catch(error =>{
            Swal.fire({
                title: "Error",
                text: "Hubo un problema con el servidor",
                icon: 'error'
            })
        });
    }
    document.getElementById("VLCrearLugar").value = "";
});
}


function cargarLugares(){

    fetch('/conseguir_lugares')
    
    .then(response => response.json())
    .then(data => {
        if (data.success !== false) {
              // Cargar lugares en el select de lugares disponibles

        const lugares = data.lugares; 
        cargarOpcionesEnSelectsLugares(lugares, ["VLlugarSinItems", "VLVisualizarLugar", "VLLugarCopiaraitems", "VLlugarAcopiar", "VLlugarAcambiarnombre", "VLlugarConElItem", "VLlugarAeliminar" ]);

        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error",
            text: "Hubo un problema con la carga de datos lugares",
            icon: 'error'
        });
    });
}

function cargarOpcionesEnSelectsLugares(opciones, selectIds) {
    selectIds.forEach(selectId => {
        const select = document.getElementById(selectId);
        
        // Vaciar el select antes de llenarlo
        select.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        
        // Agregar opciones
        opciones.forEach(opcion => {
            const optionElement = document.createElement("option");
            optionElement.value = opcion.idlugar;
            optionElement.textContent = opcion.nombrelugar;
            select.appendChild(optionElement);
        });
    });
}

function agregarItemALugar() {
    const idLugar = document.getElementById("VLlugarSinItems").value;
    const idItem = document.getElementById("VLItemAñadir").value;

    if (!idLugar || !idItem) {
        Swal.fire({
            title: "Error",
            text: "Por favor selecciona un lugar y un item",
            icon: 'warning'
        });
        return;
    }

    const data = { 
        fklugar: idLugar, 
        fkitem: idItem };

        const botones = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        botones.fire({
            title: `¿Seguro que quiere añadir el item?`,
            icon: "warning",
            showCancelButton: true,
        
            showCancelButton: true,
            confirmButtonText: "Aceptar",
        
            cancelButtonText: "No, Cancelar",
            reverseButtons: true
        }).then((result)=>{
        
            if(result.isConfirmed){
                document.getElementById("VLlugarSinItems").value = "";
                document.getElementById("VLItemAñadir").value = "";

    fetch('/asociar_item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: "Éxito",
                text: "Item añadido al lugar correctamente",
                icon: 'success'
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
        Swal.fire({
            title: "Error",
            text: "Hubo un problema con el servidor",
            icon: 'error'
        });
    });
} 
document.getElementById("VLlugarSinItems").value = "";
                document.getElementById("VLItemAñadir").value = "";
});
}

function copiarItemsDeLugar() {
    const lugarDestino = document.getElementById("VLLugarCopiaraitems").value;
    const lugarOrigen = document.getElementById("VLlugarAcopiar").value;

    if (!lugarDestino || !lugarOrigen) {
        Swal.fire({
            title: "Error",
            text: "Por favor selecciona ambos lugares",
            icon: 'warning'
        });
        return;
    }

    if (lugarDestino === lugarOrigen) {
        Swal.fire({
            title: "Error",
            text: "No puedes copiar items del mismo lugar",
            icon: 'warning'
        });
        return;
    }

    const data = { 
        fklugar_destino: lugarDestino, 
        fklugar_origen: lugarOrigen 
    };

    const botones = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    botones.fire({
        title: `¿Seguro que quiere copiar los items del lugar?`,
        icon: "warning",
        showCancelButton: true,
    
        showCancelButton: true,
        confirmButtonText: "Aceptar",
    
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
    }).then((result)=>{
    
        if(result.isConfirmed){
            document.getElementById("VLLugarCopiaraitems").value = "";
            document.getElementById("VLlugarAcopiar").value = "";

    fetch('/copiar_items', {
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
document.getElementById("VLLugarCopiaraitems").value = "";
document.getElementById("VLlugarAcopiar").value = "";
});
}
