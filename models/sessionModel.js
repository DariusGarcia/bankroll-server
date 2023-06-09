const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection.js')

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initialBuyIn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    additionalBuyIn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeSpent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sportsBetName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sportsBetOdds: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeOfBet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    underscored: true,
    modelName: 'Session',
  }
)

module.exports = Session
