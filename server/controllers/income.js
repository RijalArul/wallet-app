const { Account, Income } = require('../models')

class IncomeController {
  static async addSaldo (req, res) {
    try {
      console.log('Income')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = IncomeController
