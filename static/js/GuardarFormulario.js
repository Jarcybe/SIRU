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

    const datos = {
        codigo: cod,
        fecha: fecha,
        lugar: lugar,
        item: item,
        estado: estado,
        titulo: titulo,
        descripcion: descripcion
    };

    fetch('/guardar-formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al guardar el formulario.');
    })
    .then(data => {
        alert("Formulario guardado exitosamente");
        window.location.href = "MenuPrincipal.html";
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ha ocurrido un error al guardar el formulario.");
    });
}
