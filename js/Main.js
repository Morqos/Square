/*

--> Implementarlo inizialmente solo per 2 Players e senza suoni

MAPPA:
	800 di width - 10x2 di contorno - 10x10 di casella centrale = 680
    600 di height - 10x2 di contorno - 10x10 di casella centrale = 480

SUONI: (Implementare per ultimo)
    - Una volta passati sopra il Bottone
    - Una volta passati sopra il Teleportation
        - Una volta selezionata la freccia con la direzione
        - Una volta in rotazione e traslazione verso l'arrivo
    - Una volta entrati nella casella giusta
    - Una volta entrati nella casella sbagliata
    - Countdown prima dell'inizio (numeri non ancora stampati)
    - Vincitore



*/

var canvas, canvasContext;

var intro_song = new Audio('sounds/intro_song.mp3');
var gameplay_song = new Audio('sounds/RLD10.mp3');
var playPressed = false;
var gameStarted = false;

var redSquare = new squareClass();
var blueSquare = new squareClass();
var thereIsAWinner = false;

var arrayButtons = [];
var arrayTeleportations = [];
var arrayDoors = [];
var arrayStops = [];

var operation = new operationClass();
var resultRight = new resultClass();
var resultsWrong = []; //array of instances of wrong results



window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRect(0,0, canvas.width, canvas.height, 'black');
    colorText("Game Loading...", canvas.width/2,canvas.height/2, 'white');

    loadImages();
}

function imageLoadingDoneSoStartGame(){

    intro_song.play();

    setupInput();

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    loadLevel(levelOne);
}


function updateAll() {
    moveAll();
    drawAll();
}




function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black'); // clear screen

    drawTracks();
    drawArraysIstances();

    redSquare.draw();
    blueSquare.draw();

    if(thereIsAWinner){
        if(redSquare.score == 3) canvasContext.drawImage(redSquare.myWinningPic, 0, 0);
        else canvasContext.drawImage(blueSquare.myWinningPic, 0, 0);
        setTimeout(()=>{
            gameplay_song.pause();
            
            intro_song.currentTime = 0;
            intro_song.play();

            redSquare.score = 0;
            blueSquare.score = 0;
            thereIsAWinner = false;
            playPressed = false;
        }, 5000);
    }
    if(playPressed == false){
        canvasContext.drawImage(introPlayUnselected, 0,0);
        if(mouseOverPlay) canvasContext.drawImage(introPlaySelected, 0,0);
    }

}

function drawArraysIstances(){
    
    for(var i=0; i<arrayButtons.length; i++){
        arrayButtons[i].draw();
        arrayButtons[i].drawDoors();
    }

    // for(var i=0; i<arrayDoors.length; i++){
    //     arrayDoors[i].draw();
    // } //Used to draw all the doors to check their numbers

    for(var i=0; i<arrayTeleportations.length; i++){
        arrayTeleportations[i].draw();
    }

    for(var i=0; i<arrayStops.length; i++){
        arrayStops[i].draw();
    }

    operation.draw();

    resultRight.draw();
    for(var i=0; i<resultsWrong.length; i++){
        resultsWrong[i].draw();
    }
}


function moveAll() {
    redSquare.move();
    blueSquare.move();
}

