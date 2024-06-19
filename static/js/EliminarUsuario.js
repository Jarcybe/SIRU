function EliminarUsuario(uniqueId) {
    const codigo = document.getElementById(`codigo-${uniqueId}`).innerText;

    fetch(`/eliminar_usuario/${codigo}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: "Usuario eliminado correctamente",
            icon: "success"
          }).then(() => {
            location.reload();
        });
       document.getElementById(uniqueId).remove();
    })
    .catch(error => {
        console.error('Error al eliminar usuario:', error);
        Swal.fire({
            title: 'Error al eliminar usuario. Por favor, intenta de nuevo.',
            icon: "error"
       });
    });
}