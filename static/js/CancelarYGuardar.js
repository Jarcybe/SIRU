function guardar() {
    const usuarios = [];

    // Obtener los datos de los usuarios desde la interfaz
    const forms = document.querySelectorAll('.user-form');
    forms.forEach(form => {
        const codigo = form.querySelector('.codigo').innerText;
        const tipo = form.querySelector('.tipo').value;
        const nombre = form.querySelector('.nombre').value;
        const contraseña = form.querySelector('.contraseña').value;

        usuarios.push({ codigo, tipo, nombre, contraseña });
    });

    // Realizar una solicitud al servidor para guardar los cambios en la base de datos
    fetch('/guardar_usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuarios }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cambios guardados exitosamente.');
            document.getElementById('administrar').style.display = 'none';
        } else {
            alert('Error al guardar los cambios.');
        }
    })
    .catch(error => {
        console.error('Error al guardar los cambios:', error);
        alert('Error al guardar los cambios. Por favor, inténtelo de nuevo más tarde.');
    });
}

function cancelar() {
    if (confirm('¿Seguro que quieres cancelar los cambios?')) {
        document.getElementById('administrar').style.display = 'none';
    }
}
