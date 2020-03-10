let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};
socketApi.io = io;
let ofertas = [] ;
let ultV = 0;


io.on('connection', function (socket) {
    io.sockets.emit('ofertas', ofertas);
    socket.on("new-message", data => {
        socketApi.sendNotification(data)
    });
});

socketApi.sendNotification = data => {
    let oferta = {
        razonsocial: data,
        valor: "",
        num:0
    }
    let PB = Math.random()*(0.3 - 0.8) + 0.3
    let PO = Math.random()*(0.3 - 0.8) + 0.3
    let aceptada = ""
    if(PO>PB)
    { 
        aceptada = "[Oferta aceptada"
        if(ofertas.length ===0)
        {
            let base = 150000000 ;
            oferta.num = base;
            oferta.valor = aceptada + " valor $"+ Intl.NumberFormat("de-DE").format(base);
            ultV = oferta.valor;
        }
    
        else{
            let aleatorio = (Math.random() * (10000000-5000000) + 5000000)
            oferta.num = Math.trunc(ultV + aleatorio )    
            oferta.valor = aceptada + " valor $"+Intl.NumberFormat("de-DE").format(Math.trunc(ultV + aleatorio ) +"]");
        }
    }
    else{
        aceptada = "[Oferta no aceptada]"
        if(ofertas.length ===0)
        {
            oferta.num = 150000000;
            oferta.valor = aceptada
            ultV = oferta.num;
        }
        else{
            let aleatorio = (Math.random()*(10000000-5000000) + 5000000)
            oferta.num= Math.trunc(ultV + aleatorio )
            oferta.valor = aceptada;
        }
    } 
    
    ofertas.push(oferta);
    io.sockets.emit('ofertas', ofertas);
}




module.exports = socketApi;