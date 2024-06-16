function GuardarFormulario(event) {
    event.preventDefault();

    console.log('Se ha llamado a GuardarFormulario'); // Verificar si se activa esta función

    const logUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    if (!logUsuario) {
        alert("Debe iniciar sesión para realizar un registro.");
        return;
    }

    const cod = logUsuario.codigo;
    const fecha = obtenerFechaActual(); // Obtener la fecha actual formateada
    const lugar = document.getElementById("Lugar").value.trim();
    const item = document.getElementById("Item").value.trim();
    const estado = document.querySelector('input[name="Estado"]:checked');
    if (!estado) {
        alert("Por favor, seleccione un estado.");
        return;
    }
    const estadoValue = estado.value;
    const titulo = document.getElementById("Titulo").value.trim();
    const descripcion = document.getElementById("Descripcion").value.trim();

    // Validar que al menos uno de los campos (lugar, item, titulo, descripcion) esté lleno
    if (!lugar || !item || !descripcion) {
        alert("Los campos Lugar, Item y Descripción son obligatorios.");
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
                enviarFormulario(cod, fecha, lugar, item, estadoValue, titulo, descripcion, data.filepath);
            } else {
                alert("Error al subir la imagen: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error al subir la imagen:', error);
            alert("Error al subir la imagen");
        });
    } else {
        enviarFormulario(cod, fecha, lugar, item, estadoValue, titulo, descripcion, null);
    }
}

function enviarFormulario(cod, fecha, lugar, item, estado, titulo, descripcion, filepath) {
    const formData = {
        codigo: cod,
        fecha: fecha,
        lugar: lugar,
        item: item,
        estado: estado,
        titulo: titulo,
        descripcion: descripcion
    };

    // Asegurar que la ruta de la imagen esté en el formato correcto
    if (filepath) {
        formData.imagen = filepath.replace('\\', '/');
    }

    fetch('/guardar_formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = "/menu_principal";
        } else {
            alert("Error al guardar el formulario: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
        alert("Error al enviar los datos al servidor");
    });
}


// Función para obtener la fecha actual formateada YYYY-MM-DD HH:MM:SS
function obtenerFechaActual() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
