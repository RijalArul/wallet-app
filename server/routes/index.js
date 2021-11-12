const router = require('express').Router()
const accountRoutes = require('./account')

router.use('/accounts', accountRoutes)

module.exports = router
