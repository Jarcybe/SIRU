function EditarUsuario(uniqueId) {

    const estado = document.getElementById(`estado-${uniqueId}`);
    const nombre = document.getElementById(`nombre-${uniqueId}`);
    const contra = document.getElementById(`contraseña-${uniqueId}`);

        estado.disabled = !estado.disabled;
        nombre.readOnly = !nombre.readOnly;
        contra.readOnly = !contra.readOnly;

}

