function iniciarVerdaderoFalso() {
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.innerHTML = `
    <h2>✅❌ Verdadero o falso</h2>
    <p>Lee la afirmación y elige la opción correcta</p>
  `;

  const cont = document.getElementById("contenidoJuego");
  cont.innerHTML = "";

  const nombreJuego = "verdadero-falso";
  let nivelActual = obtenerNivelJuego(nombreJuego);
  const yaCompletoTodos = nivelesJuegos[nombreJuego + "_completado"] || false;

  let cantidad;
  if (nivelActual === 1) cantidad = 5;
  else if (nivelActual === 2) cantidad = 8;
  else cantidad = 12;

  let aciertos = 0;
  let preguntas = [];

  for (let i = 0; i < cantidad; i++) {
    const flor = flores[Math.floor(Math.random() * flores.length)];
    const campo = ["toxica", "ecosistema", "usos", "faunaAsociada"][Math.floor(Math.random() * 4)];

    const esVerdadera = Math.random() < 0.5;
    let valorCorrecto = flor[campo];
    let valorMostrado = valorCorrecto;

    if (!esVerdadera) {
      const otras = flores.filter(f => f[campo] !== valorCorrecto);
      valorMostrado = otras[Math.floor(Math.random() * otras.length)][campo];
    }

    let afirmacion = "";
    if (campo === "toxica") {
      afirmacion = `${flor.nombre} ${valorMostrado ? 'es' : 'no es'} una planta tóxica.`;
    } else if (campo === "ecosistema") {
      afirmacion = `${flor.nombre} pertenece al ecosistema: ${valorMostrado}.`;
    } else if (campo === "usos") {
      afirmacion = `${flor.nombre} se utiliza para: ${valorMostrado}`;
    } else if (campo === "faunaAsociada") {
      afirmacion = `${flor.nombre} está asociada con: ${valorMostrado}`;
    }

    preguntas.push({ texto: afirmacion, correcta: esVerdadera });
  }

  function mostrarPregunta(index) {
    if (index >= preguntas.length) {
      alert(`🎉 Nivel completado con ${aciertos} aciertos de ${cantidad}`);
      
      if (nivelActual < 3) {
        subirNivelJuego(nombreJuego);
        if (!yaCompletoTodos) {
          sumarPuntos(aciertos);
        }
        iniciarVerdaderoFalso();
      } else {
        nivelesJuegos[nombreJuego + "_completado"] = true;
        actualizarNivelJuego(nombreJuego, 1);
        if (!yaCompletoTodos) {
          sumarPuntos(aciertos);
        }
        mostrarFelicitacion();
        iniciarVerdaderoFalso();
      }
      return;
    }

    cont.innerHTML = "";
    const p = preguntas[index];

    const tarjeta = document.createElement("div");
    tarjeta.className = "planta";
    tarjeta.innerHTML = `<p><strong>${p.texto}</strong></p>`;
    cont.appendChild(tarjeta);

    const btnV = document.createElement("button");
    btnV.textContent = "✅ Verdadero";
    btnV.onclick = () => {
      if (p.correcta) {
        reproducirSonido("win");
        aciertos++;
      } else {
        reproducirSonido("lose");
        alert("❌ Incorrecto");
      }
      mostrarPregunta(index + 1);
    };

    const btnF = document.createElement("button");
    btnF.textContent = "❌ Falso";
    btnF.onclick = () => {
      if (!p.correcta) {
        reproducirSonido("win");
        aciertos++;
      } else {
        reproducirSonido("lose");
        alert("❌ Incorrecto");
      }
      mostrarPregunta(index + 1);
    };

    cont.appendChild(btnV);
    cont.appendChild(btnF);
  }

  mostrarPregunta(0);
}
