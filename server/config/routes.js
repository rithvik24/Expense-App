const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../app/middlewares/authentication')

const usersController = require('../app/controllers/usersController')
const categoriesController = require('../app/controllers/categoriesController')
const expensesController = require('../app/controllers/expensesController')
const budgetsController = require('../app/controllers/budgetsController')

router.post('/api/users/register',usersController.register)
router.post('/api/users/login',usersController.login)
router.get('/api/users/account', authenticateUser, usersController.account)

router.post('/api/budgets', authenticateUser, budgetsController.create)
router.get('/api/budgets/:id', authenticateUser, budgetsController.show)
router.put('/api/budgets/:id', authenticateUser, budgetsController.update)

router.get('/api/categories',authenticateUser, categoriesController.list)
router.post('/api/categories',authenticateUser, categoriesController.create)
router.get('/api/categories/:id',authenticateUser, categoriesController.show)
router.put('/api/categories/:id',authenticateUser, categoriesController.update)
router.delete('/api/categories/:id',authenticateUser, categoriesController.destroy)

router.get('/api/expenses', authenticateUser, expensesController.list)
router.get('/api/expenses/deleted', authenticateUser, expensesController.listDeleted)
router.post('/api/expenses', authenticateUser, expensesController.create)
router.get('/api/expenses/:id', authenticateUser, expensesController.show)
router.put('/api/expenses/:id', authenticateUser, expensesController.update)
router.put('/api/expenses/remove/:id', authenticateUser, expensesController.remove)
router.put('/api/expenses/restore/:id', authenticateUser, expensesController.restore)

module.exports = router