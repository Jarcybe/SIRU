function login(event) {
    event.preventDefault();

    const codigo = document.getElementById("CodigoL").value;
    const contraseña = document.getElementById("ContraseñaL").value;

    // Construir el cuerpo de la solicitud para enviar al servidor
    const data = {
        codigo: codigo,
        contraseña: contraseña
    };

    // Enviar la solicitud POST al endpoint de login en el servidor
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es exitosa, redirige según el tipo de usuario
            return response.json();
        } else {
            // Si la respuesta no es exitosa, muestra un mensaje de error
            throw new Error('Código o contraseña incorrectos');
        }
    })
    .then(data => {
        // Redirige según el tipo de usuario
        if (data.usuario.tipo === "Admin") {
            window.location.href = "MenuAdmin.html";
        } else if (data.usuario.tipo === "Usuario") {
            window.location.href = "MenuPrincipal.html";
        }
    })
    .catch(error => {
        // Muestra un mensaje de error en caso de credenciales incorrectas
        alert(error.message);
    });
}
