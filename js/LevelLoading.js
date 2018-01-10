
var resultRightActivated = false;
var nResults;

var countDoors = 0;


function loadLevel(whichLevel){

    switchResults(whichLevel);
    loadArraysInstances(whichLevel); // Here I calculate operation

    trackGrid = whichLevel.slice();
    
    redSquare.reset(redSquarePic, redWinningPic, "red");
    blueSquare.reset(blueSquarePic, blueWinningPic, "blue");

    resultRight.reset(operation.result, true); // Here I calculate results
    for(var i=0; i<resultsWrong.length; i++){
        resultsWrong[i].reset(operation.result, false);
    }
    
    switchSetLevel(whichLevel);

    for(var i=0; i<arrayButtons.length; i++){
        arrayButtons[i].openCloseDoors();
    }
    
}

function switchResults(whichLevel){
    switch(whichLevel){
        case levelOne:
            nResults = 2;
            break;
        default:
            break;
    }
}


function loadArraysInstances(whichLevel){
    var arrayIndex = 0;
    var coordX = 0;
    var coordY = 0;

    for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++){
        for(var eachCol=0;eachCol<TRACK_COLS;eachCol++){

            var titleKindHere = whichLevel[arrayIndex];

            switchTracks(titleKindHere, coordX,coordY);
            
            coordX += TRACK_SIDE;
            arrayIndex++;
        }
        coordY += TRACK_SIDE;
        coordX = 0;
    } // end of for each track
}



function switchTracks(titleKindHere, coordX,coordY){
    switch(titleKindHere){

        case TRACK_BUTTON:
            arrayButtons.push(new buttonClass(coordX, coordY));
            break;

        case TRACK_TELEPORTATION:
            arrayTeleportations.push(new teleportationClass(coordX, coordY));
            break;

        case TRACK_DOOR_HORIZONTAL:
            arrayDoors.push(new doorClass(coordX, coordY, TRACK_DOOR_HORIZONTAL, countDoors));
            countDoors++;
            break;

        case TRACK_DOOR_VERTICAL:
            arrayDoors.push(new doorClass(coordX, coordY, TRACK_DOOR_VERTICAL, countDoors));
            countDoors++;
            break;

        case TRACK_OPERATION:
            operation.reset(coordX, coordY);
            break;

        case TRACK_RESULT:
            // setCoordinate results
            setCoordinateResults(coordX, coordY);
            break;

        case TRACK_STOP_OTHER:
            // setCoordinate results
            arrayStops.push(new stopClass(coordX, coordY));
            break;
            
        default:
            break;
    }
}

function setCoordinateResults(coordX, coordY){

    if(nResults == 1 && resultRightActivated == false){
        resultRight.setCoordinates(coordX, coordY);
        resultRightActivated = true;
        nResults--;
    } else {
        if(resultRightActivated == true){
            resultsWrong.push(new resultClass());
            resultsWrong[resultsWrong.length-1].setCoordinates(coordX, coordY);
        } else {
            if(Math.random() < 0.5){
                resultsWrong.push(new resultClass());
                resultsWrong[resultsWrong.length-1].setCoordinates(coordX, coordY);
            } else {
                resultRight.setCoordinates(coordX, coordY);
                resultRightActivated = true;
            }
        }
        nResults--;
    }

}



function switchSetLevel(whichLevel){
    switch(whichLevel){
        case levelOne:
            setLevelOne();
            break;
        default:
            break;
    }
}


function setLevelOne(){

    redSquare.drawScoreX = 375;
    redSquare.drawScoreY = 330;
    
    blueSquare.drawScoreX = 425;
    blueSquare.drawScoreY = 330;

    var indexesResultOne = [127, 443, 445, 447];
    var indexesResultTwo = [4271, 4273, 4275, 4591];

    if(resultRight.x == 430){
        resultRight.setIndexes(indexesResultOne);
        resultsWrong[0].setIndexes(indexesResultTwo);
    } else {
        resultRight.setIndexes(indexesResultTwo);
        resultsWrong[0].setIndexes(indexesResultOne);
    }


    // Setting stops
    for(var i=0; i<arrayStops.length; i++){
        arrayStops[i].wherePutOtherX = 370;
        arrayStops[i].wherePutOtherY = 270;
        arrayStops[i].time = 5000;
    }

    // Setting Teleportations
    arrayTeleportations[0].setDestination(arrayTeleportations[2].x-redSquare.side, arrayTeleportations[2].y);
    arrayTeleportations[2].setDestination(arrayTeleportations[3].x, arrayTeleportations[3].y-redSquare.side);
    arrayTeleportations[3].setDestination(arrayTeleportations[1].x+redSquare.side, arrayTeleportations[1].y);
    arrayTeleportations[1].setDestination(arrayTeleportations[0].x, arrayTeleportations[0].y+redSquare.side);

    // Setting Buttons with their doors
    arrayButtons[0].doorsActiveAtStart = [
        arrayDoors[8],
        arrayDoors[9],
        arrayDoors[12],
        arrayDoors[13],

        arrayDoors[16],
        arrayDoors[17],
        arrayDoors[20],
        arrayDoors[21]
    ];
    arrayButtons[0].doorsNotActiveAtStart = [
        arrayDoors[0],
        arrayDoors[1],
        arrayDoors[4],
        arrayDoors[5],

        arrayDoors[24],
        arrayDoors[25],
        arrayDoors[34],
        arrayDoors[35]
    ];

    arrayButtons[2].doorsActiveAtStart = arrayButtons[0].doorsActiveAtStart;
    arrayButtons[2].doorsNotActiveAtStart = arrayButtons[0].doorsNotActiveAtStart;
    arrayButtons[0].buttonsAssociated.push(arrayButtons[2]);
    arrayButtons[2].buttonsAssociated.push(arrayButtons[0]);

    arrayButtons[1].doorsActiveAtStart = [
        arrayDoors[10],
        arrayDoors[11],
        arrayDoors[14],
        arrayDoors[15],

        arrayDoors[18],
        arrayDoors[19],
        arrayDoors[22],
        arrayDoors[23]
    ];
    arrayButtons[1].doorsNotActiveAtStart = [
        arrayDoors[2],
        arrayDoors[3],
        arrayDoors[6],
        arrayDoors[7],

        arrayDoors[32],
        arrayDoors[33],
        arrayDoors[42],
        arrayDoors[43]
    ];

    arrayButtons[3].doorsActiveAtStart = arrayButtons[1].doorsActiveAtStart;
    arrayButtons[3].doorsNotActiveAtStart = arrayButtons[1].doorsNotActiveAtStart;
    arrayButtons[1].buttonsAssociated.push(arrayButtons[3]);
    arrayButtons[3].buttonsAssociated.push(arrayButtons[1]);


    
    arrayButtons[4].doorsNotActiveAtStart = [
        arrayDoors[44],
        arrayDoors[45],
        arrayDoors[48],
        arrayDoors[49],

        arrayDoors[52],
        arrayDoors[53],
        arrayDoors[56],
        arrayDoors[57]
    ]; // No Doors ActiveAtStart, No Buttons Associated


    arrayButtons[5].doorsActiveAtStart = [
        arrayDoors[26],
        arrayDoors[27],
        arrayDoors[28],
        arrayDoors[29],
        arrayDoors[30],
        arrayDoors[31],

        arrayDoors[36],
        arrayDoors[37],
        arrayDoors[38],
        arrayDoors[39],
        arrayDoors[40],
        arrayDoors[41],
    ];
    arrayButtons[5].doorsNotActiveAtStart = [
        arrayDoors[46],
        arrayDoors[47],
        arrayDoors[50],
        arrayDoors[51],

        arrayDoors[54],
        arrayDoors[55],
        arrayDoors[58],
        arrayDoors[59]
    ]; // No Buttons Associated


    arrayButtons[6].doorsActiveAtStart = [
        arrayDoors[78],
        arrayDoors[79],
        arrayDoors[80],
        arrayDoors[81],
        arrayDoors[82],
        arrayDoors[83],

        arrayDoors[88],
        arrayDoors[89],
        arrayDoors[90],
        arrayDoors[91],
        arrayDoors[92],
        arrayDoors[93],
    ];
    arrayButtons[6].doorsNotActiveAtStart = [
        arrayDoors[60],
        arrayDoors[61],
        arrayDoors[64],
        arrayDoors[65],

        arrayDoors[68],
        arrayDoors[69],
        arrayDoors[72],
        arrayDoors[73]
    ]; // No Buttons Associated

    
    arrayButtons[7].doorsNotActiveAtStart = [
        arrayDoors[62],
        arrayDoors[63],
        arrayDoors[66],
        arrayDoors[67],

        arrayDoors[70],
        arrayDoors[71],
        arrayDoors[74],
        arrayDoors[75]
    ]; // No Doors ActiveAtStart, No Buttons Associated
    

    arrayButtons[8].doorsActiveAtStart = [
        arrayDoors[96],
        arrayDoors[97],
        arrayDoors[100],
        arrayDoors[101],

        arrayDoors[104],
        arrayDoors[105],
        arrayDoors[108],
        arrayDoors[109],
    ];
    arrayButtons[8].doorsNotActiveAtStart = [
        arrayDoors[76],
        arrayDoors[77],
        arrayDoors[86],
        arrayDoors[87],

        arrayDoors[112],
        arrayDoors[113],
        arrayDoors[116],
        arrayDoors[117]
    ];
    
    arrayButtons[10].doorsActiveAtStart = arrayButtons[8].doorsActiveAtStart;
    arrayButtons[10].doorsNotActiveAtStart = arrayButtons[8].doorsNotActiveAtStart;
    arrayButtons[10].buttonsAssociated.push(arrayButtons[8]);
    arrayButtons[8].buttonsAssociated.push(arrayButtons[10]);


    arrayButtons[9].doorsActiveAtStart = [
        arrayDoors[98],
        arrayDoors[99],
        arrayDoors[102],
        arrayDoors[103],

        arrayDoors[106],
        arrayDoors[107],
        arrayDoors[110],
        arrayDoors[111]
    ];
    arrayButtons[9].doorsNotActiveAtStart = [
        arrayDoors[84],
        arrayDoors[85],
        arrayDoors[94],
        arrayDoors[95],

        arrayDoors[114],
        arrayDoors[115],
        arrayDoors[118],
        arrayDoors[119]
    ];
    
    arrayButtons[11].doorsActiveAtStart = arrayButtons[9].doorsActiveAtStart;
    arrayButtons[11].doorsNotActiveAtStart = arrayButtons[9].doorsNotActiveAtStart;
    arrayButtons[11].buttonsAssociated.push(arrayButtons[9]);
    arrayButtons[9].buttonsAssociated.push(arrayButtons[11]);

    
}
