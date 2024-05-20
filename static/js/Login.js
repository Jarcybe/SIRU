function Login(event){
event.preventDefault();

const codigo = document.getElementById("CodigoL").value;
const contraseña = document.getElementById("ContraseñaL").value;

//sacar los usuarios del localstorage
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// verificacion de usuario y contraseña
const usuario = usuarios.find((usuario) => usuario.codigo == codigo && usuario.contraseña == contraseña); 

if(usuario){

    localStorage.setItem('LogUsuario', JSON.stringify(usuario));

   if(usuario.tipo === "Admin"){
    window.location.href = "MenuAdmin.html";
   }else if (usuario.tipo === "Usuario"){
    window.location.href = "MenuPrincipal.html";

   }
}else{
    alert("codigo o contraseña incorrectos");
}
}