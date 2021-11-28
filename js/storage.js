let hola = window.localStorage;


class Jugador {
    constructor(nombre, tiempos, npartida) {
        this.nombre = nombre;
        this.tiempos = tiempos;
        this.npartida = npartida;
    }


    getRecord() {
        let registroTiempos = this.tiempos.sort()
        registroTiempos = registroTiempos.reverse()
        let record = registroTiempos[0];

        return record;
    }

}

function enviarDatos() {

    try {
        let nplayer = document.querySelector("#playerName").value
        var juanito = new Jugador(nplayer, tiempoCrono, 0)
        if (juanito.nombre !== "") {

            console.log("All good")
        } else {
            throw new Error("Debes introducir un nombre de jugador!!")
        }
    } catch {

        alert("Debes introducir un nombre de jugador!!");
        juanito.nombre = prompt("¿Cuál es tu nombre?");
        alert("Vuelve a jugar para ver tu puntuación, y no olvides escribir tu nombre");
        document.querySelector("#playerName").innerHTML=juanito.name;

    } finally {
        let data = [];
        data.push(juanito.nombre);
        data.push(juanito.tiempos);
        let juanName = juanito.nombre;
        let partidas = 0;

        for (let i = 0; i < localStorage.length; i++) {
            let players = localStorage.getItem(localStorage.key(i));
            console.log(localStorage.key(i))
            let playersGames = players.toString();
            playersGames = playersGames.split(",");
            console.log(playersGames)
            if (playersGames[0] === juanName) {
                partidas++
            }
        }
        localStorage.setItem(`${juanito.nombre}` + `${partidas}`, data);


    }
    console.log(juanito)


}

function leerDatos() {
    let jorgito = document.querySelector("#playerName").value;
    let ranking = [];


    for (let i = 0; i < localStorage.length; i++) {
        let players = localStorage.getItem(localStorage.key(i));
        let playersGames = players.toString();
        playersGamesCheck = playersGames.split(",");
        if (playersGamesCheck[0] === jorgito) {
            ranking.push(playersGamesCheck)
        }

    }

    let top5 = ranking.sort();



    for (let i = 0; i < localStorage.length; i++) {
        let ol = document.getElementById('rankingPuntuacion')
        let li = document.createElement('li')
        li.innerHTML = ` ${top5[i][1]} horas, ${top5[i][2]} minutos y ${top5[i][3]} segundos. `
        ol.appendChild(li)

    }


}