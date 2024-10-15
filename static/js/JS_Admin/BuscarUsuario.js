function BuscarUsuario(){

const filtro = document.getElementById('BarraBuscar').value.trim();
const tabla = document.getElementById('Tabla');
tabla.innerHTML = '';

if (filtro === ''){
CargarUsuarios('todos');
return;
}

fetch(`/buscar_usuario/${filtro}`)
.then(response => response.json())
.then(data => {
    if (Array.isArray(data)) {

    data.forEach((usuario, index) => {

        const Carta = VisualizacionUsuario(usuario, index);
        
        tabla.appendChild(Carta);
    });
} else {
    tabla.innerHTML = '<p>No se encontraron usuarios con ese término de búsqueda.</p>';
}
})
.catch(error => console.error('Error al buscar usuario:', error));
}
