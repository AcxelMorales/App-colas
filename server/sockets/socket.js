const {
    io
} = require('../server')

const {
    TicketControl
} = require('../classes/Ticket-control')

const ticketControl = new TicketControl()

// Escuchamos la conexión
io.on('connection', client => {

    // Mandamos el siguiente registro
    client.on('next', (data, cll) => {
        let next = ticketControl.next()
        cll(next)
    })

    // Emitimos el ticket actual
    client.emit('state', {
        actual: ticketControl.getState(),
        utimos4: ticketControl.getLastFour()
    })

    client.on('attend', (data, cll) => {
        if (!data.escritorio) {
            return cll({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        let atender = ticketControl.attendTicket(data.escritorio)
        cll(atender)

        // Actualizar / notificar los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getLastFour(),
            all: ticketControl.getAll()
        })
    })
})