

 const successcontroller = require('../controllers/successit')
const express = require('express');
const router = express.Router();

// /admin add-product => GET
router.get('/success', successcontroller.getsuccess);



module.exports = router;