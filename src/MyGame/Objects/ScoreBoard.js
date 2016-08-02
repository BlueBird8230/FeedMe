




"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ScoreBoard(fontFile ) {
    this.mScore = 0;
    this.mCamera = null;

    //this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontCon72 = fontFile;
    this.mTextCon72 = null;
}
gEngine.Core.inheritPrototype(ScoreBoard, GameObject);

ScoreBoard.prototype.initialize = function(){
    /*
    if(iniScore != null)
        this.mScore = iniScore;
    else
        this.mScore = 0;
    */
    this.mCamera = new Camera(
        vec2.fromValues(2000, 2000),
        60,
        [680, 250, 250, 160]
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    var tString = "KELVIN";
    this.mTextCon72 = new FontRenderable(tString);
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, 3, 2, [0, 0, 1, 1], 2);
    this.mTextCon72.getXform().setPosition(2000, 2000);

};

ScoreBoard.prototype.draw = function(){
    this.mCamera.setupViewProjection();
    this.mTextCon72.draw(this.mCamera);
};

ScoreBoard.prototype.getScore = function(num){
    return this.mScore;
};

ScoreBoard.prototype.changeScore = function(num){
    this.mScore += num;
};