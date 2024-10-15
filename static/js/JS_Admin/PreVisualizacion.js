function PreVisualizacion (record){

    const carta = document.createElement("div");
    carta.className = "w3-card w3-margin w3-white";

    carta.innerHTML = `
        <header class="w3-container w3-center w3-red">
            <h2>${record.titulo}</h2>
        </header>

        <div class= "w3-row">
            <div class= "w3-center w3-col s6">
                        
                <p><b>Fecha: </b>${record.fecha}</p>
                <br>
                <p><b>Usuario: </b>${record.codigo} (${record.nombre_usuario})</p>
                <br>
                <p><b>Estado: </b>${record.estado}</p>
            </div>
                        
                <div class= "w3-col s6">
                    <p><b>Descripcion: </b><p>
                    <textarea class= "w3-input w3-border w3-light gret"
                        style = "height: 85px;
                        width: 95%;"
                        readonly> ${record.descripcion}
                        </textarea>
                    </div>
                </div>
                        
                
                <footer class="w3-container w3-grey">
                    <button class="w3-button w3-block" onclick="ConfiDeRegistro(${record.id})">SABER MAS >></button>
                </footer>
                        
    `;

    return carta;

}