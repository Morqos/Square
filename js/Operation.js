

function operationClass(){
    this.x;
    this.y;

    this.operandOne;
    this.operandTwo;
    this.result;

    this.reset = function(coordX, coordY){
        this.x = coordX;
        this.y = coordY;
        this.calculateOperation();
    }

    this.calculateOperation = function(){
        this.operandOne = Math.floor(Math.random()*9)+11; // Random number from 11 to 19
        this.operandTwo = Math.floor(Math.random()*9)+11;
        this.result = this.operandOne*this.operandTwo;
    }

    this.draw = function(){
        colorText(this.operandOne+"*"+this.operandTwo, this.x,this.y, "#66ff33", "21px Arial");
    }

    
}
