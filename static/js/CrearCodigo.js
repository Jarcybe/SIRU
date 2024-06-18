function CrearCodigo(event) {
    event.preventDefault(); // Evitar el envío por defecto
    
    const NCodigo = document.getElementById("Codigo").value;
    const tipo = document.querySelector("select[name='tipo']").value;

    // Crear el objeto de datos a enviar al servidor
    const datos = {
        codigo: NCodigo,
        tipo: tipo,
        nombre: '',
        contraseña: ''
    };

    // Enviar los datos al servidor utilizando Fetch API
    fetch('/crear_codigo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: '¡Exito!',
                text: "Código creado",
                icon: 'success',
                confirmButtonText: 'Intentar de nuevo'
            });
            document.getElementById('Crear').style.display = 'none'; // Ocultar el botón de creación
        } else {
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
    });
}
