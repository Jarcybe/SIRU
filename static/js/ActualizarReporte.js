function ActualizarReporte(index){

const registro=JSON.parse(localStorage.getItem("formRegistro"))

if(registro.length > index){

const recordar = registro[index];
const modal = document.getElementById("Modal");

const comentario = document.getElementById("Comentario").value;
const encargado  = document.getElementById("Encargado").value;
const desarrollo = document.querySelector('input[name="desarrollo"]:checked').value;

recordar.comentario = comentario;
recordar.encargado = encargado;
recordar.desarrollo = desarrollo;

registro[index] = recordar;

localStorage.setItem("formRegistro", JSON.stringify(registro));

modal.style.display= "none";

alert("Registro actualizado correctamente.");
}else{

    alert("No se encontró el registro correspondiente."); 
}

}