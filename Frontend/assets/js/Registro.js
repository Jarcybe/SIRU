const Permitidos=["1","3","2","4","5"];

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

    if(!Permitidos.includes(codigo)){
 alert("El codigo ingresado no existe");
 return;
    }

    //Obtener los usuarios
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// verificar si el codigo ya se esta usando

const existe = usuarios.find((usuario) => usuario.codigo === codigo);
if(existe){
alert("El codigo ya tiene dueño, intente con otro");
return;
}

// Se crea un nuevo usuario

const NuevoUsuario = {
    codigo: codigo,
    nombre: nombre,
    contraseña: contraseña
};

// Guardar nuevo usuario

usuarios.push(NuevoUsuario);
localStorage.setItem("usuarios", JSON.stringify(usuarios));

alert("Registro exitoso!!");

window.location.href = "MenuRegistro.html";
}