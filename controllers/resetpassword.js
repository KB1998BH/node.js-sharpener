// const uuid = require('uuid');
// const sgMail = require('@sendgrid/mail');
// const bcrypt = require('bcrypt');

// const User = require('../models/user');
// const Forgotpassword = require('../models/forgotpassword');

// const forgotpassword = async(req, res) => {
//     try{
//         const {email} = req.body;
//         const user = await User.findOne({where: {email}});
//         if(user){
//             const id = uuid.v4();
//             user.createForgotpassword({id, active:true})
//             .catch(err => {
//                 throw new Error(err);
//             })
//             sgMail.setApiKey(process.env.SENGRID_API_KEY);

//             const msg ={
//                 to:email, // Change to your receipent
//                 from:'yj.rocks.2411@gmail.com', //change to your verified sender
//                 subject: 'sending with Sendgrid is Fun',
//                 text: 'and easy to do anywhere, even with Node.js',
//                 html: `<a href="http://localhost:5510/password/resetpassword/${id}"> Reset password</a>`
//             }
//             sgMail.send(msg).then((response) => {
//                 return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail', succes:true})
//                 console.log("reset success");
//             })
//             .catch((error) => {
//                 throw new Error(error);
//             })
//         }else{
//             throw new Error('user doesnt exist')
//         }
//     }catch(err){
//         return res.json({message:err, succes:false})
//     }
// }

// module.exports= {
//     forgotpassword,
// }


const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');

const forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

            sgMail.setApiKey(process.env.SENGRID_API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'krishnendubhunia0098@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            }

            sgMail
            .send(msg)
            .then((response) => {

                 //console.log(response[0].statusCode)
                 //console.log(response[0].headers)
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

            })
            .catch((error) => {
                throw new Error(error);
            })

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}

module.exports = {
    forgotpassword
};
