function CargarRegistros(){

const registros = JSON.parse(localStorage.getItem("formRegistro")) || [];
const contenedor = document.getElementById("Muchos");

if (registros.length === 0){
   contenedor.innerHTML = "<p>No hay registros :P</p>";
}else{
   contenedor.innerHTML = "";

registros.forEach((record, index) => {

const carta = document.createElement("div");
carta.className = "w3-card w3-margin w3-padding w3-white";

carta.innerHTML =`

<div class="w3-container">
<header class="w3-container w3-center w3-red">
<h2>${record.titulo}</h2>
</header>

<p><b>Fecha: </b>${record.fecha} </p>
<p><b>Usuario: </b>${record.codigo} (${record.nombre}) </p>
<p>${record.descripcion}</p> 
</div>

<footer class="w3-container w3-grey">
<button class="w3-button w3-block "
onclick= "ConfiDeRegistro(${index})">
SABER MAS >> </button>
</footer>
`;
 
contenedor.appendChild(carta);
});

}
}