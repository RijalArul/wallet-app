const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { Account } = require('../models')

class AccountController {
  static async register (req, res) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        saldo: req.body.saldo
      }
      const create = await Account.create(payload)
      if (create) {
        const access_token = generateToken({
          id: create.id,
          email: create.email
        })

        res.status(201).json({
          access_token: access_token
        })
      }
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(error => {
          return error.message
        })
        res.status(400).json(errors)
      } else {
        res.status(500).json({
          msg: 'Internal Server Error'
        })
      }
    }
  }

  static async login (req, res, next) {
    try {
      const loginData = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await Account.findOne({
        where: {
          email: loginData.email
        }
      })

      if (user) {
        const matchPassword = comparePassword(loginData.password, user.password)

        if (matchPassword) {
          const access_token = generateToken({
            id: user.id,
            email: user.email
          })

          res.status(200).json({
            access_token: access_token
          })
        } else {
          throw { name: 'InvalidEmailOrPassword' }
        }
      } else {
        throw { name: 'InvalidEmailOrPassword' }
      }
    } catch (err) {
      if (err.name === 'InvalidEmailOrPassword') {
        res.status(401).json({
          msg: 'Invalid Password / Email'
        })
      } else {
        res.status(500).json({
          msg: 'Internal Server Error'
        })
      }
    }
  }

  static async profile (req, res) {
    try {
      const account = await Account.findOne({
        where: {
          id: req.userData.id
        }
      })

      res.status(200).json(account)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }
}

module.exports = AccountController
