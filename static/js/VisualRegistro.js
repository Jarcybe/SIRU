function VisualRegistro(index){

const LogUsuario = JSON.parse(localStorage.getItem('LogUsuario'));
const Registros  = JSON.parse(localStorage.getItem("formRegistro")) || [];

const RecodarUsu = Registros.filter(regis => regis.codigo === LogUsuario.codigo);

if(RecodarUsu.length > index){
const recuerdo = RecodarUsu[index];

const modal = document.getElementById("Modal");
const contenido = modal.querySelector(".w3-modal-content");

let fondo = "#ffffff";
let Mensaje = "No ironico";

switch(recuerdo.color){

case "red":
    fondo = "#ffcccc";
    Mensaje = "no verificado";
    break;

case "yellow":
    fondo = "#fff4cc";
    Mensaje = "En proceso";
    break;
case "green":
    fondo = "#ccffcc";
    Mensaje = "terminado";
    break;
}

contenido.style.fondo = fondo;

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
<p><b>Estado:</b>${Mensaje}</p>
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
</div>

<div id="detalles"
 class="w3-container" 
style="display: none;">

  <h3> Comentarios </h3>
<textarea class="w3-input w3-border"
style="height: 100px;"
readonly>
</textarea>

<h3>Encargado</h3>
<input class="w3-input w3-border"
type="text"
placeholder="nombre encargado"
readonly/>
</div>
</div>
`;

modal.style.display  = "block";
}}

function Cerrar() {
    const modal = document.getElementById("Modal");
    modal.style.display = "none";
}

function Dropdown(Id) {
    const elemento = document.getElementById(Id);
    if (elemento.style.display === "none") {
        elemento.style.display = "block"; 
    } else {
        elemento.style.display = "none"; 
}
}