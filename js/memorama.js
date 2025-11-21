function iniciarMemorama() {
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.innerHTML = `
    <h2>🧠 Memorama</h2>
    <p>Encuentra las plantas iguales</p>
  `;
  leerTexto("Encuentra las plantas iguales. Haz clic en las cartas para voltearlas y formar parejas.");
  crearMemorama();
  actualizarIntentosEnPantalla();
}

function crearMemorama() {
  const nombreJuego = "memorama";
  let nivelActual = obtenerNivelJuego(nombreJuego);
  let pares, maxIntentos;

  if (nivelActual === 1) {
    pares = 6;
    maxIntentos = null;
  } else if (nivelActual === 2) {
    pares = 12;
    maxIntentos = 15;
  } else {
    pares = 18;
    maxIntentos = 30;
  }

  intentosRestantes = maxIntentos;
  const indices = Array.from({ length: flores.length }, (_, i) => i);
  const seleccionados = nivelActual === 3
    ? indices
    : indices.sort(() => 0.5 - Math.random()).slice(0, pares);
  const imagenes = seleccionados.map(i => `flor${i + 1}`);
  const cartas = imagenes.concat(imagenes).sort(() => 0.5 - Math.random());

  const contJuego = document.getElementById("contenidoJuego");
  contJuego.innerHTML = "";

  const grid = document.createElement("div");
  grid.id = "memorama";
  grid.className = "memorama-grid";
  contJuego.appendChild(grid);

  let seleccionadas = [], bloqueo = false, encontrados = 0;
  let yaCompletoNiveles = false;

  cartas.forEach(img => {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.dataset.nombre = img;

    const contenedor = document.createElement("div");
    contenedor.className = "cara-contenedor";
    contenedor.innerHTML = `
      <div class="cara frontal"><img src="img/${img}.jpeg" alt="${img}"></div>
      <div class="cara reverso">❓</div>
    `;
    carta.appendChild(contenedor);

    carta.addEventListener("click", () => {
      reproducirSonido("click");
      if (bloqueo || carta.classList.contains("volteada") || seleccionadas.length === 2) return;

      carta.classList.add("volteada");
      seleccionadas.push(carta);

      if (seleccionadas.length === 2) {
        const [c1, c2] = seleccionadas;
        if (c1.dataset.nombre === c2.dataset.nombre) {
          encontrados++;
          seleccionadas = [];
          mostrarPopupExito({
            mensaje: "¡Encontraste una pareja!"
          });

          if (encontrados === pares) {
            setTimeout(() => {
              reproducirSonido("win");
              mostrarPopupExito({
                mensaje: "🎉 ¡Muy bien! Has completado el nivel."
              });


              if (nivelActual < 3) {
                subirNivelJuego(nombreJuego);
                if (!yaCompletoNiveles) {
                  sumarPuntos(10);
                }
                iniciarMemorama();
              } else {
                actualizarNivelJuego(nombreJuego, 1);
                yaCompletoNiveles = true;
                mostrarFelicitacion();
                iniciarMemorama();
              }
            }, 500);
          }
        } else {

          // Obtener info de una de las plantas que volteó
          const indiceFlor = parseInt(c1.dataset.nombre.replace('flor', ''), 10) - 1;
          const flor = flores[indiceFlor];

          mostrarErrorJuego({
            flor,
            mensajeExtra: "Mira bien la posición de cada carta e intenta recordarla. 🧠"
          });
          if (intentosRestantes !== null) {
            intentosRestantes--;
            actualizarIntentosEnPantalla();
            if (intentosRestantes <= 0) {
              reproducirSonido("lose");
              alert("❌ Se acabaron los intentos.");
              iniciarMemorama();
              return;
            }
          }
          bloqueo = true;
          setTimeout(() => {
            c1.classList.remove("volteada");
            c2.classList.remove("volteada");
            seleccionadas = [];
            bloqueo = false;
          }, 1000);
        }
      }
    });

    grid.appendChild(carta);
  });

  if (nivelActual >= 2) {
    const todasCartas = document.querySelectorAll(".carta");
    todasCartas.forEach(c => c.classList.add("volteada"));
    bloqueo = true;
    setTimeout(() => {
      todasCartas.forEach(c => c.classList.remove("volteada"));
      bloqueo = false;
    }, nivelActual === 2 ? 3000 : 5000);
  }
}

function actualizarIntentosEnPantalla() {
  const elem = document.getElementById("contadorIntentos");
  if (intentosRestantes === null) {
    document.getElementById("intentosRestantes").classList.add("hidden");
  } else {
    elem.textContent = intentosRestantes;
    document.getElementById("intentosRestantes").classList.remove("hidden");
  }
}
