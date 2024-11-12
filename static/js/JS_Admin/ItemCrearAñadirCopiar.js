function CrearItem(){
    const nombre = document.getElementById("VIcreacionItem").value.trim();
    
    if (!nombre){
        Swal.fire({
            title: "Esta vacio no se puede hacer nada",
            icon: 'warning'
        })
        return
    }

    const itemMostrado = document.createElement("div");
                itemMostrado.id = nombre;
                itemMostrado.className = "item";
                itemMostrado.draggable = true;
                itemMostrado.ondragstart = Mostraritems;
                itemMostrado.innerHTML = nombre;

    const botones = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    
    const item={
        nombreitem: nombre,
    };
    
    botones.fire({
        title: `¿Seguro que quiere crear el item "${nombre}"?`,
        icon: "warning",
        showCancelButton: true,
    
        showCancelButton: true,
        confirmButtonText: "Aceptar",
    
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
    }).then((result)=>{
    
        document.getElementById("sinclase").appendChild(itemMostrado);
        document.getElementById("VIcreacionItem").value = "";
        if(result.isConfirmed){
    
            fetch('/crear_items',{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
            .then(response => response.json())
            .then(data=>{
                if(data.success){
                    Swal.fire({
                        title: "Exito",
                        text: "Item Creado con exito",
                        icon: 'success'
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
    });
    }

function cargarItems(){

        fetch('/obtener_items')
        .then(response => response.json())
        .then(data => {

            data.items.forEach(item => {
                
                const itemMostrado = document.createElement("div");
                itemMostrado.id = `${item.nombreitem}`;
                itemMostrado.className = "item";
                itemMostrado.draggable = true;
                itemMostrado.ondragstart = Mostraritems;
                itemMostrado.innerHTML = item.nombreitem;

                const Destino = document.getElementById(item.claseitem || 'sinclase');
                Destino.appendChild(itemMostrado);
            });
        })
        .catch(error => console.error("Error al cargar los items:", error));
    }
    

    function mover(event){
event.preventDefault();
    }


    function Mostraritems(event){
    event.dataTransfer.setData("text", event.target.id);
    }

    let itemTemporales = {};
    function drop(event){
        event.preventDefault();
        const Nitem = event.dataTransfer.getData("text");
        const itemElement = document.getElementById(Nitem);

        const zonaID = event.currentTarget.id;

        if(!itemTemporales[Nitem]){
            itemTemporales[Nitem] = itemElement.parentNode.id;
        }

        itemElement.dataset.zona = zonaID;
       event.target.appendChild(itemElement);
    }

    function actualizarClase(){

        const cambios = [];

        //Recoge el nombre de la zona en la que cambio
        Object.keys(itemTemporales).forEach(Nitem =>{
 
            const elementoITem = document.getElementById(Nitem);
            const nuevaClase = elementoITem.dataset.zona;

            if(nuevaClase !== itemTemporales[Nitem]){
                cambios.push({
                    nombreitem: Nitem,
                    claseitem: nuevaClase
                });
            }
        });

        if (cambios.length > 0){
        fetch('/actualizar_clase', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({cambios}),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                Swal.fire({
                    title: "Exito",
                    text: "Items actualizados con exito",
                    icon: 'success'
                });
                itemTemporales = {};
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
    }else {
        Swal.fire({
            title: "No hay cambios",
            text: "No se han realizado cambios en los items.",
            icon: 'info'
        });
    }}

    function cancelarCambios(){

        Object.keys(itemTemporales).forEach(ItemId => {
            const itemElement = document.getElementById(ItemId);
            const zonaOriginalId = itemTemporales[ItemId]; // id de la zona original guardado en itemTemporales
            const zonaOriginal = document.getElementById(zonaOriginalId);
    
            if (zonaOriginal) {
                zonaOriginal.appendChild(itemElement); // Mueve el elemento de regreso a la zona original
            }
        });
    
        itemTemporales = {};
    }

    window.addEventListener("DOMContentLoaded", cargarItems);