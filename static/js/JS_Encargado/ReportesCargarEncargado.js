function Mostrar(){
    
    const visualizarreporte = document.getElementById('Reportes');
    const datos = document.getElementById('Datos');
    const botoncitro = document.getElementById('BotoncitoCambiante');
    const icono = document.getElementById('iconocambiante');

    if(visualizarreporte.style.display === 'block'){
       
        visualizarreporte.style.display = 'none';
        datos.style.display = 'block';
        icono.src = "../static/images/IconoCrear.png";
        icono.title = "Ver reportes";
    
    }else{

        visualizarreporte.style.display = 'block';
        datos.style.display = 'none';
        icono.src = "../static/images/IconoTareas.png";
        icono.title = "Ver tareas";
        CargarReportesEncargados();
    }
}


function CargarReportesEncargados() {
    const contenedor = document.getElementById("Reportes");
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

    if(!LogUsuario){
        console.error("No hay usuario iniciado sesión")
        return;   
    }

    const correo = LogUsuario.correo;

    fetch(`/obtener_reportes_por_claseitem/${correo}`)
        .then(response => response.json())
        .then(data => {
            const registros = data;

            if (registros.length === 0) {
                contenedor.innerHTML = "<p>No hay registros :P</p>";
            } else {
                contenedor.innerHTML = "";

                registros.forEach(record => {

                    const carta = PreVisualizacion(record);
                  
                    contenedor.appendChild(carta);
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los registros desde el backend:', error);
            contenedor.innerHTML = "<p>Error al cargar los registros.</p>";
        });
}