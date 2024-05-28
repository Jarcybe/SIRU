let filtrar = [];

function AbrirModal(){
document.getElementById('administrar').style.display = 'block';
CargarUsuarios('todos');
}

function CargarUsuarios(filtro) {
    const tabla = document.getElementById('Tabla');
    tabla.innerHTML = '';

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
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
}
