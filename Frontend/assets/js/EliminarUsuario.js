function EliminarUsuario(index, verdad){

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let registro = JSON.parse(localStorage.getItem('formRegistro')) || [];
const usu = usuarios[index];

usuarios.splice(index, 1);
registro = registro.filter(reg => reg.codigo !== usu.codigo);

localStorage.setItem('usuarios', JSON.stringify(usuarios));
localStorage.setItem('formRegistro', JSON.stringify(registro));

if(!verdad){
    CargarUsuarios('todos');
}
}