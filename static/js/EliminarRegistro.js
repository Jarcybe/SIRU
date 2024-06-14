function eliminarRegistro(id) {
    

    const logUsuario = JSON.parse(localStorage.getItem('LogUsuario'));

    if (!logUsuario) {
        alert("Debe iniciar sesión para realizar esta acción.");
        return;
    }

    if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        return;
    }

    fetch(`/eliminar_registro/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.reload();
        } else {
            alert("Error al eliminar el registro: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error al eliminar el registro:', error);
        alert("Error al eliminar el registro");
    });
}
