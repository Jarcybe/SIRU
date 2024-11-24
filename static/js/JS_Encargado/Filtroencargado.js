function FiltrarRegistro(event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

    // Ocultar los reportes y mostrar el área de carga
    const visualizarreporte = document.getElementById('Reportes');
    const datos = document.getElementById('Datos');
    const botoncitro = document.getElementById('BotoncitoCambiante');
    const icono = document.getElementById('iconocambiante');

    visualizarreporte.style.display = 'none';
    datos.style.display = 'block';  // Mostrar área de carga

    // Obtener valores de los campos
    let nombre = document.getElementById("NombreUsuaio").value.toLowerCase();
    let lugar = document.getElementById("buscarLugar").value.toLowerCase();
    let item = document.getElementById("buscarItem").value.toLowerCase();
    let tiporeporte = document.getElementById("Tiporeporte").value.toLowerCase();
    let ordenar = document.getElementById("ordenarRecienteAntiguo").value;
    let estadoreporte = document.getElementById("Estadoreporte").value.toLowerCase();

    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const logueadotipo = LogUsuario.tipo;

    // Estado de los checkboxes
    let sinImagen = document.querySelector('input[name="sin_imagen"]:checked') ? document.querySelector('input[name="sin_imagen"]:checked').value === 'activado' : false;

    // Construir la URL para la solicitud al backend
    let url = `/filtrar_registros_encargado?logueadotipo=${logueadotipo}&nombre=${nombre}&lugar=${lugar}&item=${item}&tipo=${tiporeporte}&orden=${ordenar}&estado=${estadoreporte}&sinImagen=${sinImagen}`;

    // Realizar la solicitud al backend
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            return response.json();
        })
        .then(data => {
            let registros = data.registros || [];
            const contenedor = document.getElementById("Reportes");
            contenedor.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos elementos

            if (registros.length > 0) {
                registros.forEach(record => {
                    const carta = PreVisualizacionEncargado(record);
                    contenedor.appendChild(carta);
                });
            } else {
                contenedor.innerHTML = "<p>No se encontraron reportes con estos criterios de búsqueda.</p>";
            }

            // Mostrar nuevamente los reportes y ocultar el área de carga
            visualizarreporte.style.display = 'block';
            datos.style.display = 'none';

            // Cambiar el icono y el título del botón
            icono.src = "../static/images/IconoTareas.png";
            icono.title = "Ver tareas";
        })
        .catch(error => {
            console.error('Error al obtener registros:', error);
            contenedor.innerHTML = "<p>Error al obtener registros del servidor</p>";

            // Mostrar nuevamente los reportes y ocultar el área de carga
            visualizarreporte.style.display = 'block';
            datos.style.display = 'none';

            // Cambiar el icono y el título del botón
            icono.src = "../static/images/IconoTareas.png";
            icono.title = "Ver tareas";
        });

        document.getElementById("Filtrarrepoetencargado").style.display = "none";
}