function GuardarFormulario(event){

event.preventDefault();

const logUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
if (!logUsuario) {
    alert("Debe iniciar sesión para realizar un registro.");
    return;
}

const cod = logUsuario.codigo;
const fecha = new Date().toISOString();

const lugar = document.getElementById("Lugar").value;
const item = document.getElementById("Item").value;
const estado = document.querySelector('input[name="Estado"]:checked').value;
const titulo = document.getElementById("Titulo").value;
const descripcion = document.getElementById("Descripcion").value;

if (!lugar || !item || !titulo || !descripcion) {
    event.preventDefault(); // Evitar el envío
    alert("Por favor, complete todos los campos obligatorios.");
    return;
}

const CrearRegistro = {
codigo: cod,
fecha: fecha,
lugar: lugar,
item: item,
estado: estado,
titulo: titulo,
descripcion: descripcion,
encargado: '',
comentario: '',
desarrollo: ''
};

let registro = JSON.parse(localStorage.getItem("formRegistro")) || [];
registro.push(CrearRegistro);
localStorage.setItem("formRegistro", JSON.stringify(registro));

alert("Formulario guardado existosamente");
window.location.href = "MenuPrincipal.html"
}

