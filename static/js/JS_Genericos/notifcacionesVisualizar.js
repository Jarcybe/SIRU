document.addEventListener("DOMContentLoaded", () => {
    const notificacionesContainer = document.getElementById("notificacion");

    function Cargarnotis() {
        const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

        if (!LogUsuario) {
            console.error("No hay usuario iniciado sesión");
            return;
        }

        const correo = LogUsuario.correo;

        fetch(`conseguir_notis/${correo}`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            notificacionesContainer.innerHTML = "<p>No tienes notificaciones</p>";
        } else {
            mostrarnotis(data);
        }
    })
    .catch(error => {
        console.error("Error al obtener las notificaciones:", error);
    });
    }

    function mostrarnotis(notificaciones) {
        notificacionesContainer.innerHTML = ""; // Limpiar contenedor
        notificaciones.forEach(notificacion => {
            const notiElement = crearNotificacion(notificacion);
            notificacionesContainer.appendChild(notiElement);
        });
    }

    function crearNotificacion(notificacion) {
    
        const noti = document.createElement("div");
        noti.className = "w3-col m5 w3-card w3-margin w3-border w3-hover-shadow";
        noti.style.padding = "10px";
        noti.style.cursor = "pointer";
        noti.innerHTML = `
            <p><b>${notificacion.fecha}</b></p>
            <small>${notificacion.fkcorreousuario} </small>
            <p>${notificacion.enunciado}</p>
            <p><b>${notificacion.vistonovisto ? "Visto" : "No visto"}</b></p>
        `;
        noti.addEventListener("mouseenter", () => marcarComoVisto(notificacion.idnotificacion));
        return noti;
    }

    function marcarComoVisto(idNotificacion) {
        fetch(`/marcar_como_visto/${idNotificacion}`, { 
            method: "POST" })
            .then(response => {
                if (response.ok) {
                    Cargarnotis(); // Recargar notificaciones
                }
            })
            .catch(error => console.error("Error al marcar como visto:", error));
    }
    Cargarnotis();
});


function mostrarMensaje() {
    document.getElementById('notificacion').style.display = 'none';
    document.getElementById('peticion').style.display = 'block';
    document.getElementById('Opciones').style.display = 'none';  // Ocultar opciones
}

// Función para cancelar la petición y volver a notificaciones
function cancelarMensaje() {
    document.getElementById('peticion').style.display = 'none';
    document.getElementById('notificacion').style.display = 'block';
    document.getElementById('Opciones').style.display = 'block';  // Mostrar opciones nuevamente
}
