const { Account, Income } = require('../models')

class IncomeController {
  static async addSaldo (req, res) {
    try {
      const payload = {
        name: req.body.name,
        amount: req.body.amount,
        userId: req.userData.id
      }
      const income = await Income.create(payload)

      if (income) {
        const account = await Account.findOne({
          id: req.userData.id
        })

        const update = {
          saldo: account.saldo + income.amount
        }

        const updateSaldo = await Account.update(update, {
          where: {
            id: account.id
          },
          returning: true
        })

        res.status(201).json({
          user: updateSaldo[1][0],
          income: income
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

module.exports = IncomeController
