let filtrar = [];

function AbrirModal(){
document.getElementById('administrar').style.display = 'block';
CargarUsuarios('todos');
}

function CargarUsuarios(filtro){
  
const usuarios=JSON.parse(localStorage.getItem('usuarios')) || [];
filtrar = [];

const FiltrarUsuarios = filtro === 'todos' ? usuarios:usuarios.filter((us, index) =>{

if(us.tipo.toLowerCase() === filtro.toLowerCase()) {
filtrar.push(index);
return true;
}
return false;
});

if(filtro === 'todos'){
    usuarios.forEach((us, ind) => filtrar.push(ind));
}


const tabla = document.getElementById('Tabla');
tabla.innerHTML = '';

FiltrarUsuarios.forEach((usuario, index) => {
const OriginalIndex = filtrar[index];

tabla.innerHTML += `
<div class="w3-row w3-padding-16 w3-white w3-border">
<div class="w3-col m2 w3-padding-small">
 <b>Codigo: </b> ${usuario.codigo}
</div>

<div class="w3-col m2 w3-padding-small">
<b> Estado: </b>
<select class="w3-select"
id="estado-${OriginalIndex}"
disabled>

<option value="Admin"
${usuario.tipo === 'Admin'?'selected':''}>
Admin</option>

<option value="Usuario"
${usuario.tipo === 'Usuario'?'selected':''}>
Usuario</option>
</select>
</div>

<div class="w3-col m3 w3-padding-small">
    <b>Nombre:</b>
    <input class="w3-input"
    type="text"
    id="nombre-${OriginalIndex}"
    value="${usuario.nombre}"
 readonly></input>
</div>

<div class="w3-col m3 w3-padding-small">
    <b>Contraseña:</b>
    <input class="w3-input"
    type="text"
    id="contraseña-${OriginalIndex}"
    value="${usuario.contraseña}"
 readonly></input>
</div>

<div class="w3-col m2 w3-padding-small">
<button class="w3-button w3-red w3-block w3-select"
onclick="EditarUsuario(${OriginalIndex})">
Editar</button>

<button class="w3-button w3-red w3-block"
onclick="ConfirmarEliminacion(${OriginalIndex})">
Borrar</button>
</div>
</div>
</div>
`;
});

}
