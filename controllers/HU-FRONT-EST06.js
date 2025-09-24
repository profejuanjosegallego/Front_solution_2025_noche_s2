const usuarios = ["Ana", "Carlos", "Juan", "Pedro", "Lucía"];
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const filtro = document.getElementById("filtro");


function renderLista(data) {
  lista.innerHTML = "";

  if (data.length === 0) {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
    data.forEach(usuario => {
      const li = document.createElement("li");
      li.textContent = usuario;
      lista.appendChild(li);
    });
  }
}

renderLista(usuarios);


filtro.addEventListener("input", (e) => {
  const valor = e.target.value.toLowerCase();
  const filtrados = usuarios.filter(u => u.toLowerCase().includes(valor));
  renderLista(filtrados);
});

