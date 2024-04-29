function ActualizarItems(){
const lugar = document.getElementById('Lugar').value;
const item = document.getElementById('Item');

//limpiar opciones en al cambiarse de lugar
item.innerHTML = '<option value="" disabled selected>Item</option>';

// Cambio de opciones
const items ={
informatica1: ['Computadores', 'AireAcondicionado', 'Bombillo', 'Pantalla', 'Silla', 'Otros..'],
bañosH1: ['Tazas', 'Urinarios', 'Espejos', 'Lavamanos', 'Otros...'],
patio: ['Asientos', 'MaquinaExpendedora', 'Escaleras', 'Mesas', 'Suelo', 'Otros..']
};

//asegurarse de si el lugar esta definido les saldra los items especificos
if(items[lugar]){
items[lugar].forEach(function(itm){

const opciones = document.createElement('option');
opciones.value = itm.toLowerCase(); 
opciones.textContent = itm;
item.appendChild(opciones);
});

item.disabled = false;
}else{
    item.disabled = true;
}
}

