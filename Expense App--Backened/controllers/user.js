const User = require('../models/user')

const addUser = async(req, res) => {

    try{
        
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    
    
    const data = await User.create({name:name, email:email,  password:password})
    res.status(201).json({userdetails:data});
    console.log(req.body);
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    
    addUser
    
    
}