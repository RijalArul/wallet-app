const { Account } = require('../models')

class AccountController {
  static async register (req, res) {
    try {
      console.log('ACCOUNT')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = AccountController
