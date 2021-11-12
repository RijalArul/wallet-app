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
          saldo: account.saldo + Number(payload.amount)
        }
        const updatedSaldo = await Account.update(update, {
          where: {
            id: account.id
          },
          returning: true
        })

        res.status(201).json({
          user: updatedSaldo[1][0],
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

  static async updateIncome (req, res) {
    try {
      const payload = {
        name: req.body.name,
        amount: +req.body.amount,
        userId: req.userData.id
      }

      const account = await Account.findOne({
        where: {
          id: req.userData.id
        }
      })

      const income = await Income.findOne({
        where: {
          id: req.params.id
        }
      })
      let total = 0
      let totalIncome = 0

      if (income.amount > payload.amount) {
        totalIncome = income.amount - payload.amount
        total = account.saldo - totalIncome
      } else if (income.amount < payload.amount) {
        totalIncome = payload.amount - income.amount
        total = account.saldo + totalIncome
      }

      const updatedSaldo = {
        saldo: total
      }

      const updateIncome = await Income.update(payload, {
        where: {
          id: req.params.id
        },
        returning: true
      })

      const updateAccount = await Account.update(updatedSaldo, {
        where: {
          id: req.userData.id
        },
        returning: true
      })

      res.status(200).json({
        income: updateIncome[1][0],
        account: updateAccount[1][0]
      })
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }
}

module.exports = IncomeController
