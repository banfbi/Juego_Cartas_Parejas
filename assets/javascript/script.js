let tiempoGame = null;
let puntos = 0;
let fallos = 0;
let cartasTotales = 12;
let html = "";
let primeraCarta = true;
let valorCarta = "";

crearTablero(cartasTotales);

// Esta función crea el tablero de juego con el número especificado de cartas.
function crearTablero(cartasTotales) {
  // Aquí se generan las parejas de imágenes para las cartas.
  let imagenesRepetidas = generarParejasImagenes(cartasTotales / 2);

  // Las imágenes se mezclan para que aparezcan en posiciones aleatorias en el tablero.
  imagenesRepetidas = imagenesRepetidas.sort(() => Math.random() - 0.5);

  // Se itera sobre cada carta en el tablero y se genera el HTML correspondiente.
  for (let cont = 0; cont < cartasTotales; cont++) {
    let src = imagenesRepetidas[cont];
    html += "<div class='carta' data-show='1'>";
    html += "<button type='button' class='btn_carta' onclick='encontrarMatch(" + cont + ")' id='" + cont + "' value='" + src + "'>";
    html += "<img src='img/trasera_carta.png' >";
    html += "</button>";
    html += "</div>";
  }

  // Se inserta el HTML generado en el contenedor del juego.
  document.body.getElementsByClassName("container")[0].innerHTML = html;
}

// Esta función maneja la lógica cuando se selecciona una carta.
function encontrarMatch(param) {
  let cartaSeleccionada = document.getElementById(param);
  let src = cartaSeleccionada.getAttribute("value");

  // Si la carta ya está volteada o es una pareja ya encontrada, no se hace nada.
  if (cartaSeleccionada.classList.contains("flipped") || cartaSeleccionada.classList.contains("pareja-encontrada")) {
    return;
  }

  // Se muestra la imagen de la carta seleccionada.
  cartaSeleccionada.innerHTML = "<img src='" + src + "' >";
  cartaSeleccionada.classList.add("flipped");

  // Se verifica si es la primera o segunda carta seleccionada en un turno.
  if (primeraCarta) {
    valorCarta = cartaSeleccionada;
    primeraCarta = false;
  } else {
    comprobarCarta(valorCarta, cartaSeleccionada);
    valorCarta = "";
    primeraCarta = true;
  }
}

// Esta función verifica si las dos cartas seleccionadas forman una pareja.
function comprobarCarta(carta1, carta2) {
  // Si las cartas tienen el mismo valor, se suma puntaje y se marca como pareja encontrada.
  if (carta1.getAttribute("value") === carta2.getAttribute("value")) {
    puntos += 5;
    document.getElementById("puntos").innerHTML = puntos;

    // Se cuenta el número de cartas restantes y se verifica si se han encontrado todas las parejas.
    let cartasRestantes = document.querySelectorAll(".flipped").length;
    if (cartasRestantes === 0) {
      mostrarMensajeGanador();
      desactivarCartas();
    }
  } else {
    // Si las cartas no forman una pareja, se cuenta como un fallo y se vuelven a voltear después de un tiempo.
    fallos++;
    document.getElementById("fallos").innerHTML = fallos;
    setTimeout(() => {
      carta1.innerHTML = "<img src='img/trasera_carta.png'>";
      carta2.innerHTML = "<img src='img/trasera_carta.png'>";
      carta1.classList.remove("flipped");
      carta2.classList.remove("flipped");
    }, 750);
  }

  // Si se alcanza el puntaje máximo, se desactivan todas las cartas.
  if (puntos >= 30) {
    desactivarCartas();
  }
}

// Esta función desactiva todas las cartas después de encontrar todas las parejas.
function desactivarCartas() {
  let cartas = document.querySelectorAll(".btn_carta");
  cartas.forEach(carta => {
    carta.desactivada = true;
    carta.classList.remove("btn_carta");
  });
}

// Esta función genera las parejas de imágenes para el tablero de juego.
function generarParejasImagenes(numParejas) {
  let imagenes = [
    "img/as_corazones.jpeg",
    "img/as_diamante.webp",
    "img/as_trebol.png",
    "img/as_pica.png",
    "img/jokernegro.jpeg",
    "img/jokerrojo.png"
  ];

  let imagenesRepetidas = [];
  for (let i = 0; i < numParejas; i++) {
    let indiceAleatorio = Math.floor(Math.random() * imagenes.length);
    let imagen = imagenes.splice(indiceAleatorio, 1)[0];
    imagenesRepetidas.push(imagen, imagen);
  }

  return imagenesRepetidas;
}
