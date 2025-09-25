let tituloFormulario=document.getElementById("tituloFormulario")
let nombreUsuario=document.getElementById("email")
let contraseñaUsuario=document.getElementById("password")
let botonFormulario=document.getElementById("botonFormulario")


//Necesito activar el control segun las interacciones del usuario
botonFormulario.addEventListener("click", function(evento) {
    evento.preventDefault()

    let nombreRecibido = nombreUsuario.value
    let contraseñaRecibida = contraseñaUsuario.value

    if (nombreRecibido == "") {
        nombreUsuario.classList.add("is-invalid")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Revisa el correo ingresado",
        })
    } else if (contraseñaRecibida == "") {
        contraseñaUsuario.classList.add("is-invalid")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Revisa la contraseña ingresada",
        })
    } else 
        Swal.fire({
            title: "Sus datos han sido exitosamente registrados!",
            icon: "success",
            draggable: true
        })
    
})