function BuscarUsuario(){

const filtro = document.getElementById('BarraBuscar').value.trim();
const tabla = document.getElementById('Tabla');
tabla.innerHTML = '';

if (filtro === ''){
CargarUsuarios('todos');
return;
}

fetch(`/buscar_usuario/${filtro}`)
.then(response => response.json())
.then(data => {
    if (Array.isArray(data)) {

    data.forEach((usuario, index) => {
        const uniqueId = `user-${index}`;
        const EsTexto = usuario.estado ? 'Activo' : 'Inactivo';
        const EsColor = usuario.estado ? 'green' : 'darkred';
        const BoTexto = usuario.estado ? 'Desactivar' : 'Activar';

        tabla.innerHTML += `
            <div class="w3-row w3-padding-16 w3-white w3-border" id="${uniqueId}">
                <div class="w3-col m2 w3-padding-small">
                    <b>Código: </b> 
                    <span id="codigo-${uniqueId}">${usuario.codigo}</span>
                    <b>Estado:</b>
                    <input class="w3-input" type="text" id="estado-${uniqueId}" value="${EsTexto}" readonly style="color: white; background-color: ${EsColor}; text-align: center;">
                </div>
                <div class="w3-col m2 w3-padding-small">
                    <b>Tipo: </b>
                    <select class="w3-select" id="tipo-${uniqueId}" disabled>
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
                    <button class="w3-button w3-red w3-border w3-block" onclick="EditarUsuario('${uniqueId}')">Editar</button>
                    <button class="w3-button w3-red w3-border w3-block" id="BotonEstado-${uniqueId}" onclick="ConfirmarDesactivacion('${uniqueId}')">${BoTexto}</button>
                </div>
            </div>
        `;
    });
} else {
    tabla.innerHTML = '<p>No se encontraron usuarios con ese término de búsqueda.</p>';
}
})
.catch(error => console.error('Error al buscar usuario:', error));
}
