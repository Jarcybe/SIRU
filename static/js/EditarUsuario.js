function EditarUsuario(index) {
    const estado = document.getElementById(`estado-${index}`);
    const nombre = document.getElementById(`nombre-${index}`);
    const contra = document.getElementById(`contraseña-${index}`);

    if (estado && nombre && contra) {
        estado.disabled = !estado.disabled;
        nombre.readOnly = !nombre.readOnly;
        contra.readOnly = !contra.readOnly;
    } else {
        console.error(`No se encontraron elementos para el índice ${index}`);
    }
}
