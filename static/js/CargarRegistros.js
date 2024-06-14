function CargarRegistros() {
    const contenedor = document.getElementById("Muchos");
 
    fetch('/obtener_registros')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const registros = data.registros;
 
            if (registros.length === 0) {
                contenedor.innerHTML = "<p>No hay registros :P</p>";
            } else {
                contenedor.innerHTML = "";
                registros.forEach((record, index) => {
                    const carta = document.createElement("div");
                    carta.className = "w3-card w3-margin w3-white";
 
                    carta.innerHTML = `
                        <header class="w3-container w3-center w3-red">
                            <h2>${record.titulo}</h2>
                        </header>
                        <p><b>Fecha: </b>${record.fecha}</p>
                        <p><b>Usuario: </b>${record.codigo} (${record.nombre_usuario || "Desconocido"})</p>
                        <p>${record.descripcion}</p>
                        <footer class="w3-container w3-grey">
                            <button class="w3-button w3-block" onclick="ConfiDeRegistro(${record.id})">
                                SABER MAS >>
                            </button>
                        </footer>
                    `;
                    
                    contenedor.appendChild(carta);
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los registros desde el backend:', error);
            contenedor.innerHTML = "<p>Error al cargar los registros.</p>";
        });
 }
 
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
            const modal = document.getElementById("Modal");
            const contenido = modal.querySelector(".w3-modal-content");
 
            contenido.innerHTML = `
                <header class="w3-container w3-red w3-center">
                    <span onclick="Cerrar()" class="w3-button w3-xlarge w3-hover-grey w3-display-topright" title="Cerrar pestaña">&times;</span>
                    <h2>${recordar.titulo}</h2>
                </header>
                <div class="w3-container" style="padding: 20px;">
                    <div class="w3-row">
                        <div class="w3-col s6">
                            <p><b> Fecha: </b> ${recordar.fecha}</p>
                            <p><b> Estado: </b> ${recordar.estado}</p>
                            <p><b> Usuario: </b> ${recordar.codigo} (${recordar.nombre_usuario || "Desconocido"})</p>
                            <p>${recordar.descripcion}</p>
                        </div>
                        <div class="w3-col s6" style="position: relative;">
                            <div style="background-color: lightgrey; height:150px; width: 200px; position: absolute; top: 20px; right: 20px;"></div>
                        </div>
                    </div>
                    <div class="w3-row" style="margin-top: 20px">
                        <div class="w3-col s6 w3-center">
                            <h5> Encargado </h5>
                            <input class="w3-input w3-border" type="text" id="Encargado" placeholder="Nombre del encargado" maxlength="500" value="${recordar.encargado || ''}">
                            <h5> Comentarios </h5>
                            <textarea class="w3-input w3-border" id="Comentario" style="height: 100px;">${recordar.comentario || ''}</textarea>
                            <p> </p>
                        </div>
                        <div class="w3-col s6 w3-center">
                            <h3> Desarrollo </h3>
                            <input class="w3-radio" type="radio" name="desarrollo" value="No verificado" id="noVerificado" ${recordar.desarrollo === "No verificado" ? "checked" : ""}>
                            <label>No verificado </label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="En proceso" id="EnProceso" ${recordar.desarrollo === "En proceso" ? "checked" : ""}>
                            <label> En proceso</label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="Terminado" id="Terminado" ${recordar.desarrollo === "Terminado" ? "checked" : ""}>
                            <label>Terminado</label>
                        </div>
                    </div>
                    <button class="w3-button w3-block w3-red" type="submit" onclick="ActualizarReporte(${recordar.id})"> Guardar datos </button>
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
 