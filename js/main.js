// ---------- VARIABLES GLOBALES ----------
let usuario = {
  nombre: "",
  puntos: 0,
  nivel: 1
};

let nivelActual = 1;
let intentosRestantes = null;
let aciertos = 0;

const flores = [
  { nombre: "Cardón", municipio: "Mulegé, Loreto", cientifico: "Pachycereus pringlei", toxica: false, usos: "Sombra, frutos comestibles y reserva de agua para fauna.", faunaAsociada: "Murciélagos, aves e insectos.", ecosistema: "Desierto costero del Golfo de California.", conservacion: "Sin riesgo.", curiosidad: "Puede superar los 10 metros y vivir más de 200 años." }, { nombre: "Choya", municipio: "Mulegé, Loreto", cientifico: "Cylindropuntia spp", toxica: true, usos: "Ornamental, barreras vivas.", faunaAsociada: "Aves pequeñas que anidan entre sus espinas.", ecosistema: "Matorral xerófilo.", conservacion: "Sin riesgo.", curiosidad: "Sus espinas tienen púas microscópicas que se adhieren fácilmente." }, { nombre: "Mezquite", municipio: "Mulegé", cientifico: "Prosopis glandulosa", toxica: false, usos: "Madera, carbón, forraje y alimento (vainas).", faunaAsociada: "Aves, insectos, ganado.", ecosistema: "Matorral desértico.", conservacion: "Común.", curiosidad: "Sus semillas se usaban para hacer harina en tiempos prehispánicos." }, { nombre: "Torote", municipio: "Mulegé", cientifico: "Bursera microphylla", toxica: true, usos: "Madera para leña y resina con fines medicinales.", faunaAsociada: "Aves e insectos.", ecosistema: "Matorral y laderas secas.", conservacion: "Abundante.", curiosidad: "Su tronco retorcido y color rojizo lo hace fácilmente reconocible." }, { nombre: "Palo verde", municipio: "Mulegé", cientifico: "Parkinsonia florida", toxica: false, usos: "Ornamental, sombra, reforestación.", faunaAsociada: "Colibríes e insectos polinizadores.", ecosistema: "Desierto y arroyos secos.", conservacion: "Sin riesgo.", curiosidad: "Su tronco verde realiza fotosíntesis incluso sin hojas." }, { nombre: "Pitaya agria", municipio: "Comondú", cientifico: "Stenocereus gummosus", toxica: false, usos: "Fruto comestible en nieves, jugos y dulces.", faunaAsociada: "Murciélagos, aves e insectos.", ecosistema: "Matorral desértico.", conservacion: "Sin riesgo.", curiosidad: "El fruto tiene sabor ácido muy apreciado por comunidades locales." }, { nombre: "Pitaya dulce", municipio: "Comondú", cientifico: "Stenocereus thurberi", toxica: false, usos: "Fruto comestible, tradicionalmente recolectado por pueblos originarios.", faunaAsociada: "Murciélagos y abejas.", ecosistema: "Desierto de Sonora y Baja California Sur.", conservacion: "Sin riesgo.", curiosidad: "Florece de noche, atrayendo polinizadores nocturnos." }, { nombre: "Palo blanco", municipio: "Comondú, Los Cabos", cientifico: "Lysiloma candidum", toxica: false, usos: "Madera para carpintería y medicina tradicional.", faunaAsociada: "Aves e insectos.", ecosistema: "Bosque tropical seco.", conservacion: "Sin riesgo.", curiosidad: "Produce flores blancas en forma de pompones muy vistosas." }, { nombre: "Torote blanco", municipio: "Comondú", cientifico: "Bursera odorata", toxica: true, usos: "Producción de resina aromática y leña.", faunaAsociada: "Aves e insectos.", ecosistema: "Matorrales secos.", conservacion: "Común.", curiosidad: "La resina ha sido utilizada en rituales como incienso." }, { nombre: "Chirinola", municipio: "Comondú", cientifico: "Stenocereus eruca", toxica: false, usos: "Ornamental, potencial alimenticio.", faunaAsociada: "Insectos polinizadores.", ecosistema: "Zonas arenosas costeras.", conservacion: "Vulnerable por hábitat reducido.", curiosidad: "Crece horizontalmente y 'camina' por el suelo." }, { nombre: "Mangle rojo", municipio: "La Paz, Loreto", cientifico: "Rhizophora mangle", toxica: true, usos: "Protección costera, filtro natural de agua.", faunaAsociada: "Camarones, peces, aves costeras.", ecosistema: "Manglar.", conservacion: "Protegido por ley.", curiosidad: "Sus raíces aéreas ayudan a estabilizar el suelo." }, { nombre: "Mangle blanco", municipio: "La Paz, Loreto", cientifico: "Laguncularia racemosa", toxica: true, usos: "Protección de costas, medicina tradicional.", faunaAsociada: "Cangrejos, aves y peces juveniles.", ecosistema: "Manglares y estuarios.", conservacion: "Protegido por NOM-059.", curiosidad: "Sus hojas eliminan sal mediante glándulas especiales." }, { nombre: "Mangle negro", municipio: "La Paz", cientifico: "Avicennia germinans", toxica: true, usos: "Protección costera, sombra, hábitat.", faunaAsociada: "Aves zancudas, moluscos.", ecosistema: "Manglar.", conservacion: "Protegido legalmente.", curiosidad: "Sus raíces forman 'neumatóforos' que sobresalen del suelo." }, { nombre: "Palo fierro", municipio: "La Paz", cientifico: "Olneya tesota", toxica: false, usos: "Artesanías, carbón, carpintería.", faunaAsociada: "Aves, abejas, reptiles.", ecosistema: "Desierto y piedemontes áridos.", conservacion: "Amenazada por sobreexplotación.", curiosidad: "Su madera es tan densa que no flota en el agua." }, { nombre: "Biznaga de Evermann", municipio: "La Paz", cientifico: "Mammillaria evermanniana", toxica: false, usos: "Ornamental, conservación de biodiversidad.", faunaAsociada: "Insectos polinizadores.", ecosistema: "Zonas rocosas áridas.", conservacion: "Protegida (NOM-059).", curiosidad: "Endémica de BCS, muy apreciada por coleccionistas." }, { nombre: "Pino piñonero", municipio: "Los Cabos", cientifico: "Pinus cembroides subsp. lagunae", toxica: false, usos: "Madera, piñones comestibles.", faunaAsociada: "Ardillas, aves y mamíferos pequeños.", ecosistema: "Bosque de montaña.", conservacion: "Endémico y amenazado.", curiosidad: "Solo crece en las sierras altas de BCS." }, { nombre: "Madroño", municipio: "Los Cabos", cientifico: "Arbutus spp", toxica: true, usos: "Ornamental, medicinal en infusiones.", faunaAsociada: "Aves frugívoras e insectos.", ecosistema: "Bosques templados.", conservacion: "Sin riesgo alto.", curiosidad: "Su corteza se desprende en placas delgadas y rojizas." }, { nombre: "Encino", municipio: "Los Cabos", cientifico: "Quercus spp", toxica: true, usos: "Madera, leña, protección del suelo.", faunaAsociada: "Venados, ardillas, aves.", ecosistema: "Bosque de encino.", conservacion: "Vulnerable por cambio climático.", curiosidad: "Sus bellotas alimentan a muchas especies, pero son tóxicas para humanos." }
];

// 🎵 SONIDOS
const sonidos = {
  habilitados: true,
  click: new Audio("sonidos/click.mp3"),
  win: new Audio("sonidos/win.mp3"),
  lose: new Audio("sonidos/lose.mp3")
};

function reproducirSonido(nombre) {
  if (sonidos.habilitados && sonidos[nombre]) {
    sonidos[nombre].currentTime = 0;
    sonidos[nombre].play();
  }
}

function toggleSonido() {
  sonidos.habilitados = !sonidos.habilitados;
  const btn = document.getElementById("btnSonido");
  btn.textContent = sonidos.habilitados ? "🔊 Sonidos: Activados" : "🔇 Sonidos: Desactivados";
}

// ---------- AUTENTICACIÓN / USUARIO (Firebase) ----------
function registrar() {
  const nombre = document.getElementById("reg-nombre").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const edad = parseInt(document.getElementById("reg-edad").value);
  const grado = document.getElementById("reg-grado").value;

  const regexNombre = /^[A-Za-zÁ-Úá-úñÑ\s]+$/;

  if (!nombre || !password || !edad || !grado) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (!regexNombre.test(nombre)) {
    alert("El nombre solo debe contener letras y espacios.");
    return;
  }

  if (edad > 12) {
    alert("La edad no puede ser mayor de 12 años.");
    return;
  }

  const claveUsuario = nombre.toLowerCase().replace(/\s+/g, '');
  const nuevoUsuario = { nombre, password, edad, grado, puntos: 0, nivel: 1 };
  firebase.database().ref("usuarios/" + claveUsuario).set(nuevoUsuario);
  alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
}

// Variable global para niveles por juego
let nivelesJuegos = {};

// Login con Firebase - MODIFICADO
function iniciarSesion() {
  const nombre = document.getElementById("login-nombre").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const claveUsuario = nombre.toLowerCase().replace(/\s+/g, '');

  firebase.database().ref("usuarios/" + claveUsuario).once("value")
    .then(snapshot => {
      if (!snapshot.exists()) {
        alert("⚠️ Usuario no registrado.");
        return;
      }

      const usuarioGuardado = snapshot.val();
      if (usuarioGuardado.password !== password) {
        alert("❌ Contraseña incorrecta.");
        return;
      }

      usuario = usuarioGuardado;
      nivelesJuegos = usuario.niveles || {};
      nivelActual = usuario.nivel || 1;

      localStorage.setItem('usuarioActivo', claveUsuario);
      document.getElementById("nombreUsuario").textContent = usuario.nombre;
      document.getElementById("auth-section").classList.add("hidden");
      document.getElementById("menu").classList.remove("hidden");
      document.getElementById("puntos").textContent = usuario.puntos;
    });
}

// Actualizar usuario en Firebase
function actualizarUsuarioEnFirebase() {
  const claveUsuario = usuario.nombre.toLowerCase().replace(/\s+/g, '');
  firebase.database().ref("usuarios/" + claveUsuario).update({
    puntos: usuario.puntos,
    nivel: nivelActual,
    niveles: nivelesJuegos
  });
}

// ---- NIVELES POR JUEGO (UTILIDADES COMPARTIDAS) ----
function obtenerNivelJuego(nombreJuego) {
  return nivelesJuegos[nombreJuego] || 1;
}

function actualizarNivelJuego(nombreJuego, nuevoNivel) {
  nivelesJuegos[nombreJuego] = nuevoNivel;
  actualizarUsuarioEnFirebase();
}

function subirNivelJuego(nombreJuego) {
  const nivelActual = obtenerNivelJuego(nombreJuego);
  actualizarNivelJuego(nombreJuego, nivelActual + 1);
  console.log(`¡Nivel ${nivelActual + 1} desbloqueado en ${nombreJuego}!`);
}

// Mostrar nivel de un juego (si lo usas en la UI)
function mostrarNivelJuego(nombreJuego, elementoId) {
  const nivel = obtenerNivelJuego(nombreJuego);
  document.getElementById(elementoId).textContent = `Nivel: ${nivel}`;
}

// Verifica sesión activa con Firebase
function verificarSesionActiva() {
  const claveUsuario = localStorage.getItem('usuarioActivo');
  if (!claveUsuario) return;
  firebase.database().ref("usuarios/" + claveUsuario).once("value")
    .then(snapshot => {
      if (!snapshot.exists()) return;
      usuario = snapshot.val();
      nivelActual = usuario.nivel || 1;
      document.getElementById("nombreUsuario").textContent = usuario.nombre;
      document.getElementById("auth-section").classList.add("hidden");
      document.getElementById("menu").classList.remove("hidden");
      document.getElementById("puntos").textContent = usuario.puntos;
    });
}

// Cerrar sesión
function cerrarSesion() {
  const confirmar = confirm("¿Estás seguro que deseas cerrar sesión?");
  if (!confirmar) return;
  localStorage.removeItem('usuarioActivo');
  location.reload();
}

// Volver al menú
function volverAlMenu() {
  document.getElementById("contenidoJuego").innerHTML = "";
  document.getElementById("contenidoJuego").classList.add("hidden");
  document.getElementById("contenidoAprender").classList.add("hidden");
  document.getElementById("galeriaFlores").classList.add("hidden");
  document.getElementById("filtroMunicipios").classList.add("hidden");
  document.getElementById("botonesMunicipios").classList.add("hidden");
  const instrucciones = document.getElementById("instruccionesJuego");
  instrucciones.classList.add("hidden");
  instrucciones.innerHTML = "";
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("intentosRestantes").classList.add("hidden");
  intentosRestantes = null;
}

// --------- SECCIÓN APRENDER / FILTROS ----------
function mostrarAprender() {
  document.getElementById("filtroMunicipios").classList.remove("hidden");
  const cont = document.getElementById("contenidoAprender");
  const galeria = document.getElementById("galeriaFlores");
  galeria.classList.remove("hidden");
  galeria.innerHTML = "";

  flores.forEach((flor, i) => {
    const plantaDiv = document.createElement("div");
    plantaDiv.className = "planta";
    plantaDiv.innerHTML = `
      <img src="img/flor${i + 1}.jpeg" alt="${flor.nombre}">
      <p><strong>Nombre común:</strong> ${flor.nombre}</p>
      <p><strong>Municipio:</strong> ${flor.municipio}</p>
      <p><em>Nombre científico:</em> ${flor.cientifico}</p>
      <p class="toxicidad ${flor.toxica ? 'toxica' : 'no-toxica'}">
        ${flor.toxica ? '🚫 Tóxica' : '✅ No tóxica'}
      </p>
      <p><strong>Usos:</strong> ${flor.usos}</p>
      <p><strong>Fauna asociada:</strong> ${flor.faunaAsociada}</p>
      <p><strong>Ecosistema:</strong> ${flor.ecosistema}</p>
      <p><strong>Conservación:</strong> ${flor.conservacion}</p>
      <p><strong>Dato curioso:</strong> ${flor.curiosidad}</p>
    `;
    galeria.appendChild(plantaDiv);
  });

  cont.classList.remove("hidden");
  document.getElementById("menu").classList.add("hidden");
}

function toggleCampo(campo) {
  const elementos = document.querySelectorAll(`.campo-${campo}`);
  elementos.forEach(elem => elem.classList.toggle("hidden"));
}

function toggleMunicipios() {
  document.getElementById("botonesMunicipios").classList.toggle("hidden");
}

function filtrarPorMunicipio(municipio) {
  const galeria = document.getElementById("galeriaFlores");
  galeria.innerHTML = "";

  const lista = municipio === 'todos'
    ? flores
    : flores.filter(f => f.municipio.includes(municipio));

  lista.forEach((flor) => {
    const indexOriginal = flores.indexOf(flor);
    const plantaDiv = document.createElement("div");
    plantaDiv.className = "planta";
    plantaDiv.innerHTML = `
      <img src="img/flor${indexOriginal + 1}.jpeg" alt="${flor.nombre}">
      <p><strong>Nombre común:</strong> ${flor.nombre}</p>
      <p><strong>Municipio:</strong> ${flor.municipio}</p>
      <p><em>Nombre científico:</em> ${flor.cientifico}</p>
      <p class="toxicidad ${flor.toxica ? 'toxica' : 'no-toxica'}">
        ${flor.toxica ? '🚫 Tóxica' : '✅ No tóxica'}
      </p>
      <p><strong>Usos:</strong> ${flor.usos}</p>
      <p><strong>Fauna asociada:</strong> ${flor.faunaAsociada}</p>
      <p><strong>Ecosistema:</strong> ${flor.ecosistema}</p>
      <p><strong>Conservación:</strong> ${flor.conservacion}</p>
      <p><strong>Dato curioso:</strong> ${flor.curiosidad}</p>
    `;
    galeria.appendChild(plantaDiv);
  });
}

function filtrarToxicas(valor) {
  const galeria = document.getElementById("galeriaFlores");
  galeria.innerHTML = "";

  let listaFiltrada;
  if (valor === 'todas') {
    listaFiltrada = flores;
  } else {
    listaFiltrada = flores.filter(f => f.toxica === valor);
  }

  listaFiltrada.forEach((flor) => {
    const indexOriginal = flores.indexOf(flor);
    const plantaDiv = document.createElement("div");
    plantaDiv.className = "planta";
    plantaDiv.innerHTML = `
      <img src="img/flor${indexOriginal + 1}.jpeg" alt="${flor.nombre}">
      <p><strong>Nombre común:</strong> ${flor.nombre}</p>
      <p><strong>Municipio:</strong> ${flor.municipio}</p>
      <p><em>Nombre científico:</em> ${flor.cientifico}</p>
      <p class="toxicidad ${flor.toxica ? 'toxica' : 'no-toxica'}">
        ${flor.toxica ? '🚫 Tóxica' : '✅ No tóxica'}
      </p>
      <p><strong>Usos:</strong> ${flor.usos}</p>
      <p><strong>Fauna asociada:</strong> ${flor.faunaAsociada}</p>
      <p><strong>Ecosistema:</strong> ${flor.ecosistema}</p>
      <p><strong>Conservación:</strong> ${flor.conservacion}</p>
      <p><strong>Dato curioso:</strong> ${flor.curiosidad}</p>
    `;
    galeria.appendChild(plantaDiv);
  });
}

// -------- POPUPS DE AYUDA Y USUARIOS --------
const ayudaBtn = document.getElementById('ayudaFija');
const popupAyuda = document.getElementById('popupAyuda');
const cerrarBtn = document.querySelector('.cerrar-ayuda');

ayudaBtn.addEventListener('click', function () {
  popupAyuda.classList.add('visible');
});

cerrarBtn.addEventListener('click', function () {
  popupAyuda.classList.remove('visible');
});

document.addEventListener('click', function (event) {
  if (
    popupAyuda.classList.contains('visible') &&
    !popupAyuda.contains(event.target) &&
    event.target !== ayudaBtn
  ) {
    popupAyuda.classList.remove('visible');
  }
});

// --- POPUP DE USUARIOS Y PUNTUACIONES ---
const usuariosBtn = document.getElementById('usuariosBtn');
const popupUsuarios = document.getElementById('popupUsuarios');
const cerrarUsuarios = document.querySelector('.cerrar-usuarios');

usuariosBtn.addEventListener('click', function () {
  popupUsuarios.classList.add('visible');
  cargarUsuariosPuntuaciones();
});

cerrarUsuarios.addEventListener('click', function () {
  popupUsuarios.classList.remove('visible');
});

document.addEventListener('click', function (event) {
  if (
    popupUsuarios.classList.contains('visible') &&
    !popupUsuarios.contains(event.target) &&
    event.target !== usuariosBtn
  ) {
    popupUsuarios.classList.remove('visible');
  }
});

function cargarUsuariosPuntuaciones() {
  const tabla = document.getElementById('tablaUsuarios');
  tabla.innerHTML = '<tr><td colspan="2">Cargando...</td></tr>';

  firebase.database().ref('usuarios').orderByChild('puntos').limitToLast(20).once('value', function (snapshot) {
    const datos = [];
    snapshot.forEach(function (child) {
      const usuario = child.val();
      datos.push({
        nombre: usuario.nombre || child.key,
        puntos: usuario.puntos || 0
      });
    });

    datos.sort((a, b) => b.puntos - a.puntos);

    if (datos.length === 0) {
      tabla.innerHTML = '<tr><td colspan="2">No hay datos</td></tr>';
    } else {
      tabla.innerHTML = datos.map(u =>
        `<tr><td>${u.nombre}</td><td>${u.puntos}</td></tr>`
      ).join('');
    }
  });
}

// -------- EFECTO CONFETI / FELICITACIÓN --------
function lanzarConfeti() {
  const canvas = document.getElementById("confetiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confetis = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 40 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 5
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetis.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
  }
  function update() {
    confetis.forEach(c => {
      c.y += Math.cos(c.d / 10) + 1;
      c.x += Math.sin(c.d / 10);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }
  function animate() {
    draw();
    requestAnimationFrame(animate);
  }
  animate();
}

function mostrarFelicitacion() {
  const felicitacionDiv = document.getElementById("felicitacion");
  felicitacionDiv.classList.remove("hidden");
  requestAnimationFrame(() => {
    lanzarConfeti();
  });
}

function cerrarFelicitacion() {
  document.getElementById("felicitacion").classList.add("hidden");
  volverAlMenu();
}

// -------- LECTURA EN VOZ --------
function leerTexto(texto) {
  if ('speechSynthesis' in window) {
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = 'es-MX';
    voz.rate = 1;
    voz.pitch = 1;
    window.speechSynthesis.speak(voz);
  } else {
    console.warn("Tu navegador no soporta lectura por voz.");
  }
}

// -------- CONTROL DE JUEGOS (ROUTER) --------
function mostrarJuego() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("contenidoAprender").classList.add("hidden");
  document.getElementById("contenidoJuego").classList.remove("hidden");
  document.getElementById("instruccionesJuego").classList.remove("hidden");
}

function iniciarJuego(nombreJuego) {
  intentosRestantes = null;
  document.getElementById("contenidoJuego").innerHTML = "";
  document.getElementById("intentosRestantes").classList.add("hidden");
  mostrarJuego();

  if (nombreJuego === 'memorama') {
    iniciarMemorama();
  } else if (nombreJuego === 'uneFotos') {
    iniciarUneFotos();
  } else if (nombreJuego === 'adivinaPlanta') {
    iniciarAdivinaPlanta();
  } else if (nombreJuego === 'trivia') {
    iniciarTrivia();
  } else if (nombreJuego === 'clasificaToxicidad') {
    iniciarClasificaToxicidad();
  } else if (nombreJuego === 'verdaderoFalso') {
    iniciarVerdaderoFalso();
  }
}

// Ejecutar al cargar
window.addEventListener('DOMContentLoaded', verificarSesionActiva);
