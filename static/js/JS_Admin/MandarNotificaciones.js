document.addEventListener('DOMContentLoaded', function() {
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const correo = LogUsuario.correo;

    // Verifica si el correo es válido
    if (!correo) {
        console.error('No se encontró el correo en el localStorage');
        return;
    }

    fetch(`/get_users/${correo}`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('Verelusuario');
            select.innerHTML = '<option value="" selected>Usuario en cuestión</option>'; // Resetear y añadir opción predeterminada

            data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.correo;
                option.textContent = user.correo;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
});

function enviarNotificacion() {
    const destinatario = document.getElementById('Verelusuario').value;
    const mensaje = document.getElementById('MensajeAMandar').value;
    const fecha = obtenerFechaActual();
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
   
    const correo = LogUsuario.correo;
    const nombreautor = LogUsuario.nombre;

    // Validar que los campos no estén vacíos
    if (!destinatario || !mensaje.trim()) {
        alert('Por favor, selecciona un destinatario y escribe un mensaje.');
        return;
    }

    fetch('/enviar_notificacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            correoautor: correo,
            fecha: fecha,
            mensaje: mensaje,
            destino: destinatario,
            nombreautor: nombreautor
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: 'error'
            });
            
        } else {
            
            Swal.fire({
                title: "Éxito",
                text: data.message,
                icon: 'success'
            });
            document.getElementById("Verelusuario").value = "";
            document.getElementById("MensajeAMandar").value = "";

        }
    })
    .catch(error =>{ 
        console.error('Error al mandar notificacion:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al mandar la notificacion",
            icon: 'error'
        });
    });
}