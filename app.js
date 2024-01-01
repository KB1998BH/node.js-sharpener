
//////---------project-group chat app
// const express = require('express');
// const fs = require("fs");
// const bodyparser = require('body-parser');
// const app = express();


// app.use(bodyparser.urlencoded());

// app.get("/", (req, res) => {
//   fs.readFile('username.txt', (err, data) => {
//     if(err){
//       console.log(err);
//       data = 'No chat exists'
//     }
//   res.send(
//     `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localstorage.getItem('username')">
//       <input type="text" name="message" id="message">
//       <input type="hidden" name="usrname" id="username">
//       <br/>
//       <button type="submit">send</button>
//     </form>
//     `
//   );
//   });
// });

// app.post("/", (req, res) => {
//   console.log(req.body.username);
//   console.log(req.body.message);

//   fs.writeFile("username.txt", `${req.body.username}:${req.body.message}`,{flag:'a'},(err) =>
//        err ? console.log(err) : res.redirect("/")
//   );
// })

// app.get("/login", (req, res) => {
  
//     res.send(
//       `${data}<form action="/login" method="POST" onSubmit="localstorage.setItem('username', document.getElementById('username').value)">
//         <input type="text" name="username" id="username">
//         <input type="hidden" name="usrname" id="username">
//         <br/>
//         <button type="submit">send</button>
//       </form>
//       `
//     );
  
// });

// app.listen(7000)






// const path = require('path');
// const express = require('express');
// const bodyparser = require('body-parser');
// const app = express();
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const contactus = require('./routes/contactus');
// const success = require('./routes/success');

// app.use(bodyparser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin',adminRoutes);
// app.use(shopRoutes);
// app.use(contactus)
// app.use(success);

// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })
// app.listen(2001)



const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorcontroller = require('./controllers/error')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusRoutes = require('./routes/contactus');
const successRoutes = require('./routes/success')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactusRoutes);
app.use(successRoutes)

app.use(errorcontroller.get404);

app.listen(5000);