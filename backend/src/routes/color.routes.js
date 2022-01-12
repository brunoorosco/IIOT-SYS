const Express = require('express')
const router = Express.Router()
const Color = require('../entities/Color')

router.route('/')

    .all(async (req, res, next) => {
        const color = Color
        await color.sync()
        next()
    })

    .get(async (req, res) => {
        const color = await Color.findAll()
        res.json(color)
    })

    .post(async (req, res) => {
        const data = req.body
        console.log(data)
        const color = await Color.create({ ...data })
        res.json(color)
    })

module.exports = router;

