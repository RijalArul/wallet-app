const AccountController = require('../controllers/account')

const router = require('express').Router()

router.post('/register', AccountController.register)
router.post('/login', AccountController.login)

module.exports = router
