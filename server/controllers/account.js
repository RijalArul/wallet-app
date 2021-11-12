const { Account } = require('../models')

class AccountController {
  static async register (req, res) {
    try {
      const { email, password, saldo } = req.body

      const create = await Account.create(email, password, saldo)
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
