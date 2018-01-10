


function buttonClass(coordX, coordY){
    this.x = coordX;
    this.y = coordY;

    // Istances of doorClass()
    this.doorsActiveAtStart = [];
    this.doorsNotActiveAtStart = [];
    this.switchDoors = false;
    this.released = true;
    this.doorsToDraw = 0;

    this.buttonsAssociated = [];


    this.openCloseDoors = function(){

        if(this.released){

            if(this.switchDoors == true){
                for(var i=0; i<this.doorsActiveAtStart.length; i++){
                    var arrayIndexActive = rowColToArrayIndex(Math.floor(this.doorsActiveAtStart[i].x/TRACK_SIDE), Math.floor(this.doorsActiveAtStart[i].y/TRACK_SIDE));
                    trackGrid[arrayIndexActive] = TRACK_ROAD;
                }
                for(var i=0; i<this.doorsNotActiveAtStart.length; i++){
                    var arrayIndexNotActive = rowColToArrayIndex(Math.floor(this.doorsNotActiveAtStart[i].x/TRACK_SIDE), Math.floor(this.doorsNotActiveAtStart[i].y/TRACK_SIDE));
                    trackGrid[arrayIndexNotActive] = this.doorsNotActiveAtStart[i].type;
                }
                this.doorsToDraw = 1;
            }

            else {
                for(var i=0; i<this.doorsNotActiveAtStart.length; i++){
                    var arrayIndexNotActive = rowColToArrayIndex(Math.floor(this.doorsNotActiveAtStart[i].x/TRACK_SIDE), Math.floor(this.doorsNotActiveAtStart[i].y/TRACK_SIDE));
                    trackGrid[arrayIndexNotActive] = TRACK_ROAD;
                }
                for(var i=0; i<this.doorsActiveAtStart.length; i++){
                    var arrayIndexActive = rowColToArrayIndex(Math.floor(this.doorsActiveAtStart[i].x/TRACK_SIDE), Math.floor(this.doorsActiveAtStart[i].y/TRACK_SIDE));
                    trackGrid[arrayIndexActive] = this.doorsActiveAtStart[i].type;
                }
                this.doorsToDraw = 0;
            }

        }

    }

    this.applyToButtonsAssociated = function(){
        for(var i=0; i<this.buttonsAssociated.length; i++){
            this.buttonsAssociated[i].switchDoors = this.switchDoors;
            this.buttonsAssociated[i].doorsToDraw = this.doorsToDraw;
        }
    }

    this.drawDoors = function(){
        if(this.doorsToDraw == 1){
            for(var i=0; i<this.doorsNotActiveAtStart.length; i++){
                this.doorsNotActiveAtStart[i].draw();
            }
        } else {
            for(var i=0; i<this.doorsActiveAtStart.length; i++){
                this.doorsActiveAtStart[i].draw();
            }
        }
    }

    this.draw = function(){
        var useImg = trackPics[TRACK_BUTTON];
        canvasContext.drawImage(useImg, this.x, this.y);
    }

}