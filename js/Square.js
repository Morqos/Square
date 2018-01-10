

function squareClass(){

    this.spawnX = 0;
    this.spawnY = 0;

    this.x = 0;
    this.y = 0;
    this.side = 20;
    this.mySquarePic;
    this.myWinningImage;
    this.myColor;
    
    this.stop = false;
    this.score = 0;
    this.drawScoreX = 0;
    this.drawScoreY = 0;

    this.checkNotReleased = true;

    this.keyHeld_TurnRight = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_Gas = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;


    this.setupInput = function(upKey, rightKey, downKey, leftKey){
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }


    this.respawn = function(){
        this.x = this.spawnX;
        this.y = this.spawnY;
    }

    this.reset = function(whichSquareImage,whichWinningImage, whichColor){
        
        this.mySquarePic = whichSquareImage;
        this.myWinningPic = whichWinningImage;
        this.myColor = whichColor;
        for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++){
            for(var eachCol=0;eachCol<TRACK_COLS;eachCol++){
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if(trackGrid[arrayIndex] == TRACK_SQUARE_START){
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.x = eachCol * TRACK_SIDE;
                    this.y = eachRow * TRACK_SIDE;
                    this.spawnX = this.x;
                    this.spawnY = this.y;
                    return;
                }
            }
        }

    }



    this.move = function(){
        if(this.stop == false){
            if (this.checkNotReleased == true) {
                if (this.keyHeld_TurnLeft) {
                    this.x -= this.side;
                    this.checkNotReleased = false;
                }
                if (this.keyHeld_TurnRight) {
                    this.x += this.side;
                    this.checkNotReleased = false;
                }
                if (this.keyHeld_Gas) {
                    this.y -= this.side;
                    this.checkNotReleased = false;
                }
                if (this.keyHeld_Reverse) {
                    this.y += this.side;
                    this.checkNotReleased = false;
                }
            }

            squareTrackHandling(this);
            squareResultHandling(this);
            squareTeleportationHandling(this);
            squareButtonHandling(this);
            squareStopHandling(this);
        }
    }


    this.draw = function(){
        canvasContext.drawImage(this.mySquarePic, this.x, this.y);
        colorText(this.score, this.drawScoreX,this.drawScoreY, this.myColor,"20px Arial");
    }


}