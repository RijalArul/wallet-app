const IncomeController = require('../controllers/income')
const { authenthication } = require('../middlewares/authenthication')
const router = require('express').Router()

router.post('/', authenthication, IncomeController.addSaldo)

module.exports = router
