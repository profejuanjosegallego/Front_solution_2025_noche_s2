
/* Objeto con los datos del usuario
const usuario = {
  nombre: "Julieth Mora",
  documento: "123456789",
  correo: "julieth.mora@email.com"
};


const nombreUsuario = document.getElementById('nombreUsuario');
const documentoUsuario = document.getElementById('documentoUsuario');
const correoUsuario = document.getElementById('correoUsuario');


nombreUsuario.textContent = usuario.nombre;
documentoUsuario.textContent = `Documento: ${usuario.documento}`;
correoUsuario.textContent = `Correo: ${usuario.correo}`; */

//--------------------------------------------

// Datos del usuario simulados
const usuario = {
  nombre: "Julieth Mora",
  documento: "123456789",
  correo: "julieth.mora@email.com"
};

// Referencias a los elementos de la tarjeta
const nombreUsuario = document.getElementById("nombreUsuario");
const documentoUsuario = document.getElementById("documentoUsuario");
const correoUsuario = document.getElementById("correoUsuario");

// Inyección de datos
nombreUsuario.textContent = usuario.nombre;
documentoUsuario.textContent =usuario.documento
correoUsuario.textContent=usuario.correo
