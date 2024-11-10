function Dropdown(Id) {
    const elemento = document.getElementById(Id);

    if (elemento.style.display === "none") {
        elemento.style.display = "block"; 
    } else {
        elemento.style.display = "none"; 
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