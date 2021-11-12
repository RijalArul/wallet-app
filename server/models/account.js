'use strict'
const { Model } = require('sequelize')
const { hashPassword } = require('../helpers/bcrypt')
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Email is required'
          },
          notEmpty: {
            msg: 'Email is required'
          },
          isEmail: {
            msg: 'Must be an email'
          }
        },
        unique: {
          args: true,
          msg: 'Email address already exists'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required'
          },
          notEmpty: {
            msg: 'Password is required'
          },
          len: {
            args: [5, 255],
            msg: 'Password min 5 character'
          }
        }
      },
      saldo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Account',
      hooks: {
        beforeCreate (instance, options) {
          instance.password = hashPassword(instance.password)
        }
      }
    }
  )
  return Account
}
