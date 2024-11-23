function GuardarFormulario(event) {
    event.preventDefault();

    console.log('Se ha llamado a GuardarFormulario'); // Verificar si se activa esta función

    const logUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    if (!logUsuario) {
        alert("Debe iniciar sesión para realizar un registro.");
        return;
    }

    const correoUsuario = logUsuario.correo;
    const fecha = obtenerFechaActual(); // Obtener la fecha actual formateada
    const lugar = document.getElementById("Lugar");
    const item = document.getElementById("Item").value.trim();
    const tipo = document.querySelector('input[name="Tipo"]:checked');
    const lugarSeleccionado = lugar.options[lugar.selectedIndex].text;

    const ClaseTipo = tipo.value;
    const titulo = document.getElementById("Titulo").value.trim();
    const descripcion = document.getElementById("Descripcion").value.trim();

    // Validar que al menos uno de los campos (lugar, item, titulo, descripcion) esté lleno
    if (!lugar || !item || !descripcion) {
        Swal.fire({
            icon: 'warning',
            title: 'Error en los datos',
            text: 'Los campos Lugar, ítem y Descripción son obligatorios.'
          });
        return;
    }

    const imagenElement = document.getElementById("imagen");
    const imagen = imagenElement.files[0]; // Obtener el archivo de imagen seleccionado

    if (imagen) {
        const formData = new FormData();
        formData.append('imagen', imagen);

        fetch('/subir_imagen_temp', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                enviarFormulario(correoUsuario, fecha, lugar, item, ClaseTipo, titulo, descripcion, data.filepath);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Error en los datos',
                    text: "Error al subir la imagen: " + data.error
                  });
            }
        })
        .catch(error => {
            console.error('Error al subir la imagen:', error);
            Swal.fire({
                icon: 'warning',
                title: 'Error en los datos',
                text: "Error al subir la imagen"
              });
        });
    } else {
        enviarFormulario(correoUsuario, fecha, lugarSeleccionado, item, ClaseTipo, titulo, descripcion, null);
    }
}

function enviarFormulario(correoUsuario, fecha, lugar, item, tipo, titulo, descripcion, filepath) {
    const formData = {
        correo: correoUsuario,
        fecha: fecha,
        lugar: lugar,
        item: item,
        tipo: tipo,
        titulo: titulo,
        descripcion: descripcion
    };

    // Asegurar que la ruta de la imagen esté en el formato correcto
    if (filepath) {
        formData.imagen = filepath.replace('\\', '/');
    }

    fetch('/guardar_reporte', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: data.message,
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                window.location.href = "/menu_principal";
            });
        } else {
            Swal.fire({
                    icon: 'warning',
                    title: 'Error en los datos',
                    text: "Error al guardar el formulario " + data.error
                  });
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error en los datos',
            text: "Error al enviar los datos al servidor"
          });
    });
}

function previewImage(event){

const input = event.target;
const preview = document.getElementById("imagenPreview");
const image = document.getElementById("preview");

if(input.files && input.files[0]){
const reader = new FileReader();

reader.onload= function(e){
image.src = e.target.result;
preview.style.display = "block";
};

reader.readAsDataURL(input.files[0]);
}else{
    preview.style.display = "none";
}

 
}
