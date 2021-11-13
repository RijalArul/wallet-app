const router = require('express').Router()
const accountRoutes = require('./account')
const incomeRoutes = require('./income')
const expendRoutes = require('./expend')

router.use('/accounts', accountRoutes)
router.use('/incomes', incomeRoutes)
router.use('/expends', expendRoutes)

module.exports = router
