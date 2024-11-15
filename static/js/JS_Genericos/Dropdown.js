function Dropdown(Id) {
    const elemento = document.getElementById(Id);

    const detallesboton = document.getElementById('Detalles_boton_usuario')

    if (elemento.style.display === "none") {
        elemento.style.display = "block"; 
        detallesboton.classList.add('Boton-en-uso');
    } else {
        elemento.style.display = "none";
        detallesboton.classList.remove('Boton-en-uso');
}
}

function DropdownOpciones(Id) {
    const elemento = document.getElementById(Id);
    const boton = document.getElementById('BotonDeOpciones');

    if (elemento.style.display === "none") {
        elemento.style.display = "block"; 
        boton.classList.add('Boton-en-uso');
    } else {
        elemento.style.display = "none";
        boton.classList.remove('Boton-en-uso'); 
}
}