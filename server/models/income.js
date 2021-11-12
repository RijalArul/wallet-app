'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Income.belongsTo(models.Account, {
        foreignKey: 'userId'
      })
      Income.hasMany(models.Activity, {
        foreignKey: 'incomeId'
      })
    }
  }
  Income.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'name is required'
          },
          notEmpty: {
            msg: 'name is required'
          }
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'amount income is required'
          },
          notEmpty: {
            msg: 'amount income is required'
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'userId is required'
          },
          notEmpty: {
            msg: 'userId is required'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Income'
    }
  )
  return Income
}
