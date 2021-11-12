const AccountController = require('../controllers/account')
const { authenthication } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/register', AccountController.register)
router.post('/login', AccountController.login)
router.get('/profile', authenthication, AccountController.profile)

module.exports = router
