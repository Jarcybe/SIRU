function GuardarFormulario(event) {
    event.preventDefault();

    const logUsuario = JSON.parse(localStorage.getItem("LogUsuario"));
    if (!logUsuario) {
        alert("Debe iniciar sesión para realizar un registro.");
        return;
    }

    const cod = logUsuario.codigo;
    const fecha = new Date().toISOString();
    const lugar = document.getElementById("Lugar").value;
    const item = document.getElementById("Item").value;
    const estado = document.querySelector('input[name="Estado"]:checked');
    if (!estado) {
        alert("Por favor, seleccione un estado.");
        return;
    }
    const estadoValue = estado.value;
    const titulo = document.getElementById("Titulo").value;
    const descripcion = document.getElementById("Descripcion").value;
    const imagen = document.getElementById("imagen").files[0]; // Obtener el archivo de imagen seleccionado

    const formData = new FormData(); // Crear un objeto FormData para enviar datos y archivos al servidor
    if (imagen) {
        formData.append('imagen', imagen); // Agregar la imagen al objeto FormData
    }
    formData.append('codigo', cod);
    formData.append('fecha', fecha);
    formData.append('lugar', lugar);
    formData.append('item', item);
    formData.append('estado', estadoValue);
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);

    // Enviar los datos del formulario al servidor utilizando Fetch API
    fetch('/guardar_formulario', {
        method: 'POST',
        body: formData, // Enviar el objeto FormData que contiene los datos y la imagen
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = "menu_principal.html";
        } else {
            alert("Error al guardar el formulario: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
        alert("Error al enviar los datos al servidor");
    });
}
