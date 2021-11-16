// creo la clase Carta para asignar atributos a cada una de las Cartas que vamos a mostrar:
class Carta {
    constructor(id, foto, nombre) {
        this.id = id;
        this.foto = foto;
        this.nombre = nombre;
    }
}




//funcion con la que vamos a obtener los Url para el fetch api y los id de cada Carta de manera aleatoria:
async function getrandomCharacter() {


    // Inicializamos las variables que vamos a usar:
    let Url = [];
    let Id = [];
    let nRand = 0;


    // Creamos una promesa para poder asignar a cada uno de los 8 elementos de los arrays una Url y una id de forma que no se repitan
    //( no se por que pero sin promesa el terminal se queda pilladisimo)
    let randomCharacter = new Promise(function (resolve, reject) {
        for (let i = 0; i < 8; i++) {
            nRand = Math.floor(Math.random() * (21 - 1)) + 1;
            Url.push(`https://rickandmortyapi.com/api/character/${nRand}`)
            Id.push(nRand);
        }

        // Ahora corregimos por si alguno de los numeros aleatorios generados se repite ( quedan alguna probabilidad de que alguno se repita, pero es una prob. residual)
        let j = 0;
        while (j < 8) {
            for (let h = 0; h < 8; h++) {
                if (Url[j] == Url[h] && j != h) {
                    nRand = Math.floor(Math.random() * (20 - 1)) + 1;
                    Url[j] = `https://rickandmortyapi.com/api/character/${nRand}`;
                    Id[j] = nRand;
                }

            }
            j++
        }
        let m = 0;
        while (m < 8) {
            for (let h = 0; h < 8; h++) {
                if (Url[m] == Url[h] && m != h) {
                    nRand = Math.floor(Math.random() * (20 - 1)) + 1;
                    Url[m] = `https://rickandmortyapi.com/api/character/${nRand}`;
                    Id[m] = nRand;
                }
            }
            m++
        }
        resolve("exito");
        reject("failure");
    })

    // llamamos a dicha promesa:
    randomCharacter.then(() => console.log(Id))


    //Inicializo un array que va a contener a las 8 Cartas principales, uno con las fotos de estas y otro con los nombres :
    let arrCards = [];
    let fotoCards = [];
    let nameCards = [];
    let Pic;
    let Nam;
    for (let i = 0; i < 8; i++) {
        await fetch(Url[i])
            .then(response => response.json())
            .then(function (data) {
                Pic = data.image;
                Nam = (data.name);
            })
        fotoCards.push(Pic)
        nameCards.push(Nam)
        arrCards.push(new Carta(Id[i], fotoCards[i], nameCards[i]))

    }

    let arrCards_Clone = arrCards;
    arrCards = arrCards.concat(arrCards_Clone);
    return arrCards;
}


/***LOGICA JUEGO ---> PONERLO EN UN JS LLAMADO JUEGO Y QUE ESTE EST'E VINCULADO AL MAIN.JS****/

async function shuffleArrayElements() {

    let arrTarjetas = await getrandomCharacter();

    console.log(arrTarjetas)

    let randomizado = arrTarjetas
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);

    return randomizado;
}

let arrayIdFotos = [];
let arrayFotosMatcheadas = [];
let arrayId = []

function getArrayPersonajes() {}

async function crearDisposicionTarjeta() {

    let arrayPersonajes = await shuffleArrayElements();
    let links = [];
    /// Puedes seguir con tus cosas:
    for (let i = 0; i < arrayPersonajes.length; i++) {
        let foto = arrayPersonajes[i].foto;
        let idFoto = arrayPersonajes[i].id
        links.push(foto);
        arrayId.push(idFoto)
        let card = document.createElement("div");
        card.id = `card${i}`
        card.classList.add("cardCustom");
        card.classList.add("card-image");


        let imgPersonajes = document.createElement('img')
        imgPersonajes.classList.add("img-fluid")
        imgPersonajes.setAttribute('src', foto)
        imgPersonajes.id = `img${i}`;
        let idImgPersonaje = imgPersonajes.id



        document.getElementById("tablero").appendChild(card)
        card.appendChild(imgPersonajes)
        document.getElementById(idImgPersonaje)


    }

    /// funcion que pone ocultas todas las cartas al entrar en la pagina para que no se vean directamente las respuestas
    function cambiarFotoInicio() {

        for (let j = 0; j < 16; j++) {
            let picture = document.getElementById(`img${j}`);
            picture.src = "./styles/scss/Assets/Seeds.png";
        }

    }
    cambiarFotoInicio()
}


// funcion que hace que al hacer click en comenzar se muestren las imagenes que vamos a tener que identificar
async function cambiarfotoall() {
    let arrayPersonajes = await shuffleArrayElements()

    for (let j = 0; j < 16; j++) {
        let picture = document.getElementById(`img${j}`);
        picture.src = arrayPersonajes[j].foto;
    }

}


// Funcion que hace que pasado un tiempo de 1 segundo se vuelvan a poner en oculto todas las cartas.
function timerCambiarAll() {
    setTimeout(function () {
        for (let j = 0; j < 16; j++) {
            let picture = document.getElementById(`img${j}`);
            picture.src = "./styles/scss/Assets/Seeds.png";
        }
    }, 2000)
    console.log(arrayId);
}





// Cargar la disposicion al entrar en la pagina:
window.onload = crearDisposicionTarjeta()
// ENseñar cartas al hacer click en empezar:
document.querySelector("#botonEmpezar").addEventListener("click", cambiarfotoall)
document.querySelector("#botonEmpezar").addEventListener("click", timerCambiarAll)


/**for (let i = 0; i < 16; i++) {
    console.log("bucle dos")
    if (posiciones[i] == true) {
        for (let j = 0; j < 16; j++) {
            let bocaArriba = document.getElementById(`img${j}`);
            document.getElementById(`card${j}`).removeEventListener("click", function lenvata() {
                if (bocaArriba.src = "./styles/scss/Assets/Seeds.png") {
                    bocaArriba.src = li[j];
                }
            })
        }
    }
}*/