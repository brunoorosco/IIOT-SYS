const Express = require('express')
const { now, Json } = require('sequelize/dist/lib/utils')
const router = Express.Router()
const Maquina = require('../entities/Maquina')


router.route('/')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        const qrcode = Maquina
        await qrcode.sync()
        next()
    })

    .get(async (req, res) => {
        const maquina = await Maquina.findAll()
        res.json(maquina).status(200).end()
    })

    .post(async (req, res) => {

        const qr = await Maquina.create({
           
            ...req.body //substitui tudo que esta acima

        });

        res.json({ 'message': 'ok' }).status(200).end()
    })

module.exports = router;