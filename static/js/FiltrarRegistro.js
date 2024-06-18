function FiltrarRegistro(event) {
    event.preventDefault();

    const contenedor = document.getElementById("Muchos");
    contenedor.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos elementos

    let codigo = document.getElementById("CodigoNombre").value.toLowerCase();
    let lugar = document.getElementById("buscarLugar").value.toLowerCase();
    let item = document.getElementById("buscarItem").value.toLowerCase();
    let estado = document.getElementById("Estado").value.toLowerCase();
    let ordenar = document.getElementById("ordenarRecienteAntiguo").value;
    let desarrollo = document.getElementById("Desarrollo").value.toLowerCase();
    let titulos = document.querySelector('input[name="titulos"]:checked') ? document.querySelector('input[name="titulos"]:checked').value === 'activado' : false;
    let resueltos = document.querySelector('input[name="resueltos"]:checked') ? document.querySelector('input[name="resueltos"]:checked').value === 'activado' : false;

    // Construir la URL base para la solicitud al backend
    let url = `/obtener_registros?codigo=${codigo}&lugar=${lugar}&item=${item}&estado=${estado}&orden=${ordenar}&desarrollo=${desarrollo}&titulos=${titulos}&resueltos=${resueltos}`;

    // Realizar la solicitud al backend
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Filtrar registros en base a los criterios recibidos
            let filtrados = data.registros || [];

            // Filtrar por código
            if (codigo && codigo.trim() !== "") {
                filtrados = filtrados.filter(record =>
                    record.codigo.toLowerCase().includes(codigo.toLowerCase())
                );
            }

            // Filtrar por lugar
            if (lugar && lugar.trim() !== "") {
                filtrados = filtrados.filter(record =>
                    record.lugar.toLowerCase().includes(lugar.toLowerCase())
                );
            }

            // Filtrar por item
            if (item && item.trim() !== "") {
                filtrados = filtrados.filter(record =>
                    record.item.toLowerCase().includes(item.toLowerCase())
                );
            }

            // Filtrar por estado
            if (estado && estado.trim() !== "") {
                filtrados = filtrados.filter(record =>
                    record.estado.toLowerCase() === estado.toLowerCase()
                );
            }

            // Filtrar por desarrollo
            if (desarrollo && desarrollo.trim() !== "") {
                filtrados = filtrados.filter(record =>
                    record.desarrollo.toLowerCase() === desarrollo.toLowerCase()
                );
            }

            // Ordenar por fecha
            if (ordenar === "Reciente") {
                filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            } else if (ordenar === "Antiguo") {
                filtrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            }

            // Filtrar por títulos
            if (titulos) {
                const grupos = {};
                filtrados.forEach(record => {
                    if (!grupos[record.titulo] || new Date(grupos[record.titulo].fecha) < new Date(record.fecha)) {
                        grupos[record.titulo] = record;
                    }
                });
                filtrados = Object.values(grupos);
            }

            // Filtrar por resueltos
            if (resueltos) {
                filtrados = filtrados.filter(record =>
                    !(record.desarrollo === 'Terminado' && record.comentario && record.encargado)
                );
            }

            // Mostrar los registros filtrados en el contenedor
            if (filtrados.length > 0) {
                filtrados.forEach((record, index) => {
                    const carta = document.createElement("div");
                    carta.className = "w3-card w3-margin w3-white";

                    carta.innerHTML = `
                        <header class="w3-container w3-center w3-red">
                            <h2>${record.titulo}</h2>
                        </header>
                        <p><b>Fecha: </b>${record.fecha}</p>
                        <p><b>Usuario: </b>${record.codigo} (${record.nombre_usuario})</p>
                        <p>${record.descripcion}</p>
                        <footer class="w3-container w3-grey">
                            <button class="w3-button w3-block" onclick="ConfiDeRegistro(${record.id})">SABER MAS >></button>
                        </footer>
                    `;

                    contenedor.appendChild(carta);
                });
            } else {
                contenedor.innerHTML = "<p>Ningún reporte encontrado con estos criterios de búsqueda</p>";
            }
        })
        .catch(error => {
            console.error('Error al obtener registros:', error);
            contenedor.innerHTML = "<p>Error al obtener registros del servidor</p>";
        });

    document.getElementById("Filtrar").style.display = "none";
}
