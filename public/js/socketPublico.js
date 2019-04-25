// Establecer la conexión
let socket = io()

let ticket1 = $('#lblTicket1')
let ticket2 = $('#lblTicket2')
let ticket3 = $('#lblTicket3')
let ticket4 = $('#lblTicket4')

let escritorio1 = $('#lblEscritorio1')
let escritorio2 = $('#lblEscritorio2')
let escritorio3 = $('#lblEscritorio3')
let escritorio4 = $('#lblEscritorio4')

let tickets = [ticket1, ticket2, ticket3, ticket4]
let escritorios = [escritorio1, escritorio2, escritorio3, escritorio4]

socket.on('state', data => {
    updateHTML(data.utimos4)
})

socket.on('ultimos4', data => {
    console.log(data.ultimos4)
    let audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    updateHTML(data.ultimos4)
})

const updateHTML = ultimos4 => {
    for (let i = 0; i < ultimos4.length; i++) {
        tickets[i].text(`Ticket ${ultimos4[i].numero}`)
        escritorios[i].text(`Escritorio ${ultimos4[i].escritorio}`)
    }
}

const resetHTML = () => {
    ticket1.text('En espera ...')
    ticket2.text('')
    ticket3.text('')
    ticket4.text('')
    escritorio1.text('')
    escritorio2.text('')
    escritorio3.text('')
    escritorio4.text('')
}