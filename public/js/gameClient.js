/**
 * Created by sasha1003 on 1/27/15.
 */
var socket = io(),
    canvasBg,
    canvasPlayer,
    ctxBg,
    ctxPlayer;


var players = [];
var totalPlayers;
var myPlayer;

window.onload = init;

function init() {
    onConnected();

    canvasBg = document.getElementById("canvasBg");
    canvasPlayer = document.getElementById("canvasPlayer");

    ctxBg = canvasBg.getContext('2d');
    ctxPlayer = canvasPlayer.getContext('2d');



    socket.emit('dataPlayerRequest');
    socket.on('dataPlayersResponse', dataPlayersResponse);
    socket.emit('newPlayer');
    socket.on('newPlayerResponse', newPlayerResponse);
    socket.on('addNewPlayer', addNewPlayer);




    ctxBg.fillStyle = '#78BD4C';
    ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height);


};



//======================================Socket=============================
function onConnected() {
    socket.connect();
    socket.on('connected', function(data){
        console.log(data);
    });
};


function dataPlayersResponse(data){
    totalPlayers = data.totalPlayers;
    console.log("totalPlayers without me = " + totalPlayers);

    for (var i = 1; i <= totalPlayers; i++){
        //players[i] = data.players[i];
        players[i] = new Player(data.players[i].id, data.players[i].name, data.players[i].srcX, data.players[i].srcY,
            data.players[i].height, data.players[i].width, ctxPlayer);
    }

    allPlayersDraw();
}


function newPlayerResponse(data){
    totalPlayers = data.totalPlayers;
    myPlayer = new Player(data.player.id, data.player.name, data.player.srcX, data.player.srcY,
        data.player.height, data.player.width, ctxPlayer);
    myPlayer.draw();
}


function addNewPlayer(data){
    totalPlayers = data.totalPlayers;
    console.log("addNewPlayer -> totalPlayers = " + totalPlayers);

    players[totalPlayers] = new Player(data.player.id, data.player.name, data.player.srcX, data.player.srcY,
        data.player.height, data.player.width, ctxPlayer);
    players[totalPlayers].draw();
}











//===================================draw================================
function allPlayersDraw(newCTX){
    clearCtx(ctxPlayer);
    for (var i = 1; i <= totalPlayers; i++){
        players[i].draw();
    }
}



function clearCtx(newCTX){
    newCTX.clearRect(0, 0, newCTX.height, newCTX.width);
}





//==============================Player=====================================
function Player(newID, newName, newX, newY, newHeight, newWidth, newCTX){
    this.id = newID;
    this.name = newName;
    this.srcX = newX;
    this.srcY = newY;
    this.height = newHeight;
    this.width = newWidth;

    this.ctx = newCTX;
    this.color = 'red';
}

Player.prototype.draw = function(){
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.srcX, this.srcY, this.width, this.height);
};





















