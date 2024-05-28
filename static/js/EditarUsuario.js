function EditarUsuario(index) {
    // Obtener el usuario correspondiente al índice de la base de datos o API
    fetch(`/editar_usuario/${index}`)
        .then(response => response.json())
        .then(data => {
            // Verificar si se obtuvo correctamente el usuario
            if (data.success) {
                // Obtener los elementos HTML correspondientes a los campos del usuario
                const estado = document.getElementById(`estado-${index}`);
                const nombre = document.getElementById(`nombre-${index}`);
                const contra = document.getElementById(`contraseña-${index}`);

                // Actualizar los campos HTML con los datos del usuario
                estado.value = data.usuario.estado;
                nombre.value = data.usuario.nombre;
                contra.value = data.usuario.contraseña;

                // Habilitar o deshabilitar la edición de los campos según corresponda
                estado.disabled = !estado.disabled;
                nombre.readOnly = !nombre.readOnly;
                contra.readOnly = !contra.readOnly;
            } else {
                // Manejar errores si no se pudo obtener el usuario
                alert("Error al obtener el usuario: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            alert("Error al obtener el usuario");
        });
}
