const Sequelize = require('sequelize')
const db = require('../database')
const Maq = require('./Maquina')
const Celula = require('./Celula')

const CelMaq = db.define('celmaq',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nomeMaq: {
            type: Sequelize.STRING(50),
        }

    })

Celula.hasMany(CelMaq, {
    constraints: true,
    foreignKey: 'idCelula',
    type: Sequelize.INTEGER
})

Maq.hasMany(CelMaq, {
    constraints: true,
    foreignKey: 'idMaquina',
    type: Sequelize.INTEGER
})



module.exports = CelMaq