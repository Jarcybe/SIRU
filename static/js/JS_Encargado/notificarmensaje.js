let idreporteasociado = null;
function notifcarmensaje(idreporte){

    document.getElementById('notificar').style.display = 'block';
    idreporteasociado = idreporte;
}

function limpiarmensaje() {
    // Limpia el contenido del textarea
    document.getElementById('MensajeAMandar').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    
    fetch('/obtener_administradores')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('VerAdmin');
            select.innerHTML = '<option value="" disabled selected>Admin en cuestión</option>'; // Resetear y añadir opción predeterminada

            data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.correo;
                option.textContent = user.correo;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar administradores:', error));
});

function MandarmensajeaAdmin() {
    const destinatario = document.getElementById('VerAdmin').value;
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

    fetch('/enviar_notificacion_administraciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            correoautor: correo,
            fecha: fecha,
            mensaje: mensaje,
            destino: destinatario,
            nombreautor: nombreautor,
            idreporte: idreporteasociado  // Incluye el ID del reporte
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            Swal.fire({
                title: "Error",
                text: data.error,
                icon: 'error'
            });
        } else {
            Swal.fire({
                title: "Éxito",
                text: data.message,
                icon: 'success'
            });
            document.getElementById("VerAdmin").value = "";
            document.getElementById("MensajeAMandar").value = "";
            idreporteasociado = null;
        }
    })
    .catch(error => { 
        console.error('Error al mandar notificación:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al mandar la notificación",
            icon: 'error'
        });
    });
}