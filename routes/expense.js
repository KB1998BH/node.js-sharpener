const express = require('express');
const router = express.Router();

const expensecontroller = require('../controllers/expense')
const userauthentication = require('../middleware/auth');

router.post('/addexpense', userauthentication.authenticate, expensecontroller.addexpense);
router.get('/getexpenses', userauthentication.authenticate, expensecontroller.getexpenses);
router.delete('/deleteexpense/:expenseid', userauthentication.authenticate, expensecontroller.deleteexpense)

module.exports = router;