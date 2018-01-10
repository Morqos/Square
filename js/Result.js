
function resultClass(){
    this.x;
    this.y;
    this.result;
    this.typeResult;
    this.indexes = [];

    this.setCoordinates = function(coordX, coordY){
        this.x = coordX;
        this.y = coordY;
    }

    this.setIndexes = function(arrayIndexes){
         this.indexes = arrayIndexes;
    }
    
    this.reset = function(result, typeResult){
        this.typeResult = typeResult;

        if(this.typeResult){
            this.result = result;
        } else {
            if(Math.random() < 0.5){
                this.result = result - 10;
            } else {
                this.result = result + 10;
            }
        }

    }

    this.draw = function(){
        var useImg = trackPics[TRACK_RESULT];
        canvasContext.drawImage(useImg, this.x, this.y);
        colorText(this.result, this.x+useImg.width/2,this.y+useImg.height/2+5, "black", "21px Arial");
    }

}