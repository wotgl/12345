var io,
    gameSocket;

var totalPlayers = 0;

exports.initGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });
    //gameSocket.emit('checkPlayers', {total: totalPlayers, })


    //gameSocket.on('newPlayer', newPlayer);
    gameSocket.on('newPlayer', function(msg){
        totalPlayers++;
        console.log("new player -> totalPlayers = " + totalPlayers);
        gameSocket.broadcast.emit('newEmit', msg);
    });



    gameSocket.on('disconnect', function(){
        totalPlayers--;
        console.log("player disconnected -> totalPlayers = " + totalPlayers);
    });


    /*
     io.on('connection', function(socket){
     socket.on('chat message', function(msg){
     io.emit('chat message', msg);
     });
     });
     */


}
