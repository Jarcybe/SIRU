function FiltrarRegistro(event) {
    event.preventDefault();

    const codigo = document.getElementById("CodigoNombre").value.toLowerCase();
    const lugar = document.getElementById("buscarLugar").value.toLowerCase();
    const item = document.getElementById("buscarItem").value.toLowerCase();
    const estado = document.getElementById("Estado").value;
    const ordenar = document.getElementById("ordenarRecienteAntiguo").value;
    const desarrollo = document.getElementById("Desarrollo").value;
    const titulos = document.querySelector('input[name="titulos"]:checked').value === 'activado';
    const resueltos = document.querySelector('input[name="resueltos"]:checked').value === 'activado';

    // Realizar la solicitud al servidor para filtrar los registros
    fetch(`/filtrar_registros?codigo=${codigo}&lugar=${lugar}&item=${item}&estado=${estado}&orden=${ordenar}&desarrollo=${desarrollo}&titulos=${titulos}&resueltos=${resueltos}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const registros = data.registros;
                const contenedor = document.getElementById("Muchos");

                if (registros.length === 0) {
                    contenedor.innerHTML = "<p>Ningún reporte encontrado con estos criterios de búsqueda</p>";
                } else {
                    contenedor.innerHTML = "";

                    registros.forEach(record => {
                        const carta = document.createElement("div");
                        carta.className = "w3-card w3-margin w3-white";

                        carta.innerHTML = `
                            <header class="w3-container w3-center w3-red">
                                <h2>${record.titulo}</h2>
                            </header>
                            <p><b>Fecha: </b>${record.fecha}</p>
                            <p><b>Usuario: </b>${record.codigo} (${record.nombre})</p>
                            <p>${record.descripcion}</p>
                            <footer class="w3-container w3-grey">
                                <button class="w3-button w3-block" onclick="ConfiDeRegistro(${record.id})">SABER MAS >></button>
                            </footer>
                        `;

                        contenedor.appendChild(carta);
                    });
                }
                document.getElementById("Filtrar").style.display = "none";
            } else {
                alert("Error al filtrar registros: " + data.error);
            }
        })
        .catch(error => {
            console.error('Error al filtrar registros:', error);
            alert("Error al filtrar registros");
        });
}
