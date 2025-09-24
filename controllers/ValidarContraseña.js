//  VALIDACIÓN DE CONTRASEÑAS


const password = document.getElementById("contraseñaUsuario");
const confirmPassword = document.getElementById("confirmarContraseña");
const mensajeError = document.getElementById("mensajeError");
const mensajeOk = document.getElementById("mensajeOk");
const boton = document.getElementById("botonFormulario");


boton.disabled = true;

function validarPasswords() {
  // Si alguno está vacío, ocultar mensajes y bloquear botón
  if (password.value === "" || confirmPassword.value === "") {
    mensajeError.classList.add("d-none");
    mensajeOk.classList.add("d-none");
    boton.disabled = true;
    return;
  }

  
  if (password.value === confirmPassword.value) {
    mensajeError.classList.add("d-none");
    mensajeOk.classList.remove("d-none");
    boton.disabled = false;
  }
  
  else {
    mensajeError.classList.remove("d-none");
    mensajeOk.classList.add("d-none");
    boton.disabled = true;
  }
}


password.addEventListener("input", validarPasswords);
confirmPassword.addEventListener("input", validarPasswords);
