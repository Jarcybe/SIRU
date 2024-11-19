function DesarrolloDelReportr(idReporte){

    const fecha = obtenerFechaActual();
    const comentario = document.getElementById("ComentarioEncargado").value.trim(); 
    const estado = document.querySelector('input[name="desarrollo"]:checked').value;

    if (!comentario){
        Swal.fire({
            title: "Error",
            text: "El comentario no puede estar vacío.",
            icon: "error",
        });
        return;
    }

    const Usuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const correolog = Usuario?.correo;

    if (!correolog) {
        Swal.fire({
            title: "Error",
            text: "No se pudo obtener la información del usuario logueado.",
            icon: "error",
        });
        return;
    }

    const DatadelDesarrollo = {
        idreporte: idReporte,
        fkcorreoencargado: correolog,
        comentario: comentario,
        estado: estado,
        fecha: fecha
    };

    fetch("/guardar_desarrollo",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(DatadelDesarrollo),
    })
    .then((response) => {
        if (!response.ok){  throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    })
    .then((data) =>{
        if(data.error){
            Swal.fire({
                title: "Error",
                text: data.error,
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "Éxito",
                text: "El desarrollo ha sido guardado correctamente.",
                icon: "success", 
            }).then(() =>{
                location.reload();
            });
        }
    }).catch((error) => {
        console.error("Error al guardar desarrollo:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al guardar el desarrollo.",
            icon: "error",
        });
    });
}