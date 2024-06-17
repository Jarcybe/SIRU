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
                registros.forEach(record => {
                    const carta = document.createElement("div");
                    carta.className = "w3-card w3-margin w3-white";

                    const imagenHTML = record.imagen ? `<img src="${record.imagen}" class="w3-image">` : '<div class="w3-border w3-light-grey" style="height: 150px;"></div>';

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


