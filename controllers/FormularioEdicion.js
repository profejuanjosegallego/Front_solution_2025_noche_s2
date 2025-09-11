let btnGuardar=document.getElementById("btnGuardar")

let formularioEdicion=document.getElementById("formulario")

formularioEdicion.addEventListener("submit",function(evento){
const correo = document.getElementById('correo').value;
const telefono = document.getElementById('telefono').value;
const direccion = document.getElementById('direccion').value;
      // Validar que el campo no esté vacío
      if (correo.trim() === '') {
        alert('El campo de correo electrónico es obligatorio.');
        evento.preventDefault(); // Evita que se envíe el formulario
      }else if (telefono.trim() === '') {
        alert('El campo de teléfono es obligatorio.');
        evento.preventDefault(); // Evita que se envíe el formulario
      }else if (direccion.trim() === '') {
        alert('El campo de dirección es obligatorio.');
        evento.preventDefault(); // Evita que se envíe el formulario
      }

alert("Edicion guardada")
})
