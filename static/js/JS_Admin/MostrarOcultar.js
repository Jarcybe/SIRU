function  Volver(){
    document.getElementById('MenuLugares').style.display='none';
    document.getElementById('SeleccionarMenu').style.display='block';
    document.getElementById('MenuItems').style.display='none';
    document.getElementById('Botonparavolver').style.display='none';
    document.getElementById('NombreTitulo').innerText = 'Administrador de lugares e items';
}

function IrALugar(){
    document.getElementById('MenuLugares').style.display='block';
    document.getElementById('SeleccionarMenu').style.display='none';
    document.getElementById('NombreTitulo').innerText = 'Administración de lugares';
    document.getElementById('Botonparavolver').style.display='block';
}

function IrCrearLugar(){
    document.getElementById('CrearLugar').style.display='block';
    document.getElementById('VisualizarLugar').style.display='none';
    document.getElementById('EditarLugar').style.display='none';
}

function IrEditarLugar(){
    document.getElementById('EditarLugar').style.display='block';
    document.getElementById('VisualizarLugar').style.display='none';
    document.getElementById('CrearLugar').style.display='none';
}

function IrVisualizarLugar(){
    document.getElementById('CrearLugar').style.display='none';
    document.getElementById('VisualizarLugar').style.display='block';
    document.getElementById('EditarLugar').style.display='none';
}

function IrAItem(){
    document.getElementById('SeleccionarMenu').style.display='none';
    document.getElementById('MenuItems').style.display='block';
    document.getElementById('NombreTitulo').innerText = 'Administración de items';
    document.getElementById('Botonparavolver').style.display='block';
}

function IrCrearItem(){
    document.getElementById('CrearItems').style.display='block';
    document.getElementById('VisualizarItems').style.display='none';
    document.getElementById('EditarItems').style.display='none';
}

function IrEditarItem(){
    document.getElementById('EditarItems').style.display='block';
    document.getElementById('VisualizarItems').style.display='none';
    document.getElementById('CrearItems').style.display='none';
}

function IrVisualizarItem(){
    document.getElementById('CrearItems').style.display='none';
    document.getElementById('VisualizarItems').style.display='block';
    document.getElementById('EditarItems').style.display='none';
}

function Ensombrecer(boton){

    let botones = document.querySelectorAll(".w3-bar-item.w3-button");
    botones.forEach(btn => btn.classList.remove("Boton-escogido"));

    boton.classList.add("Boton-escogido");
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("VisualizarL").classList.add("Boton-escogido");
    document.getElementById("TodosUsuarios").classList.add("Boton-escogido");
    document.getElementById("VisualizarI").classList.add("Boton-escogido");
    
});


function inicializar() {
    CargarlosItemsenlistas();
    cargarLugares();
}

window.onload = inicializar;