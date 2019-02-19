
//--> Definición de variables globales
var elementos;
var defineX;
var xFinal = "";
var objCoinciden = [];
var aryCoincideSin = [];
var cntElementos = 0;

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
  $(objDulce)
    .animate(
      {top:xFinal},
      {queue:true},
      "slow");
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
  var verElemento = "";
  var conservaElemento = "";
  var cntConcidencias = 0;
  var i = 0;
  var j = 0;
  //recorrido por columnas
  //setTimeout(function(){
    for (i = 0; i < 7; i++){
      for (j = 0; j < 7; j++){
        verElemento = elementos[i][j];
        if (conservaElemento == verElemento){
          cntConcidencias += 1;
          if (cntConcidencias == 2){
            objCoinciden.push(i.toString()+(j-cntConcidencias).toString(),i.toString()+(j-cntConcidencias+1).toString(),i.toString()+j.toString())
          }else if (cntConcidencias > 2){
            objCoinciden.push(i.toString()+j.toString())
          }
        }else {
          cntConcidencias = 0;
        }
        conservaElemento = verElemento;
      }
      conservaElemento = "";
    }
    //recorrido por filas
    for (j = 0; j < 7; j++){
      for (i = 0; i < 7; i++){
        verElemento = elementos[i][j];
        if (conservaElemento == verElemento){
          cntConcidencias += 1;
          if (cntConcidencias == 2){
            objCoinciden.push((i-cntConcidencias).toString()+j.toString(),(i-cntConcidencias+1).toString()+j.toString(),i.toString()+j.toString());
          }else if (cntConcidencias > 2){
            objCoinciden.push(i.toString()+j.toString());
          }
        }else {
          cntConcidencias = 0;
        }
        conservaElemento = verElemento;
      }
      conservaElemento = "";
    }
  //},1000);
};

//función para retirar duplicados obtenida de forma externa
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function seleccionar(){
  var objDestino = "";
  var strSelector = "";
  //setTimeout(function(){
    if (objCoinciden.length > 0){
      //retira duplicados y ordena descendente
      objCoinciden.sort();
      objCoinciden.reverse();
      aryCoincideSin = objCoinciden.unique();
      for (var k = 0; k < aryCoincideSin.length; k++ ){
        strSelector = aryCoincideSin.slice(k,(k+1)).toString();
        i = parseInt(strSelector.slice(0,1));
        j = parseInt(strSelector.slice(1));
        objDestino = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
        $(objDestino)
          .effect("pulsate",2000);
      }
    }
  //},1000);
};

function retirar(){
  //setTimeout(function(){
    if (aryCoincideSin.length > 0){
      for (var k = 0; k < aryCoincideSin.length; k++ ){
        strSelector = aryCoincideSin.slice(k,(k+1)).toString();
        i = parseInt(strSelector.slice(0,1));
        j = parseInt(strSelector.slice(1));
        elementos[i].splice(j,1);
        objDestino = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
        $(objDestino)
          .detach();
      }
      cntElementos = contarElementos(elementos);
      objCoinciden = [];
      aryCoincideSin = [];
    }
  //},2000);
};

function contarElementos(aryXevaluar){
  var contador = 0;
  for (var k = 0; k < 7; k++){
    contador += aryXevaluar[k].length;
  }
  return contador;
};

function completar(){
  //setTimeout(function(){
    if (cntElementos != 49){
      var classCol = "";
      var imgDulce = "";
      var selDulce = "";
      //var h = 0;
      for (var i = 0; i < 7; i++){
        for (var j = 0; j < 7; j++){
          if (elementos[i].length <= 7){
            if (typeof elementos[i][j] === "undefined"){
              elementos[i][j] = agrega();
              classCol = '.col-' + (i+1).toString();
              imgDulce = '<img src="' + elementos[i][j] + '" class="elemento"/>';
              $(imgDulce).prependTo(classCol);
              selDulce = "div" + classCol + " > img:nth-child(1)";
              caer(selDulce);
            }
          }
        }
      }
    }
  //},2500);
};

function inicia(){
  //var cntMover = 0;
  setTimeout(generaTablero,100);
  setTimeout(presentaTablero,200);
  setTimeout(evaluar,700);
  setTimeout(seleccionar,1000);
  setTimeout(retirar,2000);
  setTimeout(console.log("Terminó primer ciclo, paso con "+cntElementos+" elementos por completar"),2010);
  
  while (cntElementos < 49){
    setTimeout(repaso,3000);
    /*window.setTimeout("completar()",2600);
    window.setTimeout("evaluar()",3300);
    window.setTimeout("seleccionar()",4300);
    window.setTimeout("retirar()",5300);
    window.setTimeout('console.log("Terminó primer ciclo, paso con "+cntElementos+" elementos por completar")',5310);*/
  };
};

function repaso(){
  setTimeout(completar,100);
  setTimeout(evaluar,700);
  setTimeout(seleccionar,1000);
  setTimeout(retirar,2000);
  setTimeout(console.log("Terminó otro ciclo, paso con "+cntElementos+" elementos por completar"),2010);
};

/*
recorrer la matriz columna/renglon, revisando las coincidencias de renglon (a la derecha) columna (hacia abajo), si hay una primera coincidencia, continúa la evaluación, continuará evaluando hasta que termine o deje de existir coincidencias. Marcará el número de coincidencias si es mayor de tres (2 coincidencias) agregará las posiciones a una variable (array?).
Una vez revisado todo el tablero, procederá con la "remosión" de los elementos HTML; la caida de los elementos se genera cuando son eliminados; se agregarán los "nuevos" con el apoyo de lo almacenado en la variable (array?)
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