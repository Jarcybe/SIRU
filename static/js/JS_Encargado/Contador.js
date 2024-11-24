function cargarContador() {
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const logueadotipo = LogUsuario.tipo;

    fetch(`/contar_reportes?logueadotipo=${logueadotipo}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }

            document.getElementById("totalTareas").innerText = data.total;
            document.getElementById("tareasEnProgreso").innerText = data.en_desarrollo;
            document.getElementById("tareasCompletadas").innerText = data.completados;
        })
        .catch(error => {
            console.error('Error al obtener estadísticas:', error);
        });
}

// Llamar a la función cuando la página se carga
window.onload = cargarContador;