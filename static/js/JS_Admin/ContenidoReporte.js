function ContenidoDelReporte(id) {
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
                     
                    <h2><b>${recordar.titulo}</b></h2>
                </header>
                <div class="w3-container" style="padding: 20px;">
                    <div class="w3-row">
                        <div class="w3-col l6">
                            <p><b> Fecha: </b> ${recordar.fecha}</p>
                            <p><b> Tipo: </b> ${recordar.tipo}</p>
                            <p style="display: flex;
                            align-items: center;"><b> Usuario: </b> 
                            <input class="w3-input"
                            type=text;
                            style="width: 80%;
                            height: 25px;"
                            value=${recordar.nombre_usuario || "Desconocido"}
                            readonly>
                            </p>
                            <textarea class= "w3-input w3-border textarea"
                            style = "height: 100px;"
                            readonly> ${recordar.descripcion}</textarea>
                        </div>
                        <div class="w3-col l6" 
                        style="position: relative; display: flex; justify-content: center; align-items: center; height: 100%;">
                            <div style= "top: 20px;">
                            ${imagenHTML}</div>
                        </div>
                    </div>
                    <div class="w3-row" style="margin-top: 20px">
                        <div class="w3-col s6 w3-center">
                            <h5> <b>Encargado </b></h5>
                            <input class="w3-input w3-border" 
                            type="text"
                            id="Encargado" 
                            readonly
                            value="${encargadosUnicos}"
                            placeholder="Nombre del encargado" 
                            maxlength="500" value="">
                            
                            <h5> <b>Comentarios </b></h5>
                            <textarea 
                            class="w3-input w3-border textarea" 
                            id="Comentario" 
                            type="text"
                            readonly
                            style="height: 100px;">
                            ${comentariosHTML}
                            </textarea>
                            <p> </p>
                        </div>
                        <div class="w3-col s6 w3-center w3-section">
                            <h5> <b>Tipo </b></h5>

                            <p style="align-items: center;">
                            <input class="w3-radio" 
                            type="radio" 
                            name="desarrollo" 
                             id="noVerificado"
                             title="Desarrollo" 
                             disabled
                             ${recordar.estado === "No verificado" ? "checked" : ""}>
                             No verificado </p>

                              <p style="align-items: center;">
                            <input class="w3-radio" 
                            type="radio" 
                            title = "En proceso"
                            name="desarrollo"
                            disabled
                            id="EnProceso" ${recordar.estado === "En proceso" ? "checked" : ""}>
                            En proceso</p>

                             <p style="align-items: center;">
                            <input class="w3-radio" 
                            type="radio"
                             name="desarrollo"
                             disabled
                             id="Terminado" ${recordar.estado === "Terminado" ? "checked" : ""}>
                            Terminado</p>

                             <button class="w3-button w3-small w3-red w3-right w3-margin-top"
                            title="Eliminar-Registro"
                            onclick="eliminarRegistro(${recordar.idreporte})">Eliminar registro</button>
                        </div>
                    </div>   
                   
              
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