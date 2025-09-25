
const estudiantes = [
  { nombre: "Ana Pérez", materia: "Matemáticas", correo: "ana.perez@email.com", nota: 3, notaFinal: 4 },
  { nombre: "Carlos Gómez", materia: "Biología", correo: "c.gomez@email.com", nota: 4, notaFinal: 2 },
  { nombre: "Luisa Martínez", materia: "Historia", correo: "luisa.martinez@email.com", nota: 2, notaFinal: 2 },
  { nombre: "Diego Ramírez", materia: "Física", correo: "diego.ramirez@email.com", nota: 1.5, notaFinal: 5 },
  { nombre: "María Torres", materia: "Inglés", correo: "maria.torres@email.com", nota: 4, notaFinal: 3 }
];

// Función para asignar clase según nota
function obtenerClaseNota(valor) {
  if (valor < 3) return "text-red-500 font-bold";
  if (valor < 4) return "text-yellow-500 font-semibold";
  return "text-green-600 font-bold";
}

// Renderizar tabla dinámicamente
const tbody = document.querySelector("#tablaNotas tbody");

estudiantes.forEach(estudiante => {
  const fila = document.createElement("tr");
  fila.classList.add("odd:bg-gray-50", "even:bg-gray-100", "hover:bg-colorTerciario", "hover:bg-opacity-10", "transition");

  fila.innerHTML = `
    <td class="p-3 text-center">${estudiante.nombre}</td>
    <td class="p-3 text-center">${estudiante.materia}</td>
    <td class="p-3 text-center">${estudiante.correo}</td>
    <td class="p-3 text-center ${obtenerClaseNota(estudiante.nota)}">${estudiante.nota}</td>
    <td class="p-3 text-center ${obtenerClaseNota(estudiante.notaFinal)}">${estudiante.notaFinal}</td>
  `;

  tbody.appendChild(fila);
});

