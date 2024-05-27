function eliminarRegistro(index) {
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const codigo = LogUsuario.codigo;
    
    fetch('/eliminar_registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo: codigo, index: index })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al eliminar el registro');
        }
    })
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error al eliminar el registro:', error);
    });
}
