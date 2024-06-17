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

                contenido.innerHTML = `
                      <header class="w3-container w3-center">
                            <h2><b>${recuerdo.titulo}</b></h2>
                            <span class="w3-button w3-xlarge w3-hover-red w3-display-topright"
                                  onclick="Cerrar()" title="Cerrar">&times;</span>
                        </header>
                        
                        <div class="w3-container" 
                        style="padding: 20px;">
                        <div class="w3-row">
                            <div class="w3-col m6">
                                <p><b>Estado:</b> ${recuerdo.desarrollo}</p>
                                <p>${recuerdo.descripcion}</p>
                                <button class="w3-button w3-small w3-red" 
                                title="Detalles"
                                onclick="Dropdown('detalles')">
                                Detalles</button>
                            </div>
                            <div class="w3-col m6">
                                ${recuerdo.imagen ? `<img src="${recuerdo.imagen}" class="w3-image">` : `<div class="w3-border w3-light-grey" style="height: 150px;"></div>`}
                            </div>
                            <div id="detalles" 
                            class="w3-container " 
                            style="display: none;">
                            
                                <h3>Comentarios</h3>
                                <textarea class="w3-input w3-border" 
                                type="text" 
                                style="height: 100px;" 
                                readonly>
                                ${recuerdo.comentario || ''}
                                </textarea>
                                
                                
                                <h3>Encargado</h3>
                                <input class="w3-input w3-border" 
                                type="text" 
                                title="Nombre del encargado"
                                placeholder="Nombre encargado" 
                                value="${recuerdo.encargado || ''}" 
                                readonly/>

                                <button class="w3-button w3-small w3-red w3-right w3-margin-top" 
                                title="Eliminar-Registro"
                                onclick="eliminarRegistro(${recuerdo.id})">
                                Eliminar registro</button>
                            </div>
                `;

                modal.style.display = "block";
            }
        })
        .catch(error => console.error('Error al obtener registro desde el backend:', error));
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none";
}
