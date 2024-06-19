function ConfirmarEliminacion(uniqueId) {
  const botones = Swal.mixin({
      customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
  });

  botones.fire({
      title: "¿Estás seguro?",
      text: "Si lo eliminas ya no podrás revertirlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "No, Cancelar",
      reverseButtons: true
  }).then((result) => {
      if (result.isConfirmed) {
          EliminarUsuario(uniqueId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          botones.fire({
              title: "Cancelado",
              text: "La eliminación ha sido cancelada",
              icon: "error"
          });
      }
  });
}

function EliminarUsuario(uniqueId) {
  const codigo = document.getElementById(`codigo-${uniqueId}`).innerText;

  fetch(`/eliminar_usuario/${codigo}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log(data.message);
      document.getElementById(uniqueId).remove();
  })
  .catch(error => {
      console.error('Error al eliminar usuario:', error);
  });
}
