const User = require('../models/user')

const addUser = async(req, res) => {

    try{
        console.log(req.body);
    const name = req.body.name;
    const category = req.body.category;
    const amount = req.body.amount;

    
    const data = await User.create({name:name, category:category, amount:amount})
    res.status(201).json({userdetails:data});
    console.log(req.body);
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
}


const getUser = async(req, res) => {
    try{
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
    }catch(error){
        console.log("Get user feling", JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const deleteUser = async(req, res) => {
    try{
        console.log("hii backend");
        console.log(req.params.id);
        if(!req.params.id){
            console.log('ID is missing');
            res.status(400).json({err: "Id is missing"})
        }
    const uId = req.params.id;
    console.log("Deleting user with ID:", uId);
    await User.destroy({where:{id: uId}});
    res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.status(500).json({error: error})
    }
}

const putUser = async(req, res) => {
    try{
        const userId = req.params.id;

        const {name, category, amount} = req.body;
        //check if the user with specified ID exists or not 
        const user = await User.findOne({where: { id: userId}});

        if(!user){
            return res.status(404).json({error: "user not found"});
        }
        //update the user details 
        await User.update(
            {name, category, amount},
            {where: {id: userId}}
        );

        res.status(200).json({ messge: "user updated succesfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
}
module.exports = {
    deleteUser,
    addUser,
    getUser,
    putUser
    
}