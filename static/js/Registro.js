
function Registro(event) {
    event.preventDefault(); // Evitar el envío por defecto

    const codigo = document.getElementById("CodigoR").value;
    const nombre = document.getElementById("NombreR").value;
    const contraseña = document.getElementById("ContraseñaR").value;
    const confirmar = document.getElementById("ConfirmarR").value;

    //verificacion de contraseñas
    if(!validarContraseña(contraseña, confirmar)){
        alert(" Las contraseñas no coinciden.");
        return;    }

        //Obtener los usuarios
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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
    .then(response => response.json())
    .then(data => {
       
        alert(data.mensaje);
        
        window.location.reload();
    })
    .catch(error => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al enviar los datos al backend:', error);
    });
}

