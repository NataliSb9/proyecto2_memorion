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
    let randomCharacter = new Promise(function (resolve,reject) {
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
        console.log(arrCards)
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
async function crearDisposicionTarjeta() {
    
      let arrayPersonajes = await shuffleArrayElements();

      /// Puedes seguir con tus cosas:
    for (let i = 0; i < arrayPersonajes.length; i++) {
        let foto = arrayPersonajes[i].foto;

        console.log(foto)
        let idFoto = arrayPersonajes[i].id
        let card = document.createElement("div");
        card.id = `card${i}`
        let imgPersonajes = document.createElement('img')
        imgPersonajes.setAttribute('src',foto)
        imgPersonajes.id = idFoto;
        let idImgPersonaje = imgPersonajes.id
        // card.innerHTML =
        //     `<div class="card" style="width: 15rem; height:16rem;">
        //         <div class="card_image">
        //             <img style="width: 15rem; height:16rem; id"${idFoto}" class="cardFoto" src="${foto}" alt="card">
        //         </div>
        //     </div>`

        document.getElementById("tablero").appendChild(card)
        card.appendChild(imgPersonajes)
        document.getElementById(idImgPersonaje)
        //document.getElementById(idImgPersonaje).addEventListener('click' , almacenarIDcarta)
    }

    
    // pendiente incluir la funcion que da la vuelta, para crear el evento.
}



window.onload = crearDisposicionTarjeta()
