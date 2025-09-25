const students = [
  { id: 1, name: "Ana García", email: "ana@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 2, name: "Carlos López", email: "carlos@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 3, name: "María Rodríguez", email: "maria@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 4, name: "Alfredo Ruiz", email: "alfredo@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 5, name: "Beatriz Castillo", email: "beatriz@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 6, name: "David Fernández", email: "david@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 7, name: "Elena Morales", email: "elena@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 8, name: "Fernando Jiménez", email: "fernando@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 9, name: "Gabriela Torres", email: "gabriela@ejemplo.com", group: "Grupo A", attendance: "No registrado" },
  { id: 10, name: "Hugo Martínez", email: "hugo@ejemplo.com", group: "Grupo A", attendance: "No registrado" },

  { id: 11, name: "Isabel Soto", email: "isabel@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 12, name: "Javier Ramírez", email: "javier@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 13, name: "Karla Mendoza", email: "karla@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 14, name: "Luis Gómez", email: "luis@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 15, name: "Marta Díaz", email: "marta@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 16, name: "Nicolás Ortega", email: "nicolas@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 17, name: "Olga Castillo", email: "olga@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 18, name: "Pablo Campos", email: "pablo@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 19, name: "Queralt Fernández", email: "queralt@ejemplo.com", group: "Grupo B", attendance: "No registrado" },
  { id: 20, name: "Raúl Vázquez", email: "raul@ejemplo.com", group: "Grupo B", attendance: "No registrado" },

  { id: 21, name: "Sara Muñoz", email: "sara@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 22, name: "Tomás Blanco", email: "tomas@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 23, name: "Úrsula Peña", email: "ursula@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 24, name: "Valeria Vega", email: "valeria@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 25, name: "Walter Silva", email: "walter@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 26, name: "Ximena Rocha", email: "ximena@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 27, name: "Yolanda Reyes", email: "yolanda@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 28, name: "Zacarías León", email: "zacarias@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 29, name: "Oscar Medina", email: "oscar@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
  { id: 30, name: "Renata Gómez", email: "renata@ejemplo.com", group: "Grupo C", attendance: "No registrado" },
];

const attendanceStates = {};
students.forEach(s => attendanceStates[s.id] = 'No registrado');

// Estado de selección de estudiantes
const selectedStudents = {};

const tbody = document.getElementById('studentsTbody');
const searchInput = document.getElementById('searchInput');
const filterForm = document.getElementById('filterForm');
const materiaSelect = document.getElementById('materiaSelect');
const grupoSelect = document.getElementById('grupoSelect');
const alphaFilterDiv = document.querySelector('.alpha-filter .letters');
const fechaInput = document.getElementById('fechaInput');
// Referencia DOM para checkbox principal
const selectAllCheckbox = document.getElementById('selectAllCheckbox');
// Referencia DOM para botón de guardar
const saveRegistroBtn = document.getElementById('saveRegistroBtn');

const alphaOptions = ['Todos', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
alphaOptions.forEach(letter => {
  const button = document.createElement('button');
  button.className = 'letter-btn';
  button.textContent = letter;
  button.setAttribute('data-letter', letter === 'Todos' ? '' : letter);
  alphaFilterDiv.appendChild(button);
});

function renderTable(filter = {}) {
  tbody.innerHTML = '';

  const searchText = (filter.search || '').toLowerCase();
  const selectedMateria = filter.materia || 'Matemáticas';
  const selectedGrupo = filter.grupo || 'Grupo A';
  const selectedAlpha = (filter.alpha || '').toUpperCase();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchText) || student.email.toLowerCase().includes(searchText);
    const matchesGroup = student.group === selectedGrupo;
    const matchesAlpha = selectedAlpha === '' || student.name.toUpperCase().startsWith(selectedAlpha);
    return matchesSearch && matchesGroup && matchesAlpha;
  });

  if (filteredStudents.length === 0) {
    const trEmpty = document.createElement('tr');
    const tdEmpty = document.createElement('td');
    tdEmpty.colSpan = 5;
    tdEmpty.style.textAlign = 'center';
    tdEmpty.style.padding = '1.2rem';
    tdEmpty.style.color = '#666';
    tdEmpty.textContent = 'No se encontraron estudiantes para los criterios seleccionados.';
    trEmpty.appendChild(tdEmpty);
    tbody.appendChild(trEmpty);
    return;
  }

  filteredStudents.forEach(student => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', student.id);

    // Columna checkbox individual
    const tdCheckbox = document.createElement('td');
    tdCheckbox.className = 'checkbox-cell';
    tdCheckbox.innerHTML = `<input type="checkbox" class="student-checkbox" data-student-id="${student.id}" ${selectedStudents[student.id] ? 'checked' : ''} />`;

    // Aplicar estilo visual si está seleccionado
    if (selectedStudents[student.id]) {
      tr.classList.add('selected');
    }

    const tdName = document.createElement('td');
    tdName.innerHTML = `
      <div class="student-info">
        <span class="student-name">${student.name}</span>
        <span class="student-email">${student.email}</span>
      </div>
    `;

    const tdGroup = document.createElement('td');
    const [grpText, grpLetter] = student.group.split(' ');
    tdGroup.className = 'student-group';
    tdGroup.innerHTML = `${grpText} <strong>${grpLetter}</strong>`;

    const tdStatus = document.createElement('td');
    const statusText = attendanceStates[student.id] || "No registrado";
    tdStatus.innerHTML = `
      <span class="${statusText === 'No registrado' ? 'status-unregistered' : getStatusButtonClass(statusText)}"
            aria-label="Estado de asistencia ${statusText}">
        ${statusText}
      </span>
    `;

    const tdActions = document.createElement('td');
    tdActions.className = 'actions-cell';
    tdActions.innerHTML = `
      <button type="button" class="btn-status btn-present" aria-label="Marcar ${student.name} como presente">Presente</button>
      <button type="button" class="btn-status btn-absent" aria-label="Marcar ${student.name} como ausente">Ausente</button>
      <button type="button" class="btn-status btn-justified" aria-label="Marcar ${student.name} como justificado">Justificado</button>
    `;

    tdActions.querySelector('.btn-present').addEventListener('click', () => updateAttendance(student.id, 'Presente'));
    tdActions.querySelector('.btn-absent').addEventListener('click', () => updateAttendance(student.id, 'Ausente'));
    tdActions.querySelector('.btn-justified').addEventListener('click', () => updateAttendance(student.id, 'Justificado'));

    tr.appendChild(tdCheckbox);
    tr.appendChild(tdName);
    tr.appendChild(tdGroup);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}

function getStatusButtonClass(status) {
  switch (status) {
    case 'Presente': return 'btn-present';
    case 'Ausente': return 'btn-absent';
    case 'Justificado': return 'btn-justified';
    default: return '';
  }
}

function updateAttendance(studentId, status) {
  attendanceStates[studentId] = status;
  renderTable(getCurrentFilters());
}

function getCurrentFilters() {
  const activeLetterButton = alphaFilterDiv.querySelector('.letter-btn.active');
  const selectedDate = fechaInput.value;
  return {
    search: searchInput.value.trim(),
    materia: materiaSelect.value,
    grupo: grupoSelect.value,
    alpha: activeLetterButton ? activeLetterButton.getAttribute('data-letter') : '',
  };
}

// Función para manejar selección individual
function handleIndividualCheckbox(studentId, isChecked) {
  selectedStudents[studentId] = isChecked;
  
  const row = document.querySelector(`tr[data-id="${studentId}"]`);
  if (row) {
    if (isChecked) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  }
  
  updateSelectAllCheckbox();
}

// Función para actualizar estado del checkbox principal
function updateSelectAllCheckbox() {
  const currentVisibleStudents = getCurrentVisibleStudents();
  const selectedCount = currentVisibleStudents.filter(student => selectedStudents[student.id]).length;
  
  if (selectedCount === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (selectedCount === currentVisibleStudents.length) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  }
}

// Función para obtener estudiantes visibles actualmente
function getCurrentVisibleStudents() {
  const filters = getCurrentFilters();
  const searchText = (filters.search || '').toLowerCase();
  const selectedGrupo = filters.grupo || 'Grupo A';
  const selectedAlpha = (filters.alpha || '').toUpperCase();

  return students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchText) || student.email.toLowerCase().includes(searchText);
    const matchesGroup = student.group === selectedGrupo;
    const matchesAlpha = selectedAlpha === '' || student.name.toUpperCase().startsWith(selectedAlpha);
    return matchesSearch && matchesGroup && matchesAlpha;
  });
}

// Función para seleccionar/deseleccionar todos los visibles
function toggleSelectAll() {
  const currentVisibleStudents = getCurrentVisibleStudents();
  const shouldSelectAll = selectAllCheckbox.checked;
  
  currentVisibleStudents.forEach(student => {
    selectedStudents[student.id] = shouldSelectAll;
  });
  
  renderTable(getCurrentFilters());
}

// Función para validar que al menos un estudiante esté seleccionado
function validateStudentSelection() {
  const selectedCount = Object.values(selectedStudents).filter(selected => selected).length;
  return selectedCount > 0;
}

// Función para mostrar alert personalizado
function showCustomAlert(message) {
  // Remover alerts anteriores si existen
  const existingOverlay = document.querySelector('.custom-alert-overlay');
  const existingAlert = document.querySelector('.custom-alert');
  if (existingOverlay) existingOverlay.remove();
  if (existingAlert) existingAlert.remove();

  // Crear overlay
  const overlay = document.createElement('div');
  overlay.className = 'custom-alert-overlay';
  
  // Crear alert
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert';
  alertBox.innerHTML = `
    <h3>⚠️ Validación requerida</h3>
    <p>${message}</p>
    <button type="button" onclick="closeCustomAlert()">Entendido</button>
  `;
  
  // Agregar al DOM
  document.body.appendChild(overlay);
  document.body.appendChild(alertBox);
  
  // Función para cerrar (la agregamos al window para que sea accesible)
  window.closeCustomAlert = function() {
    const currentOverlay = document.querySelector('.custom-alert-overlay');
    const currentAlert = document.querySelector('.custom-alert');
    if (currentOverlay) currentOverlay.remove();
    if (currentAlert) currentAlert.remove();
    delete window.closeCustomAlert;
  };
  
  // Cerrar con click en overlay
  overlay.addEventListener('click', window.closeCustomAlert);
  
  // Cerrar con tecla ESC
  const escHandler = function(e) {
    if (e.key === 'Escape') {
      window.closeCustomAlert();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
  
  // Auto focus en el botón
  setTimeout(() => {
    const button = alertBox.querySelector('button');
    if (button) button.focus();
  }, 100);
}

// Función para guardar el registro
function saveRegistro() {
  // Validar que al menos un estudiante esté seleccionado
  if (!validateStudentSelection()) {
    showCustomAlert('Debe seleccionar al menos un estudiante antes de guardar el registro.');
    return;
  }
  
  // Validar que la fecha esté seleccionada
  if (!fechaInput.value) {
    showCustomAlert('Debe seleccionar una fecha antes de guardar el registro.');
    return;
  }
  
  // Obtener datos del registro
  const selectedStudentIds = Object.keys(selectedStudents).filter(id => selectedStudents[id]).map(Number);
  const registroData = {
    fecha: fechaInput.value,
    materia: materiaSelect.value,
    grupo: grupoSelect.value,
    estudiantes: selectedStudentIds.map(id => {
      const student = students.find(s => s.id === id);
      return {
        id: id,
        name: student.name,
        email: student.email,
        group: student.group,
        attendance: attendanceStates[id]
      };
    })
  };
  
  // Aquí puedes agregar la lógica para enviar los datos al servidor
  console.log('Datos del registro a guardar:', registroData);
  
  // Mostrar confirmación de éxito
  const estudiantesTexto = registroData.estudiantes.length === 1 ? 'estudiante' : 'estudiantes';
  alert(`¡Registro guardado exitosamente!\n\nFecha: ${registroData.fecha}\nMateria: ${registroData.materia}\nGrupo: ${registroData.grupo}\nEstudiantes registrados: ${registroData.estudiantes.length} ${estudiantesTexto}`);
  
  // Opcional: Limpiar selecciones después de guardar
  // Object.keys(selectedStudents).forEach(id => selectedStudents[id] = false);
  // renderTable(getCurrentFilters());
  // updateSelectAllCheckbox();
}

// Event Listeners
filterForm.addEventListener('submit', e => {
  e.preventDefault();
  renderTable(getCurrentFilters());
});

searchInput.addEventListener('input', () => {
  renderTable(getCurrentFilters());
});

materiaSelect.addEventListener('change', () => {
  renderTable(getCurrentFilters());
});

grupoSelect.addEventListener('change', () => {
  searchInput.value = '';
  alphaFilterDiv.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
  renderTable(getCurrentFilters());
});

alphaFilterDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('letter-btn')) {
    alphaFilterDiv.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderTable(getCurrentFilters());
  }
});

// Event listener para checkbox "Seleccionar todos"
selectAllCheckbox.addEventListener('change', toggleSelectAll);

// Event listener para checkboxes individuales
tbody.addEventListener('change', (e) => {
  if (e.target.classList.contains('student-checkbox')) {
    const studentId = parseInt(e.target.getAttribute('data-student-id'));
    handleIndividualCheckbox(studentId, e.target.checked);
  }
});

// Event listener para el botón de guardar
saveRegistroBtn.addEventListener('click', saveRegistro);

// Función para deshabilitar fechas futuras
function disableFutureDates() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const maxDate = `${yyyy}-${mm}-${dd}`;
  fechaInput.setAttribute('max', maxDate);
}

// Inicialización
disableFutureDates();
renderTable(getCurrentFilters());
updateSelectAllCheckbox();