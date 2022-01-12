const Express = require('express')
const router = Express.Router()
const Product = require('../entities/Produtos')

router.all(async (req, res, next) => {
    const product = Product
    await product.sync()
    next()
})

    .get((req, res) => {


        res.send('ok')
    })

module.exports = router;