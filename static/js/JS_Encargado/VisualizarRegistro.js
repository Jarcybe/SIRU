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

            let imagenHTML;

    if(recordar.imagen){
      imagenHTML = `<img src="${recordar.imagen}" class="w3-image">`;
    }else{
        const lugar = recordar.lugar.toLowerCase();
        const ImagenPorDefecto = ImagenesDefecto[lugar];
        
        imagenHTML = ImagenPorDefecto ? 
        `<img src="${ImagenPorDefecto}" class="w3-image">`
        : `<div class = "w3-border w3-light-grey" style="height: 150px;"></div>`;
    }

            contenido.innerHTML = `
                    
                    <header class="w3-container w3-red w3-center">
                    <span onclick="Cerrar()"
                     class="w3-button w3-xlarge w3-hover-grey w3-display-topright" 
                     title="Cerrar pestaña">
                     &times;</span>
                     
                    <h2>${recordar.titulo}</h2>
                </header>

        <div class="w3-container" 
        style="padding: 20px;">

            <div class="w3-row">
                <div class="w3-col m6"
                style = "padding-right: 15px;">

                    <p><b> Fecha: </b> ${recordar.fecha}</p>
                    <p><b>Tipo de reporte:</b> ${recordar.estado}</p>
                    <p><b> Usuario: </b> ${recordar.codigo} -  (${recordar.nombre_usuario || "Desconocido"})</p>
                    
                    <h4><b>Descripcion</b></h4>
                    <textarea class="w3-input w3-borde w3-light-grey"
                    style = "height: 100px;"
                    readonly> ${recordar.descripcion}</textarea>
                </div>

                <div class="w3-col m6 w3-center w3-section">
                    ${imagenHTML}
                    </div>

                     <button class="w3-button w3-right w3-margin-top w3-small w3-red"
                            title="Detalles"
                            onclick="Dropdown('detalles')">Detalles</button>
                
                </div>

                <div id="detalles" 
                class="w3-container" 
                style="display: none;
                margin-top: 20px;">
                
                <div class="w3-row-padding">

                <div class="w3-col l8">

                    <h4>Encargado</h4>
                    <input class="w3-input w3-border" 
                    type="text"
                    id="Encargado" 
                    placeholder="Nombre del encargado"
                    maxlength="500" 
                    value="${recordar.encargado || ''}"
                    readonly/>

                    <h4>Comentarios</h4>
                    <textarea class="w3-input w3-border" 
                    type="text" 
                    style="height: 150px;" 
                    placeholder="No hay comentarios aun" 
                    readonly>
                     ${recordar.comentario || ''}
                    </textarea>

                    </div>

                    <div class="w3-col l4">
                    
                        <div class="w3-section">
                            
                        <h5> Estado </h5>
                          
                        <input class="w3-radio" 
                            type="radio" 
                            name="desarrollo"
                             value="No visto" 
                             id="Novisto"
                             title="Desarrollo" 
                             checked
                             ${recordar.desarrollo === "No visto" ? "checked" : ""}>
                             <label>No visto </label><br>

                            <input class="w3-radio" 
                            type="radio" 
                            title = "En proceso"
                            name="desarrollo" 
                            value="En proceso" 
                            id="EnProceso" ${recordar.desarrollo === "En proceso" ? "checked" : ""}>
                            
                            <label> En proceso</label><br>
                            <input class="w3-radio" 
                            type="radio"
                             name="desarrollo" 
                             value="Terminado" 
                             id="Terminado" ${recordar.desarrollo === "Terminado" ? "checked" : ""}>
                            <label>Terminado</label>

                            <button class="w3-button w3-block w3-border w3-section" 
                                title="Añadir nuevo comentario">
                                Añadir nuevo comentario
                        </button>

                            <button class="w3-button w3-block w3-red w3-section" 
                                title="Guardar datos" 
                                onclick="ActualizarReporte(${recordar.id})">
                                Guardar datos
                        </button>

                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`;

            modal.style.display = "block";
        })
        .catch(error => console.error('Error al obtener registro desde el backend:', error));
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none"; // Cerrar el modal
}