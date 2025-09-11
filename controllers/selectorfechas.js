// Capturar elementos del DOM
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnLimpiar = document.getElementById("btnLimpiar");
const mensaje = document.getElementById("mensaje");
const resultados = document.getElementById("resultados");

// Datos de ejemplo 
const datos = [
  { fecha: "2025-08-28", valor: 10 },
  { fecha: "2025-08-30", valor: 20 },
  { fecha: "2025-09-01", valor: 15 },
  { fecha: "2025-09-05", valor: 30 },
];

// Función para filtrar datos por rango de fechas
function filtrarDatos() {
  const inicio = fechaInicio.value;
  const fin = fechaFin.value;

  if (!inicio || !fin) {
    mensaje.textContent = "Debes seleccionar ambas fechas";
    return;
  }

  if (inicio > fin) {
    mensaje.textContent = "La fecha inicial no puede ser mayor que la final.";
    return;
  }

  mensaje.textContent = "";

  const filtrados = datos.filter(d => d.fecha >= inicio && d.fecha <= fin);

  mostrarResultados(filtrados);
}

// Función para mostrar resultados
function mostrarResultados(lista) {
  if (lista.length === 0) {
    resultados.innerHTML = "<p>No hay datos en este rango.</p>";
    return;
  }

  resultados.innerHTML = lista.map(d => 
    `<p>📅 ${d.fecha}: ${d.valor}</p>`
  ).join("");
}

// Limpiar filtro
function limpiarFiltro() {
  fechaInicio.value = "";
  fechaFin.value = "";
  mensaje.textContent = "";
  resultados.innerHTML = "";
}

// Eventos
btnFiltrar.addEventListener("click", filtrarDatos);
btnLimpiar.addEventListener("click", limpiarFiltro);
