// Función para abrir la barra lateral
function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.querySelector('.content').style.marginLeft = "250px";
}

// Función para cerrar la barra lateral
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.querySelector('.content').style.marginLeft = "0";
}

// Agrega funcionalidad de cambio de botones (tu código existente)
document.querySelectorAll('.btn-warning').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = 'En progreso';
    button.classList.remove('btn-warning');
    button.classList.add('btn-primary');
  });
});

document.querySelectorAll('.btn-success').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = 'Completada';
    button.classList.remove('btn-success');
    button.classList.add('btn-secondary');
  });
});
