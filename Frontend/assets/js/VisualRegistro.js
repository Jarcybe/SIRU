function VisualRegistro(index){

const LogUsuario = JSON.parse(localStorage.getItem('LogUsuario'));
const Registros  = JSON.parse(localStorage.getItem("formRegistro")) || [];

const RecodarUsu = Registros.filter(regis => regis.codigo === LogUsuario.codigo);

if(RecodarUsu.length > index){
const recuerdo = RecodarUsu[index];

const modal = document.getElementById("Modal");
const contenido = modal.querySelector(".w3-modal-content");


contenido.innerHTML  =`
<div class="w3-container">

<header class="w3-container">

<h2 style="text-align: center;">
${recuerdo.titulo}</h2>


<span class="w3-button w3-xlarge w3-hover-red w3-display-topright" 
onclick="Cerrar()" 
title="Cerrar">&times;</span>
</header>

<div class="w3-row">
<div class="w3-col m6">
<p><b>Estado:</b>${recuerdo.desarrollo}</p>
<p>${recuerdo.descripcion}</p>
<button class="w3-button w3-small w3-red"
onclick= "Dropdown('detalles')">
Detalles </button>
</div>

<div class="w3-col m6">
<div class="w3-border w3-light-grey" 
style="height: 150px;">
</div>
</div>

<div id="detalles"
 class="w3-container" 
style="display: none;">

  <h3> Comentarios </h3>
<textarea 
class="w3-input w3-border"
type="text"
style="height: 100px;"
readonly></textarea>

<h3>Encargado</h3>
<input class="w3-input w3-border"
type="text"
placeholder="nombre encargado"
value="${recuerdo.encargado}"
readonly/>

<button class="w3-button w3-small w3-red w3-right w3-margin-top"
 onclick="eliminarRegistro(${index})">Eliminar registro</button>
               
</div>
</div>
`;

modal.style.display  = "block";
}}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none";
}