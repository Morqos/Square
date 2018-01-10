
function squareTrackHandling(whichSquare){
    var squareTrackColTop = Math.floor(whichSquare.x / TRACK_SIDE);
    var squareTrackRowTop = Math.floor(whichSquare.y / TRACK_SIDE);

    var squareTrackColBottom = Math.floor((whichSquare.x+TRACK_SIDE) / TRACK_SIDE);
    var squareTrackRowBottom = Math.floor((whichSquare.y+TRACK_SIDE) / TRACK_SIDE);

    var tileTopLeft = returnTileTypeAtColRow(squareTrackColTop, squareTrackRowTop);
    var tileBottomRight = returnTileTypeAtColRow(squareTrackColBottom, squareTrackRowBottom);
    
    if(tileTopLeft == TRACK_WALL || tileBottomRight == TRACK_WALL ||
        tileTopLeft == TRACK_DOOR_HORIZONTAL || tileBottomRight == TRACK_DOOR_HORIZONTAL ||
        tileTopLeft == TRACK_DOOR_VERTICAL || tileBottomRight == TRACK_DOOR_VERTICAL){
        if (whichSquare.keyHeld_TurnLeft) {
            whichSquare.x += whichSquare.side;
        }
        if (whichSquare.keyHeld_TurnRight) {
            whichSquare.x -= whichSquare.side;
        }
        if (whichSquare.keyHeld_Gas) {
            whichSquare.y += whichSquare.side;
        }
        if (whichSquare.keyHeld_Reverse) {
            whichSquare.y -= whichSquare.side;
        }
    } // end of track found

} // end of function



function squareResultHandling(whichSquare){
    
    var squareTrackColTop = Math.floor(whichSquare.x / TRACK_SIDE);
    var squareTrackRowTop = Math.floor(whichSquare.y / TRACK_SIDE);

    var squareIndexUnderCoord = rowColToArrayIndex(squareTrackColTop, squareTrackRowTop);

    for(var i=0; i<resultRight.indexes.length; i++){
        if(squareIndexUnderCoord == resultRight.indexes[i]){
            whichSquare.score += 1;
            if(whichSquare.score == 3){
                resetForNewMatch();
                thereIsAWinner = true;
            } else {
                resetForNewOperation();
            }
            return;
        }
    }
    
    for(var i=0; i<resultsWrong.length; i++){
        for(var j=0; j<resultsWrong[i].indexes.length; j++){
            if(squareIndexUnderCoord == resultsWrong[i].indexes[j]){
                whichSquare.score -= 1;
                resetForNewOperation();
                return;
            }
        }
    }

}

function resetForNewMatch(){
    for(var i=0; i<arrayButtons.length; i++){
        arrayButtons[i].doorsToDraw = 0;
    }
    resetForNewOperation();
}

function resetForNewOperation(){

    redSquare.respawn();
    blueSquare.respawn();

    operation.calculateOperation();

    newResultRightFromWrongs = Math.floor(Math.random()*(resultsWrong.length+1));

    if(newResultRightFromWrongs == resultsWrong.length){
        resetResults();
    } else {
        var rightCoordX = resultRight.x;
        var rightCoordY = resultRight.y;

        resultRight.setCoordinates(resultsWrong[newResultRightFromWrongs].x, resultsWrong[newResultRightFromWrongs].y);
        resultsWrong[newResultRightFromWrongs].setCoordinates(rightCoordX, rightCoordY);

        var resultRightIndexes = resultRight.indexes.slice();
        
        resultRight.indexes = resultsWrong[newResultRightFromWrongs].indexes.slice();
        resultsWrong[newResultRightFromWrongs].indexes = resultRightIndexes;

        resetResults();
    }
}

function resetResults(){
    resultRight.reset(operation.result, true);
    for(var i=0; i<resultsWrong.length; i++){
        resultsWrong[i].reset(operation.result, false);
    }
}



function squareTeleportationHandling(whichSquare){
    
    for(var i=0; i<arrayTeleportations.length; i++){
        if(whichSquare.x == arrayTeleportations[i].x && whichSquare.y == arrayTeleportations[i].y){
            whichSquare.x = arrayTeleportations[i].destinationX;
            whichSquare.y = arrayTeleportations[i].destinationY;
        }
    }

}



function squareButtonHandling(whichSquare){
    
    for(var i=0; i<arrayButtons.length; i++){
        if(whichSquare.x == arrayButtons[i].x && whichSquare.y == arrayButtons[i].y){ // If I'm over the button
            if(arrayButtons[i].released){
                arrayButtons[i].switchDoors = !(arrayButtons[i].switchDoors);
                arrayButtons[i].openCloseDoors();
            }
            arrayButtons[i].released = false;
            arrayButtons[i].applyToButtonsAssociated();
        } else { // If I'm not over the button
            if(whichSquare == redSquare){
                if(blueSquare.x != arrayButtons[i].x || blueSquare.y != arrayButtons[i].y){ // If the other button is not pressed
                    arrayButtons[i].released = true;
                    arrayButtons[i].applyToButtonsAssociated();
                }
            }
            if(whichSquare == blueSquare){
                if(redSquare.x != arrayButtons[i].x || redSquare.y != arrayButtons[i].y){ // If the other button is not pressed
                    arrayButtons[i].released = true;
                    arrayButtons[i].applyToButtonsAssociated();
                }
            }
        }
    }

}



function squareStopHandling(whichSquare){
    for(var i=0; i<arrayStops.length; i++){
        if(whichSquare.x == arrayStops[i].x && whichSquare.y == arrayStops[i].y){ // If I'm over the stop
            if(whichSquare == redSquare) arrayStops[i].stopOther(blueSquare);
            if(whichSquare == blueSquare) arrayStops[i].stopOther(redSquare);
        }
    }
}
