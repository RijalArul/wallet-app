'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Expend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Expend.belongsTo(models.Account, {
        foreignKey: 'userId'
      })
      Expend.hasMany(models.Activity, {
        foreignKey: 'expendId'
      })
    }
  }
  Expend.init(
    {
      name: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Expend'
    }
  )
  return Expend
}
