function ActualizarItems(){
const lugar = document.getElementById('Lugar').value;
const item = document.getElementById('Item');

//limpiar opciones en al cambiarse de lugar
item.innerHTML = '<option value="" disabled selected>Item</option>';

// Cambio de opciones
const items ={
informatica1: ['Computadores', 'AireAcondicionado', 'Bombillo', 'Pantalla', 'Silla', 'Otros..'],
bañosH1: ['Tazas', 'Urinarios', 'Espejos', 'Lavamanos', 'Otros...'],
bañosM1: ['Tazas', 'Espejos', 'Lavamanos', 'Elementos higenicos', 'Otros...'],
informatica2: ['Computadores', 'AireAcondicionado', 'Bombillo', 'Pantalla', 'Silla', 'Otros..'],
salon1: ['Pupitres', 'AireAcondicionado', 'Tablero', 'VideoBeams', 'Enchufes', 'Ventiladores', 'Otros...'],
biblioteca: ['Mesas', 'AireAcondicionado', 'Sillas', 'Enchufes', 'Ventiladores', 'Otros...'],
salon2: ['Computador', 'Sillas', 'Mesas','Enchufes', 'Ventiladores', 'Otros...'],informatica2: ['Computadores', 'AireAcondicionado', 'Bombillo', 'Pantalla', 'Silla', 'Otros..'],
informatica3: ['Computadores', 'AireAcondicionado', 'Bombillo', 'Pantalla', 'Silla', 'Otros..'],
salon3: ['Pupitres', 'AireAcondicionado', 'Tablero', 'VideoBeams', 'Enchufes', 'Ventiladores','Otros...'],
bañosH2: ['Tazas', 'Urinarios', 'Espejos', 'Lavamanos', 'Otros...'],
bañosM2: ['Tazas', 'Espejos', 'Lavamanos', 'Elementos higenicos', 'Otros...'],
salon4: ['Pupitres', 'AireAcondicionado', 'Tablero', 'VideoBeams', 'Enchufes', 'Ventiladores','Otros...'],
salon5: ['Pupitres', 'AireAcondicionado', 'Tablero', 'VideoBeams', 'Enchufes', 'Ventiladores','Otros...'],
salon6: ['Pupitres', 'AireAcondicionado', 'Tablero', 'VideoBeams', 'Enchufes', 'Ventiladores', 'Otros...'],
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

