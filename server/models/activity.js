'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Activity.belongsTo(models.Account, {
        foreignKey: 'userId'
      })
      Activity.belongsTo(models.Income, {
        foreignKey: 'incomeId'
      })
      Activity.belongsTo(models.Expend, {
        foreignKey: 'expendId'
      })
    }
  }
  Activity.init(
    {
      name: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      incomeId: DataTypes.INTEGER,
      expendId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Activity'
    }
  )
  return Activity
}
