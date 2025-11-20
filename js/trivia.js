function iniciarTrivia() {
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.innerHTML = `
    <h2>❓ Trivia rápida</h2>
    <p>Responde correctamente las preguntas para subir de nivel</p>
  `;

  const cont = document.getElementById("contenidoJuego");
  cont.innerHTML = "";

  const nombreJuego = "trivia";
  let nivelActual = obtenerNivelJuego(nombreJuego);
  const yaCompletoTodos = nivelesJuegos[nombreJuego + "_completado"] || false;

  let cantidad;
  if (nivelActual === 1) cantidad = 5;
  else if (nivelActual === 2) cantidad = 8;
  else cantidad = 12;

  let aciertos = 0;

  const camposTrivia = ['ecosistema', 'usos', 'faunaAsociada'];
  const preguntas = [];

  while (preguntas.length < cantidad) {
    const planta = flores[Math.floor(Math.random() * flores.length)];
    const campo = camposTrivia[Math.floor(Math.random() * camposTrivia.length)];

    const preguntaTexto = {
      ecosistema: `¿A qué ecosistema pertenece la planta "${planta.nombre}"?`,
      usos: `¿Cuál es un uso de la planta "${planta.nombre}"?`,
      faunaAsociada: `¿Qué fauna se asocia con "${planta.nombre}"?`
    };

    preguntas.push({
      texto: preguntaTexto[campo],
      respuestaCorrecta: planta[campo],
      opciones: generarOpciones(planta[campo], campo)
    });
  }

  function generarOpciones(correcta, campo) {
    const opciones = [correcta];
    const candidatos = flores
      .map(f => f[campo])
      .filter(val => val !== correcta);
    const unicas = [...new Set(candidatos)].sort(() => 0.5 - Math.random()).slice(0, 2);
    return [...opciones, ...unicas].sort(() => 0.5 - Math.random());
  }

  function mostrarPregunta(index) {
    cont.innerHTML = "";

    if (index >= preguntas.length) {
      alert("🎉 ¡Nivel completado!");
      
      if (nivelActual < 3) {
        subirNivelJuego(nombreJuego);
        if (!yaCompletoTodos) {
          usuario.puntos += 5;
          document.getElementById("puntos").textContent = usuario.puntos;
          actualizarUsuarioEnFirebase();
        }
        iniciarTrivia();
      } else {
        nivelesJuegos[nombreJuego + "_completado"] = true;
        actualizarNivelJuego(nombreJuego, 1);
        if (!yaCompletoTodos) {
          usuario.puntos += 5;
          document.getElementById("puntos").textContent = usuario.puntos;
          actualizarUsuarioEnFirebase();
        }
        mostrarFelicitacion();
        iniciarTrivia();
      }
      return;
    }

    const pregunta = preguntas[index];

    const preguntaDiv = document.createElement("div");
    preguntaDiv.className = "planta";
    preguntaDiv.innerHTML = `<p><strong>${pregunta.texto}</strong></p>`;
    cont.appendChild(preguntaDiv);

    pregunta.opciones.forEach(opcion => {
      const btn = document.createElement("button");
      btn.textContent = opcion;
      btn.onclick = () => {
        if (opcion === pregunta.respuestaCorrecta) {
          aciertos++;
          reproducirSonido("win");
          alert("✅ ¡Correcto!");
        } else {
          reproducirSonido("lose");
          alert("❌ Incorrecto. Era: " + pregunta.respuestaCorrecta);
        }
        mostrarPregunta(index + 1);
      };
      cont.appendChild(btn);
    });
  }

  mostrarPregunta(0);
}
