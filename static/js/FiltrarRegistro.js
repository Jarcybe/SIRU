function FiltrarRegistro(event) {
    event.preventDefault();

    const codigoNombre = document.getElementById("CodigoNombre").value.toLowerCase();
    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const estado = document.getElementById("Estado").value.toLowerCase();
    const desarrollo = document.getElementById("Desarrollo").value.toLowerCase();
    const orden = document.getElementById("ordenarRecienteAntiguo").value.toLowerCase();

    const parametros = {
        codigo_nombre: codigoNombre,
        lugar: lugar,
        item: item,
        estado: estado,
        desarrollo: desarrollo,
        orden: orden
    };

    fetch('/filtrar-registros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros)
    })
    .then(response => response.json())
    .then(data => {
        MostrarRegistrosFiltrados(data);
    })
    .catch(error => {
        console.error('Error al filtrar registros:', error);
    });
}

function MostrarRegistrosFiltrados(registros) {
    const contenedor = document.getElementById("Muchos");

    if (registros.length === 0) {
        contenedor.innerHTML = "<p>Ningún registro coincide con los criterios de búsqueda</p>";
    } else {
        contenedor.innerHTML = "";

        registros.forEach(record => {
            const carta = document.createElement("div");
            carta.className = "w3-card w3-margin w3-white";
            carta.innerHTML = `
                <header class="w3-container w3-center w3-red">
                    <h2>${record.titulo}</h2>
                </header>
                <p><b>Fecha: </b>${record.fecha}</p>
                <p><b>Usuario: </b>${record.codigo} (${record.nombre})</p>
                <p>${record.descripcion}</p>
                <footer class="w3-container w3-grey">
                    <button class="w3-button w3-block" onclick="ConfiDeRegistro(${index})">SABER MAS >></button>
                </footer>
            `;
            contenedor.appendChild(carta);
        });
    }
}
