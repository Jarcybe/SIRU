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
                    const uniqueId = `user-${index}`;

                    tabla.innerHTML += `
                        <div class="w3-row w3-padding-16 w3-white w3-border" id="${uniqueId}">
                            <div class="w3-col m2 w3-padding-small">
                                <b>Código: </b> <span id="codigo-${uniqueId}">${usuario.codigo}</span>
                            </div>
                            
                            <div class="w3-col m2 w3-padding-small">
                                <b>Estado: </b>
                                <select class="w3-select" id="estado-${uniqueId}" disabled>
                                    <option value="Admin" ${usuario.tipo === 'Admin' ? 'selected' : ''}>Admin</option>  
                                    <option value="Usuario" ${usuario.tipo === 'Usuario' ? 'selected' : ''}>Usuario</option>
                                </select>
                            </div>

                            <div class="w3-col m3 w3-padding-small">
                                <b>Nombre:</b>
                                <input class="w3-input" type="text" id="nombre-${uniqueId}" value="${usuario.nombre}" readonly>
                            </div>

                            <div class="w3-col m3 w3-padding-small">
                                <b>Contraseña:</b>
                                <input class="w3-input" type="text" id="contraseña-${uniqueId}" value="${usuario.contraseña}" readonly>
                            </div>

                            <div class="w3-col m2 w3-padding-small">
                                <button class="w3-button w3-red w3-block" onclick="EditarUsuario('${uniqueId}')">Editar</button>
                                <button class="w3-button w3-red w3-block" onclick="ConfirmarEliminacion('${uniqueId}')">Borrar</button>
                            </div>
                        </div>
                    `;
                });
            } else {
                console.error('La respuesta del servidor no contiene usuarios o no es un array');
            }
        })
        .catch(error => console.error('Error al cargar usuarios desde la base de datos:', error));
}
