const form = document.getElementById('apoyoForm');
const formMessage = document.getElementById('formMessage');

const tipoApoyoEl = document.getElementById('tipoApoyo');
const motivoEl = document.getElementById('motivo');
const detallesEl = document.getElementById('detalles');

function clearFieldError(el) {
  el.classList.remove('input--invalid');
  const err = document.getElementById(el.id + 'Error');
  if (err) { err.textContent = ''; err.style.display = 'none'; }
}

function showFieldError(el, message) {
  el.classList.add('input--invalid');
  const err = document.getElementById(el.id + 'Error');
  if (err) {
    err.textContent = message;
    err.style.display = 'block';
  }
}

function clearAllErrors() {
  [tipoApoyoEl, motivoEl, detallesEl].forEach(clearFieldError);
  formMessage.style.display = 'none';
  formMessage.className = 'form__message';
  formMessage.textContent = '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearAllErrors();

  let firstInvalid = null;

  if (!tipoApoyoEl.value || tipoApoyoEl.value.trim() === '') {
    showFieldError(tipoApoyoEl, 'Seleccione el tipo de apoyo.');
    firstInvalid = firstInvalid || tipoApoyoEl;
  }

  if (!motivoEl.value || motivoEl.value.trim() === '') {
    showFieldError(motivoEl, 'Ingrese el motivo.');
    firstInvalid = firstInvalid || motivoEl;
  }

  if (firstInvalid) {
    formMessage.textContent = '⚠️ Por favor diligencie los campos requeridos.';
    formMessage.className = 'form__message form__message--error';
    formMessage.style.display = 'block';
    firstInvalid.focus();
    return;
  }

  form.reset();
  formMessage.textContent = '✅ El formulario se envió correctamente.';
  formMessage.className = 'form__message form__message--success';
  formMessage.style.display = 'block';
});
