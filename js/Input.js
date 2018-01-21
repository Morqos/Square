
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;

var mouseX = 0;
var mouseY = 0;

var mouseOverPlay = false;


function setupInput(){
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    canvas.addEventListener('mousemove', updateMousePos);
    canvas.addEventListener('mousedown', clickHandle);

    redSquare.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    blueSquare.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}


function keySet(keyEvent, whichSquare, setTo) {
    if (keyEvent.keyCode == whichSquare.controlKeyLeft) {
        whichSquare.keyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichSquare.controlKeyRight) {
        whichSquare.keyHeld_TurnRight = setTo;
    }
    if (keyEvent.keyCode == whichSquare.controlKeyUp) {
        whichSquare.keyHeld_Gas = setTo;
    }
    if (keyEvent.keyCode == whichSquare.controlKeyDown) {
        whichSquare.keyHeld_Reverse = setTo;
    }
}


function keyPressed(evt) {
    keySet(evt, redSquare, true);
    keySet(evt, blueSquare, true);
    evt.preventDefault();
}

function keyReleased(evt) {
    keySet(evt, redSquare, false);
    if(evt.keyCode == KEY_LEFT_ARROW || evt.keyCode == KEY_UP_ARROW ||
        evt.keyCode == KEY_RIGHT_ARROW || evt.keyCode == KEY_DOWN_ARROW){
            redSquare.checkNotReleased = true;
    }

    keySet(evt, blueSquare, false);
    if(evt.keyCode == KEY_A || evt.keyCode == KEY_W ||
        evt.keyCode == KEY_D || evt.keyCode == KEY_S){
            blueSquare.checkNotReleased = true;
    }
    evt.preventDefault();
}


function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;

    if(mouseX > 250 && mouseX < 550 &&
    mouseY > 300 && mouseY < 500 &&
    playPressed == false){
        mouseOverPlay = true;
    } else {
        mouseOverPlay = false;
    }
}

function clickHandle(evt){
    if(mouseOverPlay){
        intro_song.pause();
        gameplay_song.currentTime = 0;
        gameplay_song.play();
        gameplay_song.onended = function() {
            gameplay_song.play();
        };

        playPressed = true;
        resetForNewMatch();
    }
}
