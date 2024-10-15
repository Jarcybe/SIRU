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

    // Obtener el estado de los checkboxes
    let titulos = document.querySelector('input[name="titulos"]:checked') ? document.querySelector('input[name="titulos"]:checked').value === 'activado' : false;
    let resueltos = document.querySelector('input[name="resueltos"]:checked') ? document.querySelector('input[name="resueltos"]:checked').value === 'activado' : false;
    let sinImagen = document.querySelector('input[name="sin_imagen"]:checked') ? document.querySelector('input[name="sin_imagen"]:checked').value === 'activado' : false;

    // Construir la URL base para la solicitud al backend
    let url = `/obtener_registros?codigo=${codigo}&lugar=${lugar}&item=${item}&estado=${estado}&orden=${ordenar}&desarrollo=${desarrollo}&titulos=${titulos}&resueltos=${resueltos}&sinImagen=${sinImagen}`;

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
                    record.desarrollo && record.desarrollo.toLowerCase() === desarrollo.toLowerCase()
                );
            }

            // Filtrar por títulos (juntar y responder por títulos iguales)
            if (titulos) {
                const grupos = {};
                filtrados.forEach(record => {
                    if (!grupos[record.titulo]) {
                        grupos[record.titulo] = [];
                    }
                    grupos[record.titulo].push(record);
                });

             const gruposOrdenados = Object.values(grupos).flatMap(grupo => {
                    return grupo.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                });

                filtrados = gruposOrdenados;
            }

            // Filtrar por resueltos (que no aparezcan los que ya fueron resueltos)
            if (resueltos) {
                filtrados = filtrados.filter(record =>
                    !(record.desarrollo === 'Terminado' && record.comentario && record.encargado)
                );
            }

            // Filtrar por sin imagen (que no aparezcan los que no tienen imagen)
            if (sinImagen) {
                filtrados = filtrados.filter(record =>
                    record.imagen !== null && record.imagen !== undefined && record.imagen !== ""
                );
            }

            // Ordenar por fecha
            if (ordenar === "Reciente") {
                filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            } else if (ordenar === "Antiguo") {
                filtrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            }

            // Mostrar los registros filtrados en el contenedor
            if (filtrados.length > 0) {
                filtrados.forEach((record) => {
                    
                    carta = PreVisualizacion(record);

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


