function Registro(event) {
    event.preventDefault(); // Evitar el envío por defecto

    const codigo = document.getElementById("CodigoR").value;
    const nombre = document.getElementById("NombreR").value;
    const contraseña = document.getElementById("ContraseñaR").value;
    const confirmar = document.getElementById("ConfirmarR").value;

    // Verificación de contraseñas
    if (!validarContraseña(contraseña, confirmar)) {
        Swal.fire({
          icon: "warning",
          title: "Las contraseñas no coinciden.",
        });
        return;
    }

    // Crear el objeto de datos a enviar al backend
    const datos = {
        codigo: codigo,
        nombre: nombre,
        contraseña: contraseña
    };

    // Enviar los datos al backend utilizando Fetch API
    fetch('/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo completar el registro. Verifica tus datos e intenta de nuevo.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Redirigiendo a /menu_admin.html'); 
        Swal.fire({
            title: data.mensaje,
            text:'Ahora puedes iniciar sesion',
            icon: 'success',
            confirmButtonText: 'Continuar'
        }).then(() => {
            window.location.reload();
        });
        
    })
    .catch(error => {
        // Manejar cualquier otro tipo de error que pueda ocurrir
        console.error('Error al enviar los datos al backend:', error);
        Swal.fire({
            icon: "error",
            title: "No se pudo completar el registro por codigo erroneo",
          });
    });
}
