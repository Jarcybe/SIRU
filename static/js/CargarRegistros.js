function CargarRegistros() {
   const contenedor = document.getElementById("Muchos");

   // Realizar una solicitud al servidor para obtener los registros
   fetch('/obtener_registros', {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
       },
   })
   .then(response => response.json())
   .then(data => {
       if (data.success) {
           const registros = data.registros;

           if (registros.length === 0) {
               contenedor.innerHTML = "<p>No hay registros disponibles.</p>";
           } else {
               contenedor.innerHTML = "";

               registros.forEach((record, index) => {
                   const carta = document.createElement("div");
                   carta.className = "w3-card w3-margin w3-white";

                   carta.innerHTML = `
                       <header class="w3-container w3-center w3-red">
                           <h2>${record.titulo}</h2>
                       </header>
                       <p><b>Fecha: </b>${record.fecha} </p>
                       <p><b>Usuario: </b>${record.codigo} (${record.nombre}) </p>
                       <p>${record.descripcion}</p>
                       <footer class="w3-container w3-grey">
                           <button class="w3-button w3-block"
                               onclick="ConfiDeRegistro(${index})">
                               SABER MAS >>
                           </button>
                       </footer>
                   `;

                   contenedor.appendChild(carta);
               });
           }
       } else {
           contenedor.innerHTML = "<p>Error al cargar los registros.</p>";
       }
   })
   .catch(error => {
       console.error('Error al cargar los registros:', error);
       contenedor.innerHTML = "<p>Error al cargar los registros. Por favor, inténtelo de nuevo más tarde.</p>";
   });
}
