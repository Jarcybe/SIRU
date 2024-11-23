function PreVisualizacionEncargado (record){

    const carta = document.createElement("div");
    carta.className = "w3-card w3-margin w3-border w3-animate-zoom w3-white";

    let imagenHTML;

    if(record.imagen){
        imagenHTML = `<img src="${record.imagen}" class="w3-image">`;
      }else{
          const lugar = record.lugar.toLowerCase();
          const ImagenPorDefecto = obtenerImagenDefecto(lugar);
          
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
        <header class="w3-container"
        style="background-color: #ea504a;">
            <h2>${record.titulo}</h2>
        </header>

        <div class="w3-row">
        
        <div class="w3-col l4" 
        style="margin-top: 50px;
        padding-left: 20px; 
        text-align: left;
        margin-bottom:10px;">

        <p><b>Fecha: </b>${record.fecha}</p>
        
        <p style="display: flex; align-items: center;">
            <b>Usuario: </b>
            <input class="w3-input" 
            type="text" 
            style="width: 70%; height: 25px; margin-left: 10px;"
                   value="${record.nombre || "Desconocido"}" readonly>
        </p>
        <p><b>Tipo de reporte: </b>${record.tipo}</p>
    </div>
    
    <div class="w3-col l4" 
    style="margin-top: 10px;
    margin-bottom: 10px;">
        <p><b>Descripción: </b></p>
        <textarea class="textarea w3-input w3-border w3-light-grey"
                  style="height: 130px; 
                  width: 95%;
                  margin: auto;"
                  readonly>${record.descripcion}</textarea>
    </div>

    <div class="w3-col l4 w3-section" 
    style="margin-top: 10px;
    margin-bottom: 10px;">
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
                  width: 150px;
                  margin: auto;"
           readonly>
                    </div>

                <div class= "w3-col l4">
                    <button class="w3-button w3-border w3-block w3-red"
                    title = "Ver detalles" 
                    onclick="ConfiDeRegistro(${record.idreporte})">
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