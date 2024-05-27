function ActualizarReporte(index) {
    const registro = JSON.parse(localStorage.getItem("formRegistro"));

    if (registro.length > index) {
        const recordar = registro[index];
        const modal = document.getElementById("Modal");

        const comentario = document.getElementById("Comentario").value;
        const encargado = document.getElementById("Encargado").value;
        const desarrollo = document.querySelector('input[name="desarrollo"]:checked').value;

        recordar.comentario = comentario;
        recordar.encargado = encargado;
        recordar.desarrollo = desarrollo;

        registro[index] = recordar;

        localStorage.setItem("formRegistro", JSON.stringify(registro));

        modal.style.display = "none";

        alert("Registro actualizado correctamente.");

        // Enviar datos actualizados al servidor
        fetch('../Backend/actualizar_reporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recordar),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Datos actualizados en el servidor correctamente.');
            } else {
                alert('Error al actualizar los datos en el servidor.');
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
            alert('Error al enviar los datos al servidor.');
        });

    } else {
        alert("No se encontró el registro correspondiente.");
    }
}