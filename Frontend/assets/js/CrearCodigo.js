function CrearCodigo(event) {
    event.preventDefault(); // Evitar el envío por defecto
    
    const NCodigo = document.getElementById("Codigo").value;
    const tipo = document.querySelector("select[name='tipo']").value;

    // Obtener la lista de usuarios del LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")); // Puede ser null o undefined
    
    // Asegurarse de que `usuarios` es un array
    if (!usuarios) { // Si es null o undefined
        usuarios = []; // Inicializar como un array vacío
    }

    // Verificar si el código ya existe
    const Existe = usuarios.find(usuario => usuario.codigo === NCodigo);
    if (Existe) { // Si el código ya está en uso
        alert("Ya se usó este código");
        return;
    }

    // Crear un nuevo objeto de usuario
    const nuevo = {
        codigo: NCodigo,
        tipo: tipo,
        nombre: '',
        contraseña: ''
    };

    // Agregar el nuevo usuario a la lista de usuarios
    usuarios.push(nuevo); // Esto ahora es seguro porque `usuarios` es un array
    
    // Guardar la lista de usuarios actualizada en LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Código creado!!");
    document.getElementById('Crear').style.display = 'none'; // Cerrar el modal
}