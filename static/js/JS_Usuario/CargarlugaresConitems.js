function cargarLugaresEnElformulario() {
    fetch('/conseguir_lugares')
        .then(response => response.json())
        .then(data => {
            if (data.success !== false) {
                const lugares = data.lugares;
                cargarOpcionesEnSelectsLugares(lugares, ["Lugar"]);
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema con la carga de datos lugares",
                icon: 'error'
            });
        });
}

function cargarOpcionesEnSelectsLugares(opciones, selectIds) {
    selectIds.forEach(selectId => {
        const select = document.getElementById(selectId);

        // Vaciar el select antes de llenarlo
        select.innerHTML = '<option value="" disabled selected>Seleccionar</option>';

        // Agregar opciones
        opciones.forEach(opcion => {
            const optionElement = document.createElement("option");
            optionElement.value = opcion.idlugar;
            optionElement.textContent = opcion.nombrelugar;
            select.appendChild(optionElement);
        });
    });
}

function cargarItemsPorLugar(fklugar) {
    const selectItems = document.getElementById("Item");
    selectItems.innerHTML = '<option value="" disabled selected>Seleccionar item</option>';

    if (!fklugar) return;

    fetch('/obtener_items_por_lugar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fklugar: fklugar })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                selectItems.disabled = false;
                data.items.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.nombreitem;
                    option.textContent = item.nombreitem;
                    selectItems.appendChild(option);
                });
            } else {
                item.disabled = true;
                Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: 'error'
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los items:', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema con la carga de items",
                icon: 'error'
            });
        });
}

// Evento para cargar los items cuando se selecciona un lugar
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Lugar").addEventListener("change", function () {
        const fklugar = this.value;
        cargarItemsPorLugar(fklugar);
    });
});

function Aparecer() {
    cargarLugaresEnElformulario();
}

window.onload = Aparecer;