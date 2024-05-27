function CrearCodigo(event) {
    event.preventDefault(); // Evitar el envío por defecto
    
    const NCodigo = document.getElementById("Codigo").value;
    const tipo = document.querySelector("select[name='tipo']").value;

    // Crear un objeto con los datos del nuevo usuario
    const nuevoUsuario = {
        codigo: NCodigo,
        tipo: tipo,
        nombre: '', 
        contraseña: '' 
    };

    // Enviar una solicitud POST al servidor para agregar el nuevo usuario
    fetch('/crear_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Código creado!!");
            document.getElementById('Crear').style.display = 'none'; 
        } else {
            alert("Error al crear el código. Por favor, inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error('Error al crear el código:', error);
        alert("Error al crear el código. Por favor, inténtalo de nuevo.");
    });
}
