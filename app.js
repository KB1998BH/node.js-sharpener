//const http = require('http');
//const routes = require('./routes');
//const { log } = require('console');
//console.log(routes.someText);
//const server = http.createServer(app); 
//server.listen(2001)


const express = require('express');
const app = express();
app.use((req, res, next) => {
  console.log('In the middleware')
  next();
});

app.use((req, res, next) => {
    console.log('In the kyi middleware')
    res.send('<h1> Hello from rxpress</h1>');
  });


app.listen(2001)