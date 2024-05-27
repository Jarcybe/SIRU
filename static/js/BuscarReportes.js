function BuscarReportes(event) {
    event.preventDefault();

    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const AntiguoReciente = document.getElementById("ordenarRecienteAntiguo").value;
    const estado = document.getElementById("Estado").value;
    const desarrollo = document.getElementById("Desarrollo").value;
    const reciente = document.getElementById("Reciente").value;

    // Hacer una solicitud al servidor para buscar los reportes
    fetch('/buscar_reportes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lugar: lugar,
            item: item,
            AntiguoReciente: AntiguoReciente,
            estado: estado,
            desarrollo: desarrollo,
            reciente: reciente
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta del servidor y actualizar la interfaz de usuario
        if (data.success) {
            const contenedores = document.getElementById("Contenedores");
            contenedores.innerHTML = "";

            if (data.reportes.length === 0) {
                contenedores.innerHTML = "<p> Ningún reporte encontrado.</p>";
            } else {
                data.reportes.forEach((rec, index) => {
                    const carta = document.createElement("div");
                    carta.className = "w3-col m5 w3-card w3-margin";

                    carta.innerHTML = `
                        <div class="w3-container">
                            <h3>${rec.titulo}</h3>
                            <div class="w3-border w3-light-grey" 
                            style="height: 150px;"></div> 
                            <button class="w3-button w3-block w3-red" 
                            onclick="VisualRegistro(${index})">Ver detalles</button>
                        </div>
                    `;
                    contenedores.appendChild(carta);
                });
            }
            document.getElementById('buscar').style.display = 'none';
        } else {
            alert('Error al buscar reportes.');
        }
    })
    .catch(error => {
        console.error('Error al buscar reportes:', error);
        alert('Error al buscar reportes. Por favor, inténtelo de nuevo más tarde.');
    });
}
