function mostrarPeticion() {
    document.getElementById('notificacion').style.display = 'none';
    document.getElementById('peticion').style.display = 'block';
    document.getElementById('Opciones').style.display = 'none';  // Ocultar opciones
}

// Función para cancelar la petición y volver a notificaciones
function cancelarPeticion() {
    document.getElementById('peticion').style.display = 'none';
    document.getElementById('notificacion').style.display = 'block';
    document.getElementById('Opciones').style.display = 'block';  // Mostrar opciones nuevamente
}
