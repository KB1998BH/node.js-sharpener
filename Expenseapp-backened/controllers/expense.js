const Expense = require('../models/expense');

const addexpense = (req, res) => {
    const {expenseamount, description, category} = req.body;
    if(expenseamount == undefined || expenseamount.length === 0){
        return res.status(400).json({success:false, message: 'parameter is missing'})
    }
    Expense.create({expenseamount, description, category, userId:req.user.id}).then(expense => {
        return res.status(201).json({expense, success:true});
    }).catch(err => {
        return res.status(500).json({success:false, error:err});
    })
}

const getexpenses = (req, res) => {
      Expense.findAll( { where: {userId: req.user.id}}).then(expenses => {
        return res.status(200).json({expenses, success:true});
      })
    .catch(err =>{
        return res.status(500).json({success: false, error: err})
    })
    
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length == 0){
        res.status(400).json({success:false,})
    }
    Expense.destroy({where: { id: expenseid, userId:req.user.id}}).then(() => {
        return res.status(200).json({success:true, message: "Deleted Successfully"});
    }).catch(err => {
        console.log(err);
        return res.status(500).json({success:true, message: "failed"})
    })
}

module.exports={
    addexpense,
    getexpenses,
    deleteexpense
}