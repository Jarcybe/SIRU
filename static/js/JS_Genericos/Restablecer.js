function RestablecerFiltro() {
    document.getElementById("NombreUsuaio").value = "";
    document.getElementById("buscarLugar").value = "";
    document.getElementById("buscarItem").value = "";
    document.getElementById("Tiporeporte").value = "";
    document.getElementById("ordenarRecienteAntiguo").value = "";
    document.getElementById("Estadoreporte").value = "";

   // document.querySelector('input[name="titulos"][value="desactivado"]').checked = true;
    document.querySelector('input[name="resueltos"][value="desactivado"]').checked = true;
    document.querySelector('input[name="sin_imagen"][value="desactivado"]').checked = true;

    // Llamar a la función de filtrado para actualizar con los valores por defecto
    FiltrarRegistro(event);
}

function RestablecerBuscar(){

    document.getElementById("buscarLugar").value = "";
    document.getElementById("buscarItem").value = "";
    document.getElementById("Estado").value = "";
    document.getElementById("ordenarRecienteAntiguo").value = "";
    document.getElementById("Desarrollo").value = "";
    document.getElementById("Reciente").value="";
}