const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');


const sequelize = require('./util/database')
const User = require('./models/user');
var cors = require('cors');


const app = express();
app.use(cors())


const userRoutes = require('./routes/user')
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRoutes)



sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(5503);
})
.catch(err => {
    console.log(err);
})






