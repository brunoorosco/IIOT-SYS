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
        }

    })

Celula.hasMany(CelMaq, {
    constraints: true,
    foreignKey: 'idCelula',
    allowNull: false,
    type: Sequelize.INTEGER
})

Maq.hasMany(CelMaq, {
    constraints: true,
    foreignKey: 'idMaquina',
    allowNull: false,
    type: Sequelize.INTEGER
})



module.exports = CelMaq