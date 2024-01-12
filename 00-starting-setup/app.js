const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const User = require('./models/User');
var cors = require('cors');

const app = express();

app.use(cors())
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { log } = require('console');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.post('/user/add-user', async(req, res, next) => {

    try{
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number;

    const data = await User.create( {name:name, email:email, phonenumber:phonenumber})
    res.status(201).json({newUserDetail: data});
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
})

app.get('/user/get-user', async(req, res, next) => {
    const User = await User.findAll();
    res.status(200).json({allUsers: users});
})


app.use(errorController.get404);

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(4000);
})
.catch(err => {
    console.log(err);
})


