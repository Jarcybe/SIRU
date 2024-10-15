function EditarUsuario(uniqueId) {

    const tipo = document.getElementById(`tipo-${uniqueId}`);
    const nombre = document.getElementById(`nombre-${uniqueId}`);

        tipo.disabled = !tipo.disabled;
        nombre.readOnly = !nombre.readOnly;
        
}

