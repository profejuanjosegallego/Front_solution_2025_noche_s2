document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    
    // Alerta de bienvenida al cargar la página
    Swal.fire({
      title: 'Bienvenido',
      text: 'Por favor inicia sesión para continuar',
      icon: 'info',
      confirmButtonColor: '#231bd1',
      confirmButtonText: 'Entendido'
    });
    
    // Manejar el envío del formulario
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Validar campos vacíos
      if (!email || !password) {
        Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos requeridos',
          icon: 'warning',
          confirmButtonColor: '#231bd1',
          confirmButtonText: 'Entendido'
        });
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({
          title: 'Email inválido',
          text: 'Por favor ingresa un correo electrónico válido',
          icon: 'error',
          confirmButtonColor: '#231bd1',
          confirmButtonText: 'Entendido'
        });
        return;
      }
      
      // Simular inicio de sesión exitoso
      // En una aplicación real, aquí harías una petición a tu servidor
      Swal.fire({
        title: 'Iniciando sesión...',
        text: 'Por favor espera',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      // Simular retraso de red
      setTimeout(() => {
        Swal.fire({
          title: '¡Inicio exitoso!',
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
          confirmButtonColor: '#231bd1',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir o realizar acción posterior al login
            console.log('Redirigiendo al dashboard...');
          }
        });
      }, 2000);
    });
    
    // Manejar olvidó contraseña
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      Swal.fire({
        title: 'Recuperar contraseña',
        text: 'Ingresa tu correo electrónico para restablecer tu contraseña',
        input: 'email',
        inputPlaceholder: 'Tu correo electrónico',
        showCancelButton: true,
        confirmButtonColor: '#231bd1',
        cancelButtonColor: '#7d6c9d',
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return 'Debes ingresar un correo electrónico';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Enviado',
            text: 'Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico',
            icon: 'success',
            confirmButtonColor: '#231bd1',
            confirmButtonText: 'Entendido'
          });
        }
      });
    });
  });