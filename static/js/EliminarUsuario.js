function EliminarUsuario(index, verdad) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usu = usuarios[index];
    
    fetch('/eliminar_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo: usu.codigo })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al eliminar el usuario');
        }
    })
    .then(data => {
        alert(data.message);
        if (!verdad) {
            CargarUsuarios('todos');
        }
    })
    .catch(error => {
        console.error('Error al eliminar el usuario:', error);
    });
}
