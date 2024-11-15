function FiltrarRegistro(event) {
    event.preventDefault();

    const contenedor = document.getElementById("Muchos");
    contenedor.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos elementos

    // Obtener valores de los campos
    let nombre = document.getElementById("NombreUsuaio").value.toLowerCase();
    let lugar = document.getElementById("buscarLugar").value.toLowerCase();
    let item = document.getElementById("buscarItem").value.toLowerCase();
    let tiporeporte = document.getElementById("Tiporeporte").value.toLowerCase();
    let ordenar = document.getElementById("ordenarRecienteAntiguo").value;
    let estadoreporte = document.getElementById("Estadoreporte").value.toLowerCase();

    // Estado de los checkboxes
    let sinImagen = document.querySelector('input[name="sin_imagen"]:checked') ? document.querySelector('input[name="sin_imagen"]:checked').value === 'activado' : false;

    // Construir la URL para la solicitud al backend
    let url = `/filtrar_registros?nombre_usuario=${nombre}&lugar=${lugar}&item=${item}&tipo=${tiporeporte}&orden=${ordenar}&estado=${estadoreporte}&sinImagen=${sinImagen}`;

    // Realizar la solicitud al backend
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Filtrar registros localmente (opcional)
            let filtrados = data.registros || [];

            // Filtros locales adicionales (solo si es necesario)
            if (nombre) filtrados = 
            filtrados.filter(record => record.nombre.toLowerCase().includes(nombre));
            if (lugar) filtrados = filtrados.filter(record => record.lugar.toLowerCase().includes(lugar));
            if (item) filtrados = filtrados.filter(record => record.item.toLowerCase().includes(item));
            if (tiporeporte) filtrados = filtrados.filter(record => record.tiporeporte.toLowerCase() === tiporeporte);
            if (estadoreporte) filtrados = filtrados.filter(record => record.estadoreporte && record.estadoreporte.toLowerCase() === estadoreporte);
            if (sinImagen) filtrados = filtrados.filter(record => record.imagen);

            // Ordenar registros por fecha
            filtrados.sort((a, b) => (ordenar === "Reciente" ? new Date(b.fecha) - new Date(a.fecha) : new Date(a.fecha) - new Date(b.fecha)));

            // Mostrar los registros filtrados en el contenedor
            if (filtrados.length > 0) {
                filtrados.forEach(record => {
                    const carta = PreVisualizacion(record);
                    contenedor.appendChild(carta);
                });
            } else {
                contenedor.innerHTML = "<p>No se encontraron reportes con estos criterios de búsqueda.</p>";
            }
        })
        .catch(error => {
            console.error('Error al obtener registros:', error);
            contenedor.innerHTML = "<p>Error al obtener registros del servidor</p>";
        });

    document.getElementById("Filtrar").style.display = "none";
}