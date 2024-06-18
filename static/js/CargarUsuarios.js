let filtrar = [];

// Función para abrir el modal y cargar usuarios
function AbrirModal() {
    document.getElementById('administrar').style.display = 'block';
    CargarUsuarios('todos');
}

// Función para cargar usuarios desde la base de datos o localStorage según filtro
function CargarUsuarios(filtro) {
    filtrar = []; // Limpiar el array de índices filtrados

    const tabla = document.getElementById('Tabla');
    tabla.innerHTML = '';

    if (filtro === 'todos') {
        // Cargar todos los usuarios desde la base de datos
        fetch('/obtener_usuarios/todos')
            .then(response => response.json())
            .then(data => {
                data.forEach((usuario, index) => {
                    const uniqueId = `user-${index}`;

                    tabla.innerHTML += `
                        <div class="w3-row w3-padding-16 w3-white w3-border">
                            <div class="w3-col m2 w3-padding-small">
                                <b>Código: </b> ${usuario.codigo}
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
                                <input class="w3-input" type="text" id="nombre-${uniqueId}" value="${usuario.nombre}" readonly></input>
                            </div>

                            <div class="w3-col m3 w3-padding-small">
                                <b>Contraseña:</b>
                                <input class="w3-input" type="text" id="contraseña-${uniqueId}" value="${usuario.contraseña}" readonly></input>
                            </div>

                            <div class="w3-col m2 w3-padding-small">
                                <button class="w3-button w3-red w3-block w3-select" onclick="EditarUsuario('${uniqueId}')">Editar</button>
                                <button class="w3-button w3-red w3-block" onclick="ConfirmarEliminacion('${uniqueId}')">Borrar</button>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => console.error('Error al cargar usuarios desde la base de datos:', error));
    } else {
        // Cargar usuarios filtrados desde la base de datos
        fetch(`/obtener_usuarios/${filtro}`)
            .then(response => response.json())
            .then(data => {
                data.forEach((usuario, index) => {
                    const uniqueId = `user-${index}`;

                    tabla.innerHTML += `
                        <div class="w3-row w3-padding-16 w3-white w3-border">
                            <div class="w3-col m2 w3-padding-small">
                                <b>Código: </b> ${usuario.codigo}
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
                                <input class="w3-input" type="text" id="nombre-${uniqueId}" value="${usuario.nombre}" readonly></input>
                            </div>

                            <div class="w3-col m3 w3-padding-small">
                                <b>Contraseña:</b>
                                <input class="w3-input" type="text" id="contraseña-${uniqueId}" value="${usuario.contraseña}" readonly></input>
                            </div>

                            <div class="w3-col m2 w3-padding-small">
                                <button class="w3-button w3-red w3-block w3-select" onclick="EditarUsuario('${uniqueId}')">Editar</button>
                                <button class="w3-button w3-red w3-block" onclick="ConfirmarEliminacion('${uniqueId}')">Borrar</button>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => console.error('Error al cargar usuarios desde la base de datos:', error));
    }
}

// Función para guardar cambios de usuarios
function GuardarCambios() {
    const usuariosActualizados = [];

    // Recorrer todos los elementos de la tabla
    const elementosUsuario = document.querySelectorAll('[id^="user-"]');
    elementosUsuario.forEach(elemento => {
        const uniqueId = elemento.id.split('-')[1];

        // Obtener los valores actualizados del usuario
        const codigo = document.getElementById(`codigo-${uniqueId}`).innerText;
        const estado = document.getElementById(`estado-${uniqueId}`).value;
        const nombre = document.getElementById(`nombre-${uniqueId}`).value;
        const contraseña = document.getElementById(`contraseña-${uniqueId}`).value;

        // Crear objeto con los datos del usuario actualizado
        const usuarioActualizado = {
            codigo: codigo,
            estado: estado,
            nombre: nombre,
            contraseña: contraseña
        };

        // Agregar usuario actualizado al array
        usuariosActualizados.push(usuarioActualizado);
    });

    // Enviar datos al backend para guardarlos
    fetch('/guardar_cambios_usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarios: usuariosActualizados })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Cambios guardados correctamente');
        // Aquí puedes añadir más lógica si deseas actualizar la interfaz o realizar alguna acción adicional después de guardar
    })
    .catch(error => {
        console.error('Error al guardar cambios:', error);
        alert('Error al guardar cambios. Por favor, intenta de nuevo.');
    });
}
