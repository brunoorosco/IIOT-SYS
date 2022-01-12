const Express = require('express')
const router = Express.Router()
const Celula = require('../entities/Celula')
const CelMaq = require('../entities/CelMaq')
const Maquina = require('../entities/Maquina')
const CelulaService = require('../resource/celula/celula.service')

var celulaService = new CelulaService()

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
        //  const {nome, minutos, quantPessoas, tempoPadrao} = req.body
        const result = await celulaService.create(req.body)
        console.log("LOGGER= " + result)
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

        // console.log('[LOGGER]' + celmaq[0].idMaquina + '\n')

        const idCelMaq = celmaq.map(item => item.idMaquina); //filtra os ID


        const maquina = await Maquina.findAll({
            where: {
                id: idCelMaq //seleciona todos id conforme array
            }
        })

        // console.log('[LOGGER]'+ maquina[0].id +'\n')
        //console.log('[LOGGER]'+celmaq.length+'\n')
        //fuction para pegar o valor de id do relacionamento e injetar direto as informações das maquinass
        if (celmaq.length > 1) {
            celmaq.forEach(o => {

                o.idMaquina = maquina.filter(m => m.id === o.idMaquina)

            });
        }

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
router.delete('/:id', async (req, res) => {
    const result = await celulaService.delete(req.params)
    console.log(result)
    res.json({ 'message': 'excluido' })
})

router.route('/:id/maquina')
    .post(async (req, res) => {

        const resposta = await CelMaq.create({
            ...req.body
        });

        res.json(resposta)
            .status(200)
            .end
    })
    .delete(async (req, res) => {
        const resposta = await CelMaq.destroy({
            where: {
                ...req.body
            }
        });

        res.json(resposta)
            .status(200)
            .end
    })

module.exports = router;