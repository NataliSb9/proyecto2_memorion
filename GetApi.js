// creo la clase Carta para asignar atributos a cada una de las Cartas que vamos a mostrar:
class Carta {
    constructor(id, foto, nombre) {
        this.id = id;
        this.foto = foto;
        this.nombre = nombre;
    }
}





//funcion con la que vamos a obtener los Url para el fetch api y los id de cada Carta de manera aleatoria:
async function getRandomCharacter() {


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





/***LOGICA JUEGO ---> PONERLO EN UN JS LLAMADO JUEGO Y QUE ESTE ESTE VINCULADO AL MAIN.JS****/


class CartaTablero {

    constructor(parId, foto, nombre, idDom) {
        this.fotoTapadaSrc = "./styles/scss/Assets/Seeds.png";
        this.parId = parId;
        this.foto = foto;
        this.nombre = nombre;
        this.idDom = idDom;
        this.revelada = false;
    }

    getHtml(){
        let card = document.createElement("div");
        card.id = `card${this.idDom}`
        card.classList.add("cardCustom");
        card.classList.add("card-image");

        let personajeImgHtml = document.createElement('img')
        personajeImgHtml.classList.add("img-fluid")
        if(this.revelada){
            personajeImgHtml.setAttribute('src', this.foto)
        }else{
            personajeImgHtml.setAttribute('src', this.fotoTapadaSrc)
        }
        personajeImgHtml.setAttribute("data-idFoto", this.idDom)
        personajeImgHtml.setAttribute("data-linkFoto", this.foto)
        personajeImgHtml.id = `img${this.idDom}`;
        card.appendChild(personajeImgHtml)

        return card;
    }

    voltear(){
        this.revelada = !this.revelada
    }
}

function shuffle(array){
    return array
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
}

class Juego{
    constructor(){
        this.tablero = []
        this.volteadas = [];
        this.correctas =[];
    }

    comenzar(){
        getRandomCharacter()
        .then(cartas => shuffle(cartas))
        .then(cartas => this.tablero = this.getCartasTablero(cartas))
        .then(() => this.pintar())
    }

    getCartasTablero(cartas){
        let result = []
    
        for(let i = 0; i<cartas.length; i++){
            result.push(new CartaTablero(cartas[i].id, cartas[i].foto, i))
        }
        
        return result
    }    

    pintar(){
        document.getElementById("tablero").innerHTML = ""
        for (let i = 0; i < this.tablero.length; i++) {
            
            let card = this.tablero[i].getHtml()
    
            document.getElementById("tablero").appendChild(card)

            if(!this.correctas.includes(this.tablero[i])){
                card.addEventListener('click', () => {
                    if(this.volteadas.length < 2){
                        this.tablero[i].voltear()
                        this.volteadas.push(this.tablero[i])
                        this.pintar()
                    }
                })
            }
        }
        this.resolverMatches()
    }

    resolverMatches(){
        if(this.volteadas.length > 0){
            if(this.volteadas[0].parId === this.volteadas[1].parId){
                console.log(`match!`)
                this.correctas.push(this.volteadas[0])
                this.correctas.push(this.volteadas[1])
                this.volteadas = []
                this.pintar()
            }else{
                this.volteadas[0].voltear()
                this.volteadas[1].voltear()
                this.volteadas = []
            }    
        }
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
}


document.querySelector("#botonEmpezar").addEventListener("click", timerCambiarAll)

let juego = new Juego()

window.onload = juego.comenzar()