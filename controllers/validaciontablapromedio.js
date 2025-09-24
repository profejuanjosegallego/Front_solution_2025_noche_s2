// =======================
// DATOS INICIALES
// =======================
const data = [
  {
    grupo: "Grupo A",
    materias: [
      { nombre: "Metodologías", alumnos: [] },
      { nombre: "Backend1", alumnos: [] },
      { nombre: "Front1", alumnos: [] },
      { nombre: "JavaScript", alumnos: [] },
      { nombre: "JavaInte", alumnos: [] }
    ]
  },
  {
    grupo: "Grupo B",
    materias: [
      { nombre: "Metodologías", alumnos: [] },
      { nombre: "Backend1", alumnos: [] },
      { nombre: "Front1", alumnos: [] },
      { nombre: "JavaScript", alumnos: [] },
      { nombre: "JavaInte", alumnos: [] }
    ]
  },
  {
    grupo: "Grupo C",
    materias: [
      { nombre: "Metodologías", alumnos: [] },
      { nombre: "Backend1", alumnos: [] },
      { nombre: "Front1", alumnos: [] },
      { nombre: "JavaScript", alumnos: [] },
      { nombre: "JavaInte", alumnos: [] }
    ]
  }
];

// Variables globales
let grupoActual = 0;
let materiaActual = 0;

// =======================
// FUNCIONES
// =======================
function promedioMateria(materia) {
  if (materia.alumnos.length === 0) return 0;
  const total = materia.alumnos.reduce((sum, a) => sum + parseFloat(a.promedio), 0);
  return (total / materia.alumnos.length).toFixed(1);
}

function mostrarGrupos() {
  const contenedor = document.getElementById("grupos");
  contenedor.innerHTML = "";
  data.forEach((g, index) => {
    contenedor.innerHTML += `
      <button class="btn btn-primary grupo-btn" onclick="mostrarMaterias(${index})">
        ${g.grupo}
      </button>`;
  });
}

function mostrarMaterias(indexGrupo) {
  const contenedor = document.getElementById("materias");
  const alumnosCont = document.getElementById("alumnos");
  alumnosCont.innerHTML = ""; 
  contenedor.innerHTML = "";
  data[indexGrupo].materias.forEach((m, idx) => {
    const promedio = promedioMateria(m);
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card materia-card" onclick="mostrarAlumnos(${indexGrupo}, ${idx})">
          <div class="card-body text-center">
            <h5 class="card-title">${m.nombre}</h5>
            <p class="card-text">Promedio: <strong>${promedio}</strong></p>
          </div>
        </div>
      </div>`;
  });
}

function mostrarAlumnos(indexGrupo, indexMateria) {
  grupoActual = indexGrupo;
  materiaActual = indexMateria;

  document.getElementById("formContainer").style.display = "block";

  const contenedor = document.getElementById("alumnos");
  const materia = data[indexGrupo].materias[indexMateria];
  let html = `
    <h4 class="mb-3">Alumnos - ${materia.nombre}</h4>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Nota 1</th>
          <th>Nota 2</th>
          <th>Nota 3</th>
          <th>Promedio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;
  materia.alumnos.forEach((al, idx) => {
    html += `
      <tr>
        <td>${al.nombre}</td>
        <td>${al.notas[0]}</td>
        <td>${al.notas[1]}</td>
        <td>${al.notas[2]}</td>
        <td><strong>${al.promedio}</strong></td>
        <td class="acciones-btn">
          <button class="btn btn-warning btn-sm" onclick="editarAlumno(${idx})">✏️ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(${idx})">🗑️ Eliminar</button>
        </td>
      </tr>`;
  });
  html += `</tbody></table>`;
  contenedor.innerHTML = html;
}

// =======================
// CRUD DE ALUMNOS
// =======================
document.getElementById("formAlumno").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);
  const editIndex = parseInt(document.getElementById("editIndex").value);

  // Validación

  if (!nombre  || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Llena todos los campos",
        });
    return;
    
  }
  if ([nota1, nota2, nota3].some(n => n < 0 || n > 5)) {
    Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las notas deben estar entre 0 y 5",
        });
    return;
  } else{
    Swal.fire({
            title: "Guardado",
            icon: "success",
            draggable: true
});
  }

  const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(1);

  if (editIndex >= 0) {
    // Editar
    data[grupoActual].materias[materiaActual].alumnos[editIndex] = {
      nombre, notas: [nota1, nota2, nota3], promedio
    };
    document.getElementById("formTitulo").textContent = "Agregar Alumno";
  } else {
    // Agregar
    data[grupoActual].materias[materiaActual].alumnos.push({
      nombre, notas: [nota1, nota2, nota3], promedio
    });
  }

  // Reset
  document.getElementById("formAlumno").reset();
  document.getElementById("editIndex").value = -1;

  // Refrescar
  mostrarAlumnos(grupoActual, materiaActual);
  mostrarMaterias(grupoActual);
});

function editarAlumno(idx) {
  const alumno = data[grupoActual].materias[materiaActual].alumnos[idx];
  document.getElementById("nombre").value = alumno.nombre;
  document.getElementById("nota1").value = alumno.notas[0];
  document.getElementById("nota2").value = alumno.notas[1];
  document.getElementById("nota3").value = alumno.notas[2];
  document.getElementById("editIndex").value = idx;
  document.getElementById("formTitulo").textContent = "Editar Alumno";
}

function eliminarAlumno(idx) {
  if (confirm("¿Seguro que deseas eliminar este alumno?")) {
    data[grupoActual].materias[materiaActual].alumnos.splice(idx, 1);
    mostrarAlumnos(grupoActual, materiaActual);
    mostrarMaterias(grupoActual);
  }
}

// =======================
// INICIALIZAR
// =======================
mostrarGrupos();

