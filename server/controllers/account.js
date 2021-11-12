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
          userId: create.userId,
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
}

module.exports = AccountController
