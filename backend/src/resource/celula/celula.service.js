const Celula = require('../../entities/Celula')
const celula = require('./celula.class')

class CelulasService {

    constructor() {
        this.celulas = []
    }

    async create(data) {
        const celula = new Celula()
        const result = await Celula.create({
            // celula: celula, minutos: minutos, tempoPadrao: tempoPadrao, quantPessoas: quantPessoas
            ...data //substitui tudo que esta acima

        });
        return result
        // res.json({ 'message': 'ok' }).status(200).end()
    }
    async delete(params) {
        const { id } = params
        const celula = new Celula()
        const result = await Celula.destroy({
            where: {
                id
            }
        });
        return result
        // res.json({ 'message': 'ok' }).status(200).end()
    }
}

module.exports = CelulasService