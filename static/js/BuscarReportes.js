function BuscarReportes(event){
event.preventDefault();

const lugar = document.getElementById("buscarLugar").value.toLowerCase();
const item = document.getElementById("buscarItem").value.toLowerCase();
const AntiguoReciente = document.getElementById("ordenarRecienteAntiguo").value;
const estado = document.getElementById("Estado").value;
const desarrollo = document.getElementById("Desarrollo").value;
const reciente = document.getElementById("Reciente").value;

const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

const codigo = LogUsuario.codigo;
let registros = JSON.parse(localStorage.getItem("formRegistro")) || [];
registros = registros.filter(reg => reg.codigo === codigo);

registros = registros.filter(registro =>{
const MatchItem = item ? registro.item.toLowerCase().replace(/\s+/g, '').includes(item):true; 
const MatchLugar = lugar ? registro.lugar.toLowerCase().replace(/\s+/g, '').includes(lugar):true;
return MatchItem && MatchLugar;
});

if(estado){
registros = registros.filter(reg => reg.estado.toLowerCase() === estado.toLowerCase());
}

if(desarrollo){
registros = registros.filter(reg => reg.desarrollo.toLowerCase() === desarrollo.toLowerCase());
}

if(reciente){

registros = registros.filter(reg =>{

if(reciente === "Ninguna"){
return !reg.comentario && !reg.encargado;
} 
else if (reciente === "Comentario"){
return reg.comentario;
}
else if (reciente === "Encargado"){
    return reg.encargado;
}
else if(reciente === "Ambas"){
return reg.comentario && reg.encargado;
}
return true;
});
}

if(AntiguoReciente){

registros.sort((a, b) =>{

    if(AntiguoReciente === "Reciente"){
    return new Date(b.fecha) - new Date(a.fecha);
    }
    else if(AntiguoReciente === "Antiguo"){
return new Date(a.fecha) - new Date(b.fecha);
    }
    return 0;
});
}

const contenedores = document.getElementById("Contenedores");
contenedores.innerHTML = "";

if(registros.length === 0){
contenedores.innerHTML = "<p> Ningun reporte existe con este reporte</p>";
}
else{
registros.forEach((rec, index)=>{
const carta = document.createElement("div"); 
carta.className = "w3-col m5 w3-card w3-margin";

carta.innerHTML = `
<div class="w3-container">
    <h3>${rec.titulo}</h3>
    <div class="w3-border w3-light-grey" 
    style="height: 150px;"></div> 
    <button class="w3-button w3-block w3-red" 
    onclick="VisualRegistro(${index})">Ver detalles</button>
</div>
`;
contenedores.appendChild(carta);
});   
}
document.getElementById('buscar').style.display='none';
}