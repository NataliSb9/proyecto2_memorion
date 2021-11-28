window.onload = init;
// Funcion para iniciar en cuanto s eabra la pagina, añadimos que al hacer click se activen las funciones correspondientes e inicializamos rn 0 el crono:
let h = 0;
let m = 0;
let s = 0;

function init() {
  
    document.getElementById("hms").innerHTML = "00:00:00";
}
// funcion para iniciar el cronometro:

function cronometrar() {
    setTimeout(function () {
        escribir();
        id=setInterval(escribir, 1000);
        document.querySelector("#botonEmpezar").removeEventListener("click", cronometrar);
    }, 4000)
}


// funcion para imprimir el cambio de tiempo en pantalla, teniendo en cuenta que las decimas y centesimas se tienen que definir de distinta manera ( No se admiten numeros de dos cifras en js)
let registroOut = [];
let tiempoCrono = [];



function escribir() {
    let hAux, mAux, sAux;
    s++;
    if (s > 59) {
        m++;
        s = 0;
    }
    if (m > 59) {
        h++;
        m = 0;
    }
    if (h > 24) {
        h = 0;
    }

    if (s < 10) {
        sAux = "0" + s;
    } else {
        sAux = s;
    }
    if (m < 10) {
        mAux = "0" + m;
    } else {
        mAux = m;
    }
    if (h < 10) {
        hAux = "0" + h;
    } else {
        hAux = h;
    }


    tiempoCrono[2] = s;
    tiempoCrono[1] = m;
    tiempoCrono[0] = h;
    let registro = hAux + ":" + mAux + ":" + sAux;
    registroOut = registro;
    document.getElementById("hms").innerHTML = registro;
}

//Para parar el crono y poder continuar cuando queramos
function parar() {
    clearInterval(id);
    enviarDatos();
    leerDatos();
    document.querySelector(".start").addEventListener("click",cronometrar);
    return registroOut, tiempoCrono;
}

