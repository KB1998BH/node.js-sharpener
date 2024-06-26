const User = require('../models/user');
const bcrypt = require('bcrypt');
const { name } = require('ejs');

const jwt = require('jsonwebtoken')

function isstringinvalid(string){
    if(string == undefined || string === 0){
        return true;
    }else{
        return false;
    }
}
const signup = async(req, res) => {

    try{
        const {name, email, password} = req.body;
        console.log('email', email);
        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({err: "Bad parameter, Something is missing"})
        }

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err, hash) => {
            console.log(err);
            await User.create({name, email, password:hash,})
            res.status(201).json({message: "Successfully create new User"})
        })
       
    }catch(err){
        res.status(500).json(err);
    }
}

function generateAccessToken(id, name, ispremiumuser){
    return jwt.sign({userId:id, name:name, ispremiumuser},'secretkey')
}


const login = async(req, res) => {

    try{
    const {email, password} = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'Email id or password is missing', success:false})
    }
    console.log(password);
   const user = await User.findAll({where: {email}})
        if(user.length >0 ){
            bcrypt.compare(password, user[0].password, (err, result) =>{

                if(err){
                    throw new Error('something went wrong');
                }
                if(result === true){
                    res.status(200).json({success: true, message: "User logged in successfully", token:generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)});
                }
                else{
                return res.status(400).json({success: false, message: 'password is incorrect'})
                }
            })
              
        }else{
            return res.status(404).json({success:false, message: 'user Doesnt exist'})
        }
    }catch(err) {
        res.status(500).json({message: err, success: false})
    }
 
}

module.exports = {
    signup,
    login,
    generateAccessToken
}