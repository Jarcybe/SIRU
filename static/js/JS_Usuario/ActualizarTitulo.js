function ActualizarTitulo(){

const lugar = document.getElementById('Lugar').value;
const item  = document.getElementById('Item').value;
const titulo= document.getElementById('Titulo'); 

if(lugar && item){
titulo.value = `${lugar.charAt(0).toUpperCase() + lugar.slice(1)} - ${item.charAt(0).toUpperCase() + item.slice(1)}`;
}else{
titulo.value= ''; //limpiar si no hay nada seleccionado
}
}