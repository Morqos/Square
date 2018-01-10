
function stopClass(coordX,coordY){
    this.x = coordX;
    this.y = coordY;
    this.time = 1000;

    this.stopOther = function(whichSquare){
        whichSquare.stop = true;
        setTimeout(()=>{
            whichSquare.stop = false;
        }, this.time);
    }

    this.draw = function(){
        var useImg = trackPics[TRACK_STOP_OTHER];
        canvasContext.drawImage(useImg, this.x, this.y);
    }


}