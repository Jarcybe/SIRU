function CrearCodigo(event) {
    event.preventDefault(); // Evitar el envío por defecto
    
    const NCodigo = document.getElementById("Codigo").value;
    const tipo = document.querySelector("select[name='tipo']").value;

    // Obtener la lista de usuario
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; 
    
   if (!Array.isArray(usuarios)) { 
        usuarios = []; 
    }

    // Verificar si el código ya existe `
    const Existe = usuarios.find(usuario => usuario.codigo === NCodigo); // Uso seguro de `find`
    if (Existe) {
        alert("Ya se usó este código");
        return; 
    }

    const nuevo = {
        codigo: NCodigo,
        tipo: tipo,
        nombre: '', 
        contraseña: '' 
    };

    // Agregar el nuevo usuario
    usuarios.push(nuevo); 
    
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Código creado!!");
    document.getElementById('Crear').style.display = 'none'; 
}