const Sequelize = require('sequelize')
const db = require('../database')

const Users = db.define('users',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4, 
      allowNull: false,
      primaryKey: true

    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  })

  module.exports = Users
