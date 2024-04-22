const express = require('express');
const router = express.Router();

const expensecontroller = require('../controllers/expense')


router.post('/addexpense', expensecontroller.addexpense);
router.get('/getexpenses', expensecontroller.getexpenses);
router.delete('/deleteexpense/:expenseid', expensecontroller.deleteexpense)

module.exports = router;