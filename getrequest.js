
const http = require('http')
const server = http.createServer((req, res) => {
res.setHeader('content-type', 'text/html');
const url = req.url;
if(url === '/home'){
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>welcome home</h1></body>')
    res.write('</html>')
}else if (url === '/about'){
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>welcome to about us page</h1></body>')
    res.write('</html>')
}else if(url === '/node'){
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>welcome to My Node js project!</h1></body>')
    res.write('</html>')
}else{
    res.write('<html>');
    res.write('<headd><title>My First Page</title></headd>');
    res.write('<body><h1>welcome to kris bhunia!</h1></body>')
    res.write('</html>')
}

})
server.listen(3000)