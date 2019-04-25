const fs = require('fs')
const {
    Ticket
} = require('./Ticket')

class TicketControl {

    constructor() {
        // Seteamos los valores de el json
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        // Obtenemos la data
        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        } else {
            this.resetConteo()
        }
    }

    resetConteo() {
        this.ultimo = 0
        this.tickets = []
        this.ultimos4 = []
        console.log('Se ah inicializado el sistema')
        this.saveData()
    }

    saveData() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        // Convertimos el JSON a String y lo escribimos en el archivo
        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }

    next() {
        // Aumentamos en 1 el último
        this.ultimo++

        // Creamos un ticket y lo agregamos a el arreglo|
        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)

        this.saveData()
        return `Ticket ${this.ultimo}`
    }

    getState() {
        return `Ticket ${this.ultimo}`
    }

    getLastFour() {
        return this.ultimos4
    }

    getAll() {
        return this.tickets
    }

    attendTicket(escritorio) {
        // Validamos
        if (this.tickets.length === 0) return 'No hay Tickets';

        // Obtenemos el número de el primer ticket en el arreglo
        // Y lo eliminamos de el
        let numeroTicket = this.tickets[0].numero
        this.tickets.shift()

        // Creamos el ticket que va a ser atendido y lo mandamos a el inicio
        let atender = new Ticket(numeroTicket, escritorio)
        this.ultimos4.unshift(atender)

        // Si sobrepasamos 4 tickets, borramos el último
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1)
        }

        this.saveData()
        return atender
    }

}

module.exports = {
    TicketControl
}