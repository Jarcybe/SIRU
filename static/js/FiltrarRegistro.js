function FiltrarRegistro(event) {
    event.preventDefault();

    const contenedor = document.getElementById("Muchos");
    contenedor.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos elementos

    const codigo = document.getElementById("CodigoNombre").value.toLowerCase();
    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const estado = document.getElementById("Estado").value;
    const ordenar = document.getElementById("ordenarRecienteAntiguo").value;
    const desarrollo = document.getElementById("Desarrollo").value;
    const titulos = document.querySelector('input[name="titulos"]:checked').value === 'activado';
    const resueltos = document.querySelector('input[name="resueltos"]:checked').value === 'activado';

    // Construir la URL base para la solicitud al backend
    let url = `/api/registros?codigo=${codigo}&lugar=${lugar}&item=${item}&estado=${estado}&orden=${ordenar}&desarrollo=${desarrollo}&titulos=${titulos}&resueltos=${resueltos}`;

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
            let filtrados = data.registros;

            if (codigo) {
                filtrados = filtrados.filter(record =>
                    record.codigo.toLowerCase().includes(codigo)
                );
            }

            if (lugar) {
                filtrados = filtrados.filter(record =>
                    record.lugar.toLowerCase().includes(lugar)
                );
            }

            if (item) {
                filtrados = filtrados.filter(record =>
                    record.item.toLowerCase().includes(item)
                );
            }

            if (estado) {
                filtrados = filtrados.filter(record =>
                    record.estado.toLowerCase() === estado.toLowerCase()
                );
            }

            if (desarrollo) {
                filtrados = filtrados.filter(record =>
                    record.desarrollo.toLowerCase() === desarrollo.toLowerCase()
                );
            }

            if (ordenar === "Reciente") {
                filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            } else if (ordenar === "Antiguo") {
                filtrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            }

            if (titulos) {
                const grupos = {};
                filtrados.forEach(record => {
                    if (!grupos[record.titulo] || new Date(grupos[record.titulo].fecha) < new Date(record.fecha)) {
                        grupos[record.titulo] = record;
                    }
                });
                filtrados = Object.values(grupos);
            }

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
                        <p><b>Usuario: </b>${record.codigo} (${record.nombre})</p>
                        <p>${record.descripcion}</p>
                        <footer class="w3-container w3-grey">
                            <button class="w3-button w3-block" onclick="ConfiDeRegistro(${index})">SABER MAS >></button>
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
