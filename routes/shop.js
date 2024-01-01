// const path = require('path');

// const express = require('express');
// const router =  express.Router();
// router.get('/', (req,res,next) => {
//     res.send('<h1> Hello from express!</h1>')
// })

// // /shop/products route
// router.get('/products', (req, res, next) => {
//     res.send('<h2>Shop Products</h2>');
// });

// module.exports = router;



const path = require('path');

const express = require('express');
const rootDir = require('../util/path');
const router =  express.Router();
router.get('/', (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;