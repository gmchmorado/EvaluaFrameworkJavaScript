
//--> Definición de variables globales
var elementos;
var defineX;
var xFinal = "";

//--> Función para designar el 'objeto' aleatorio
function agrega(){
  var selector = (Math.floor(Math.random()*4) + 1).toString();
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

//--> Función de animación de caída de 'objeto'
function caer(objDulce/*,orden*/){
  defineX = 680;//-(96*(orden)); para el inicial no se requiere por ello se comenta.
  xFinal = "+=" + defineX.toString() + "px";
  $(objDulce).animate({top:xFinal},"slow");
};

//--> Función para presentar los elementos del tablero
function presentaTablero(){
  var classCol = "";
  var imgDulce = "";
  var selDulce = "";
  for (var i = 0; i < 7; i++){
    classCol = '.col-' + (i+1).toString();
    for (var j = 0; j < 7; j++){
      imgDulce = '<img src="' + elementos[i][j] + '" class="elemento"/>';
      $(imgDulce).prependTo(classCol);
      selDulce = "div" + classCol + " > img:nth-child(1)";
      caer(selDulce);
    }
  }
};

function evaluar(){

};
/*
recorrer la matriz columna/renglon, revisando las coincidencias de renglon (a la derecha) columna (hacia abajo), si hay una primera coincidencia, continúa la evaluación, continuará evaluando hasta que termine o deje de existir coincidencias. Marcará el número de coincidencias si es mayor de tres (2 coincidencias) agregará las posiciones a una variable (array?).
Una vez revisadotodo el tablero, procederá con la "remosión" de los elementos HTML; la caida de los elementos se genera cuando son eliminados; se agregarán los "nuevos" con el apoyo de lo almacenado en la variable (array?)
!!!Se puede realizar una nueva evaluación ¿Se deberá hacer?  
*/

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