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
    const estado = document.querySelector('input[name="Estado"]:checked').value;
    const titulo = document.getElementById("Titulo").value;
    const descripcion = document.getElementById("Descripcion").value;

    if (!lugar || !item || !titulo || !descripcion) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const datosFormulario = {
        codigo: cod,
        fecha: fecha,
        lugar: lugar,
        item: item,
        estado: estado,
        titulo: titulo,
        descripcion: descripcion
    };

    // Enviar los datos del formulario al servidor utilizando Fetch API
    fetch('/guardar_formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormulario),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = "MenuPrincipal.html";
        } else {
            alert("Error al guardar el formulario: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
        alert("Error al enviar los datos al servidor");
    });
}
