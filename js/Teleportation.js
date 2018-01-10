

function teleportationClass(coordX, coordY){
    this.x = coordX;
    this.y = coordY;

    this.destinationX;
    this.destinationY;

    this.setDestination = function(destX, destY){
        this.destinationX = destX;
        this.destinationY = destY;
    }
    
    this.draw = function(){
        var useImg = trackPics[TRACK_TELEPORTATION];
        canvasContext.drawImage(useImg, this.x, this.y);
    }

}