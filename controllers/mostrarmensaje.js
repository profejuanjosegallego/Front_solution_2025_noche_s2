   const filtro = document.getElementById("filtro");
    const lista = document.getElementById("lista");
    const items = lista.getElementsByTagName("li");
    const mensajeVacio = document.getElementById("mensajeVacio");

    filtro.addEventListener("input", function() {
      let texto = filtro.value.toLowerCase();
      let coincidencias = 0;

      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.toLowerCase().includes(texto)) {
          items[i].style.display = "";
          coincidencias++;
        } else {
          items[i].style.display = "none";
        }
      }

      // Mostrar u ocultar mensaje vacío
      mensajeVacio.style.display = coincidencias === 0 ? "block" : "none";
    })