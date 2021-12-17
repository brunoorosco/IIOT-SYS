const Sequelize = require('sequelize')
const db = require('../database')

const Maquina = db.define('maquinas',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        nome: {
            type: Sequelize.STRING(50),
            
            
        },
        tipo: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
    })

module.exports = Maquina
