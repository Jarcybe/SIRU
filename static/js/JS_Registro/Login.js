function Login(event) {
    event.preventDefault();

    const correo = document.getElementById("CorreoL").value;
    const password = document.getElementById("ContraseñaL").value;

    // Enviar la contraseña al backend para encriptarla
    fetch('/encriptar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
    })
    .then(response => response.json())
    .then(data => {
        const hashedPassword = data.hashed_password; // Contraseña encriptada

        // Ahora que la contraseña está encriptada, enviamos los datos de login
        const datos = {
            correo: correo,
            password: hashedPassword
        };

        // Enviar los datos de inicio de sesión
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data.success) {
            localStorage.setItem('LogUsuario', JSON.stringify(data.usuario));
            console.log('Usuario tipo:', data.usuario.tipo); 
            if (data.usuario.tipo === "Admin") { 
                console.log('Redirigiendo a /menu_admin.html'); 
                Swal.fire({
                    title: 'Login exitoso',
                    text: 'Bienvenido, administrador',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    window.location.href = "menu_admin";
                });
            } else if (data.usuario.tipo === "Usuario") {
                console.log('Redirigiendo a /menu_principal.html'); 
                Swal.fire({
                    title: 'Login exitoso',
                    text: 'Bienvenido, usuario',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    window.location.href = "menu_principal";
                });
            } else if (['EncargadoGeneral', 'EncargadoElectrico', 'EncargadoFontaneria', 'EncargadoSalones', 'EncargadoInformatico'].includes(data.usuario.tipo)) {
                console.log('Redirigiendo a /menu_encargado.html'); 
                Swal.fire({
                    title: 'Login exitoso',
                    text:   `Bienvenido, ${data.usuario.tipo}`,
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    window.location.href = "menu_encargado";
                });

                
            }  
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
        Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con el servidor. Por favor, inténtelo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}
