let filtrar = [];

// Función para abrir el modal y cargar usuarios
function AbrirModal() {
    document.getElementById('administrar').style.display = 'block';
    CargarUsuarios('todos');
}

// Función para cargar usuarios desde la base de datos o localStorage según filtro
function CargarUsuarios(filtro) {
    const tabla = document.getElementById('Tabla');
    tabla.innerHTML = '';

    if (filtro === 'todos') {
        // Cargar todos los usuarios desde la base de datos
        fetch(`/obtener_usuarios/${filtro}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(usuario => {
                    tabla.innerHTML += `
                        <div class="w3-row w3-padding-16 w3-white w3-border">
                            <div class="w3-col m2 w3-padding-small">
                                <b>Codigo: </b> ${usuario.codigo}
                            </div>
                            <div class="w3-col m2 w3-padding-small">
                                <b> Estado: </b>
                                <select class="w3-select" disabled>
                                    <option value="Admin" ${usuario.tipo === 'Admin' ? 'selected' : ''}>Admin</option>
                                    <option value="Usuario" ${usuario.tipo === 'Usuario' ? 'selected' : ''}>Usuario</option>
                                </select>
                            </div>
                            <div class="w3-col m3 w3-padding-small">
                                <b>Nombre:</b>
                                <input class="w3-input" type="text" id="nombre-${usuario.id}" value="${usuario.nombre}" readonly>
                            </div>
                            <div class="w3-col m3 w3-padding-small">
                                <b>Contraseña:</b>
                                <input class="w3-input" type="text" id="contraseña-${usuario.id}" value="${usuario.contraseña}" readonly>
                            </div>
                            <div class="w3-col m2 w3-padding-small">
                                <button class="w3-button w3-red w3-block w3-select" onclick="EditarUsuario(${usuario.id})">Editar</button>
                                <button class="w3-button w3-red w3-block" onclick="ConfirmarEliminacion(${usuario.id})">Borrar</button>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => console.error('Error al cargar usuarios desde la base de datos:', error));
    } else {
        // Cargar usuarios filtrados desde localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuariosFiltrados = usuarios.filter(usuario => usuario.tipo === filtro);

        usuariosFiltrados.forEach(usuario => {
            tabla.innerHTML += `
                <div class="w3-row w3-padding-16 w3-white w3-border">
                    <div class="w3-col m2 w3-padding-small">
                        <b>Codigo: </b> ${usuario.codigo}
                    </div>
                    <div class="w3-col m2 w3-padding-small">
                        <b> Estado: </b>
                        <select class="w3-select" disabled>
                            <option value="Admin" ${usuario.tipo === 'Admin' ? 'selected' : ''}>Admin</option>
                            <option value="Usuario" ${usuario.tipo === 'Usuario' ? 'selected' : ''}>Usuario</option>
                        </select>
                    </div>
                    <div class="w3-col m3 w3-padding-small">
                        <b>Nombre:</b>
                        <input class="w3-input" type="text" value="${usuario.nombre}" readonly>
                    </div>
                    <div class="w3-col m3 w3-padding-small">
                        <b>Contraseña:</b>
                        <input class="w3-input" type="text" value="${usuario.contraseña}" readonly>
                    </div>
                    <div class="w3-col m2 w3-padding-small">
                        <button class="w3-button w3-red w3-block w3-select" onclick="EditarUsuario(${usuario.id})">Editar</button>
                        <button class="w3-button w3-red w3-block" onclick="ConfirmarEliminacion(${usuario.id})">Borrar</button>
                    </div>
                </div>
            `;
        });
    }
}

// Función para editar un usuario
function EditarUsuario(index) {
    const nombreInput = document.getElementById(`nombre-${index}`);
    const contraseñaInput = document.getElementById(`contraseña-${index}`);
    const estadoSelect = document.getElementById(`estado-${index}`);

    // Verificar si se encontraron los elementos
    if (nombreInput && contraseñaInput && estadoSelect) {
        nombreInput.readOnly = false;
        contraseñaInput.readOnly = false;
        estadoSelect.disabled = false;
    } else {
        console.error(`No se encontraron elementos para el índice ${index}`);
    }
}

// Función para confirmar eliminación de un usuario
function ConfirmarEliminacion(index) {
    // Lógica para confirmar eliminación, por ejemplo:
    console.log(`Confirmar eliminación del usuario con índice ${index}`);
}
