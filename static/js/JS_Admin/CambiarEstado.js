function CambiarEstado(Id){
const codigo = document.getElementById(`codigo-${Id}`).innerText;

fetch(`/cambiar_estado/${codigo}`, {
 method: 'POST',
})
.then(response => {
      if (!response.ok){
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    }) 
.then(data =>{
const EstadoInput = document.getElementById(`estado-${Id}`);
const BotonEstado = document.getElementById(`BotonEstado-${Id}`);

if (data.nuevo_estado === 1){

    EstadoInput.value = "Activo";
    EstadoInput.style.backgroundColor = "green";
    EstadoInput.style.color = "white";
    BotonEstado.textContent = "Desactivar";

}else{

    EstadoInput.value = "Inactivo";
    EstadoInput.style.backgroundColor = "darkred";
    EstadoInput.style.color = "white";
    BotonEstado.textContent = "Activar";

}
})
.catch(error => {
    console.error('Error al cambiar el estado del usuario:', error);
});
}
