function EditarUsuario(uniqueId) {

    const tipo = document.getElementById(`tipo-${uniqueId}`);
    const nombre = document.getElementById(`nombre-${uniqueId}`);
    const editar = document.getElementById(`BotonEditar-${uniqueId}`)

    tipo.disabled = !tipo.disabled;
        nombre.readOnly = !nombre.readOnly;

        if(!tipo.disabled){
            editar.classList.add("Editando");
        }else{
            editar.classList.remove("Editando")
        }
        
}

