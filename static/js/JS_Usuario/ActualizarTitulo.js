function ActualizarTitulo(){

const lugar = document.getElementById('Lugar');
const item  = document.getElementById('Item').value;
const titulo= document.getElementById('Titulo'); 

const lugarSeleccionado = lugar.options[lugar.selectedIndex].text;

if(lugar && item){
titulo.value = `${lugarSeleccionado.charAt(0).toUpperCase() + lugarSeleccionado.slice(1)} - ${item.charAt(0).toUpperCase() + item.slice(1)}`;
}else{
titulo.value= ''; // Limpiar si no hay nada seleccionado
}
}