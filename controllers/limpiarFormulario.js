const form = document.getElementById('formFamiliares');
const btnReset = document.getElementById('btnReset');
const listaFamiliares = document.getElementById('listaFamiliares');
const nombreInput = document.getElementById('nombre');
const relacionSelect = document.getElementById('relacion');

let familiares = [];

// Registrar familiar
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const relacion = relacionSelect.value;

  if (!nombre || !relacion) return;

  // Agregar al array
  familiares.push({ nombre, relacion });

  // Renderizar en tabla
  renderTabla();

  // SweetAlert éxito
  await Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: `Familiar ${nombre} (${relacion}) registrado correctamente.`,
    confirmButtonText: 'Aceptar'
  });

  // Mantener scroll y valores escritos
});

// Botón Reset
btnReset.addEventListener('click', async () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

  // Resetear formulario y tabla
  form.reset();
  familiares = [];
  renderTabla();

  await Swal.fire({
    icon: 'info',
    title: 'Formulario limpio',
    text: 'Campos y lista de familiares eliminados.',
    confirmButtonText: 'Aceptar'
  });

  // Restaurar scroll
  window.scrollTo({ top: scrollTop, left: 0 });

  // Foco en primer campo
  nombreInput.focus({ preventScroll: true });
});

// Función para mostrar tabla
function renderTabla() {
  listaFamiliares.innerHTML = "";
  familiares.forEach(f => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${f.nombre}</td>
      <td>${f.relacion}</td>
    `;
    listaFamiliares.appendChild(fila);
  });
}
