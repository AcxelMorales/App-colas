// Establecer la conexión
let socket = io()
let label = $('#lblNuevoTicket')

// Checamos la conexión y el cierre de ella
socket.on('connect', () => {
    console.log('Conectado a el server')
})

socket.on('disconnect', () => {
    console.log('Desconectado de el server')
})

// Estableces el state o ticket actual
socket.on('state', data => {
    label.text(data.actual)
})

// LLamamos a el siguiente ticket
$('button').on('click', () => {

    // Seteamos el valor en el label
    socket.emit('next', null, nextTicket => {
        label.text(nextTicket)
    })
})