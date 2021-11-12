const AccountController = require('../controllers/account')

const router = require('express').Router()

router.post('/register', AccountController.register)

module.exports = router
