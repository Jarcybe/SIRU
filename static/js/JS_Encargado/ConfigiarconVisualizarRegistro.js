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
            const historial = data.historial || [];

            const modal = document.getElementById("Modal");
            const contenido = modal.querySelector(".w3-modal-content");

            let imagenHTML;

    if(recordar.imagen){
      imagenHTML = `<img src="${recordar.imagen}" class="w3-image">`;
    }else{
        const lugar = recordar.lugar.toLowerCase();
        const ImagenPorDefecto = obtenerImagenDefecto(lugar);
        
        imagenHTML = ImagenPorDefecto ? 
        `<img src="${ImagenPorDefecto}" class="w3-image">`
        : `<div class = "w3-border w3-light-grey" style="height: 150px;"></div>`;
    }

    const encargadosUnicos = [
        ...new Set(historial.map(h => h.nombreencargado))].join(" - ")||"Ningun encargado a respondido por ahora";

    const comentariosHTML = historial.length > 0
    ? historial.map(h => `
${h.fecha}
Encargado responsable: ${h.nombreencargado} 
Comentario: ${h.comentario}
_____________________`).join(""):
"Aun no hay comentarios";

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

            <div class="w3-row w3-container">
                <div class="w3-col m6"
                style = "text-align: left;">
                
                    <p><b>Tipo de reporte:</b> ${recordar.tipo}</p>

                    <p style="display: flex; align-items: center;">
            <b>Usuario: </b>
            <input class="w3-input" 
            type="text" s
            tyle="width: 70%; height: 25px; 
            margin-left: 10px;"
                   value="${recordar.nombre_usuario || "Desconocido"}" 
                   readonly>
                    
                    <h4><b>Descripcion</b></h4>
                    <textarea class="textarea w3-input w3-borde w3-light-grey"
                    style = "height: 100px;"
                    readonly> ${recordar.descripcion}</textarea>
                </div>

                <div class="w3-col m6">
                <p
                style = "text-align: left;"><b> Fecha: </b> ${recordar.fecha}</p>

                <div class="w3-center w3-section">
                    ${imagenHTML}
                    </div>
                    </div>

                     <button class="w3-button w3-right w3-margin-top w3-small w3-red"
                            title="Zona de desarrollo"
                             id="Detalles_boton_usuario"
                            onclick="Dropdown('detalles')">Detalles</button>
                
                </div>

                <div id="detalles" 
                style="display: none;
                margin-top: 20px;">
                
                <div class="w3-row-padding">

                <div class="w3-col l8">

                    <h4>Encargado</h4>
                    <input class="w3-input w3-border" 
                    type="text"
                    id="Encargado" 
                    placeholder="Aun nadie a respondido este comentario"
                    maxlength="500" 
                    value="${encargadosUnicos}"
                    readonly/>

                    <h4>Comentarios</h4>
                    <textarea class="w3-input w3-border textarea" 
                    id="ComentarioEncargado"
                    type="text" 
                    style="height: 150px;" 
                    placeholder="No hay comentarios aun" 
                    readonly>${comentariosHTML}</textarea>

                    </div>

                    <div class="w3-col l4"
                    style = "text-align: left;">
                    
                        <div class="w3-section">
                            
                        <h5> Estado </h5>
                          
                        <input class="w3-radio" 
                            type="radio" 
                            name="desarrollo"
                             value="No visto" 
                             id="Novisto"
                             title="Desarrollo" 
                             ${recordar.estado === "No visto" ? "checked" : ""}
                             disabled>
                             <label>No visto </label><br>

                            <input class="w3-radio" 
                            type="radio" 
                            title = "En proceso"
                            name="desarrollo" 
                            value="En proceso" 
                            id="EnProceso" ${recordar.estado === "En proceso" ? "checked" : ""}>
                            
                            <label> En proceso</label><br>
                            <input class="w3-radio" 
                            type="radio"
                             name="desarrollo" 
                             value="Terminado" 
                             id="Terminado" ${recordar.estado === "Terminado" ? "checked" : ""}>
                            <label>Terminado</label>

                            <button class="w3-button w3-block w3-border w3-section" 
                                title="Añadir nuevo comentario"
                                id="AñadirNuevoComentario"
                                onclick=ActivarComentario()>Añadir nuevo comentario</button>

                            <button class="w3-button w3-block w3-red w3-section" 
                                title="Guardar datos" 
                                id="guardarDesarrollo"
                                onclick="DesarrolloDelReportr(${recordar.idreporte})"
                                disabled>
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