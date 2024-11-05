function PreVisualizacion (record){

    const carta = document.createElement("div");
    carta.className = "w3-card w3-margin w3-border w3-animate-zoom w3-white";

    let imagenHTML;

    if(record.imagen){
        imagenHTML = `<img src="${record.imagen}" class="w3-image">`;
      }else{
          const lugar = record.lugar.toLowerCase();
          const ImagenPorDefecto = ImagenesDefecto[lugar];
          
          imagenHTML = ImagenPorDefecto ? 
          `<img src="${ImagenPorDefecto}" class="w3-image">`
          : `<div class = "w3-border w3-light-grey" style="height: 150px;"></div>`;
      }
      
    let texto = "No visto";
    let Color  = "#ccc";

    if(record.desarrollo){

        switch (record.desarrollo.toLowerCase()){
            case "no verificado":
                texto = "No visto";
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

    carta.innerHTML = `
        <header class="w3-container w3-center"
        style="background-color: #ea504a;">
            <h2>${record.titulo}</h2>
        </header>

        <div class= "w3-row">
            <div class= "w3-col l4"
            style="padding-left: 20px;
            padding-top: 40px;">
                     
                <p><b>Fecha: </b>${record.fecha}</p>
                
                <p><b>Usuario: </b>${record.codigo} (${record.nombre_usuario})</p>
                
                <p><b>Tipo de reporte: </b>${record.estado}</p>
            </div>
                        
                <div class= "w3-col l4">
                    <p><b>Descripcion: </b><p>
                    <textarea class= "w3-input w3-border w3-section w3-light grey"
                        style = "height: 130px;
                        width: 95%;"
                        readonly> ${record.descripcion}
                        </textarea>
                    </div>

                    <div class= "w3-col l4 w3-section">
                    ${imagenHTML}
                    
                </div>
                        
                </div>

                
                
                <footer class="w3-container w3-padding w3-border">

                <div class= "w3-col l4 w3-padding"
                 style="display: flex; 
                 padding-right: 10px;">
                    
                <b>Estado:</b>
                <input id="Desarrollo"
                 class="w3-input"
                 type="text"
                 value="${texto}"
                  style="color: ${Color};
                  text-align: center;
                  height: 25px;
                  width: 150px;"
           readonly>
                    </div>

                <div class= "w3-col l4">
                    <button class="w3-button w3-border w3-block w3-red"
                    title = "Ver detalles" 
                    onclick="ConfiDeRegistro(${record.id})">
                    Ver detalles>></button>
                    </div>

                     <div class= "w3-col l4">
                    <button class="w3-button w3-border"
                    title = "Notificar alguna informacion" 
                    onclick="">
                    Notificar>></button>
                    </div>


                </footer>
                        
    `;

    return carta;

}