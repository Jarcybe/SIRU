function ConfirmarEliminacion(uniqueId) {

    const botones = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

    botones.fire({
        title: "¿Estas seguro?",
        text: "Si lo eliminas ya no podras revertirlo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        EliminarUsuario(uniqueId);
    }else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        botones.fire({
          title: "Cancelado",
          text: "La eliminacion a sido cancelada",
          icon: "error"
        });
      }
    });
}
