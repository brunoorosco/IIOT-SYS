const Express = require('express')
const router = Express.Router()
const Celula = require('../entities/Celula')
const CelMaq = require('../entities/CelMaq')
const Maquina = require('../entities/Maquina')

router.route('/')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        const qrcode = CelMaq
        await qrcode.sync()
        next()
    })

    .get(async (req, res) => {
        const celula = await Celula.findAll()
        res.json(celula).status(200).end()
    })

    .post(async (req, res) => {

        const qr = await Celula.create({
            // celula: celula, minutos: minutos, tempoPadrao: tempoPadrao, quantPessoas: quantPessoas
            ...req.body //substitui tudo que esta acima

        });

        res.json({ 'message': 'ok' }).status(200).end()
    })

///função para ler informações sobre a celula de produção, maquinas utilizadas
router.get('/maquinas/:id', async (req, res) => {
   
    res.status(200)

})

module.exports = router;