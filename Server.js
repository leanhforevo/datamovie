var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(process.env.PORT||8888);

app.get('/', function (req, res) {
   
    res.end('You Must add page in end of url!!');
})


