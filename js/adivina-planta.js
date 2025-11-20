function iniciarAdivinaPlanta() {
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.innerHTML = `
    <h2>🌿 Adivina la planta</h2>
    <p>Observa la imagen y selecciona el nombre correcto</p>
  `;

  const cont = document.getElementById("contenidoJuego");
  cont.innerHTML = "";

  const nombreJuego = "adivina-planta";
  let nivelActual = obtenerNivelJuego(nombreJuego);
  const yaCompletoTodos = nivelesJuegos[nombreJuego + "_completado"] || false;

  let cantidad;
  if (nivelActual === 1) cantidad = 5;
  else if (nivelActual === 2) cantidad = 8;
  else cantidad = 12;

  let aciertos = 0;

  function mostrarPregunta() {
    cont.innerHTML = "";

    const plantaCorrecta = flores[Math.floor(Math.random() * flores.length)];
    const opcionesIncorrectas = flores
      .filter(f => f.nombre !== plantaCorrecta.nombre)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const opciones = [plantaCorrecta, ...opcionesIncorrectas].sort(() => 0.5 - Math.random());

    const tarjeta = document.createElement("div");
    tarjeta.className = "planta";
    tarjeta.innerHTML = `
      <img src="img/flor${flores.indexOf(plantaCorrecta) + 1}.jpeg" alt="${plantaCorrecta.nombre}">
      <p><strong>¿Cuál es el nombre de esta planta?</strong></p>
    `;
    cont.appendChild(tarjeta);

    const botonesContainer = document.createElement("div");

    opciones.forEach(opcion => {
      const btn = document.createElement("button");
      btn.textContent = opcion.nombre;
      btn.onclick = () => {
        if (opcion.nombre === plantaCorrecta.nombre) {
          aciertos++;
          reproducirSonido("win");
          alert("✅ ¡Correcto!");

          if (aciertos >= cantidad) {
            alert("🎉 ¡Nivel completado!");
            
            if (nivelActual < 3) {
              subirNivelJuego(nombreJuego);
              if (!yaCompletoTodos) {
                sumarPuntos(5);
              }
              iniciarAdivinaPlanta();
            } else {
              nivelesJuegos[nombreJuego + "_completado"] = true;
              actualizarNivelJuego(nombreJuego, 1);
              if (!yaCompletoTodos) {
                sumarPuntos(5);
              }
              mostrarFelicitacion();
              iniciarAdivinaPlanta();
            }
          } else {
            mostrarPregunta();
          }

        } else {
          reproducirSonido("lose");
          alert("❌ Incorrecto. Intenta de nuevo.");
        }
      };
      botonesContainer.appendChild(btn);
    });

    cont.appendChild(botonesContainer);
  }

  mostrarPregunta();
}
