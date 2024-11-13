function cargarItems() {
    const clase = document.getElementById("VIclaseDeItem").value;

    fetch('/obtener_items_por_clase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clase: clase })
    })
    .then(response => response.json())
    .then(data => {
        const textarea = document.getElementById("VIvisualizaritem");
        
        if (data.items.length > 0) {
            textarea.value = data.items.map(item => `${item.nombreitem} - ${item.claseitem}`).join('\n');
        } else {
            textarea.value = "No se encontraron items para esta clase.";
        }
    })
    .catch(error => console.error('Error al cargar los items:', error));
}

function cargarItemsPorLugar_yclase() {
    const lugarId = document.getElementById("VLVisualizarLugar").value;
    const clase = document.getElementById("VLClaseItemVisualizar").value;

    if (!lugarId) {
        document.getElementById("VLItemsVisualizados").value = "Selecciona un lugar para visualizar sus items.";
        return;
    }

    fetch('/obtener_items_por_lugar_y_clase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fklugar: lugarId, clase: clase })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
    })
    .then(data => {
        const textarea = document.getElementById("VLItemsVisualizados");
        
        if (data.success && data.items.length > 0) {
            textarea.value = data.items.map(item => `${data.nombrelugar} - ${item.nombreitem} - ${item.claseitem}`).join('\n');
        } else {
            textarea.value = "No se encontraron items para este lugar y clase seleccionados.";
        }
    })
    .catch(error => console.error('Error al cargar los items:', error));
}