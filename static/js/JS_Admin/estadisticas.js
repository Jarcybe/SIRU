function abrirVentanaEstadisticas() {
    // Crear la ventana modal
    const modal = document.createElement('div');
    modal.className = 'w3-modal';
    modal.style.display = 'block';

    const modalContent = `
        <div class="w3-modal-content w3-animate-zoom">
            <header class="w3-container w3-red">
                <span onclick="document.body.removeChild(this.parentNode.parentNode.parentNode)" 
                      class="w3-button w3-xlarge w3-hover-grey w3-display-topright" title="Cerrar">&times;</span>
                <h2>Datos Estadísticos</h2>
            </header>
            <div class="w3-container">
                <label for="filtroEstado">Filtrar por estado:</label>
                <select id="filtroEstado" class="w3-select w3-border">
                    <option value="todos">Todos</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Terminado">Terminado</option>
                </select>
                <button onclick="aplicarFiltro()" class="w3-button w3-green">Aplicar Filtro</button>
                
                <p id="estadisticas"></p>
                <canvas id="graficoReportesPorZona" width="400" height="200"></canvas>
                <h3>Reportes por Ítem</h3>
                <table id="tablaReportesPorItem" class="w3-table w3-bordered">
                    <thead>
                        <tr>
                            <th>Ítem</th>
                            <th>Total de Reportes</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <h3>Reportes por Desarrollo</h3>
                <table id="tablaReportesPorDesarrollo" class="w3-table w3-bordered">
                    <thead>
                        <tr>
                            <th>Encargado</th>
                            <th>Total de Reportes</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    `;
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Llamar a las funciones para cargar los datos
    cargarDatosEstadisticos();
    cargarReportesPorZona();
    cargarReportesPorItem();
    cargarReportesPorDesarrollo();
}

function aplicarFiltro() {
    const estadoSeleccionado = document.getElementById('filtroEstado').value;

    // Llamar a las funciones para cargar los datos filtrados
    cargarDatosEstadisticos(estadoSeleccionado);
    cargarReportesPorZona(estadoSeleccionado);
    cargarReportesPorItem(estadoSeleccionado);
    cargarReportesPorDesarrollo(estadoSeleccionado);
}

function cargarDatosEstadisticos(estado) {
    let url = '/obtener_estadisticas';
    if (estado && estado !== 'todos') {
        url += `?estado=${estado}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const estadisticasElement = document.getElementById('estadisticas');
            estadisticasElement.innerHTML = `
                <strong>Total de reportes:</strong> ${data.totalReportes}<br>
                <strong>Reportes en proceso:</strong> ${data.reportesEnProceso}<br>
                <strong>Reportes completados:</strong> ${data.reportesCompletados}<br>
            `;
        })
        .catch(error => {
            console.error('Error al cargar los datos estadísticos:', error);
        });
}

function cargarReportesPorZona(estado) {
    let url = '/obtener_reportes_por_zona';
    if (estado && estado !== 'todos') {
        url += `?estado=${estado}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoReportesPorZona').getContext('2d');
            const zonas = data.map(item => item.lugar);
            const totalReportes = data.map(item => item.total_reportes);

            const grafico = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: zonas,
                    datasets: [{
                        label: 'Total de Reportes por Zona',
                        data: totalReportes,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los reportes por zona:', error);
        });
}

function cargarReportesPorItem(estado) {
    let url = '/obtener_reportes_por_item';
    if (estado && estado !== 'todos') {
        url += `?estado=${estado}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.getElementById('tablaReportesPorItem').querySelector('tbody');
            tablaBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.item}</td><td>${item.total_reportes}</td>`;
                tablaBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los reportes por ítem:', error);
        });
}

function cargarReportesPorDesarrollo(estado) {
    let url = '/obtener_reportes_por_desarrollo';
    if (estado && estado !== 'todos') {
        url += `?estado=${estado}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.getElementById('tablaReportesPorDesarrollo').querySelector('tbody');
            tablaBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.nombreencargado}</td><td>${item.total_reportes}</td>`;
                tablaBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar los reportes por desarrollo:', error);
        });
}
