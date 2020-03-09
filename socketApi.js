let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};
socketApi.io = io;

var static = require('node-static');
var http = require('http');
var file = new(static.Server)();

var app = http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8001);

var io = require('socket.io').listen(app);

var empresas = ''; 

io.on('connection', function (socket) {
    io.sockets.emit('empresa', empresas);

    socket.on("new-message", data => {
        socketApi.sendNotification(data)
    });
});

socketApi.sendNotification = data => {
    empresas = data ;
    io.sockets.emit('empresa', empresas);
}

socketApi.getEmpresas = data => {
    return empresas;
};

module.exports = socketApi;