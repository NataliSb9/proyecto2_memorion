let hola = window.localStorage;
console.log(hola)

class Jugador {
    constructor(nombre, tiempos) {
        this.nombre = nombre;
        this.tiempos = tiempos;
    }


    getRecord() {
        let registroTiempos = this.tiempos.sort()
        registroTiempos = registroTiempos.reverse()
        let record = registroTiempos[0];

        return record;
    }

    nPartidas() {
        n = this.tiempos.length;
        return n;
    }
}

function enviarDatos() {

    try {
        let nplayer = document.querySelector("#playerName").value
        var juanito = new Jugador(nplayer, tiempoCrono)
        if (juanito.nombre !== "") {
            
            console.log("All good")
        } else {
            throw new Error("Debes introducir un nombre de jugador!!")
        }
    } catch {

        alert("Debes introducir un nombre de jugador!!");
        juanito.nombre = prompt("¿Cuál es tu nombre?");

    } finally {
        let data=[];
        data.push(juanito.nombre);
        data.push(juanito.tiempos);
        localStorage.setItem(`${juanito.nombre}`, data);
    }
    console.log(juanito)
    
}

