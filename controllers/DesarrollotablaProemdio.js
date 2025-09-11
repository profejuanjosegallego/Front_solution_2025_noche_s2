    // =======================
    // DATOS DE EJEMPLO (Array)
    // =======================
    const data = [
      {
        grupo: "Grupo A",
        materias: [
          { nombre: "Metodologías", alumnos: generarAlumnos("Metodologías") },
          { nombre: "Backend1", alumnos: generarAlumnos("Backend1") },
          { nombre: "Front1", alumnos: generarAlumnos("Front1") },
          { nombre: "JavaScrpit", alumnos: generarAlumnos("JavaScrpit") },
          { nombre: "JavaInte", alumnos: generarAlumnos("JavaInte") }
        ]
      },
      {
        grupo: "Grupo B",
        materias: [
          { nombre: "Metodologías", alumnos: generarAlumnos("Metodologías") },
          { nombre: "Backend1", alumnos: generarAlumnos("Backend1") },
          { nombre: "Front1", alumnos: generarAlumnos("Front1") },
          { nombre: "JavaScrpit", alumnos: generarAlumnos("JavaScrpit") },
          { nombre: "JavaInte", alumnos: generarAlumnos("JavaInte") }
        ]
      },
      {
        grupo: "Grupo C",
        materias: [
          { nombre: "Metodologías", alumnos: generarAlumnos("Metodologías") },
          { nombre: "Backend1", alumnos: generarAlumnos("Backend1") },
          { nombre: "Front1", alumnos: generarAlumnos("Front1") },
          { nombre: "JavaScrpit", alumnos: generarAlumnos("JavaScrpit") },
          { nombre: "JavaInte", alumnos: generarAlumnos("JavaInte") }
        ]
      }
    ];

    // =======================
    // FUNCIONES
    // =======================

    // Generar alumnos con 3 notas aleatorias
    function generarAlumnos(materia) {
      const alumnos = [];
      for (let i = 1; i <= 20; i++) {
        const notas = [
          (Math.random() * 5).toFixed(1),
          (Math.random() * 5).toFixed(1),
          (Math.random() * 5).toFixed(1)
        ].map(Number);
        const promedio = (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1);
        alumnos.push({
          nombre: `Alumno ${i} (${materia})`,
          notas,
          promedio
        });
      }
      return alumnos;
    }

    // Calcular promedio de una materia
    function promedioMateria(materia) {
      const total = materia.alumnos.reduce((sum, a) => sum + parseFloat(a.promedio), 0);
      return (total / materia.alumnos.length).toFixed(1);
    }

    // Mostrar grupos
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

    // Mostrar materias
    function mostrarMaterias(indexGrupo) {
      const contenedor = document.getElementById("materias");
      const alumnosCont = document.getElementById("alumnos");
      alumnosCont.innerHTML = ""; // limpiar alumnos
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

    // Mostrar alumnos de una materia
    function mostrarAlumnos(indexGrupo, indexMateria) {
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
            </tr>
          </thead>
          <tbody>
      `;
      materia.alumnos.forEach(al => {
        html += `
          <tr>
            <td>${al.nombre}</td>
            <td>${al.notas[0]}</td>
            <td>${al.notas[1]}</td>
            <td>${al.notas[2]}</td>
            <td><strong>${al.promedio}</strong></td>
          </tr>`;
      });
      html += `</tbody></table>`;
      contenedor.innerHTML = html;
    }

    // Inicializar
    mostrarGrupos();