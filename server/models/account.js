'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Account.hasMany(models.Income, {
        foreignKey: 'userId'
      })

      Account.hasMany(models.Expend, {
        foreignKey: 'userId'
      })

      Account.hasMany(models.Activity, {
        foreignKey: 'userId'
      })
    }
  }
  Account.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      saldo: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Account'
    }
  )
  return Account
}
