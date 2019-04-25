// Variables
const express = require('express')
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')

// Inicialización
const app = express()
let server = http.createServer(app)

// Archivos estaticos
const publicPath = path.resolve(__dirname, '../public')

// Set del puerto
const port = process.env.PORT || 3000

// Usamos los archivos estaticos
app.use(express.static(publicPath))

// Usamos el socket
// IO es la comunicación del back-end
module.exports.io = socketIO(server)
require('./sockets/socket')

// Listener
server.listen(port, (err) => {
    if (err) throw new Error(err)
    console.log(`Servidor corriendo en puerto ${ port }`)
})