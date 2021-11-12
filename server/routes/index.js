const router = require('express').Router()
const accountRoutes = require('./account')
const incomeRoutes = require('./income')

router.use('/accounts', accountRoutes)
router.use('/incomes', incomeRoutes)

module.exports = router
