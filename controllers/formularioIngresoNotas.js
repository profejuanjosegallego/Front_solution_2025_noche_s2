// Capturar los elementos del formulario
let nombreEstudiante = document.getElementById("nombreEstudiante");
let asignatura = document.getElementById("asignatura");
let nota = document.getElementById("nota");
let botonFormulario = document.getElementById("botonFormulario");

// Escuchar el click en el botón
botonFormulario.addEventListener("click", function (evento) {
  evento.preventDefault();

  // Capturar valores del formulario 
  let nombreRecibido = nombreEstudiante.value.trim();
  let asignaturaRecibida = asignatura.value.trim();
  let notaRecibida = nota.value.trim();


  if (nombreRecibido === "" || asignaturaRecibida === "" || notaRecibida === "") {
    alert("Por favor completa los 3 campos.");
    return;
  }

  const notaNumero = parseFloat(notaRecibida);
  if (Number.isNaN(notaNumero)) {
    alert("La nota debe ser un número (ej: 4.5).");
    return;
  }


  if (notaNumero < 0 || notaNumero > 5) {
    alert("La nota debe estar entre 0.0 y 5.0.");
    return;
  }

  alert("¡Los datos se guardaron correctamente!");
});

