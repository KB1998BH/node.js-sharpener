const User = require('../models/user')

const addUser = async(req, res) => {

    try{
        console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    
    const data = await User.create({name:name, email:email, phonenumber:phonenumber})
    res.status(201).json({newUserDetail:data});
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
        res.status(500).json({error:error})
    }
}

const putUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phonenumber } = req.body;
        // Check if the user with the specified ID exists
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user details
        await User.update(
            { name, email, phonenumber },
            { where: { id: userId } }
        );

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    deleteUser,
    addUser,
    getUser,
    putUser
    
}