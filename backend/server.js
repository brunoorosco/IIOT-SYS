const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')

const PORT = 3005

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const server = http.createServer(app);

const io = socketIO(server)

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



app.post('/', (req, res) => {
    const tempo = req.body.tempo
    const tempoFinal = parseInt(tempo) / 1000;
    //console.log(req.headers)
    console.log(tempo, tempoFinal)


    io.sockets.emit('infoEvent', tempoFinal.toFixed(2))
    res.sendStatus(200)
})

server.listen(PORT, () => console.log(`Servidor rodando porta ${PORT}`))