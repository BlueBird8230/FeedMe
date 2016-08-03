"use strict";

function ScoreBoard(myFontFile, iniScore, cLevel, chance){
    
    this.mScore = iniScore;
    this.mCamera = null;
    this.mChance = chance;

    this.mCurrentLevel = cLevel;
    
    this.mFontFile = myFontFile;
    this.mFontRenderable = null;
    this.mFontRenderableLevel = null;
    this.mFontRenderableTip = null;
    this.mFontRenderableTip2 = null;
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
    this._initText(this.mFontRenderable, 8, 24, [120, 0, 0, 1], 4);

    this.mString = 'current level: '+ this.mCurrentLevel;
    this.mFontRenderableLevel = new FontRenderable(this.mString);
    this.mFontRenderableLevel.setFont(this.mFontFile);
    this._initText(this.mFontRenderableLevel, 8, 28, [120, 0, 0, 1], 4);
      
    this.mString = String(this.mCurrentLevel)+" fishes to pass.";
    this.mFontRenderableTip = new FontRenderable(this.mString);
    this.mFontRenderableTip.setFont(this.mFontFile);
    this._initText(this.mFontRenderableTip, 8, 20, [120, 0, 0, 1], 4);

    if(this.mChance){
        this.mString = String(this.mCurrentLevel-1)+" fishes to stay.";
    }   else{
        this.mString = "You can't stay.";
    }
    this.mFontRenderableTip2 = new FontRenderable(this.mString);
    this.mFontRenderableTip2.setFont(this.mFontFile);
    this._initText(this.mFontRenderableTip2, 8, 16, [120, 0, 0, 1], 4);
};

ScoreBoard.prototype.draw = function(){
    this.mCamera.setupViewProjection();
    this.mFontRenderable.draw(this.mCamera);
    this.mFontRenderableLevel.draw(this.mCamera);
    this.mFontRenderableTip.draw(this.mCamera);
    this.mFontRenderableTip2.draw(this.mCamera);
};

ScoreBoard.prototype.update = function() { 
    if(gGetScore){
        this.changeScore(1);
        gGetScore = false;
    }
    this.mFontRenderable.setText('current score: '+this.mScore);    
    this.mFontRenderableLevel.setText('current level: '+this.mCurrentLevel);    
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