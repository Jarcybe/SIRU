function Dropdown(Id) {
    const elemento = document.getElementById(Id);
    if (elemento.style.display === "none") {
        elemento.style.display = "block"; 
    } else {
        elemento.style.display = "none"; 
}
}