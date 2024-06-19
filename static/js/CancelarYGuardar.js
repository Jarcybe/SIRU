function GuardarCambios() {
    const usuariosActualizados = [];

    // Recorrer todos los elementos de la tabla
    const elementosUsuario = document.querySelectorAll('[id^="user-"]');
    elementosUsuario.forEach(elemento => {
        const uniqueId = elemento.id;

        // Obtener los valores actualizados del usuario
        const codigo = document.getElementById(`codigo-${uniqueId}`).innerText;
        const estado = document.getElementById(`estado-${uniqueId}`).value;
        const nombre = document.getElementById(`nombre-${uniqueId}`).value;
        const contraseña = document.getElementById(`contraseña-${uniqueId}`).value;

        // Crear objeto con los datos del usuario actualizado
        const usuarioActualizado = {
            codigo: codigo,
            estado: estado,
            nombre: nombre,
            contraseña: contraseña
        };

        // Agregar usuario actualizado al array
        usuariosActualizados.push(usuarioActualizado);
    });

    console.log('Usuarios que se enviarán:', usuariosActualizados);

    // Enviar datos al backend para guardarlos
    fetch('/guardar_cambios_usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuarios: usuariosActualizados })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: "Cambios guardados correctamente",
            icon: "success"
          }).then(() => {
            location.reload();
        });
   })
    .catch(error => {
        console.error('Error al guardar cambios:', error);
        Swal.fire({
            title: 'Error al guardar cambios. Por favor, intenta de nuevo.',
            icon: "warning"
         });
    });
}

function cancelar() {

    const botones = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

    botones.fire({
        title: "¿Seguro que quieres cancelar los cambios?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Salir",
        cancelButtonText: "No, Continuar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        botones.fire({
            title: "Cancelado!",
            text: "Ningun dato fue afectado",
            icon: "success"
          }).then(() => {
            document.getElementById('administrar').style.display = 'none';
        });
   
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        botones.fire({
          title: "Sigue con lo tuyo",
          text: "Puedes continuar con los datos",
          icon: "success"
        });
      }
    });
}
