function ConfiDeRegistro(index) {
    // Realizar una solicitud al servidor para obtener los detalles del registro
    fetch(`/obtener_registro?index=${index}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const registro = data.registro;
            const usuarios = data.usuarios;
            
            const usuario = usuarios.find(us => us.codigo === registro.codigo);
            const nombre = usuario ? usuario.nombre : "desconocido";

            const modal = document.getElementById("Modal");
            const contenido = modal.querySelector(".w3-modal-content");

            contenido.innerHTML = `
                <header class="w3-container w3-red w3-center">
                    <span onclick="Cerrar()" class="w3-button w3-xlarge w3-hover-grey w3-display-topright" title="Cerrar pestaña">&times;</span>
                    <h2>${registro.titulo}</h2>
                </header>
                <div class="w3-container" style="padding: 20px;">
                    <div class="w3-row">
                        <div class="w3-col s6">
                            <p><b> Fecha: </b> ${registro.fecha}</p>
                            <p><b> Estado: </b> ${registro.estado}</p>
                            <p><b> Usuario: </b> ${registro.codigo} - ${nombre}</p>
                            <p> ${registro.descripcion}</p>
                        </div>
                        <div class="w3-col s6" style="position: relative;">
                            <div style="background-color: lightgrey; height:150px; width: 200px; position: absolute; top: 20px; right: 20px;"></div>
                        </div>
                    </div>
                    <div class="w3-row" style="margin-top: 20px">
                        <div class="w3-col s6 w3-center">
                            <h5> Encargado </h5>
                            <input class="w3-input w3-border" type="text" id="Encargado" placeholder="Nombre del encargado" maxlength="500">
                            <h5> Comentarios </h5>
                            <textarea class="w3-input w3-border" id="Comentario" style="height: 100px;"></textarea>
                            <p></p>
                        </div>
                        <div class="w3-col s6 w3-center">
                            <h3> Desarrollo </h3>
                            <input class="w3-radio" type="radio" name="desarrollo" value="No verificado" id="noVerificado" checked>
                            <label>No verificado </label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="En proceso" id="EnProceso">
                            <label> En proceso</label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="Terminado" id="Terminado">
                            <label>Terminado</label>
                        </div>
                    </div>
                    <button class="w3-button w3-block w3-red" type="submit" onclick="ActualizarReporte(${index})"> Guardar datos </button>
                </div>
            `;
            modal.style.display = "block";
        } else {
            console.error('Error al obtener los detalles del registro:', data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener los detalles del registro:', error);
    });
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none"; // Cerrar el modal
}
