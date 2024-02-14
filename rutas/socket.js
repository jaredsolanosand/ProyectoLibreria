module.exports = (app) => {
    const http = require('http').Server(app)
    const io = require('socket.io')(http)
    //const controladorSockets = require('../controladores/socket.js')
    io.on('connection', socket => {
        socket.on('nombre-evento', datos => { console.log(datos) })
        // datos es el contenido del mensaje enviado por WebSocket
        // es una cadena de formato arbitrario, usualmente es un JSON
        // definimos más socket.on para rutear más eventos
    })
}
