function eliminarRegistro(index){

const LogUsuario = JSON.parse(localStorage.getItem("LogUsuario"));

const codigo = LogUsuario.codigo;
let registros = JSON.parse(localStorage.getItem("formRegistro")) || [];
const recordar = registros.filter(reg => reg.codigo === codigo);

if(index < 0 || index >= recordar.length){
    console.error("Índice de registro inválido");
    return;
}

if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) {
return;
}

const global = registros.findIndex(reg => reg.codigo === codigo && recordar[index].fecha === reg.fecha && recordar[index].titulo === reg.titulo);

if (global === -1) {
    console.error("No se encontró el registro en la lista global");
    return;
}

registros.splice(global, 1);

localStorage.setItem("formRegistro", JSON.stringify(registros));

Estado();

alert("Registro elimnado exitosamente");
document.getElementById('Modal').style.display='none';
}