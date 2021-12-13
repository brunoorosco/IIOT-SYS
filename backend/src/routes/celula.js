const { query } = require('express')
const Express = require('express')
const { now, Json } = require('sequelize/dist/lib/utils')
const router = Express.Router()
const Celula = require('../entities/Celula')


router.route('/')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        const qrcode = Celula
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

router.get('/dash', async (req, res) => {
    const celula = await Celula.findAll()
    celula.map((cel, index) => {
        cel.dataValues.meta = meta(cel.tempoPadrao, cel.minutos)
    })
    res.json(celula).status(200).end()
})

const meta = (temp, min) => {
    return parseFloat((min) / (temp / 1000)).toFixed(0)
}


router.route('/producao/finalizada')
    //verifica se o banco já existe
    .all(async (req, res, next) => {
        next()
    })

    .get(async (req, res) => {
        const qrcode = await Celula.findAll({
            where: {
                finalizado: 'F',
            }
        })

        res.json(qrcode).status(200).end()
    })
router.route('/entrada')
    .get(async (req, res) => {

        const qrcode = await Celula.findAll()
        // console.log(qrcode)
        res.json(qrcode).status(200).end()
    })

    .put(async (req, res) => {
        const { qrEntrada } = { ...req.body }
        const data = await Celula.findAll({ where: { qrcode: qrEntrada } })
        // .then(result => {
        //     const { qrcode } = { ...result }
        //     console.log(qrcode)
        // })
        const { finalizado, entrada } = data[0]

        if (finalizado === 0 && entrada === null) {
            await Celula.update({
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

router.route('/:id')
    .get(async (req, res) => {
        const celula = await Celula.findByPk(req.params.id)
        res.json(celula).status(200).end()
    })

    .delete(async (req, res) => {
        const { id } = req.params
        if (id !== null) {
            const celula = await Celula.destroy({
                where: {
                    id: id
                }
            })
            res.json().status(200).end()
        } else {
            res.json().status(204).end()
        }
    })




module.exports = router;