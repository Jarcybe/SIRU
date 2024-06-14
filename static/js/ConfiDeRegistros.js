function ConfiDeRegistro(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(us => us.codigo); // Busca el usuario con el código correcto
    const codigo = usuario ? usuario.codigo : null; // Asigna el código del usuario encontrado o null si no se encuentra ninguno

    if (!codigo) {
        console.error('No se encontró el código de usuario en localStorage.');
        return;
    }

    fetch(`/obtener_registro/${index}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const recordar = data.registro; // Asumiendo que 'registro' es el objeto que contiene la información del registro
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
                            <p><b> Usuario: </b> ${recordar.codigo} - ${usuario.nombre || "desconocido"}</p>
                            <p> ${recordar.descripcion}</p>
                            <p><b> Encargado: </b> ${recordar.encargado || ""}</p> <!-- Mostrar el encargado -->
                            <p><b> Comentarios: </b> ${recordar.comentario || ""}</p> <!-- Mostrar los comentarios -->
                        </div>
                        <div class="w3-col s6" style="position: relative;">
                            <div style="background-color: lightgrey; height:150px; width: 200px; position: absolute; top: 20px; right: 20px;"></div>
                        </div>
                    </div>

                    <div class="w3-row" style="margin-top: 20px">
                        <div class="w3-col s6 w3-center">
                            <h5> Encargado </h5>
                            <input class="w3-input w3-border" type="text" id="Encargado" value="${recordar.encargado || ""}" placeholder="Nombre del encargado" maxlength="500">
                            <h5> Comentarios </h5>
                            <textarea class="w3-input w3-border" id="Comentario" style="height: 100px;">${recordar.comentario || ""}</textarea>
                            <p> </p>
                        </div>
                        <div class="w3-col s6 w3-center">
                            <h3> Desarrollo </h3>
                            <input class="w3-radio" type="radio" name="desarrollo" value="No verificado" id="noVerificado" ${recordar.desarrollo === 'No verificado' ? 'checked' : ''}>
                            <label>No verificado </label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="En proceso" id="EnProceso" ${recordar.desarrollo === 'En proceso' ? 'checked' : ''}>
                            <label> En proceso</label><br>
                            <input class="w3-radio" type="radio" name="desarrollo" value="Terminado" id="Terminado" ${recordar.desarrollo === 'Terminado' ? 'checked' : ''}>
                            <label>Terminado</label>
                        </div>
                    </div> 

                    <button class="w3-button w3-block w3-red" type="submit" onclick="ActualizarReporte(${index})"> Guardar datos </button>
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
