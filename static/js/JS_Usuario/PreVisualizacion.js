function PreVisualizacion(recuerdo, index){

    const carta = document.createElement("div");
    carta.className = "w3-col m5 w3-card w3-margin";

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

    carta.innerHTML = `
        <div class="w3-container">
            <h3><b>${recuerdo.titulo}</b></h3>
            ${imagenHTML}
            <button class="w3-small w3-button w3-block w3-red"
            title ="Ver detalles"
            onclick="VisualRegistro(${index})">Ver detalles</button>
        </div>
    `;

    return carta;
}