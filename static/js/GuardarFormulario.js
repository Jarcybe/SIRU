function GuardarFormulario(event) {
    event.preventDefault();

    const logUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    if (!logUsuario) {
        alert("Debe iniciar sesión para realizar un registro.");
        return;
    }

    const cod = logUsuario.codigo;
    const fecha = new Date().toISOString();
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
    if (!lugar && !item && !titulo && !descripcion) {
        alert("Por favor, llene al menos uno de los campos.");
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

    if (filepath) {
        formData.imagen = filepath;
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
