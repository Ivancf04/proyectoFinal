function iniciarClasificaToxicidad() {
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.innerHTML = `
    <h2>🚥 Clasifica por toxicidad</h2>
    <p>Arrastra cada planta a la categoría correcta</p>
  `;

  const cont = document.getElementById("contenidoJuego");
  cont.innerHTML = "";

  const nombreJuego = "clasifica-toxicidad";
  let nivelActual = obtenerNivelJuego(nombreJuego);
  const yaCompletoTodos = nivelesJuegos[nombreJuego + "_completado"] || false;

  let cantidad;
  if (nivelActual === 1) cantidad = 6;
  else if (nivelActual === 2) cantidad = 8;
  else cantidad = 10;

  const seleccionadas = flores.slice().sort(() => 0.5 - Math.random()).slice(0, cantidad);
  let correctas = 0;
  let total = seleccionadas.length;
  let errores = [];

  const contZonas = document.createElement("div");
  contZonas.style.display = "flex";
  contZonas.style.justifyContent = "space-around";
  contZonas.style.marginBottom = "20px";

  const zonas = ['toxica', 'no-toxica'];

  zonas.forEach(tipo => {
    const drop = document.createElement("div");
    drop.className = `zona-drop ${tipo}`;
    drop.dataset.tipo = tipo;
    drop.innerHTML = `<h3>${tipo === 'toxica' ? '🟥 Tóxicas' : '🟩 No tóxicas'}</h3>`;
    drop.style.width = "45%";
    drop.style.minHeight = "200px";
    drop.style.padding = "10px";
    drop.style.border = "3px dashed gray";
    drop.style.borderRadius = "10px";
    drop.style.background = tipo === 'toxica' ? '#ffe5e5' : '#e5ffe5';
    drop.style.textAlign = "center";

    drop.ondragover = e => e.preventDefault();

    drop.ondrop = e => {
      const index = e.dataTransfer.getData("index");
      const planta = seleccionadas[index];
      const card = document.getElementById("planta-" + index);

      const esCorrecto = (planta.toxica && tipo === 'toxica') || (!planta.toxica && tipo === 'no-toxica');

      if (!card || card.classList.contains("clasificada")) return;

      const nombrePlanta = document.createElement("p");
      nombrePlanta.textContent = planta.nombre;
      nombrePlanta.style.fontWeight = "bold";
      nombrePlanta.style.margin = "4px";
      drop.appendChild(nombrePlanta);

      card.style.opacity = "0.5";
      card.style.pointerEvents = "none";
      card.classList.add("clasificada");

      if (esCorrecto) {
        reproducirSonido("win");
        if (!yaCompletoTodos) {
          sumarPuntos(1);
        }
        correctas++;
      } else {
        reproducirSonido("lose");
        planta.clasificacionIncorrecta = tipo;
        errores.push(planta);
      }

      if ((correctas + errores.length) === total) {
        setTimeout(() => {
          let mensaje = `🎉 ¡Has clasificado correctamente ${correctas} de ${total} plantas!\n\n`;

          const correctasPlantas = seleccionadas.filter(p => !errores.includes(p));
          mensaje += `✅ Correctas:\n` + correctasPlantas.map(p =>
            `- ${p.nombre} → ${p.toxica ? 'Tóxica' : 'No tóxica'}`
          ).join('\n');

          if (errores.length > 0) {
            mensaje += `\n\n❌ Errores:\n` + errores.map(p =>
              `- ${p.nombre} → Clasificada como "${p.clasificacionIncorrecta === 'toxica' ? 'Tóxica' : 'No tóxica'}" (correcto: ${p.toxica ? 'Tóxica' : 'No tóxica'})`
            ).join('\n');
          }

          alert(mensaje);

          const porcentajeAciertos = (correctas / total) * 100;
          
          if (porcentajeAciertos >= 70) {
            if (nivelActual < 3) {
              subirNivelJuego(nombreJuego);
              alert(`🎉 ¡Nivel completado! Avanzas al nivel ${nivelActual + 1}`);
              iniciarClasificaToxicidad();
            } else {
              nivelesJuegos[nombreJuego + "_completado"] = true;
              actualizarNivelJuego(nombreJuego, 1);
              alert("🏆 ¡Has completado todos los niveles! El juego se reinicia.");
              mostrarFelicitacion();
              iniciarClasificaToxicidad();
            }
          } else {
            alert(`📚 Necesitas al menos 70% de aciertos para avanzar. ¡Inténtalo de nuevo!`);
            iniciarClasificaToxicidad();
          }
        }, 300);
      }
    };

    contZonas.appendChild(drop);
  });

  cont.appendChild(contZonas);

  const tarjetas = document.createElement("div");
  tarjetas.className = "tarjetas-clasificacion";
  tarjetas.style.display = "flex";
  tarjetas.style.flexWrap = "wrap";
  tarjetas.style.justifyContent = "center";
  tarjetas.style.gap = "20px";

  seleccionadas.forEach((flor, i) => {
    const card = document.createElement("div");
    card.className = "planta";
    card.id = "planta-" + i;
    card.draggable = true;
    card.dataset.index = i;
    card.innerHTML = `
      <img src="img/flor${flores.indexOf(flor) + 1}.jpeg" alt="${flor.nombre}" style="width: 100px;">
      <p>${flor.nombre}</p>
    `;
    card.ondragstart = e => {
      reproducirSonido("click");
      e.dataTransfer.setData("index", i);
    };
    tarjetas.appendChild(card);
  });

  cont.appendChild(tarjetas);
}
