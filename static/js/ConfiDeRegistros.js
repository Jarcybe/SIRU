function VisualRegistro(index) {
    const LogUsuario = JSON.parse(localStorage.getItem('LogUsuario'));

    if (!LogUsuario) {
        alert("Debe iniciar sesión para visualizar este registro.");
        return;
    }

    fetch(`/obtener_registros/${LogUsuario.codigo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > index) {
                const recuerdo = data[index];
                const modal = document.getElementById("Modal");
                const contenido = modal.querySelector(".w3-modal-content");

                // Construir el contenido del modal
                contenido.innerHTML = `
                    <div class="w3-container">
                        <header class="w3-container">
                            <h2 style="text-align: center;">${recuerdo.titulo}</h2>
                            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright"
                                  onclick="Cerrar()" title="Cerrar">&times;</span>
                        </header>
                        <div class="w3-row">
                            <div class="w3-col m6">
                                <p><b>Estado:</b> ${recuerdo.desarrollo}</p>
                                <p>${recuerdo.descripcion}</p>
                                <button class="w3-button w3-small w3-red" onclick="Dropdown('detalles')">Detalles</button>
                                <div id="detalles" class="w3-container" style="display: none;">
                                    <h3>Comentarios</h3>
                                    <textarea class="w3-input w3-border" type="text" style="height: 100px;" readonly>${recuerdo.comentario || ''}</textarea>
                                    <h3>Encargado</h3>
                                    <input class="w3-input w3-border" type="text" placeholder="Nombre encargado" value="${recuerdo.encargado || ''}" readonly/>
                                    <button class="w3-button w3-small w3-red w3-right w3-margin-top" onclick="eliminarRegistro(${recuerdo.id})">Eliminar registro</button>
                                </div>
                            </div>
                            <div class="w3-col m6" style="position: relative;">
                                <img src="${recuerdo.imagen}" class="w3-image" style="max-width: 100%; max-height: 100%;">
                            </div>
                        </div>
                    </div>
                `;

                // Mostrar el modal
                modal.style.display = "block";
            }
        })
        .catch(error => console.error('Error al obtener registro desde el backend:', error));
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none"; // Cerrar el modal
}
