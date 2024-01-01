const express = require('express');
const fs = require("fs");
const bodyparser = require('body-parser');
const app = express();


app.use(bodyparser.urlencoded());

app.get("/", (req, res) => {
  fs.readFile('username.txt', (err, data) => {
    if(err){
      console.log(err);
      data = 'No chat exists'
    }
  res.send(
    `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localstorage.getItem('username')">
      <input type="text" name="message" id="message">
      <input type="hidden" name="usrname" id="username">
      <br/>
      <button type="submit">send</button>
    </form>
    `
  );
  });
});

app.post("/", (req, res) => {
  console.log(req.body.username);
  console.log(req.body.message);

  fs.writeFile("username.txt", `${req.body.username}:${req.body.message}`,{flag:'a'},(err) =>
       err ? console.log(err) : res.redirect("/")
  );
})

app.get("/login", (req, res) => {
  
    res.send(
      `${data}<form action="/login" method="POST" onSubmit="localstorage.setItem('username', document.getElementById('username').value)">
        <input type="text" name="username" id="username">
        <input type="hidden" name="usrname" id="username">
        <br/>
        <button type="submit">send</button>
      </form>
      `
    );
  
});

app.listen(7000)