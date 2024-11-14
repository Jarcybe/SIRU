function Login(event) {
    event.preventDefault();

    const correo = document.getElementById("CorreoL").value;
    const password = document.getElementById("ContraseñaL").value;

    const datos = {
        correo: correo,
        password: password
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
            }
            else if (data.usuario.tipo === "Encargado") {
            console.log('Redirigiendo a /menu_encargado.html'); 
            Swal.fire({
                title: 'Login exitoso',
                text: 'Bienvenido, usuario',
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
