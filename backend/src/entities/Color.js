const Sequelize = require('sequelize')
const db = require('../database')

const Color = db.define('colors',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        codHex: {
            type: Sequelize.STRING(7),
            allowNull: false,
        }
    })

module.exports = Color
