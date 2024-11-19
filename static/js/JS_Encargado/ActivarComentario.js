function ActivarComentario(id){

    const boton = document.getElementById("AñadirNuevoComentario");
    const comentario = document.getElementById("ComentarioEncargado");
    const encargadoInput = document.getElementById("Encargado");
    const Logusuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const botonguardar = document.getElementById("guardarDesarrollo");

    const originalComentario = comentario.value;
    const originalEncargado = encargadoInput.value;

    if(boton.textContent === "Añadir nuevo comentario"){

        boton.textContent="Cambiar comentario";
        encargadoInput.value = Logusuario.nombre;
        comentario.removeAttribute("readonly");
        comentario.value="";
        botonguardar.disabled = false;
        
    } else {
        Swal.fire({
            title: "Cancelar comentario",
            text: "¿Estás seguro de cancelar este comentario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No, volver",
        })
        .then((result) =>{
            if(result.isConfirmed){
                comentario.setAttribute("readonly", true);
                comentario.value = originalComentario;
                encargadoInput.value = originalEncargado;
                boton.textContent = "Añadir nuevo comentario";
                botonguardar.disabled = true;
            }
        });
    }
}