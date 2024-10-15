function Estado() {

    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

    if (!LogUsuario) {
        console.error("No hay usuario iniciado sesión");
        return;
    }

    const codigo = LogUsuario.codigo;

    fetch(`/obtener_registros/${codigo}`)
        .then(response => response.json())
        .then(data => {
            const contenedores = document.getElementById("Contenedores");

            if (data.length === 0) {
                contenedores.innerHTML = "<p> Sin registros hechos por ahora</p>";
            } else {
                contenedores.innerHTML = "";

                data.forEach((recuerdo, index) => {
                   
                    const Carta = PreVisualizacion(recuerdo, index);

                    contenedores.appendChild(Carta);
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
        });
}
