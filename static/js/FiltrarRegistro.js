function FiltrarRegistro(event){

event.preventDefault();

const registros = JSON.parse(localStorage.getItem("formRegistro")) || [];
const usuarios  = JSON.parse(localStorage.getItem("usuarios")) || [];         
const contenedor= document.getElementById("Muchos");

const codigo = document.getElementById("CodigoNombre").value.toLowerCase();
const lugar  = document.getElementById("buscarLugar").value.toLowerCase();
const item   = document.getElementById("buscarItem").value.toLowerCase();
const estado = document.getElementById("Estado").value;
const ordenar= document.getElementById("ordenarRecienteAntiguo").value;
const desarro= document.getElementById("Desarrollo").value;
const titulos= document.querySelector('input[name="titulos"]:checked').value === 'activado';
const resuelt= document.querySelector('input[name="resueltos"]:checked').value === 'activado';

if(registros.length === 0){
contenedor.innerHTML = "<p>Para empezar a ver los registros filtraros primero</p>"

}

let filtrados = registros.map(record =>{

const usuario = usuarios.find(us => us.codigo === record.codigo);
return{
    ...record,
    nombre: usuario ? usuario.nombre: "Desconocido"
};
});

if (codigo){

    filtrados = filtrados.filter(record =>
record.codigo.toLowerCase().includes(codigo) ||
record.nombre.toLowerCase().includes(codigo)

    );
}

if(lugar){
filtrados = filtrados.filter(recor => recor.lugar.toLowerCase().includes(lugar));
}

if(item){
    filtrados = filtrados.filter(re => re.item.toLowerCase().includes(item));
}

if(estado){
    filtrados = filtrados.filter(reg => reg.estado.toLowerCase() === estado.toLowerCase());
    }

if(desarro){
    filtrados = filtrados.filter(reg => reg.desarrollo.toLowerCase() === desarro.toLowerCase());
    }

    if(ordenar){

        filtrados.sort((a, b) =>{
        
            if(ordenar === "Reciente"){
            return new Date(b.fecha) - new Date(a.fecha);
            }
            else if(ordenar === "Antiguo"){
        return new Date(a.fecha) - new Date(b.fecha);
            }
            return 0;
        });
        }

if(titulos){

const grupos = {};
filtrados.forEach(element => {

if(!grupos[element.titulos] || new Date(grupos[record.titulo].fecha) < new Date(record.fecha)){
    grupos[element.titulo] = element;
}
});
filtrados = Object.values(grupos);
}

if(resuelt){

filtrados = filtrados.filter(record =>
!(record.desarrollo === 'Terminado' && record.comentario && record.encargado)
);
}

if (filtrados.length === 0){
    contenedor.innerHTML = "<p>Ningun Reporte con esas caracteristicas</p>";
 }else{
    contenedor.innerHTML = "";
 
 filtrados.forEach((record, index) => {
 
 const carta = document.createElement("div");
 carta.className = "w3-card w3-margin w3-white";
 
 carta.innerHTML =`
 
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
 document.getElementById("Filtrar").style.display = "none";
}