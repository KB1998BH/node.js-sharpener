
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const User = require('./models/user');
const Expense = require('./models/expense')
var cors = require('cors');

const app = express();

app.use(cors())

const userRoutes = require('./routes/user');

const userExpense = require('./routes/expense');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRoutes);
app.use('/expense', userExpense);

// app.use(errorController.get404);


sequelize
  .sync()
 
.then(result => {
    //console.log(result);
    app.listen(5510);
})
.catch(err => {
    console.log(err);
})