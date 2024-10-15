function ConfirmarDesactivacion(uniqueId) {

    const estado = document.getElementById(`estado-${uniqueId}`)
    const Usuario = estado.value === "Activo";


  const botones = Swal.mixin({
      customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
  });

  botones.fire({
      title: "¿Estás seguro?",
      text: Usuario 
      ? "Si lo desactivas ya no se podra usar este usuario"
      : "Si lo activas, podras usar nuevamente este usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: Usuario 
      ? "Sí, desactivar"
      : "Si, activar",
      cancelButtonText: "No, Cancelar",
      reverseButtons: true

  }).then((result) => {
      if (result.isConfirmed) {

          CambiarEstado(uniqueId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          botones.fire({
              title: "Cancelado",
              text: "La eliminacion ha sido cancelada",
              icon: "error"
          });
      }
  });
}