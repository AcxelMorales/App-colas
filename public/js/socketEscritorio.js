// Establecer la conexión
let socket = io()

// Obtenemos los parametros y validamos la entrada
let searchParams = new URLSearchParams(window.location.search)
let label = $('small')

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

// Asignamos el valor a el elemento
let escritorio = searchParams.get('escritorio')
$('h1').text(`Escritorio ${escritorio}`)

$('button').on('click', () => {
    socket.emit('attend', {
        escritorio: escritorio
    }, resp => {
        if (resp === 'No hay Tickets') {
            label.text(resp)
            alert(resp)
            window.location = 'nuevo-ticket.html'
            return;
        }

        label.text(`Ticket ${resp.numero}`)
    })
})