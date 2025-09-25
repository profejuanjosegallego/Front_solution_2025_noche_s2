// <!-- Script para funcionalidad -->
     // Datos iniciales (opcional)
    const calificaciones = [
      { nombre: "Carlos Ruiz", materia: "Matemáticas", promedio: 8.7, fecha: "2025-09-20" },
      { nombre: "Ana Torres", materia: "Lengua", promedio: 9.2, fecha: "2025-09-18" },
      { nombre: "Luis Gómez", materia: "Historia", promedio: 7.5, fecha: "2025-09-19" }
    ];

    const cuerpoTabla = document.querySelector("#tablaCalificaciones tbody");

    // Función para mostrar los datos en la tabla
    function renderizarTabla() {
      cuerpoTabla.innerHTML = "";
      calificaciones.forEach(item => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.materia}</td>
          <td>${item.promedio.toFixed(1)}</td>
          <td>${item.fecha}</td>
        `;

        cuerpoTabla.appendChild(fila);
      });
    }

    // Mostrar datos al cargar
    renderizarTabla();

    // Manejo del formulario
    const form = document.getElementById("formAgregar");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const materia = document.getElementById("materia").value.trim();
      const promedio = parseFloat(document.getElementById("promedio").value);
      const fecha = document.getElementById("fecha").value;

      if (!nombre || !materia || isNaN(promedio) || promedio < 0 || promedio > 10 || !fecha) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
      }

      // Agregar nuevo registro
      calificaciones.push({ nombre, materia, promedio, fecha });

      // Actualizar tabla
      renderizarTabla();

      // Limpiar formulario
      form.reset();
      document.getElementById("nombre").focus();
    });
  