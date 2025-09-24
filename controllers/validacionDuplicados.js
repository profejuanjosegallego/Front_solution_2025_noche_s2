const form = document.getElementById("formFamiliares");
const lista = document.getElementById("listaFamiliares");

let familiares = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const relacion = document.getElementById("relacion").value;

  // Validar duplicados
  const existe = familiares.some(f => f.nombre === nombre && f.relacion === relacion);

  if (existe) {
    Swal.fire({
      icon: 'error',
      title: 'Duplicado',
      text: 'Ese familiar ya está registrado.'
    });
    return;
  }

  // Si no existe, lo agrego
  familiares.push({ nombre, relacion });
  const item = document.createElement("li");
  item.className = "list-group-item";
  item.textContent = `${nombre} - ${relacion}`;
  lista.appendChild(item);

  Swal.fire({
    icon: 'success',
    title: 'Agregado',
    text: `Familiar ${nombre} registrado correctamente.`
  });
});
