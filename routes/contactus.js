

const express = require('express');

const contactcontroller = require('../controllers/usercontact')
const router = express.Router();

// /admin add-product => GET
router.get('/contactus', contactcontroller.getcontact);

// /admin/ add-product => POST
router.post('/contactus', contactcontroller.postcontact);

module.exports = router;