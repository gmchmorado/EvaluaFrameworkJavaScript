
//--> Definición de variables globales
var elementos;

//--> Función para designar el 'objeto' aleatorio
function agrega(){
  var selector = (Math.floor(Math.random()*3) + 1).toString();
  var seleccion = "image/" + selector + ".png";
  return seleccion;
};

//--> Función para generar datos del tablero
function generaTablero(){
  elementos = new Array(6);
  for (var i = 0; i < 7; i++){
    elementos[i] = new Array(6);
    for (var j = 0; j < 7; j++){
      elementos[i][j] = agrega();
    }
  }
};

//--> Función para presentar los elementos del tablero
function presentaTablero(){
  for (var i = 0; i < 7; i++){
    posCol = '.col-' + (i+1).toString();
    for (var j = 0; j < 7; j++){
      $('<img src="' + elementos[i][j] + '" class="elemento"/>').appendTo(posCol);
    }
  }
};

/*
LÓGICA DEL PROCESO
El tablero cuenta con (7,7) casillas que se pueden ordenar en una matriz
El llenado de las casillas se realizará con una función de selección aleatoria para cada casilla que se encuentre vacia.
Por logica, al inicio del juego TODO el tablero estará vacio por lo cual se realizará el llenado de todo el mismo.
Una vez realizado el primer llenado y al iniciar el juego (inicio del croncómetro del tiempo límite) se realizará la primera evaluación de conincidencias.
Cada cambio en el tablero deberá efectuar la evaluación de coincidencias.
Todos los 'objetos' que corresponan a las imágenes de los dulces, SERÁN "dragables" y "dropables" en el tablero contenedor.
!!!Funcionalidad "sortable" para el cambio de posiciones de los 'objetos', al seleccionar un objeto con "clickdown" sólo deberán ser "sorteable" los contenedores aldeaños y ningún otro.
¿¿¿Quiza deba haber una comprobación para verificar si la posición es "dropable", en caso afirmativo permita realizar el intercambio; en caso negativo no lo permita y revierta (en su caso) el cambio.
Se debe revisar que cada 'objeto' sólo sea colocado en una casilla aledaña, es decir que de sus 2 coordenadas cambie sólo una de ellas y su aumento o disminución sea en una unidad únicamente.
Con cada movimiento 'valido' se deberá incrementar el contador de pantalla.
El cronómetro será regresivo desde 2 minutos, al cumplirse, se realizará la animación correspondiente desapareciendo el tablero y el cronómetro, ocupando toda el área los recuadros de la puntuación y los movimientos. El boton aparecerá centrado en toda el área.
El efecto de cambio de color de las letras será una función.
!!! Recordar el uso de setTimeout para la secuencia de animaciones e inicio de funciones.
Al oprimir el boton de iniciar, su texto debe cambiar a 'reiniciar' y en caso de se oprimido se deberá reiniciar todo el juego.
*/