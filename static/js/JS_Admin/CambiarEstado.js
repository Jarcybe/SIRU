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
    EstadoInput.style.color = "green";
    BotonEstado.textContent = "Desactivar";
    BotonEstado.classList.remove('Activar-desactivar');
    BotonEstado.classList.add('w3-red');
}else{
    EstadoInput.value = "Inactivo";
    EstadoInput.style.color = "darkred";
    BotonEstado.textContent = "Activar";

    BotonEstado.classList.add('Activar-desactivar');
    BotonEstado.classList.remove('w3-red');
}
})
.catch(error => {
    console.error('Error al cambiar el estado del usuario:', error);
});
}
