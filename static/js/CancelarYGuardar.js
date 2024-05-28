function guardar(){

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
filtrar.forEach(index =>{

const usu = usuarios[index];
usu.tipo= document.getElementById(`estado-${index}`).value;
usu.nombre =  document.getElementById(`nombre-${index}`).value;
usu.contraseña = document.getElementById(`contraseña-${index}`).value;

});

localStorage.setItem('usuarios', JSON.stringify(usuarios));
alert('Cambios guardados exitosamente.');
document.getElementById('administrar').style.display ='none';
}

function cancel(){
if(confirm('seguro que quieres cancelarlos cambios?')){
document.getElementById('administrar').style.display='none';

}}