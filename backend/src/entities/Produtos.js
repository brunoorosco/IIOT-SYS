const Sequelize = require('sequelize')
const db = require('../database')
const Color = require('./Color')

const Produto = db.define('products',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        material: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        referenceProduct: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        typeProduct: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

Color.hasOne(Produto, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true,
    foreignKey: 'idColor',
    type: Sequelize.INTEGER
})

module.exports = Produto
