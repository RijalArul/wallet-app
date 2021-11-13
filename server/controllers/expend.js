const { Account, Expend } = require('../models')

class ExpendController {
  static async createExpend (req, res) {
    try {
      const payload = {
        name: req.body.name,
        amount: req.body.amount,
        userId: req.userData.id
      }

      const expend = await Expend.create(payload)
      if (expend) {
        const account = await Account.findOne({
          where: {
            id: req.userData.id
          }
        })
        const decreaseSaldo = {
          saldo: account.saldo - payload.amount
        }

        const updateAccount = await Account.update(decreaseSaldo, {
          where: {
            id: req.userData.id
          },
          returning: true
        })

        res.status(201).json({
          user: updateAccount[1][0],
          expend: expend
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

  static async readExpend (req, res) {
    try {
      const expense = await Expend.findAll({
        where: {
          userId: req.userData.id
        }
      })

      res.status(200).json(expense)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }

  static async getExpend (req, res) {
    try {
      const expend = await Expend.findOne({
        where: {
          id: req.params.id
        }
      })

      if (expend) {
        res.status(200).json(expend)
      } else {
        throw { name: 'Expend_Not_Found' }
      }
    } catch (err) {
      if (err.name === 'Expend_Not_Found') {
        res.status(404).json({
          msg: 'Expend Not Found'
        })
      } else {
        res.status(500).json({
          msg: 'Internal Server Error'
        })
      }
    }
  }

  static async updateExpend (req, res) {
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

      const expend = await Expend.findOne({
        where: {
          id: req.params.id
        }
      })
      let total = 0
      let totalExpend = 0

      if (expend.amount > payload.amount) {
        totalExpend = expend.amount - payload.amount
        total = account.saldo - totalExpend
      } else if (expend.amount < payload.amount) {
        totalExpend = payload.amount - expend.amount
        total = account.saldo + totalExpend
      } else {
        total = account.saldo
      }

      const updatedSaldo = {
        saldo: total
      }

      const updateExpend = await Expend.update(payload, {
        where: {
          id: expend.id
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
        expend: updateExpend[1][0],
        account: updateAccount[1][0]
      })
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }

  static async deleteExpend (req, res) {
    try {
      const expend = await Expend.findOne({
        where: {
          id: req.params.id
        }
      })

      if (expend) {
        const account = await Account.findOne({
          where: {
            id: req.userData.id
          }
        })
        const saldo = {
          saldo: account.saldo - expend.amount
        }

        await Expend.destroy({
          where: {
            id: expend.id
          }
        })

        const decreaseSaldo = await Account.update(saldo, {
          where: {
            id: req.userData.id
          },
          returning: true
        })

        res.status(200).json(decreaseSaldo[1][0])
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ExpendController
