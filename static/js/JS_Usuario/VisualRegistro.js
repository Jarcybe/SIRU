function VisualRegistro(index, Filtro= true) {
    const LogUsuario = JSON.parse(localStorage.getItem('LogUsuario'));
    
    if (!LogUsuario) {
        alert("Debe iniciar sesión para visualizar este registro.");
        return;
    }

    if (Filtro && resultadosFiltrados.length > index) {
       const recuerdo = resultadosFiltrados[index];
        mostrarDetallesRecuerdo(recuerdo);
    } else {
        // Si no estamos en modo filtrado, obtenemos los registros completos
        fetch(`/obtener_registros/${LogUsuario.correo}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > index) {
                    const recuerdo = data[index];
                    mostrarDetallesRecuerdo(recuerdo);
                }
            })
            .catch(error => console.error('Error al obtener registro desde el backend:', error));
    }
}

function mostrarDetallesRecuerdo(recuerdo) {
    
    const modal = document.getElementById("Modal");
    const contenido = modal.querySelector(".w3-modal-content");

    let imagenHTML;

    if(recuerdo.imagen){
      imagenHTML = `<img src="${recuerdo.imagen}" class="w3-image">`;
    }else{
        const lugar = recuerdo.lugar.toLowerCase();
        const ImagenPorDefecto = ImagenesDefecto[lugar];
        
        imagenHTML = ImagenPorDefecto ? 
        `<img src="${ImagenPorDefecto}" class="w3-image">`
        : `<div class = "w3-border w3-light-grey" style="height: 150px;"></div>`;
    }

    let texto = "No visto";
    let Color  = "#ccc";

    if(recuerdo.estado){

        switch (recuerdo.estado.toLowerCase()){
            case "no verificado":
                texto = "No verificado";
                Color = "#F44336";
                break;
            case "en proceso":
                texto = "En proceso";
                Color = "#FFEB3B";
                break;
            case "terminado":
                texto = "Terminado";
                Color = "#4CAF50";
                break;
        }
    }

    contenido.innerHTML = `
    
        <header class="w3-container w3-center"
        style="background-color: #C20E1A;">

            <h2><b>${recuerdo.titulo}</b></h2>
            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright"
                  onclick="Cerrar()" title="Cerrar">&times;</span>
        </header>

        <div class="w3-container" 
        style="padding: 20px;">

            <div class="w3-row w3-container">
                <div class="w3-col m6"
                style = "padding-right: 15px;">

                    <p><b>Tipo de reporte:</b> ${recuerdo.tipo}</p>
                    
                    <h4><b>Descripción</b></h4>
                    <textarea class="w3-input w3-borde w3-light-grey"
                    style = "height: 100px;"
                    readonly> ${recuerdo.descripcion}</textarea>

                     <div class="w3-margin-top">
                
                <div style="display: flex; 
                 padding-right: 10px;">

                 <p> <b>   Estado: </b> <p>
                
                 <input id="Desarrollo"
                class="w3-input"
                type="text"
                value="${texto}"
                
                style="color: ${Color};
                text-align: center;
                height: 25px;
                padding: 5px 0;"
                readonly>
            </div>
            </div>

                   
                </div>

                <div class="w3-col m6 w3-center">
                    ${imagenHTML}
</div>
                     <button class="w3-button w3-right w3-section w3-margin-top w3-small w3-red"
                            title="Detalles"
                            id="Detalles_boton_usuario"
                            onclick="Dropdown('detalles')">Detalles</button>
                
                </div>

               

                <div id="detalles" class="w3-container" 
                style="display: none;">

                    <h4>Comentarios</h4>
                    <textarea class="w3-input w3-border" 
                    type="text" 
                    style="height: 100px;" 
                    placeholder="No hay comentarios aun" readonly>
                    </textarea>
                    
                    <h4>Encargado</h4>
                    <input class="w3-input w3-border" 
                    type="text" 
                    title="Nombre del encargado" 
                    placeholder="No hay encargado por el momento" 
                    value="" readonly/>

                    <button class="w3-button w3-small w3-red w3-right w3-margin-top"
                            title="Eliminar-Registro"
                            onclick="eliminarRegistro(${recuerdo.idreporte})">Eliminar registro</button>
                </div>
         
        </div>
    `;

  
  //  textarea${recuerdo.comentario || ''}
  // place holder ${recuerdo.encargado || ''}-->
    modal.style.display = "block";
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none";
}
