const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/user')


router.post('/login', usercontroller.login);
router.post('/signup', usercontroller.signup);

module.exports = router;