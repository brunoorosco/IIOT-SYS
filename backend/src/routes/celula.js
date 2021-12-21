const Express = require('express')
const router = Express.Router()
const Celula = require('../entities/Celula')
const CelMaq = require('../entities/CelMaq')
const Maquina = require('../entities/Maquina')

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

///função para ler informações sobre a celula de produção, maquinas utilizadas
router.get('/maquinas/:id', async (req, res) => {

    const cel = req.params.id
    
    if (cel !== undefined) {
        const celula = await Celula.findByPk(cel)
        const celmaq = await CelMaq.findAll({
            where: {
                idCelula: celula.id
            }
        })

        const id = celmaq.map(item => item.idMaquina); //filtra os ID
        
        const maquina = await Maquina.findAll({
            where: {
                id: id //seleciona todos id conforme array
            }
        })
        console.log(maquina)
        res.json({ maquina, celmaq, celula }).status(200).end
    }
    res.status(200)

})

///função para ler informações sobre a celula de produção
router.get('/:id', async (req, res) => {

    const cel = req.params.id
    const celula = await Celula.findByPk(cel)
    res.json(celula).status(200).end

})

router.post('/:id/maquina', async (req, res) => {

    console.log(req.body)
    const resposta = await CelMaq.create({
        ...req.body
    });

    res.json(resposta)
        .status(200)
        .end
})

module.exports = router;