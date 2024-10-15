let resultadosFiltrados = [];
function BuscarReportes(event) {
    
    event.preventDefault();

    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const AntiguoReciente = document.getElementById("ordenarRecienteAntiguo").value;
    const estado = document.getElementById("Estado").value;
    const desarrollo = document.getElementById("Desarrollo").value;
    const reciente = document.getElementById("Reciente").value;

  
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const codigo_usuario = LogUsuario.codigo;

    let url = `/buscar_reportes?codigo_usuario=${codigo_usuario}&lugar=${lugar}&item=${item}&estado=${estado}&desarrollo=${desarrollo}&reciente=${reciente}&orden=${AntiguoReciente}`;

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

                        const Carta = PreVisualizacion(rec, index);
                        
                        contenedores.appendChild(Carta);
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
