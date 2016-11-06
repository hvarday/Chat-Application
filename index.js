var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyparser=require('body-parser');
app.use(bodyparser());
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
    var express=require('express');
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, '../chat', 'username.html'));
});
var name="";
app.post('/',function(req,res){
    name=req.body.name;
    var password=req.body.password;
    if(name=='india' && password=='cricket'){
        res.redirect(303,'/chat');
    }
    else
    {
        res.send('Sorry username and password do not match with server username and password.\n Try again');
    }
});
app.get('/chat',function(req,res){
    var express=require('express');
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, '../chat', 'index.html'));
});
// Register events on socket connection
io.on('connection', function(socket){
    socket.on('chatMessage', function(from, msg){
        io.emit('chatMessage', from, msg);
    });
    socket.on('notifyUser', function(user){
        io.emit('notifyUser', user);
    });
});

// Listen application request on port 3000
http.listen(4500, function(){
    console.log('listening on *:3000');
});