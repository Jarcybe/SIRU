
function Registro(event) {
    event.preventDefault(); 

    const codigo = document.getElementById("CodigoR").value;
    const nombre = document.getElementById("NombreR").value;
    const contraseña = document.getElementById("ContraseñaR").value;
    const confirmar = document.getElementById("ConfirmarR").value;

   
    if(!validarContraseña(contraseña, confirmar)){
        alert(" Las contraseñas no coinciden.");
        return;    }

       
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    
    const datos = {
        codigo: codigo,
        nombre: nombre,
        contraseña: contraseña
    };

  
    fetch('../registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
       
        alert(data.mensaje);
        
        window.location.href = "MenuRegistro.html";
    })
    .catch(error => {
      
        console.error('Error al enviar los datos al backend:', error);
    });
}

