// ============================================
// ====== EDITÁ TUS DATOS AQUÍ ABAJO ======
// ============================================
var D = {
  fecha: "2026-12-19T20:30:00", // año-mes-díaThora:minutos
  sup: "Festejamos juntos",
  titulo: "Luciana y Facundo",
  msg: "Dos hermanos, una sola fiesta. Te esperamos para celebrar nuestros 15 y 18 años con música, baile y mucha alegría.",

  lugar: "SALÓN FOREVER",
  dir: "Esquina lateral Acceso Este 1035, Guaymallén, Mendoza",

  // Si este link no te lleva justo al salón, abrí el salón en Google Maps,
  // tocá "Compartir", copiá el link y pegalo entre las comillas.
  mapa: "https://maps.app.goo.gl/8Qn8ANBjB4Pu7Xfj8?g_st=aw" +
        encodeURIComponent("Salón Forever, Acceso Este 1035, Guaymallén, Mendoza"),

  // Galería grande: la tarjeta busca foto1.jpg, foto2.jpg, foto3.jpg ... hasta este número.
  // Las que no existan se saltean solas. Cuando tengas las fotos, las renombrás y listo.
  cantidadFotos: 30,

  cancion: "cancion.mp3",

  // Lluvia de emojis: true = prendida, false = apagada
  lluvia: false,
  emoji: ["✨", "💜", "🎉", "🔮"],

  // Confirmación de asistencia.
  // whatsapp: tu número con código de país, sin + ni espacios ni 15. Ej: 5492615551234
  //           Cada confirmación te llega a tu WhatsApp con el nombre y cuántos van.
  // formulario: (opcional) link de un Google Forms. Si lo ponés, aparece otro botón.
  // Si dejás los dos vacíos "", la sección no se muestra.
  confirmacion: {
    whatsapp: "5492615451535",
    formulario: "",
    maxPersonas: 6,
    texto: "Contanos si podés venir así organizamos todo. ¡Gracias!"
  },

  vestimenta: {
    texto: "Evento formal. Los colores azul, blanco y morado quedan reservados para la quinceañera.",
    colores: ["#2A4FD6", "#FFFFFF", "#6A0DAD"]
  },

  regalos: [
    { n: "Luciana (Alias)", a: "luciana.echegaray11" },
    { n: "Facundo (Alias)", a: "facundo.echegaray.mp" }
  ],

  // fotos: las fotos de los cuadros chiquitos. Subí los archivos al mismo lugar que index.html.
  // Con una sola foto se queda fija. Si agregás más nombres, cambian solas.
  // Ejemplo con varias: fotos: ["luciana.jpg", "luciana2.jpg", "luciana3.jpg"]
  hermanos: [
    {
      clase: "a",
      num: "15",
      nombre: "Luciana",
      frase: "“Mis 15 años para disfrutar y recordar siempre”",
      fotos: ["luciana.jpg"]
    },
    {
      clase: "b",
      num: "18",
      nombre: "Facundo",
      frase: "“Llegaron los 18, ¡se pica la noche!”",
      fotos: ["facundo.jpg"]
    }
  ]
};

// Arma la lista de fotos de la galería: foto1.jpg ... fotoN.jpg
D.fotos = [];
for (var i = 1; i <= D.cantidadFotos; i++) {
  D.fotos.push("foto" + i + ".jpg");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

// ====== CUADROS DE 15 Y 18 (con fotos) ======
// Si una foto no existe, onerror la saca y el cuadro queda verde con el número.
var duo = "";

D.hermanos.forEach(function (h) {
  var fotosHtml = h.fotos.map(function (foto, j) {
    return (
      '<img src="' + foto + '" alt="' + h.nombre + '" ' +
      'class="foto-cuadro' + (j === 0 ? " visible" : "") + '" ' +
      'onerror="this.remove()">'
    );
  }).join("");

  duo +=
    '<div class="h ' + h.clase + '">' +
      '<div class="fotos-cuadro">' + fotosHtml + '</div>' +
      '<div class="contenido-cuadro">' +
        '<div class="n">' + h.num + '</div>' +
        '<div class="nom">' + h.nombre + '</div>' +
        '<div class="fr">' + h.frase + '</div>' +
      '</div>' +
    '</div>';
});

// ====== GALERÍA GRANDE ======
var imgs = D.fotos.map(function (foto) {
  return '<img src="' + foto + '" alt="Recuerdo" onerror="this.remove()">';
}).join("");

// ====== FECHA EN TEXTO ======
var fechaObj = new Date(D.fecha);
var diaTexto = fechaObj.toLocaleDateString("es-AR", {
  weekday: "long", day: "numeric", month: "long"
});
diaTexto = diaTexto.replace(",", "");
diaTexto = diaTexto.charAt(0).toUpperCase() + diaTexto.slice(1);
var horaTexto = pad(fechaObj.getHours()) + ":" + pad(fechaObj.getMinutes()) + " hs";

// ====== VESTIMENTA ======
var vest =
  '<div class="vest">' +
    D.vestimenta.texto +
    '<div class="pts">' +
      D.vestimenta.colores.map(function (color) {
        return '<i style="background:' + color + '"></i>';
      }).join("") +
    '</div>' +
  '</div>';

// ====== REGALOS ======
var reg =
  '<div class="reg">' +
    '<div class="sub">Regalos / Cuentas</div>' +
    D.regalos.map(function (r) {
      return (
        '<div class="r">' +
          '<span><b>' + r.n + '</b><br>' + r.a + '</span>' +
          '<button onclick="copiar(event, \'' + r.a + '\')">Copiar</button>' +
        '</div>'
      );
    }).join("") +
  '</div>';

// ====== CONFIRMACIÓN ======
var CF = D.confirmacion;
var rsvp = "";

if (CF.whatsapp || CF.formulario) {
  rsvp += '<div class="bloque rsvp">' +
            '<div class="sub">Confirmá tu asistencia</div>' +
            '<div class="msg">' + CF.texto + '</div>';

  if (CF.whatsapp) {
    var opciones = "";
    for (var n = 1; n <= CF.maxPersonas; n++) {
      opciones += '<option value="' + n + '">' + (n === 1 ? "Voy solo/a" : "Somos " + n + " personas") + '</option>';
    }

    rsvp +=
      '<input id="rsvpNombre" class="campo" type="text" placeholder="Tu nombre y apellido" maxlength="40">' +
      '<select id="rsvpCant" class="campo">' + opciones + '</select>' +
      '<button class="btn si" onclick="confirmar(true)">✅ Confirmo mi asistencia</button>' +
      '<button class="btn no" onclick="confirmar(false)">😢 No puedo ir</button>';
  }

  if (CF.formulario) {
    rsvp += '<a class="btn si" href="' + CF.formulario + '" target="_blank" rel="noopener">📝 Confirmar con el formulario</a>';
  }

  rsvp += '</div>';
}

// ====== TARJETA ======
var html =
  '<div class="card">' +

    '<div class="sub">' + D.sup + '</div>' +
    '<div class="titulo">' + D.titulo + '</div>' +

    '<div class="duo">' + duo + '</div>' +

    '<div class="bloque" id="bloqueGal">' +
      '<div class="sub">Nuestros recuerdos</div>' +
      '<div class="fotos" id="gal">' + imgs + '</div>' +
    '</div>' +

    '<div class="bloque">' +
      '<div class="msg">' + D.msg + '</div>' +
      '<div class="ban" id="alert"></div>' +
    '</div>' +

    '<div class="bloque">' +
      '<div class="sub">Falta para la fiesta</div>' +
      '<div class="cuenta" id="cnt">' +
        '<div><b id="cd">00</b><span>Días</span></div>' +
        '<div><b id="ch">00</b><span>Hs</span></div>' +
        '<div><b id="cm">00</b><span>Min</span></div>' +
        '<div><b id="cs">00</b><span>Seg</span></div>' +
      '</div>' +
      '<div class="total" id="tot">Cargando...</div>' +
    '</div>' +

    '<div class="bloque lugar-bloque">' +
      '<div class="sub">Cuándo y dónde</div>' +
      '<div class="fecha-grande">' + diaTexto + '</div>' +
      '<div class="hora">' + horaTexto + '</div>' +
      '<div class="lugar">' + D.lugar + '</div>' +
      '<div class="direccion">' + D.dir + '</div>' +
      '<a class="btn" href="' + D.mapa + '" target="_blank" rel="noopener">' +
        '📍 Cómo llegar' +
      '</a>' +
    '</div>' +

    '<div class="bloque">' +
      '<div class="sub">Vestimenta</div>' +
      vest +
    '</div>' +

    '<div class="bloque">' + reg + '</div>' +

    rsvp +

    '<div class="cierre">¡Te esperamos!</div>' +

  '</div>';

document.getElementById("app").innerHTML = html;

// ====== AVISO ARRIBA (sirve para "copiado" y para "un día menos") ======
function avisar(texto, ms) {
  var t = document.getElementById("toast");
  t.innerText = texto;
  t.classList.add("show");

  setTimeout(function () {
    t.classList.remove("show");
  }, ms || 4000);
}

// ====== AVISO "UN DÍA MENOS" ======
// Guarda en el celular cuántos días faltaban la última vez que abrió la tarjeta.
// Si ahora faltan menos, avisa.
function alertaDias() {
  var d = Math.floor((new Date(D.fecha).getTime() - new Date().getTime()) / 864e5);
  if (d < 0) return;

  var texto = d === 1 ? "1 día" : d + " días";
  var anterior = null;

  try {
    anterior = localStorage.getItem("dias_restantes");
  } catch (e) {}

  if (anterior === null) {
    avisar("¡Faltan " + texto + " para la fiesta! 🎉", 5000);
  } else if (d < parseInt(anterior, 10)) {
    avisar("¡Un día menos! Ahora faltan " + texto + " 💜", 5000);
  }

  try {
    localStorage.setItem("dias_restantes", String(d));
  } catch (e) {}
}

// ====== MÚSICA CON BOTÓN DE STOP ======
var audio = new Audio(D.cancion);
audio.loop = true;

function crearBotonMusica() {
  var b = document.createElement("button");
  b.className = "musica-btn";
  b.innerText = "⏹️";
  b.setAttribute("aria-label", "Parar o poner la música");

  b.onclick = function () {
    if (audio.paused) {
      audio.play();
      b.innerText = "⏹️";
    } else {
      audio.pause();
      b.innerText = "▶️";
    }
  };

  document.body.appendChild(b);
  return b;
}

function abrir() {
  document.getElementById("sobre").style.display = "none";

  var boton = crearBotonMusica();
  var intento = audio.play();

  if (intento && intento.catch) {
    intento.catch(function () {
      boton.innerText = "▶️";
    });
  }

  alertaDias();
  if (D.lluvia) setInterval(lluvia, 400);
}

// ====== CONFIRMAR POR WHATSAPP ======
function confirmar(voy) {
  var nombre = document.getElementById("rsvpNombre").value.trim();

  if (!nombre) {
    avisar("Escribí tu nombre primero 😊", 3000);
    return;
  }

  var cant = document.getElementById("rsvpCant").value;
  var msg;

  if (voy) {
    msg = "¡Hola! Soy " + nombre + " y confirmo mi asistencia a la fiesta de " + D.titulo + ". " +
          (cant === "1" ? "Voy solo/a." : "Somos " + cant + " personas.") ;
  } else {
    msg = "¡Hola! Soy " + nombre + " y lamentablemente no puedo ir a la fiesta de " + D.titulo + ". ¡Que la pasen genial! ";
  }

  window.open("https://wa.me/" + D.confirmacion.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
}

// ====== COPIAR ALIAS ======
function copiar(e, txt) {
  e.stopPropagation();

  navigator.clipboard.writeText(txt).then(function () {
    avisar("¡Copiado!", 2000);
  }, function () {
    avisar(txt, 4000);
  });
}

// ====== FOTOS DE LOS CUADROS (si hay más de una, cambian solas) ======
function rotarCuadros() {
  document.querySelectorAll(".fotos-cuadro").forEach(function (grupo) {
    var fotos = grupo.querySelectorAll(".foto-cuadro");
    if (!fotos.length) return;

    if (fotos.length === 1) {
      fotos[0].classList.add("visible");
      return;
    }

    var actual = 0;
    fotos.forEach(function (f, i) {
      if (f.classList.contains("visible")) actual = i;
    });

    fotos[actual].classList.remove("visible");
    fotos[(actual + 1) % fotos.length].classList.add("visible");
  });
}

setTimeout(rotarCuadros, 800);
setInterval(rotarCuadros, 3500);

// ====== GALERÍA GRANDE AUTOMÁTICA ======
function pasarFoto() {
  var lista = document.querySelectorAll("#gal img");
  if (!lista.length) return;

  var actual = -1;
  lista.forEach(function (f, i) {
    if (f.classList.contains("act")) actual = i;
  });

  if (actual >= 0) lista[actual].classList.remove("act");
  lista[(actual + 1) % lista.length].classList.add("act");
}

setTimeout(pasarFoto, 800);
setInterval(pasarFoto, 4000);

// Si todavía no subiste ninguna foto, esconde la sección para que no quede vacía.
setTimeout(function () {
  if (!document.querySelectorAll("#gal img").length) {
    document.getElementById("bloqueGal").style.display = "none";
  }
}, 4000);

// ====== CUENTA REGRESIVA ======
function reloj() {
  var diff = new Date(D.fecha).getTime() - new Date().getTime();

  if (diff <= 0) {
    document.getElementById("tot").innerText = "¡Hoy es la fiesta!";
    return;
  }

  var d = Math.floor(diff / 864e5);
  var h = Math.floor((diff % 864e5) / 36e5);
  var m = Math.floor((diff % 36e5) / 6e4);
  var s = Math.floor((diff % 6e4) / 1e3);

  document.getElementById("cd").innerText = pad(d);
  document.getElementById("ch").innerText = pad(h);
  document.getElementById("cm").innerText = pad(m);
  document.getElementById("cs").innerText = pad(s);

  document.getElementById("tot").innerText =
    "Faltan " + d + " días y " + h + " horas.";

  if (d <= 10) {
    document.getElementById("alert").innerText =
      d === 0 ? "⚠️ ¡Es hoy! ⚠️" : "⚠️ ¡Faltan solo " + d + " días! ⚠️";
    document.getElementById("alert").classList.add("show");
  }
}

setInterval(reloj, 1000);
reloj();

// ====== LLUVIA DE EMOJIS ======
function lluvia() {
  var e = document.createElement("div");
  e.className = "conf";
  e.innerText = D.emoji[Math.floor(Math.random() * D.emoji.length)];

  e.style.left = Math.random() * 100 + "vw";
  e.style.fontSize = Math.random() * 20 + 15 + "px";
  e.style.animationDuration = Math.random() * 2 + 3 + "s";

  document.body.appendChild(e);

  setTimeout(function () {
    e.remove();
  }, 5200);
}

// ====== EFECTO 3D ======
function aplicarEfecto3D() {
  document.querySelectorAll(".h").forEach(function (cuadro) {
    function mover(e) {
      var box = cuadro.getBoundingClientRect();
      var cx = e.clientX || (e.touches && e.touches[0].clientX);
      var cy = e.clientY || (e.touches && e.touches[0].clientY);

      if (!cx || !cy) return;

      var x = cx - box.left;
      var y = cy - box.top;
      var px = (x / box.width) * 2 - 1;
      var py = (y / box.height) * 2 - 1;

      cuadro.style.transform =
        "perspective(1000px) rotateX(" + (py * -8) + "deg) rotateY(" + (px * 8) + "deg)";
    }

    function salir() {
      cuadro.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }

    cuadro.addEventListener("mousemove", mover);
    cuadro.addEventListener("mouseleave", salir);
    cuadro.addEventListener("touchmove", mover, { passive: true });
    cuadro.addEventListener("touchend", salir);
  });
}

setTimeout(aplicarEfecto3D, 200);
