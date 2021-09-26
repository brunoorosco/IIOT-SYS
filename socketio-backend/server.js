const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const PORT = 3005

const app = express();

const server = http.createServer(app);

const io = socketIO(server)
var web = 0;

// io.on('connection', socket => {
//     console.log('New user connected.');

//     if (web === 1) {
//         socket.on('infoEvent', (informacao) => {
//             console.log(informacao)
//             io.sockets.emit('infoEvent', 'teste')
//             web = 0
//         })

//     }
//     socket.on('disconnect', () => {
//         console.log('User disconnected')
//     })

// })



app.get('/api/esp', (req, res) => {

    console.log(req.query)
    web = 1
    io.sockets.emit('infoEvent', req.query.temperature)
    res.send('ok')
})

server.listen(PORT, () => console.log(`Servidor rodando porta ${PORT}`))