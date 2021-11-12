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
      Expend.belongsTo(models.User, {
        foreignKey: 'userId'
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
