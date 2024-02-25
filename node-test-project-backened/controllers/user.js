// const User = require('../models/user')

// const addUser = async(req, res, next) => {

//     try{
//         console.log(req.body);
//     const playername = req.body.playername;
//     const dateofbirth = req.body.dateofbirth;
//     const photourl = req.body.photourl;
//     const birthplace = req.body.birthplace;
//     const career = req.body.career;
//     const matches = req.body.matches;
//     const fifties = req.body.fifties;
//     const centuries = req.body.centuries;
//     const wickets = req.body.wickets;
//     const average = req.body.average
    

    
//     const data = await User.create({playername:playername,
//         dateofbirth:dateofbirth, photourl:photourl, birthplace:birthplace, career:career, matches:matches, fifties:fifties, centuries:centuries, wickets:wickets, average:average})
//     res.status(201).json({newUserDetail:data});
//     } catch(err){
//         console.log("sever error");
//         res.status(500).json({
//             error: err
//         })
//     }
// }

// module.exports = {
//     addUser
// }




const User = require('../models/user');

const addUser = async (req, res, next) => {
    try {
        console.log(req.body);

        const {
            itemname,
            description,
            price,
            quantity
        } = req.body;

        

        const data = await User.create({
            itemname:itemname,
            description:description,
            price:price,
            quantity:quantity

        });
        res.status(201).json({
            newUserDetail:data
        });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
const getUser = async(req, res) => {
    try{
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
    }catch(error){
        console.log("Get user feling", JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const putuser = async (req, res) => {
    const userId = req.params.id;
    const { quantity } = req.body;

    try {
        // Find the item by userId
        const item = await User.findOne({ where: { id: userId } });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Decrease the quantity
        item.quantity -= quantity;

        // Update the item in the database
        await item.save();

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    addUser,
    getUser,
    putuser
};
