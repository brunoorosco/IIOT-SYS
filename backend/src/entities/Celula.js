const Sequelize = require('sequelize')
const db = require('../database')

const Celula = db.define('celula',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        nome: {
            type: Sequelize.STRING(50),
            allowNull: false,
            
        },
        tempoPadrao: {
            type: Sequelize.DECIMAL(1,10),
            allowNull: false,
        },
        minutos: {
            type: Sequelize.DECIMAL(1,10),
            allowNull: false,
        },
        quantPessoas: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        }
    })

module.exports = Celula
