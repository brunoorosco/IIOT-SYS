const Sequelize = require('sequelize')
const db = require('../database')

const Qr = db.define('qrcode',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        qrcode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        entrada: {
            type: Sequelize.DATE,
        },
        saida: {
            type: Sequelize.DATE,
        },
        finalizado: {
            type: Sequelize.CHAR,
            defaultValue: '0'
        }
    })

module.exports = Qr
