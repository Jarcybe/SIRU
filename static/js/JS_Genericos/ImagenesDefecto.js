const ImagenesDefecto = {
    "baños": "/static/images/Baños.png",
    "biblioteca": "/static/images/Biblioteca.png",
    "informatica": "/static/images/Informatica.png",
    "salon": "/static/images/Salones.png",
    "patio": "/static/images/Patio.png"
};

// Función para obtener la ruta de la imagen basada en una clave dinámica
function obtenerImagenDefecto(nombre) {
    for (const clave in ImagenesDefecto) {
        if (nombre.includes(clave)) {
            return ImagenesDefecto[clave];
        }
    }
    // Retorna una imagen por defecto si no coincide ninguna clave
    return "/static/images/Default.png"; 
}