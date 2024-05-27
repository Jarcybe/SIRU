function Estado() {
    const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

    if (!LogUsuario) {
        console.error("No hay usuario iniciado sesión");
        return;
    }

    const codigo = LogUsuario.codigo;

    fetch('/estado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo: codigo })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener el estado del usuario');
        }
    })
    .then(data => {
        const contenedores = document.getElementById("Contenedores");
        contenedores.innerHTML = "";

        if (data.length === 0) {
            contenedores.innerHTML = "<p> Sin registros hechos por ahora</p>";
        } else {
            data.forEach((recuerdo, index) => {
                const carta = document.createElement("div");
                carta.className = "w3-col m5 w3-card w3-margin";

                carta.innerHTML = `
                    <div class="w3-container">
                        <h3>${recuerdo.titulo}</h3>
                        <div class="w3-border w3-light-grey" style="height: 150px;"></div> 
                        <button class="w3-small w3-button w3-block w3-red" onclick="VisualRegistro(${index})">Ver detalles</button>
                    </div>
                `;
                contenedores.appendChild(carta);
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener el estado del usuario:', error);
    });
}
