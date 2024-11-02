function Mostrar(){

    document.getElementById('Reportes').style.display = 'block';
    document.getElementById('Datos').style.display = 'none';

CargarRegistros();
}


function CargarRegistros() {
    const contenedor = document.getElementById("Reportes");

    fetch('/obtener_registros')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const registros = data.registros;

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