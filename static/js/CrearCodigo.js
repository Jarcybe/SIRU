function CrearCodigo(event) {
    event.preventDefault(); 
    
    const NCodigo = document.getElementById("Codigo").value;
    const tipo = document.querySelector("select[name='tipo']").value;

   
    const datos = {
        codigo: NCodigo,
        tipo: tipo,
        nombre: '',
        contraseña: ''
    };

 
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
