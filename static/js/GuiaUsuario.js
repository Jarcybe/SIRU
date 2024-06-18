function GuiaUsuario() {
    var pdfElement = document.getElementById('pdf');
    if (pdfElement) {
        pdfElement.style.display = 'block';
    } else {
        console.error("El elemento con id 'pdf' no existe.");
    }
}

var slideIndex = 1;
document.addEventListener("DOMContentLoaded", function() {
    showDivs(slideIndex);
});

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");

    if (x.length === 0) {
        console.error("No hay elementos con la clase 'mySlides'.");
        return;
    }

    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    if (x[slideIndex - 1]) {
        x[slideIndex - 1].style.display = "block";
    } else {
        console.error("El índice slideIndex-1 está fuera de los límites.");
    }
}
