//Necesito controlar el formulario del documento

let tituloFormulario=document.getElementById("tituloFormulario")
let nombreUsuario=document.getElementById("nombreUsuario")
let contraseñaUsuario=document.getElementById("contraseñaUsuario")
let botonFormulario=document.getElementById("botonFormulario")


//Necesito activar el control segun las interacciones del usuario
botonFormulario.addEventListener("click",function(evento){
    evento.preventDefault()
    //Capturar datos desde el formulario
    let nombreRecibido=nombreUsuario.value
    let contraseñaRecibida=contraseñaUsuario.value


    //validando los datos
    if(nombreRecibido==""||nombreRecibido=="juan"){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Revisa el nombre ingresado",
        });
    }else if(contraseñaRecibida==""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Revisa la contraseña ingresado",
        });
    }


    //construyendo un JSON
    let envioDatos={
        nombre:nombreRecibido,
        contraseña:contraseñaRecibida
    }
   
    /*Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
    });*/

})

 <script>
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const mensaje = document.getElementById("mensaje");
    const btnRegistro = document.getElementById("btnRegistro");

    function validarContraseñas() {
      if (confirmPassword.value === "") {
        mensaje.textContent = "";
        btnRegistro.disabled = true;
        return;
      }

      if (password.value === confirmPassword.value) {
        mensaje.textContent = "✔ Contraseñas coinciden";
        mensaje.className = "exito";
        btnRegistro.disabled = false;
      } else {
        mensaje.textContent = "✘ Las contraseñas no coinciden";
        mensaje.className = "error";
        btnRegistro.disabled = true;
      }
    }

    password.addEventListener("input", validarContraseñas);
    confirmPassword.addEventListener("input", validarContraseñas);

    document.getElementById("formRegistro").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("¡Registro exitoso!");
      // Aquí puedes enviar los datos al servidor si todo está correcto
    });
  </script>

</body>
</html>