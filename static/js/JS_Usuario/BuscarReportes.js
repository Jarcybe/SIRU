let resultadosFiltrados = [];
function BuscarReportes(event) {
    
    event.preventDefault();

    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const AntiguoReciente = document.getElementById("ordenarRecienteAntiguo").value;
    const Tipo = document.getElementById("Tipo").value;
    const Estado = document.getElementById("Estado").value;
    //const Retroalimentacion = document.getElementById("Retroalimentacion").value;

  
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    const correo_usuario = LogUsuario.correo;
                                                                                                           //&retroalimentacion=${Retroalimentacion}                            
    let url = `/buscar_reportes?correo_usuario=${correo_usuario}&lugar=${lugar}&item=${item}&tipo=${Tipo}&estado=${Estado}&orden=${AntiguoReciente}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const registros = data.registros;
                resultadosFiltrados = registros;
              
                const contenedores = document.getElementById("Contenedores");
                contenedores.innerHTML = "";

                if (registros.length === 0) {
                    contenedores.innerHTML = "<p>No se encontraron reportes con estos criterios de búsqueda.</p>";
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
