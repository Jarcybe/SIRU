function Registro(event) {
    event.preventDefault(); // Evitar el envío por defecto

    const correo = document.getElementById("CorreoR").value;
    const nombre = document.getElementById("NombreR").value;
    const password = document.getElementById("ContraseñaR").value;
    const confirmar = document.getElementById("ConfirmarR").value;
    
    // Verificación de contraseñas
    if (!validarContraseña(password, confirmar)) {
        Swal.fire({
          icon: "warning",
          title: "Las contraseñas no coinciden.",
        });
        return;
    }

    if (!validarFormato(password)) {
        Swal.fire({
            icon: "warning",
            title: "El formato de la contraseña es invalido, debe llevar mayúsculas, números y mínimo 8 caracteres.",
        });
        return;
    }

    // Llamada para encriptar la contraseña
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

        const datos = {
            correo: correo,
            nombre: nombre,
            password: hashedPassword, // Usar la contraseña encriptada
        };

        // Realizar el registro con la contraseña encriptada
        return fetch('/registrar_correo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo completar el registro. Verifica tus datos e intenta de nuevo.');
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: "Confirmación de activación",
            text: 'Revisa tu correo electrónico para activar tu cuenta.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    })
    .catch(error => {
        console.error('Error al procesar la solicitud:', error);

        if (error.message === 'El correo ya existe o está registrado') {
            Swal.fire({
                icon: 'warning',
                title: 'Registro fallido',
                text: 'Este correo ya fue registrado',
            });
        } else if (error.message === 'El correo debe terminar en @gmail.com') {
            Swal.fire({
                icon: "error",
                title: "Correo invalido",
                text: "El correo debe terminar en @correounivalle.edu.co"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "No se pudo completar el registro por correo erroneo",
            });
        }
    });
}
