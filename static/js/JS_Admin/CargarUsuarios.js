document.addEventListener("DOMContentLoaded", CargarRegistros); // Cargar registros al cargar la página

let filtrar = [];

// Función para abrir el modal y cargar usuarios
function AbrirModal() {
    document.getElementById('administrar').style.display = 'block';
    CargarUsuarios('todos');
}

function CargarUsuarios(filtro) {
    filtrar = []; // Limpiar el array de índices filtrados

    const tabla = document.getElementById('Tabla');
    tabla.innerHTML = '';

    let url = `/obtener_usuarios/${filtro}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach((usuario, index) => {
                    
                    const Carta = VisualizacionUsuario(usuario, index);
                    tabla.appendChild(Carta);
                    
                });
            } else {
                console.error('La respuesta del servidor no contiene usuarios o no es un array');
            }
        })
        .catch(error => console.error('Error al cargar usuarios desde la base de datos:', error));
}
