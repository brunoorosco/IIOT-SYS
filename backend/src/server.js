const express = require('express')
require('dotenv').config()
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
const qr = require('qr-image')
const cors = require('cors')
const db = require('./database')


const { nextTick } = require('process')
const RouteQrCode = require('./routes/qrcode')
const RouteCelulas = require('./routes/celula')
const RouteMaquinas = require('./routes/maquina')

const app = express();



app.use(cors())
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

/////DB
app.route('/db')
    .get(async (req, res) => {
        const usuario = Users
        await db.sync()
        res.sendStatus(200)
    })
    .post(async (req, res) => {
        const { nome, email } = { ...req.body }
        const user = await Users.create({
            name: nome,
            email: email
        });
        console.log(user.id)
        res.sendStatus(200)
    })


///////////////// webSockets
app.post('/', (req, res) => {
    const tempo = req.body.tempo
    const tempoFinal = parseInt(tempo) / 1000;
    //console.log(req.headers)
    console.log(tempo, tempoFinal)


    io.sockets.emit('infoEvent', tempoFinal.toFixed(2))
    res.sendStatus(200)
})

///////////////// Qrcode
app.use('/qrcode', RouteQrCode);

///////////////// Qrcode
app.use('/celulas', RouteCelulas);

///////////////// Maq
app.use('/maquinas', RouteMaquinas);

app.get('/:id', async (req, res) => {
    const data = req.params.id
    console.log(data)

    const code = qr.image(data, { type: 'png' })
    res.type('png')

    code.pipe(res)

})


server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando porta ${process.env.PORT}`)
})