function verificarOcrearAdmin() {
    fetch('/verificar_o_crear_admin', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al verificar o crear el usuario administrador');
        }
    })
    .then(data => {
        if (data.existe_usuario_admin) {
            console.log('Ya existe un usuario administrador en la base de datos.');
            // Realizar acciones adicionales si ya existe un usuario administrador
        } else {
            console.log('No existe ningún usuario administrador. Creando uno por defecto.');
            // Realizar acciones adicionales si se crea un usuario administrador por defecto
        }
    })
    .catch(error => {
        console.error('Error al verificar o crear el usuario administrador:', error);
    });
}
