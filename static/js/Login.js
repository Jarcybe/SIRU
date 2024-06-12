function Login(event) {
    event.preventDefault();

    const codigo = document.getElementById("CodigoL").value;
    const contraseña = document.getElementById("ContraseñaL").value;

    const datos = {
        codigo: codigo,
        contraseña: contraseña
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verificar el contenido de la respuesta en la consola
        if (data.success) {
            localStorage.setItem('LogUsuario', JSON.stringify(data.usuario));
            console.log('Usuario tipo:', data.usuario.tipo); // Depuración
            if (data.usuario.tipo === "Admin") { // Asegúrate de que coincide con la base de datos
                console.log('Redirigiendo a /menu_admin.html'); // Depuración
                window.location.href = "menu_admin";
            } else if (data.usuario.tipo === "Usuario") {
                console.log('Redirigiendo a /menu_principal.html'); // Depuración
                window.location.href = "menu_principal";
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
    });
}
