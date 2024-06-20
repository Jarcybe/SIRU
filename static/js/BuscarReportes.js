let resultadosFiltrados = [];
function BuscarReportes(event) {
    event.preventDefault();

    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const AntiguoReciente = document.getElementById("ordenarRecienteAntiguo").value;
    const estado = document.getElementById("Estado").value;
    const desarrollo = document.getElementById("Desarrollo").value;
    const reciente = document.getElementById("Reciente").value;

    // Supongamos que obtienes el código de usuario de localStorage
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const codigo_usuario = LogUsuario.codigo;

    // Construir la URL base para la solicitud al backend, incluyendo el código del usuario y los parámetros de búsqueda
    let url = `/buscar_reportes?codigo_usuario=${codigo_usuario}&lugar=${lugar}&item=${item}&estado=${estado}&desarrollo=${desarrollo}&reciente=${reciente}&orden=${AntiguoReciente}`;

    // Realizar la solicitud al servidor para buscar los registros
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const registros = data.registros;
                resultadosFiltrados = registros;
              
                const contenedores = document.getElementById("Contenedores");
                contenedores.innerHTML = "";

                if (registros.length === 0) {
                    contenedores.innerHTML = "<p>Ningún reporte encontrado con estos criterios de búsqueda</p>";
                } else {
                    registros.forEach((rec, index) => {
                        const carta = document.createElement("div");
                        carta.className = "w3-col m5 w3-card w3-margin";
                        const imagenHTML = rec.imagen ? `<img src="${rec.imagen}" class="w3-image">` : '<div class="w3-border w3-light-grey" style="height: 150px;"></div>';

                        carta.innerHTML = `
                            <div class="w3-container">
                                <h3><b>${rec.titulo}</b></h3>
                                ${imagenHTML}
                                <button class="w3-small w3-button w3-block w3-red"
                                    title="Ver detalles"
                                    onclick="VisualRegistro(${index}, true)">Ver detalles</button>
                            </div>
                        `;
                        contenedores.appendChild(carta);
                    });
                }
                document.getElementById('buscar').style.display = 'none';
            } else {
                alert("Error al buscar reportes: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error al buscar reportes:', error);
            alert("Error al buscar reportes");
        });
}
