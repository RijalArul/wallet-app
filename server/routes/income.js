const IncomeController = require('../controllers/income')
const { authenthication, authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/', authenthication, IncomeController.addSaldo)
router.get('/', authenthication, IncomeController.readIncome)
router.get('/:id', authenthication, authorization, IncomeController.getIncome)
router.put(
  '/:id',
  authenthication,
  authorization,
  IncomeController.updateIncome
)
router.delete(
  '/:id',
  authenthication,
  authorization,
  IncomeController.deleteIncome
)

module.exports = router
