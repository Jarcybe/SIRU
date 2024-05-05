
function Registro(event) {
    
    event.preventDefault(); // -> evita el envio por defecto
 
    const codigo = document.getElementById("CodigoR").value;
    const nombre = document.getElementById("NombreR").value;
    const contraseña = document.getElementById("ContraseñaR").value;
    const confirmar = document.getElementById("ConfirmarR").value;
    

    //verificacion de contraseñas
    if(!validarContraseña(contraseña, confirmar)){
    alert(" Las contraseñas no coinciden.");
    return;    }

    //Obtener los usuarios
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// verificar si el codigo ya se esta usando
const existe = usuarios.find(usuario => usuario.codigo === codigo);
if(!existe){
alert("El codigo ya ha sido registrado");
return ;
}

// Se crea un nuevo usuario
existe.nombre = nombre;
existe.contraseña = contraseña;

// actualizar usuario
localStorage.setItem("usuarios", JSON.stringify(usuarios));

alert("Registro exitoso!!");
window.location.href = "MenuRegistro.html";
}