function ConfiDeRegistro(index){

const registro = JSON.parse(localStorage.getItem("formRegistro"));

if(registro.length > index){

const recordar = registro[index];
const modal = document.getElementById("Modal");
const contenido = modal.querySelector(".w3-modal-content");

contenido.innerHTML=`
<div class="w3-container">

<header class="w3-container w3-red w3-center">

<span 
onclick = "document.getElementById('confi').style.display='none'"
class   = "w3-button w3-xlarge w3-hover-red w3-display-topright"
title   = "Cerrar pestaña"> &times; </span>
<h2>${recordar.titulo}</h2>
</header>

<div class="w3-container">
<p><b> Fecha: </b> ${recordar.fecha}</p>
<p><b> Estado: </b> ${recordar.estado}</p>
<p><b> Usuario: </b> ${recordar.codigo} - ${recordar.nombre}</p>
<p>${recordar.descripcion}</p>


<div class="w3-row">
<div class="w3-col s6 w3-center">

<h5> Encargado </h5>
<input class="w3-input w3-border"
type="text"
placeholder="Nombre del encargado"
readonly />

<h5> Comentarios </h5>
<textarea class="w3-input w3-border" 
style="heigth: 100px;"
readonly> </textarea>
<p> </p>
</div>

<div class="w3-col s6 w3-center">

<h3> Desarrollo </h3>
<input class="w3-radio"
type="radio"
id = "noVerificado"
name = "Desarrollo"
value = "noVerificado">
<label for="noVerificado">
 No verificado 
</label><br>

<input  class="w3-radio"
type="radio"
id = "EnProceso"
name = "Desarrollo"
value = "EnProceso">
<label for="EnProceso">
En proceso
</label><br>

<input  class="w3-radio"
type="radio"
id = "terminado"
name = "Desarrollo"
value = "terminado">
<label for="terminado">
Terminado
</label>
</div>
</div>
</div>

<button class="w3-button w3-xlarge w3-red w3-border w3-margin-bottom"
type="submit"
onclick = "">
Guardar cambios 
</button>
</div>


`;

modal.style.display = "block";
}
}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none"; // Cerrar el modal
}