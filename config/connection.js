const Sequelize = require('sequelize')
require('dotenv').config()

const db_name = process.env.DATABASE
const db_user = process.env.USER
const db_password = process.env.PASSWORD
// connect sequelize to mysql db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(db_name, db_user, db_password, {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
    })

module.exports = sequelize
