function eliminarRegistro(id) {
    

    const logUsuario = JSON.parse(localStorage.getItem('LogUsuario'));

    const botones = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

    if (!logUsuario) {
        alert("Debe iniciar sesión para realizar esta acción.");
        return;
    }

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

            fetch(`/eliminar_registro/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    botones.fire({
                        title: "Eliminado!",
                        text: data.message,
                        icon: "success"
                      }).then(() => {
                        location.reload();
                    });
                } else {
                    alert("Error al eliminar el registro: " + data.error);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el registro:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error al eliminar el registro",
                  });
            });
        } else if (
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
