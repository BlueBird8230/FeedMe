"use strict";

function ScoreBoard(myFontFile){
    
    this.mScore = 0;
    this.mCamera = null;
    
    this.mFontFile = myFontFile;
    this.mFontRenderable = null;
    this.mString = null;
    
    
}

ScoreBoard.prototype.initialize = function(){
    
    this.mCamera = new Camera(
        vec2.fromValues(25, 16),
        50,
        [680, 250, 250, 160]
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mString = 'current score: '+ this.mScore;
    this.mFontRenderable = new FontRenderable(this.mString);
    this.mFontRenderable.setFont(this.mFontFile);
    this._initText(this.mFontRenderable, 8, 16, [120, 0, 0, 1], 4);
      
};

ScoreBoard.prototype.draw = function(){
    this.mCamera.setupViewProjection();
    this.mFontRenderable.draw(this.mCamera);
};

ScoreBoard.prototype.update = function() { 
    if(gGetScore){
        this.changeScore(1);
        gGetScore = false;
    }
    this.mFontRenderable.setText('current score: '+this.mScore);    
};

ScoreBoard.prototype.changeScore = function(num){
    this.mScore += num;
};

ScoreBoard.prototype.getScore = function(){
    return this.mScore;
};

ScoreBoard.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};