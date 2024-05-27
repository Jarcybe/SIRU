function CargarUsuarios(filtro) {
    const tabla = document.getElementById('Tabla');
    tabla.innerHTML = '';

    // Realizar una solicitud al servidor para obtener los usuarios
    fetch(`/obtener_usuarios?filtro=${filtro}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const usuarios = data.usuarios;

            usuarios.forEach((usuario, index) => {
                const OriginalIndex = index;

                tabla.innerHTML += `
                    <div class="w3-row w3-padding-16 w3-white w3-border">
                        <div class="w3-col m2 w3-padding-small">
                            <b>Codigo: </b> ${usuario.codigo}
                        </div>
                        <div class="w3-col m2 w3-padding-small">
                            <b> Estado: </b>
                            <select class="w3-select" id="estado-${OriginalIndex}" disabled>
                                <option value="Admin" ${usuario.tipo === 'Admin' ? 'selected' : ''}>Admin</option>
                                <option value="Usuario" ${usuario.tipo === 'Usuario' ? 'selected' : ''}>Usuario</option>
                            </select>
                        </div>
                        <div class="w3-col m3 w3-padding-small">
                            <b>Nombre:</b>
                            <input class="w3-input" type="text" id="nombre-${OriginalIndex}" value="${usuario.nombre}" readonly></input>
                        </div>
                        <div class="w3-col m3 w3-padding-small">
                            <b>Contraseña:</b>
                            <input class="w3-input" type="text" id="contraseña-${OriginalIndex}" value="${usuario.contraseña}" readonly></input>
                        </div>
                        <div class="w3-col m2 w3-padding-small">
                            <button class="w3-button w3-red w3-block w3-select" onclick="EditarUsuario(${OriginalIndex})">Editar</button>
                            <button class="w3-button w3-red w3-block" onclick="ConfirmarEliminacion(${OriginalIndex})">Borrar</button>
                        </div>
                    </div>
                `;
            });
        } else {
            tabla.innerHTML = "<p>Error al cargar los usuarios.</p>";
        }
    })
    .catch(error => {
        console.error('Error al cargar los usuarios:', error);
        tabla.innerHTML = "<p>Error al cargar los usuarios. Por favor, inténtelo de nuevo más tarde.</p>";
    });
}
