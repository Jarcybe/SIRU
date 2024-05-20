function Estado(){

const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

if(!LogUsuario){
console.error("No hay usuario iniciado sesion");
return;
}
const codigo = LogUsuario.codigo;
const registros = JSON.parse(localStorage.getItem("formRegistro"));

const Recordar = registros.filter(reg => reg.codigo === codigo);

const contenedores = document.getElementById("Contenedores");

if(Recordar.length === 0){
contenedores.innerHTML = "<p> Sin registros hechos por ahora</p>";
}else{
contenedores.innerHTML = "";

Recordar.forEach((recuerdo, index) => {

    const carta = document.createElement("div");
    carta.className = "w3-col m5 w3-card w3-margin";

carta.innerHTML = `
<div class="w3-container">
    <h3>${recuerdo.titulo}</h3>
    <div class="w3-border w3-light-grey" 
    style="height: 150px;"></div> 
    <button class="w3-small w3-button w3-block w3-red" 
    onclick="VisualRegistro(${index})">Ver detalles</button>
</div>
`;
contenedores.appendChild(carta);
});
}
}