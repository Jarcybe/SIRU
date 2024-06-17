function ConfiDeRegistro(id) {
    fetch(`/obtener_registro/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const recordar = data.registro;
            const modal = document.getElementById("Modal");
            const contenido = modal.querySelector(".w3-modal-content");

            const imagenHTML = recordar.imagen ? `<img src="${recordar.imagen}" class="w3-image">` : '<div class="w3-border w3-light-grey" style="height: 150px;"></div>';

            contenido.innerHTML = `
                <header class="w3-container w3-red w3-center">
                    <span onclick="Cerrar()"
                     class="w3-button w3-xlarge w3-hover-grey w3-display-topright" title="Cerrar pestaña">&times;</span>
                    <h2>${recordar.titulo}</h2>
                </header>
                <div class="w3-container" style="padding: 20px;">
                    <div class="w3-row">
                        <div class="w3-col s6">
                            <p><b> Fecha: </b> ${recordar.fecha}</p>
                            <p><b> Estado: </b> ${recordar.estado}</p>
                            <p><b> Usuario: </b> ${recordar.codigo} (${recordar.nombre_usuario || "Desconocido"})</p>
                            <p>${recordar.descripcion}</p>
                        </div>
                        <div class="w3-col m6" 
                        style="position: relative; display: flex; justify-content: center; align-items: center; height: 100%;">
                            <div style="height:150px; width: 200px; top: 20px;">
                            ${imagenHTML}</div>
                        </div>
                    </div>
                    <div class="w3-row" style="margin-top: 20px">
                        <div class="w3-col s6 w3-center">
                            <h5> Encargado </h5>
                            <input class="w3-input w3-border" 
                            type="text"
                            id="Encargado" 
                            placeholder="Nombre del encargado" 
                            maxlength="500" value="${recordar.encargado || ''}">
                            
                            <h5> Comentarios </h5>
                            <textarea class="w3-input w3-border" id="Comentario" style="height: 100px;">${recordar.comentario || ''}</textarea>
                            <p> </p>
                        </div>
                        <div class="w3-col s6 w3-center w3-section">
                            <h3> Desarrollo </h3>
                            <input class="w3-radio" 
                            type="radio" 
                            name="desarrollo"
                             value="No verificado" 
                             id="noVerificado"
                             title="Desarrollo" 
                             ${recordar.desarrollo === "No verificado" ? "checked" : ""}>
                            
                             <label>No verificado </label><br>
                            <input class="w3-radio" 
                            type="radio" 
                            title = "En proceso"
                            name="desarrollo" 
                            value="En proceso" 
                            id="EnProceso" ${recordar.desarrollo === "En proceso" ? "checked" : ""}>
                            
                            <label> En proceso</label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="Terminado" id="Terminado" ${recordar.desarrollo === "Terminado" ? "checked" : ""}>
                            <label>Terminado</label>
                        </div>
                    </div>
                    <button class="w3-button w3-block w3-red" 
                    type="submit"
                    title="Guardar Datos"
                     onclick="ActualizarReporte(${recordar.id})"> 
                     Guardar datos </button>
                </div>
            `;

            modal.style.display = "block";
        })
        .catch(error => console.error('Error al obtener registro desde el backend:', error));
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none"; // Cerrar el modal
}