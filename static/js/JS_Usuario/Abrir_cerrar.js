function Abrir_cerrar(){
 var menu =   document.getElementById("miSitio")

if(menu.style.display === "block"){
    menu.style.display = "none";
}else{
    menu.style.display = "block";
}
}

function showTooltip(event, text){

var tool = document.getElementById("tooltip");
tool.style.display = "block";
tool.innerHTML = text;
tool.style.left = event.pageX + "px";
tool.style.top = event.pageY + "px";
}

function hideTooltip(){
    var tool = document.getElementById("tooltip");
    tool.style.display = "none";
}