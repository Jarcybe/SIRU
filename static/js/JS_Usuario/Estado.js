function Estado() {

    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const contenedores = document.getElementById("Contenedores");

    if (!LogUsuario) {
        console.error("No hay usuario iniciado sesión");
        return;
    }

    const correo = LogUsuario.correo;
    
    fetch(`/obtener_registros/${correo}`)
        .then(response => response.json())
        .then(data => {
            const registros = data;
           
            if (registros.length === 0) {
                contenedores.innerHTML = "<p> Sin reportes hechos por ahora</p>";
            } else {
                contenedores.innerHTML = "";

                registros.forEach(recuerdo => {
                   
                    const Carta = PreVisualizacion(recuerdo);

                    contenedores.appendChild(Carta);
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
        });
}
