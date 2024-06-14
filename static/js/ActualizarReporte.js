function ActualizarReporte(index) {
    const comentario = document.getElementById("Comentario").value;
    const encargado = document.getElementById("Encargado").value;
    const desarrollo = document.querySelector('input[name="desarrollo"]:checked').value;

    // Construir el objeto con los datos a enviar al backend
    const datosActualizar = {
        comentario: comentario,
        encargado: encargado,
        desarrollo: desarrollo
    };

    fetch(`/actualizar_reporte/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizar)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Manejar la respuesta del backend si es necesario
        console.log('Registro actualizado correctamente:', data);
        const modal = document.getElementById("Modal");
        modal.style.display = "none";
        alert("Registro actualizado correctamente.");
    })
    .catch(error => {
        console.error('Error al actualizar registro:', error);
        alert("Ocurrió un error al actualizar el registro.");
    });
}
