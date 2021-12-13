const Express = require('express')
const { now } = require('sequelize/dist/lib/utils')
const router = Express.Router()
const QrCode = require('../entities/QrCode')


router.route('/')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        const qrcode = QrCode
        await qrcode.sync()
        next()
    })

    .get(async (req, res) => {
        const qrcode = await QrCode.findAll()
        res.json(qrcode).status(200).end()
    })

    .post(async (req, res) => {

        const { qrcode } = { ...req.body }
        const qr = await QrCode.create({
            qrcode: qrcode,
        });

        res.json({ 'message': 'ok' }).status(200).end()
    })

router.route('/producao/aberta')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        next()
    })

    .get(async (req, res) => {
        const qrcode = await QrCode.findAll({
            where: {
                finalizado: 'A'
            }
        })

        res.json(qrcode).status(200).end()
    })

router.route('/producao/finalizada')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        next()
    })

    .get(async (req, res) => {
        const qrcode = await QrCode.findAll({
            where: {
                finalizado: 'F',
            }
        })

        res.json(qrcode).status(200).end()
    })
router.route('/entrada')
    .get(async (req, res) => {

        const qrcode = await QrCode.findAll()
        // console.log(qrcode)
        res.json(qrcode).status(200).end()
    })

    .put(async (req, res) => {
        const { qrEntrada } = { ...req.body }
        const data = await QrCode.findAll({ where: { qrcode: qrEntrada } })
        // .then(result => {
        //     const { qrcode } = { ...result }
        //     console.log(qrcode)
        // })
        const { finalizado, entrada } = data[0]

        if (finalizado === 0 && entrada === null) {
            await QrCode.update({
                entrada: now(),
                finalizado: 'A'
            },
                {
                    where:
                    {
                        qrcode: qrEntrada
                    }
                }
            ).then(count => {
                console.log('Rows updated ' + count);
            });
            res.json({
                'message': 'ok',
                'alert': 'green'
            }).status(200).end()
        }
        else {
            res.json({
                'message': 'registro já existente',
                'alert': 'green'
            }).status(204).end()
        }
    })


router.route('/saida')

    .get(async (req, res) => {
        const qrcode = await QrCode.findAll()

        res.json(qrcode).status(200).end()
    })

    .put(async (req, res) => {
        const { qrSaida } = { ...req.body }
        const data = await QrCode.findAll({ where: { qrcode: qrSaida } })
        // .then(result => {
        //     const { qrcode } = { ...result }
        //     console.log(qrcode)
        // })
        const { finalizado, saida } = data[0]

        if (finalizado === false && saida === null) {
            await QrCode.update({
                saida: now(),
                finalizado: 'F'
            },
                {
                    where:
                    {
                        qrcode: qrSaida
                    }
                }
            ).then(count => {
                console.log('Rows updated ' + count);
            });
            res.json({
                'message': 'Registrado com Sucesso!',
                'alert': 'green'
            }).status(200).end()
        }
        else {
            res.json({
                'message': 'Registro já existente!',
                'alert': 'orange'
            }).status(204).end()
        }
    })

module.exports = router;