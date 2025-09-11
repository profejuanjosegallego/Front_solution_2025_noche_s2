// Lista inicial de familiares
let familiares = [
  { nombre: 'Juan Pérez', relacion: 'Padre', contacto: '5551234567' },
  { nombre: 'María Gómez', relacion: 'Madre', contacto: '5559876543' }
];

// Referencias a elementos del DOM
const tbody = document.getElementById('tablaFamiliaresBody');
const formAgregar = document.getElementById('formAgregarFamiliar');

// Mostrar familiares en la tabla
function mostrarFamiliares(lista) {
  tbody.innerHTML = '';

  lista.forEach((familiar, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${familiar.nombre}</td>
      <td>${familiar.relacion}</td>
      <td>${familiar.contacto}</td>
      <td></td>
    `;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn btn-sm btn-danger';
    btnEliminar.addEventListener('click', () => eliminarFamiliar(index));

    fila.querySelector('td:last-child').appendChild(btnEliminar);
    tbody.appendChild(fila);
  });
}

// Eliminar familiar
function eliminarFamiliar(index) {
  if (confirm('¿Estás seguro de que deseas eliminar este familiar?')) {
    familiares.splice(index, 1);
    guardarEnLocalStorage();
    mostrarFamiliares(familiares);
  }
}

// Guardar datos en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem('familiares', JSON.stringify(familiares));
}

// Agregar familiar desde el formulario
formAgregar.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const relacion = document.getElementById('relacion').value.trim();
  const contacto = document.getElementById('contacto').value.trim();

  if (nombre && relacion && contacto) {
    // Verificar si ya existe un familiar con ese nombre o contacto
    const duplicado = familiares.find(f =>
      f.nombre.toLowerCase() === nombre.toLowerCase() ||
      f.contacto === contacto
    );

    if (duplicado) {
      alert('Este familiar ya fue registrado (nombre o contacto repetido).');
      return;
    } 

    // Validar que el contacto tenga 10 dígitos
    if (contacto.length === 10) {
      familiares.push({ nombre, relacion, contacto });
      guardarEnLocalStorage();
      mostrarFamiliares(familiares);
      formAgregar.reset();
    } else {
      alert('El número debe de ser de 10 dígitos.');
      return;
    }
  } else {
    alert('Por favor completa todos los campos.');
  } 
}); 

// Al cargar la página, revisar si hay datos guardados
const datosGuardados = localStorage.getItem('familiares');
if (datosGuardados) {
  familiares = JSON.parse(datosGuardados);
}
mostrarFamiliares(familiares);
