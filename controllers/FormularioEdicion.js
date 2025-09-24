document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const btnGuardar = document.getElementById("btnGuardar");

  btnGuardar.addEventListener("click", (e) => {
    e.preventDefault(); // evitar recarga

    // Campos obligatorios (con correo incluido)
    const obligatorios = [
      "direccion",
      "telefono",
      "correo",
      "fechaNacimiento",
      "institucion",
      "programa",
      "semestre"
    ];

    let valido = true;
    let mensajes = [];

    obligatorios.forEach((id) => {
      const campo = document.getElementById(id);
      if (!campo || !campo.value.trim()) {
        valido = false;
        if (campo) campo.classList.add("is-invalid"); // Bootstrap rojo
        mensajes.push(`El campo "${id}" es obligatorio.`);
      } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid"); // Bootstrap verde
      }
    });

    if (!valido) {
      alert("⚠️ Faltan campos obligatorios:\n\n" + mensajes.join("\n"));
      return;
    }

    // Si todo está correcto, mostrar mensaje de éxito
    const alertSuccess = document.createElement("div");
    alertSuccess.className = "alert alert-success mt-4";
    alertSuccess.textContent = "✅ Datos guardados correctamente.";

    if (!document.querySelector(".alert-success")) {
      form.appendChild(alertSuccess);
    }
  });
});
