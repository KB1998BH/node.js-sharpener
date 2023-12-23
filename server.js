const http = require('http');
const server = http.createServer((req, res) => {
  res.end('My name is Krishnendu Bhunia!\n');
});
server.listen(3000);


