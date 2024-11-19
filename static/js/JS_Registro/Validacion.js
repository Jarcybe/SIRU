function validarContraseña(contraseña, confirmar){

return contraseña === confirmar;

}

function validarFormato(contraseña){

const validacion = /^(?=.*[A-Z-Ñ])(?=.*\d).{5,}$/;
    return validacion.test(contraseña);

}