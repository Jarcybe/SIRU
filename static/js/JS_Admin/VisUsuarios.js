function VisualizacionUsuario(usuario, index){

    const uniqueId = `user-${index}`;

    const EsTexto = usuario.estado ? 'Activo' : 'Inactivo';
    const EsColor = usuario.estado ? 'green' : 'darkred';
    const BoTexto = usuario.estado ? 'Desactivar' : 'Activar';

    const carta = document.createElement("div");
    carta.className = "w3-row w3-padding-16 w3-white w3-border";
    carta.id = uniqueId
    
    carta.innerHTML += `
       
            <div class="w3-col m2 w3-padding-small">
               
            <b>Estado:</b>
            <input id="estado-${uniqueId}"
            class="w3-input"
            type="text"
            value="${EsTexto}"

            style="color: ${EsColor};
            text-align: center;"
            readonly>
            </div>

            <div class="w3-col m2 w3-padding-small">
                <b>Tipo: </b>
                <select class="w3-select" 
                id="tipo-${uniqueId}" disabled>
                    <option value = "" disabled selected> --- </option>
                    <option value="Admin" ${usuario.tipo === 'Admin' ? 'selected' : ''}>Admin</option>  
                    <option value="Usuario" ${usuario.tipo === 'Usuario' ? 'selected' : ''}>Usuario</option>
                    <option value="EncargadoGeneral" ${usuario.tipo === 'EncargadoGeneral' ? 'selected' : ''}>Encargado general</option>
                    <option value="EncargadoElectrico" ${usuario.tipo === 'EncargadoElectrico' ? 'selected' : ''}>Electricista</option>
                    <option value="EncargadoFontaneria" ${usuario.tipo === 'EncargadoFontaneria' ? 'selected' : ''}>Fontanero</option>
                    <option value="EncargadoSalones" ${usuario.tipo === 'EncargadoSalones' ? 'selected' : ''}>Encargado de salones</option>
                    <option value="EncargadoInformatico" ${usuario.tipo === 'EncargadoInformatico' ? 'selected' : ''}>Encargado de informática</option>
                </select>
            </div>

            <div class="w3-col m3 w3-padding-small">
                <b>Correo:</b>
                <input class="w3-input" 
                type="text" 
                id="correo-${uniqueId}" 
                value="${usuario.correo}" 
                readonly>
            </div>

            <div class="w3-col m3 w3-padding-small">
                <b>Nombre:</b>
                <input class="w3-input" 
                type="text" 
                id="nombre-${uniqueId}" 
                value="${usuario.nombre}"
                readonly
                >
            </div>

            <div class="w3-col m2 w3-padding-small">
                <button class="w3-button w3-border w3-block"
                id="BotonEditar-${uniqueId}"
                onclick="EditarUsuario('${uniqueId}')">
                 Editar
                 </button>

                <button class="w3-button w3-border w3-block ${usuario.estado ? 'w3-red' : 'Activar-desactivar'}" 
                id="BotonEstado-${uniqueId}" 
                onclick="ConfirmarDesactivacion('${uniqueId}')">
                ${BoTexto}
                </button>
            </div>
    `;

    return carta;
}