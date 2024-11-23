function PreVisualizacion (record){

    const carta = document.createElement("div");
    carta.className = "w3-card w3-margin w3-border w3-white";

    carta.innerHTML = `
        <header class="w3-container w3-center"
        style="background-color: #ea504a;">
            <h3>${record.titulo}</h3>
        </header>

        <div class= "w3-row">
            <div class= "w3-col s6"
            style="padding-left: 20px;
            margin-top:25px;
            margin-bottom:10px;">
                       
                <p><b>Fecha: </b>${record.fecha}</p>
                
                 <p style="display: flex;
                            align-items: center;">
                        <b> Usuario: </b> 
                            <input class="w3-input"
                            type=text;
                            style="width: 70%;
                             height: 25px;"
                            value=${record.nombre_usuario || "Desconocido"}
                            readonly>
                
                <p><b>Tipo: </b>${record.tipo}</p>
            </div>
                        
                <div class= "w3-col s6"
                style="padding-left: 20px;
            margin-top:10px;
            margin-bottom:5px;">
                    <p><b>Descripción: </b><p>
                    <textarea class= "w3-input w3-border w3-light grey textarea"
                        style = "height: 85px;
                        width: 95%;"
                        readonly> ${record.descripcion}
                        </textarea>
                    </div>
                </div>
                        
                
                <footer class=" w3-red">
                    <button class="w3-button w3-hover-pink w3-block" 
                    onclick="ContenidoDelReporte(${record.idreporte})">SABER MAS >></button>
                </footer>
                        
    `;

    return carta;

}