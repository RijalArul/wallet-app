const IncomeController = require('../controllers/income')
const { authenthication, authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/', authenthication, IncomeController.addSaldo)
router.put(
  '/:id',
  authenthication,
  authorization,
  IncomeController.updateIncome
)

module.exports = router
