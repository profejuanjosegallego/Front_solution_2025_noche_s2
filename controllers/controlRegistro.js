// Datos de estudiantes (simulación) con 30 alumnos divididos en tres grupos
const students = [
  // Grupo A (10 estudiantes)
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

  // Grupo B (10 estudiantes)
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

  // Grupo C (10 estudiantes)
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

// Estado asistencia en memoria inicializado localmente
const attendanceStates = {};
students.forEach(s => attendanceStates[s.id] = 'No registrado');

// Referencias DOM
const tbody = document.getElementById('studentsTbody');
const searchInput = document.getElementById('searchInput');
const filterForm = document.getElementById('filterForm');
const materiaSelect = document.getElementById('materiaSelect');
const grupoSelect = document.getElementById('grupoSelect');
const alphaFilterDiv = document.querySelector('.alpha-filter .letters'); // Contenedor para los botones de letras
const fechaInput = document.getElementById('fechaInput');

// Crear botones de filtro alfabético (A-Z + Todos)
const alphaOptions = ['Todos', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
alphaOptions.forEach(letter => {
  const button = document.createElement('button');
  button.className = 'letter-btn';
  button.textContent = letter;
  button.setAttribute('data-letter', letter === 'Todos' ? '' : letter);
  alphaFilterDiv.appendChild(button);
});

// Modificar renderTable para incluir filtro alfabético
function renderTable(filter = {}) {
  tbody.innerHTML = '';

  const searchText = (filter.search || '').toLowerCase();
  const selectedMateria = filter.materia || 'Matemáticas'; // Mantener por si se implementa en el futuro
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
    tdEmpty.colSpan = 4;
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

    // Columna estudiante
    const tdName = document.createElement('td');
    tdName.innerHTML = `
      <div class="student-info">
        <span class="student-name">${student.name}</span>
        <span class="student-email">${student.email}</span>
      </div>
    `;

    // Columna grupo
    const tdGroup = document.createElement('td');
    const [grpText, grpLetter] = student.group.split(' ');
    tdGroup.className = 'student-group';
    tdGroup.innerHTML = `${grpText} <strong>${grpLetter}</strong>`;

    // Columna estado
    const tdStatus = document.createElement('td');
    const statusText = attendanceStates[student.id] || "No registrado";
    tdStatus.innerHTML = `
      <span class="${statusText === 'No registrado' ? 'status-unregistered' : getStatusButtonClass(statusText)}"
            aria-label="Estado de asistencia ${statusText}">
        ${statusText}
      </span>
    `;

    // Columna acciones
    const tdActions = document.createElement('td');
    tdActions.className = 'actions-cell';
    tdActions.innerHTML = `
      <button type="button" class="btn-status btn-present" aria-label="Marcar ${student.name} como presente">Presente</button>
      <button type="button" class="btn-status btn-absent" aria-label="Marcar ${student.name} como ausente">Ausente</button>
      <button type="button" class="btn-status btn-justified" aria-label="Marcar ${student.name} como justificado">Justificado</button>
    `;

    // Añadir event listeners a los botones de acción
    tdActions.querySelector('.btn-present').addEventListener('click', () => updateAttendance(student.id, 'Presente'));
    tdActions.querySelector('.btn-absent').addEventListener('click', () => updateAttendance(student.id, 'Ausente'));
    tdActions.querySelector('.btn-justified').addEventListener('click', () => updateAttendance(student.id, 'Justificado'));

    tr.appendChild(tdName);
    tr.appendChild(tdGroup);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}

// Función auxiliar para obtener la clase CSS del botón de estado
function getStatusButtonClass(status) {
  switch (status) {
    case 'Presente': return 'btn-present';
    case 'Ausente': return 'btn-absent';
    case 'Justificado': return 'btn-justified';
    default: return '';
  }
}

// Cambiar estado de asistencia y volver a renderizar
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

// Eventos
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
  // Limpiar búsqueda y filtro alfabético cuando cambia grupo para mejor UX
  searchInput.value = '';
  alphaFilterDiv.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
  renderTable(getCurrentFilters());
});

alphaFilterDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('letter-btn')) {
    // Remover 'active' de todos los botones
    alphaFilterDiv.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
    // Añadir 'active' al botón clickeado
    e.target.classList.add('active');
    renderTable(getCurrentFilters());
  }
});

// Iniciar tabla

function disableFutureDates() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
  const dd = String(today.getDate()).padStart(2, '0');
  const maxDate = `${yyyy}-${mm}-${dd}`;
  fechaInput.setAttribute('max', maxDate);
}
disableFutureDates();
renderTable(getCurrentFilters());