function ConfirmarEliminacion(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usu = usuarios[index];
    const admins = usuarios.filter(us => us.tipo === 'Admin');

    if (usu.tipo === 'Admin' && admins.length === 1) {
        alert('No se puede eliminar el último administrador.');
        return;
    }

    if (confirm(`¿Seguro que quieres eliminar al usuario con código ${usu.codigo}?`)) {
        if (usu.codigo === JSON.parse(localStorage.getItem('LogUsuario')).codigo) {
            if (confirm('Estás intentando eliminar el administrador que estás usando. ¿Deseas continuar?')) {
                EliminarUsuario(index, true);
                window.location.href = "MenuPrincipal.html"; // Redirigir a otra página después de eliminar el usuario
            }
        } else {
            EliminarUsuario(index, false);
        }
    }
}
