const ExpendController = require('../controllers/expend')
const { authenthication, authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/', authenthication, ExpendController.createExpend)
router.get('/', authenthication, ExpendController.readExpend)
router.get('/:id', authenthication, authorization, ExpendController.getExpend)
router.put(
  '/:id',
  authenthication,
  authorization,
  ExpendController.updateExpend
)
router.delete(
  '/:id',
  authenthication,
  authorization,
  ExpendController.deleteExpend
)

module.exports = router
