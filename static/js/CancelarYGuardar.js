// Función para obtener los datos que se van a guardar
function obtenerDatosParaGuardar() {
    const usuarios = [];
    
    filtrar.forEach(index => {
        const uniqueId = `user-${index}`;
        const codigo = document.querySelector(`#estado-${uniqueId}`).closest('.w3-row').querySelector('b').innerText.split(': ')[1];
        const tipo = document.getElementById(`estado-${uniqueId}`).value;
        const nombre = document.getElementById(`nombre-${uniqueId}`).value;
        const contraseña = document.getElementById(`contraseña-${uniqueId}`).value;

        usuarios.push({ codigo, tipo, nombre, contraseña });
    });

    console.log('Usuarios que se enviarán:', usuarios); // Mostrar usuarios en consola para depuración

    return usuarios;
}

// Función para guardar los cambios
function guardar() {
    const usuarios = obtenerDatosParaGuardar();

    if (usuarios.length === 0) {
        alert('No hay usuarios para actualizar.');
        return;
    }

    // Enviar los datos al backend en formato JSON
    fetch('/actualizar_usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarios })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cambios guardados exitosamente.');
        } else {
            alert('Error al guardar los cambios: ' + data.error);
        }
        document.getElementById('administrar').style.display = 'none';
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
        alert('Error al guardar los cambios.');
    });
}

// Función para cancelar cambios
function cancelar() {
    if (confirm('¿Seguro que quieres cancelar los cambios?')) {
        document.getElementById('administrar').style.display = 'none';
    }
}



function cancel() {
    if (confirm('¿Seguro que quieres cancelar los cambios?')) {
        document.getElementById('administrar').style.display = 'none';
    }
}
