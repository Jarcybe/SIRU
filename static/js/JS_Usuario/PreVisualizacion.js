function PreVisualizacion(recuerdo){

    const carta = document.createElement("div");
    carta.className = "w3-col m5 w3-card w3-margin w3-border";

    let imagenHTML;

    if(recuerdo.imagen){
      imagenHTML = `<img src="${recuerdo.imagen}" class="w3-image">`;
    }else{
        const lugar = recuerdo.lugar.toLowerCase();
        const ImagenPorDefecto = obtenerImagenDefecto(lugar);
        
        imagenHTML = ImagenPorDefecto ? 
        `<img src="${ImagenPorDefecto}" class="w3-image">`
        : `<div class = "w3-border w3-light-grey" style="height: 150px;"></div>`;
    }

    carta.innerHTML = `
        <header class="w3-container w3-center"
        style="background-color: #ea504a;">
        <h2><b>
        <input class="w3-input w3-center" 
            type="text" 
            style="width: 100%; height: 45px;"
                   value="${recuerdo.titulo}"
                    readonly>
                    </b></h2>
        </header>

            <div class="w3-center w3-padding">
            ${imagenHTML}
            </div>

            <footer class="w3-red w3-border">
            <button class="w3-small w3-hover-pink w3-button w3-block w3-red"
            title ="Ver detalles"
            onclick="VisualRegistro(${recuerdo.idreporte})">
            Ver detalles</button>
            </footer>
        </div>
    `;

    return carta;
}