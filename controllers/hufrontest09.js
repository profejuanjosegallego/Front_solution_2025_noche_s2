// Notas simuladas
const notas = [2.5, 3.8, 4.2, 1.9, 3.0, 4.0, 2.8, 3.5, 2.9, 4.8];

let aprobados = notas.filter(n => n >= 3.0).length;
let reprobados = notas.filter(n => n < 3.0).length;
let total = notas.length;

let porcentajeAprobados = (aprobados / total) * 100;
let porcentajeReprobados = (reprobados / total) * 100;

// Elementos
const grafico = document.getElementById("grafico");
const textoAprobados = document.getElementById("textoAprobados");
const textoReprobados = document.getElementById("textoReprobados");

// Animación: arranca en 0% y va subiendo
let progreso = 0;
const animacion = setInterval(() => {
  if (progreso >= porcentajeAprobados) {
    clearInterval(animacion);
  } else {
    progreso += 1; // velocidad de llenado
    grafico.style.background = `
      conic-gradient(
        #4caf50 0% ${progreso}%,
        #f44336 ${progreso}% 100%
      )
    `;
  }
}, 30); // 30ms por frame

// Mostrar texto con valores finales
textoAprobados.textContent = 
  `Aprobados: ${aprobados} (${porcentajeAprobados.toFixed(1)}%)`;

textoReprobados.textContent = 
  `Reprobados: ${reprobados} (${porcentajeReprobados.toFixed(1)}%)`;
