// const http = require('http');
// const fs = require('fs');
// const server = http.createServer((req, res) => {
// const url = req.url;
// const method = req.method;
//    if(url === '/'){
//     res.write('<html>');
//     res.write('<headd><title>Enter message</title></headd>');
//     res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
//     res.write('</html>')
//     return res.end();

//    }
//    // use redirecting request 
//    if(url === '/message' && method === 'POST'){
//     const body = [];
//     req.on('data', (chunk) => {
//         console.log(chunk);
//         body.push(chunk);
//     });
//     req.on('end', () => {
//        const parsedBody = Buffer.concat(body).toString();
//        //console.log(parsedBody);
//        const message = parsedBody.split('=')[1];
//        fs.writeFileSync('message.txt', message)
//        res.write('<html>')
//        res.write('<body><h1> message</h1></body>')
//        res.write('</html>')
//     })
//     //fs.writeFileSync('message.txt', 'DUMMY');
//     res.statusCode = 302;
//     res.setHeader('Location', '/');
//     return res.end();
//    }
//     res.setHeader('content-type', 'text/html');
//     res.write('<html>');
//     res.write('<headd><title>My First Page</title></headd>');
//     res.write('<body><h1>welcome to kris bhunia!</h1></body>')
//     res.write('</html>')
// })
// server.listen(3000)



const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // Read messages from the file
        const messages = fs.readFileSync('message.txt', 'utf8').split('\n').filter(Boolean);

        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body>');
        
        // Display existing messages at the top of the form
        
        if (messages.length > 0) {
            res.write('<h2>Messages:</h2>');
            res.write('<ul>');
            messages.forEach(message => {
                res.write(`<li>${message}</li>`);
            });
            res.write('</ul>');
        }
        

        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            // Append the new message to the file
            fs.appendFileSync('message.txt', message + '\n');

            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    } else {
        res.setHeader('content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Welcome to Kris Bhunia!</h1></body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(3000);
