const jwt = require('jsonwebtoken')
const { Account, Income } = require('../models')

function authenthication (req, res, next) {
  try {
    const headers = req.headers.access_token
    const payload = jwt.verify(headers, process.env.JWT_SECRET_KEY)
    req.userData = payload
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(400).json({
        msg: err.message
      })
    } else {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }
}

async function authorization (req, res, next) {
  try {
    const income = await Income.findOne({
      where: {
        userId: req.userData.id
      }
    })

    if (income.userId === req.userData.id) {
      next()
    } else {
      throw { name: 'Forbidden_Access' }
    }
  } catch (err) {
    if (err.name === 'Forbidden_Access') {
      res.status(403).json({
        msg: 'Forbidden Access'
      })
    } else {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  }
}

module.exports = {
  authenthication,
  authorization
}
