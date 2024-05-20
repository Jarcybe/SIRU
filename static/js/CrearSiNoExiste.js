function CrearSiNoExiste(){

document.addEventListener("DOMContentLoaded", ()=>{
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const Existe = usuarios.some(usu => usu.codigo === "admin");

if(!Existe){
usuarios.push({
codigo: "admin",
tipo: "Admin",
nombre: "Admin",
contraseña: "admin"
});
localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
});
}