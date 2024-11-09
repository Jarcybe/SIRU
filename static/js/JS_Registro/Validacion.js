function validarContraseña(contraseña, confirmar){

return contraseña === confirmar;

}

function validarFormato(contraseña){

const validacion = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return validacion.test(contraseña);

}