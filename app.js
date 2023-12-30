
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