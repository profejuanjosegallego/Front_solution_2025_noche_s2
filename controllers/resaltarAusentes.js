const filas = document.querySelectorAll("#tablaAsistencia tbody tr");

filas.forEach(fila => {
  const estado = fila.cells[2].innerText.trim().toLowerCase();

  if (estado === "ausente") {
    fila.classList.add("table-danger");
  } else if (estado === "justificado") {
    fila.classList.add("table-secondary"); 
  }
});
