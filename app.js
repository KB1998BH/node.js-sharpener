//const http = require('http');
//const routes = require('./routes');
//const { log } = require('console');
//console.log(routes.someText);
//const server = http.createServer(app); 
//server.listen(2001)


// const express = require('express');
// const bodyparser = require('body-parser');
// const app = express();
// // app.use((req, res, next) => {
// //   console.log('In the middleware')
// //   next(); // allows the continue to the next middleware in the line
// // });

// // app.use('/', (req, res, next) => {
// //   console.log('This always runs!');
// //   next();
// // })

// app.use(bodyparser.urlencoded({extended: false}));

// app.use('/add-product', (req, res, next) => {
//   //console.log('IN another middleware');
//   res.send('<form action="/product" method="POST"><input type="text" name = "title"><button type="submit">Add product</button></input></form>')
// })

// app.use('/product', (req, res, next) => {
//   console.log(req.body);
//   res.redirect('/')
// })
// app.use('/',(req, res, next) => {
//     //console.log('In the kyi middleware')
//     res.send('<h1> Hello from rxpress</h1>');
// });


// app.listen(2001)
/////////////---lec-10

const express = require('express');
const bodyparser = require('body-parser');
const app = express();


app.use(bodyparser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST">' + '<input type="text" name = "title">' +
  '<input type="text" name="size">' + '<button type="submit">Add product</button></input></form>')
})

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/')
})
app.use('/',(req, res, next) => {
    res.send('<h1> Hello from rxpress</h1>');
});

app.listen(2001)