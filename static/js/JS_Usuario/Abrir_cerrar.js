function Abrir_cerrar(){
 var menu =   document.getElementById("miSitio")

if(menu.style.display === "block"){
    menu.style.display = "none";
}else{
    menu.style.display = "block";
}
}

function MostrarMensaje(event, text){

var tool = document.getElementById("Ver");
tool.style.display = "block";
tool.innerHTML = text;
tool.style.left = event.pageX + "px";
tool.style.top = event.pageY + "px";
}

function MouseEncima(){
    var tool = document.getElementById("Ver");
    tool.style.display = "none";
}