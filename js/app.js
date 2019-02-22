
//--> Definición de variables globales
let elementos;
let defineX;
let xFinal = "";
let objCoinciden = [];
let aryCoincideSin = [];
let cntElementos = 0;
let verElemento = "";
let conservaElemento = "";
let cntConcidencias = 0;
let i = 0;
let j = 0;
let objDestino = "";
let strSelector = "";
let classCol = "";
let imgDulce = "";
let selDulce = "";
let repetir = false;
let cntInicio = 0;
let numPuntosAcum = 0;

//--> Función para designar el 'objeto' aleatorio
function agrega(){
  let selector = (Math.floor(Math.random()*4) + 1).toString();
  let seleccion = "image/" + selector + ".png";
  return seleccion;
};

//--> Función para generar datos del tablero
function generaTablero(){
  elementos = new Array(6);
  for (i = 0; i < 7; i++){
    elementos[i] = new Array(6);
    for (j = 0; j < 7; j++){
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
  classCol = "";
  imgDulce = "";
  selDulce = "";
  for (i = 0; i < 7; i++){
    classCol = '.col-' + (i+1).toString();
    for (j = 0; j < 7; j++){
      imgDulce = '<div "class="elemento fila-"' + (j+1).toString() + '><img src="' + elementos[i][j] + '"/></div>';
      $(imgDulce).prependTo(classCol);
      selDulce = "div" + classCol + " > div:nth-child(1)";
      caer(selDulce);
    }
  }
};

function verificar(){
  verElemento = "";
  conservaElemento = "";
  cntConcidencias = 0;
  i = 0;
  j = 0;
  /*
  =====================================
  Evalua los elementos para encontrar los que cumplen con la condición.
  =====================================
  */
  //recorrido por columnas
  for (i = 0; i < 7; i++){
    for (j = 0; j < 7; j++){
      verElemento = elementos[i][j];
      if (conservaElemento == verElemento){
        cntConcidencias += 1;
        if (cntConcidencias == 2){
          objCoinciden.push(i.toString()+(j-cntConcidencias).toString(),i.toString()+(j-cntConcidencias+1).toString(),i.toString()+j.toString())
        }else if (cntConcidencias > 2){
          objCoinciden.push(i.toString()+j.toString())
        };
      }else {
        cntConcidencias = 0;
      };
      conservaElemento = verElemento;
    };
    conservaElemento = "";
  };
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
        };
      }else {
        cntConcidencias = 0;
      };
      conservaElemento = verElemento;
    };
    conservaElemento = "";
  };
  if (objCoinciden.length != 0){
    repetir = true;
  };
  /*
  =====================================
  Selecciona los elementos y separa sus coordenadas en una matríz, les aplica el efecto de pulsar a aquellas que cumplen la condición.
  Se hace el retiro de los elementos tanto en HTML como en la matríz para conservar la integridad.
  =====================================
  */
  objDestino = "";
  strSelector = "";
  if (objCoinciden.length > 0){
    repetir = false;
    //retira duplicados y ordena descendente
    objCoinciden.sort();
    objCoinciden.reverse();
    aryCoincideSin = objCoinciden.unique();
    for (let k = 0; k < aryCoincideSin.length; k++ ){
      strSelector = aryCoincideSin.slice(k,(k+1)).toString();
      i = parseInt(strSelector.slice(0,1));
      j = parseInt(strSelector.slice(1));
      elementos[i].splice(j,1);
      objDestino = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
      $(objDestino).effect({
        effect:"pulsate",
        duration:2000,
        complete:function(){
          $(this).detach()
          /*
          =====================================
          Se recorre la matríz de elementos y en caso de encontrar elementos "no definidos" vuelve a agregarlos en el HTML y en la propia matríz
          =====================================
          */
          if (contarElementos(elementos) != 49){
            classCol = "";
            imgDulce = "";
            selDulce = "";
            //var h = 0;
            for (i = 0; i < 7; i++){
              for (j = 0; j < 7; j++){
                if (elementos[i].length <= 7){
                  if (typeof elementos[i][j] === "undefined"){
                    elementos[i][j] = agrega();
                    classCol = '.col-' + (i+1).toString();
                    imgDulce = '<img src="' + elementos[i][j] + '" class="elemento" name="' + j.toString() + '"/>';
                    $(imgDulce).prependTo(classCol);
                    selDulce = "div" + classCol + " > img:nth-child(1)";
                    caer(selDulce);
                  };
                };
              };
            };
          };
          numPuntosAcum += objCoinciden.length;
          $("#score-text").text(numPuntosAcum);
          cntElementos = contarElementos(elementos);
          objCoinciden = [];
        }
      });
    };
  };
};

/*
=====================================
Función para retirar duplicados obtenida de forma externa.
La nueva matríz depende de la existente, por lo que si se limpia la principal, la "unique" también pierde sus elementos.
=====================================
*/
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

/*
=====================================
Función obtener la cantidad de elementos que cumplen con la condición
=====================================
*/
function contarElementos(aryXevaluar){
  let contador = 0;
  for (let k = 0; k < 7; k++){
    contador += aryXevaluar[k].length;
  }
  return contador;
};

/*
=====================================
Función auxiliar para hacer 'callback' de las verificaciones subsecuentes y suspender el 'setInterval' cuando no se tengan más elementos que cumplan con la condición.
=====================================
*/
function aumentar(){
  cntInicio += 1;
  if(!repetir){
    clearInterval(verificar);
  };
};

/*
=====================================
Función de inicio realizada por el 'click' al botón. Fue necesario recurrir a los 'callback' anidados.
=====================================
*/
function inicia(){
  do{
    if (cntInicio == 0){
      verificar(
        presentaTablero(
          generaTablero()
        )
      );
      cntInicio += 1;
    };
    aumentar(
      setInterval(verificar,3000)
    )
  }
  while(repetir);
};

/*
=====================================
Llamada para el botón de inicio
=====================================
*/

$(".btn-reinicio").click(inicia);
$(document).ready(jugar);

//TEMPORAL PARA REVISAR LAS COORDENADAS
$(".panel-tablero").on("click","img",function() {
  let itemp = parseInt(($(this).parent().attr("class")).slice(-1)) - 1;
  console.log("itemp = ",itemp);
  let jtemp = parseInt($(this).attr("name"));
  console.log("jtemp = ",jtemp);
});

function prueba(){
  objDestino = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
  console.log(objDestino);
};

function jugar(){
  prueba(//depositoValido(
    identificar()
  );
};

function identificar(){
  $(".panel-tablero").on("mousedown","img",function() {
    i = parseInt(($(this).parent().attr("class")).slice(-1)) - 1;
    console.log("i = ",i);
    j = parseInt($(this).attr("name"));
    console.log("j = ",j);
  });
};

function intercambia (imgDestino) {
  return this.each(function() {
      let imgCopiaDestino = $(imgDestino).clone();
      let imgCopiaFuente = $(this).clone();
      $(imgDestino).replaceWith(imgCopiaFuente);
      $(this).replaceWith(imgCopiaDestino);
  });
};

function depositoValido(){
  objDestino = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
  let strValidaIzq = "";
  let strValidaDer = "";
  let strValidaInf = "";
  let strValidaSup = "";
  const optDraggable = {revert: true};
  $(objDestino).draggable(optDraggable);
  //Selector de la izquierda
  if (i > 0){
    strValidaIzq = 'div.col-' + (i).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
    $(strValidaIzq).droppable({
      drop: function(event, ui) {
      setTimeout(function(){
          $(objDestino).intercambia($(strValidaIzq));
          $("img").draggable(optDraggable);
      }, 600);
      }
    });
  };
  if (i < 6){
    strValidaDer = 'div.col-' + (i+2).toString() + ' > img:nth-last-child(' + (j+1).toString() +')';
  };
  if (j > 0){
    strValidaInf = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j).toString() +')';
  };
  if (j < 6){
    strValidaInf = 'div.col-' + (i+1).toString() + ' > img:nth-last-child(' + (j+2).toString() +')';
  };
};

/*
LÓGICA DEL PROCESO

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