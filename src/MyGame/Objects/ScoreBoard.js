




"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ScoreBoard(fontFile) {
    this.mScore = 0;
    this.mCamera = 0;

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
        );
    var tString = "";
    this.mTextCon72 = new FontRenderable(tString);
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, 3, 2, [0, 0, 1, 1], 2);
};

ScoreBoard.prototype.getScore = function(num){
    this.mScore += num;
};

ScoreBoard.prototype.loseScore = function(num){
    this.mScore -= num;
};