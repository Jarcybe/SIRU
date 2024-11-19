function Registro(event) {
    event.preventDefault(); // Evitar el envío por defecto

    const correo = document.getElementById("CorreoR").value;
    const nombre = document.getElementById("NombreR").value;
    const password = document.getElementById("ContraseñaR").value;
    const confirmar = document.getElementById("ConfirmarR").value;
    const BotonRegistrar = document.getElementById("botonregistrarse");
    
    BotonRegistrar.disabled = true;

    // Verificación de contraseñas
    if (!validarContraseña(password, confirmar)) {
        Swal.fire({
          icon: "warning",
          title: "Las contraseñas no coinciden.",
        });
        BotonRegistrar = false;
        return;
    }

    // Se valida si el formato de la contraseña es el adecuado
    if (!validarFormato(password)) {
        Swal.fire({
            icon: "warning",
            title: "Avsio",
            text: "El formato de la contraseña es invalido, debe llevar mayúsculas, números y mínimo 5 caracteres.",
        });
        BotonRegistrar = false;
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
    .then(async response => {
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
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

        BotonRegistrar.textContent = "Espere 3 minutos...";
        BotonRegistrar.title = "Debes esperar 3 minutos antes de intentarlo de nuevo"

        setTimeout(() => {
            BotonRegistrar.disabled = false;
            BotonRegistrar.textContent = "Registrarse";
            BotonRegistrar.title = "Registrarme";
        }, 3*60*1000);
    })
    .catch(error => {
        console.error('Error al procesar la solicitud:', error);
        BotonRegistrar.disabled = false;
        
        if (error.message === 'CorreoExistente') {
            Swal.fire({
                icon: 'warning',
                title: 'Registro fallido',
                text: 'Este correo ya fue registrado',
            });
        } else if (error.message === 'CorreoInvalido') {
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
