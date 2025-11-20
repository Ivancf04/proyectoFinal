function iniciarUneFotos() {
  aciertos = 0;
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.innerHTML = `
    <h2>🔗 Une la foto con su nombre</h2>
    <p>Arrastra la foto de la planta y suéltala en el recuadro con su nombre.</p>
  `;
  leerTexto("Arrastra la imagen de la planta hasta el nombre correcto. Une todas para completar el nivel.");

  const cont = document.getElementById("contenidoJuego");
  cont.innerHTML = "";

  const nombreJuego = "une-fotos";
  let nivelActual = obtenerNivelJuego(nombreJuego);
  const yaCompletoTodos = nivelesJuegos[nombreJuego + "_completado"] || false;

  let cantidad;
  if (nivelActual === 1) cantidad = 5;
  else if (nivelActual === 2) cantidad = 8;
  else cantidad = 12;

  const seleccionadas = flores.slice().sort(() => 0.5 - Math.random()).slice(0, cantidad);
  const nombres = [...seleccionadas].sort(() => 0.5 - Math.random());

  const contImgs = document.createElement("div");
  contImgs.className = "une-fotos-imgs";
  seleccionadas.forEach((flor) => {
    const img = document.createElement("img");
    img.src = `img/flor${flores.indexOf(flor) + 1}.jpeg`;
    img.alt = flor.nombre;
    img.draggable = true;
    img.dataset.nombre = flor.nombre;

    img.addEventListener("dragstart", (e) => {
      reproducirSonido("click");
      e.dataTransfer.setData("text/plain", img.dataset.nombre);
    });

    contImgs.appendChild(img);
  });
  cont.appendChild(contImgs);

  const contNombres = document.createElement("div");
  contNombres.className = "une-fotos-nombres";
  nombres.forEach(flor => {
    const drop = document.createElement("div");
    drop.className = "drop-nombre";
    drop.textContent = flor.nombre;
    drop.dataset.nombre = flor.nombre;

    drop.addEventListener("dragover", (e) => e.preventDefault());
    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      const nombreArrastrado = e.dataTransfer.getData("text/plain");

      if (nombreArrastrado === drop.dataset.nombre) {
        drop.style.backgroundColor = "#d4edda";
        drop.style.color = "#155724";
        const img = [...document.querySelectorAll("img")].find(i => i.dataset.nombre === nombreArrastrado);
        if (img) {
          img.style.opacity = "0.5";
          img.draggable = false;
        }

        aciertos++;
        reproducirSonido("click");

        if (aciertos === cantidad) {
          setTimeout(() => {
            reproducirSonido("win");
            alert("🎉 ¡Muy bien! Has completado el nivel.");
            
            if (nivelActual < 3) {
              subirNivelJuego(nombreJuego);
              if (!yaCompletoTodos) {
                usuario.puntos += 5;
                document.getElementById("puntos").textContent = usuario.puntos;
                actualizarUsuarioEnFirebase();
              }
              iniciarUneFotos();
            } else {
              nivelesJuegos[nombreJuego + "_completado"] = true;
              actualizarNivelJuego(nombreJuego, 1);
              if (!yaCompletoTodos) {
                usuario.puntos += 5;
                document.getElementById("puntos").textContent = usuario.puntos;
                actualizarUsuarioEnFirebase();
              }
              mostrarFelicitacion();
              iniciarUneFotos();
            }
          }, 300);
        }
      } else {
        reproducirSonido("lose");
        drop.classList.add("alerta", "error");
        drop.textContent = "❌ Incorrecto";
        setTimeout(() => {
          drop.classList.remove("alerta", "error");
          drop.textContent = drop.dataset.nombre;
        }, 1000);
      }
    });

    contNombres.appendChild(drop);
  });
  cont.appendChild(contNombres);
}
