//import Arrcards from '../GetApi';
//import carta from '../GetApi';

//const urlImg = "https://hipertextual.com/wp-content/uploads/2017/07/rick-morty-.jpg"
console.log(Arrcards)
window.onload = crearDisposicionTarjeta()

function crearDisposicionTarjeta(){
    for(let i=0; i<= 15; i++){
        let card = document.createElement("div");
        card.id = `card${i}`
        card.className ="card_image"
        card.innerHTML = 
        `<div class="card" style="width: 15rem; height:16rem;">
            <img class="card-img-top" src="${urlImg}" alt="Card image cap">
        </div>`
        
        document.getElementById("tablero").appendChild(card)
    }
}