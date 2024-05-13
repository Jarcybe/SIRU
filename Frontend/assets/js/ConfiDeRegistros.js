function ConfiDeRegistro(index){

const registro = JSON.parse(localStorage.getItem("formRegistro"));

if(registro.length > index){

const recordar = registro[index];
const modal = document.getElementById("Modal");
const contenido = modal.querySelector(".w3-modal-content");

contenido.innerHTML=`

<header class="w3-container w3-red w3-center">

<span 
onclick = "Cerrar()"
class   = "w3-button w3-xlarge w3-hover-grey w3-display-topright"
title   = "Cerrar pestaña"> &times; </span>
<h2>${recordar.titulo}</h2>
</header>

<div class="w3-container" 
style="padding: 20px;">

<div class="w3-row">
<div class="w3-col s6">
<p><b> Fecha: </b> ${recordar.fecha}</p>
<p><b> Estado: </b> ${recordar.estado}</p>
<p><b> Usuario: </b> ${recordar.codigo} - ${recordar.nombre}</p>
<p> ${recordar.descripcion}</p>
</div>

<div class="w3-col s6"
style="position: relative;">
<div style="background-color: lightgrey; 
height:150px; width: 200px; 
position: absolute; top: 20px; right: 20px;">
</div>
</div>
</div>


<div class="w3-row"
style="margin-top: 20px">
<div class="w3-col s6 w3-center">

<h5> Encargado </h5>
<input class="w3-input w3-border"
type="text"
id="Encargado"
placeholder="Nombre del encargado"
value="${recordar.encargado}">

<h5> Comentarios </h5>
<textarea class="w3-input w3-border" 
id="Comentario"
style="height: 100px;">
 </textarea>
<p> </p>
</div>

<div class="w3-col s6 w3-center">
            
<h3> Desarrollo </h3>

<input class="w3-radio"
type="radio"
name = "desarrollo"
value = "noVerificado"
id="noVerificado"
checked>
<label>No verificado </label><br>

<input  class="w3-radio"
type="radio"
name = "desarrollo"
value = "EnProceso"
id="EnProceso">
<label> En proceso</label><br>

<input  class="w3-radio"
type="radio"
name = "desarrollo"
value = "terminado"
id="Terminado">
<label>Terminado</label>
</div>

</div>
<button class="w3-button w3-block w3-red w3-section w3-padding"
type="submit"
onclick="ActualizarReporte(${index})">
 Guardar datos </button>
</div>

`;

modal.style.display = "block";
}
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none"; // Cerrar el modal
}