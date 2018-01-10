

function doorClass(coordX, coordY, trackType, number){
    this.x = coordX;
    this.y = coordY;
    this.type = trackType;
    this.number = number;

    this.draw = function(){
        var useImg = trackPics[this.type];
        canvasContext.drawImage(useImg, this.x, this.y);
        //colorText(this.number, this.x,this.y, "white"); //Used to check numbers of doors to assign to each button
    }

}