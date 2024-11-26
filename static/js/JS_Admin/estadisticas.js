function abrirVentanaEstadisticas() {
    // Crear la ventana modal
    const modal = document.createElement('div');
    modal.className = 'w3-modal';
    modal.style.display = 'block';

    const modalContent = `
        <div class="w3-modal-content w3-center w3-animate-zoom">
            <header class="w3-container w3-red">
                <span onclick="document.body.removeChild(this.parentNode.parentNode.parentNode)" 
                      class="w3-button w3-xlarge w3-hover-grey w3-display-topright" title="Cerrar">&times;</span>
                <h2>Datos Estadísticos</h2>
            </header>
            <div class="w3-container">
                <canvas id="graficoReportesPorZona" width="400" height="200"></canvas>
                <canvas id="graficoReportesPorEstado" width="400" height="200"></canvas>
                <canvas id="graficoReportesPorTipo" width="400" height="200"></canvas>
                <canvas id="graficoReportesPorLugar" width="400" height="200"></canvas>
<br>
                <button class="w3-button w3-center w3-red" 
                onclick="mostrarFormularioCorreo()">Enviar Informe</button>
                <br>
                <br>
            </div>
        </div>
    `;
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Llamar a las funciones para cargar los datos
    cargarReportesPorZona();
    cargarReportesPorEstado();
    cargarReportesPorTipo();
    cargarReportesPorLugar();
}

function mostrarFormularioCorreo() {
    // Crear la ventana modal para ingresar el correo
    const modalCorreo = document.createElement('div');
    modalCorreo.className = 'w3-modal';
    modalCorreo.style.display = 'block';

    const modalContentCorreo = `
        <div class="w3-modal-content w3-animate-zoom">
            <header class="w3-container w3-center w3-red">
                <span onclick="document.body.removeChild(this.parentNode.parentNode.parentNode)" 
                      class="w3-button w3-xlarge w3-hover-grey w3-display-topright" title="Cerrar">&times;</span>
                <p><h2>Enviar Informe por Correo</h2></p>
            </header>
            <div class="w3-container" style="text-align: center;">
                
                <label for="email">Correo Electrónico a quien se lo vayas a mandar:</label>
                <input class="w3-input w3-border"
                type="email" 
                id="email" 
                placeholder="Ingrese su correo" required>
                <br>
                <button class="w3-button w3-red w3-border"
                style="margin: 20px;"
                onclick="enviarInforme()">Enviar Informe</button>
<br>
            </div>
        </div>
    `;
    modalCorreo.innerHTML = modalContentCorreo;
    document.body.appendChild(modalCorreo);
}

function enviarInforme() {
    const email = document.getElementById('email').value;

    // Capturar las gráficas
    const canvasIds = ['graficoReportesPorZona', 'graficoReportesPorEstado', 'graficoReportesPorTipo', 'graficoReportesPorLugar'];
    let promises = [];

    // Capturar cada gráfico y convertirlo a imagen
    canvasIds.forEach(canvasId => {
        const canvas = document.getElementById(canvasId);
        promises.push(
            html2canvas(canvas).then(canvas => {
                return canvas.toDataURL('image/png'); // Convertir a imagen
            })
        );
    });

    // Esperar a que todas las imágenes se hayan capturado
    Promise.all(promises).then(images => {
        fetch('/enviar_informe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, images })  // Enviar imágenes como un array
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: "Exito",
                    text: "Informe enviado exitosamente.",
                    icon: 'success'
                }).then(() => {
                    location.reload(); 
                });
            } else {
                throw new Error('Error al enviar el informe');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al enviar el informe. Inténtelo más tarde",
                icon: 'error'
            })
        });
    }).catch(error => {
        console.error('Error al capturar las gráficas:', error);
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

function cargarReportesPorEstado() {
    fetch('/obtener_reportes_por_estado')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoReportesPorEstado').getContext('2d');
            const estados = data.map(item => item.estado);
            const totalReportes = data.map(item => item.total_reportes);

            const grafico = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: estados,
                    datasets: [{
                        label: 'Total de Reportes por Estado',
                        data: totalReportes,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Total de Reportes por Estado'
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los reportes por estado:', error);
        });
}

function cargarReportesPorTipo() {
    fetch('/obtener_reportes_por_tipo')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoReportesPorTipo').getContext('2d');
            const tipos = data.map(item => item.tipo);
            const totalReportes = data.map(item => item.total_reportes);

            const grafico = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: tipos,
                    datasets: [{
                        label: 'Total de Reportes por Tipo',
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
            console.error('Error al cargar los reportes por tipo:', error);
        });
}

function cargarReportesPorLugar() {
    fetch('/obtener_reportes_por_lugar')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoReportesPorLugar').getContext('2d');
            const lugares = data.map(item => item.lugar);
            const totalReportes = data.map(item => item.total_reportes);

            const grafico = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lugares,
                    datasets: [{
                        label: 'Total de Reportes por Lugar',
                        data: totalReportes,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
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
            console.error('Error al cargar los reportes por lugar:', error);
        });
}
