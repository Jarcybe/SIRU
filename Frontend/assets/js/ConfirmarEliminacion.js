function ConfirmarEliminacion(index){

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
const usu = usuarios[index];
const admins = usuarios.filter(us => us.tipo === 'Admin');

if(usu.tipo === 'Admin' && admins.length === 1){
alert('no se puede eliminar el ultimo admin.');
return;
}

if(confirm(`¿Seguro que quieres eliminar al usuario con codigo ${usu.codigo}?`)){
if(usu.codigo === JSON.parse(localStorage.getItem('LogUsuario')).codigo) {
if(confirm('Estas intendo eliminar el admin que estas usando ¿deseas continuar?')){
    EliminarUsuario(index, true);
window.location.href = "MenuPrincipal.html";
}
}else{
EliminarUsuario(index, false);

}
}
}