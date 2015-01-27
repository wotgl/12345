/**
 * Created by sasha1003 on 1/27/15.
 */
var socket = io(),
    canvasBg,
    canvasPlayer,
    ctxBg,
    ctxPlayer;


var players = [];
var counter = 0;






function init() {
    onConnected();
    //checkPlayers();

    canvasBg = document.getElementById("canvasBg");
    canvasPlayer = document.getElementById("canvasPlayer");

    ctxBg = canvasBg.getContext('2d');
    ctxPlayer = canvasPlayer.getContext('2d');



    ctxBg.fillStyle = '#78BD4C';
    ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height);



    x = Math.random() * 100;
    y = Math.random() * 100;
    var player = new Player(x, y, ctxPlayer);
    player.draw();
    socket.emit('newPlayer', {srcX: x, srcY: y});



    //listen new players
    socket.on('newEmit', function(msg){
        console.log("add new player " + msg['srcX'] + msg['srcY']);
        counter++;
        players[counter] = new Player(msg['srcX'], msg['srcY'], ctxPlayer);
        players[counter].draw();
    })



};

function onConnected() {
    socket.connect();
    socket.on('connected', function(msg){
        console.log(msg['message']);
    });
};

function checkPlayers(){
    socket.on('checkPlayers', function(msg){

    })
}


function Player(x, y, ctx){
    this.srcX = x;
    this.srcY = y;
    this.height = 25;
    this.width = 25;

    this.ctx = ctx;
    this.color = 'red';
}

Player.prototype.draw = function(){
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.srcX, this.srcY, this.width, this.height);
};


window.onload = init;




