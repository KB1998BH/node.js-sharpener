const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/user')


router.post('/add-user', usercontroller.addUser)

router.delete('/delete-user/:id', usercontroller.deleteUser)

router.get('/get-user', usercontroller.getUser)

router.put('/put-user/:id', usercontroller.putUser)

module.exports = router;