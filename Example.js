// creo la clase carta para asignar atributos a cada una de las cartas que vamos a mostrar:
class carta {
    constructor(id, foto, nombre) {
        this.id = id;
        this.foto = foto;
        this.nombre = nombre;
    }
}




//funcion con la que vamos a obtener los Url para el fetch api y los id de cada carta de manera aleatoria:
async function getRandomCharacter() {


    // Inicializamos las variables que vamos a usar:
    let Url = [];
    let Id = [];
    let nRand = 0;


    // Creamos una promesa para poder asignar a cada uno de los 8 elementos de los arrays una Url y una id de forma que no se repitan
    //( no se por que pero sin promesa el terminal se queda pilladisimo)
    let RandomCharacter = new Promise(function (resolve) {
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
    })

    // llamamos a dicha promesa:
    RandomCharacter.then(() => console.log(Id))


    //Inicializo un array que va a contener a las 8 cartas principales, uno con las fotos de estas y otro con los nombres :
    let ArrCards = [];
    let FotoCards = [];
    let NameCards = [];
    let Pic;
    let Nam;
    for (let i = 0; i < 8; i++) {
        await fetch(Url[i])
            .then(response => response.json())
            .then(function (data) {
                Pic = data.image;
                Nam = (data.name);
            })
        FotoCards.push(Pic)
        NameCards.push(Nam)
        ArrCards.push(new carta(Id[i], FotoCards[i], NameCards[i]))
    }
    
    let ArrCards_Clone=ArrCards;
    ArrCards=ArrCards.concat(ArrCards_Clone);
    console.log(ArrCards)
}

window.onload = getRandomCharacter()




function GetCards() {
    getRandomCharacter()
}
document.querySelector(".submit").addEventListener("click", GetCards)





/*
// Esto es para displayear la imagen en pantalla de las fotos
let url = "https://rickandmortyapi.com/api/character/13"
fetch(url)
    .then(response => response.json())
    .then(function (data) {
        console.log(data);
        document.querySelector("#card").innerHTML = `<img src="${data.image}" />`;
    })

    */