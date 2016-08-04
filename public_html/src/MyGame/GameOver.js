/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver(currentScore) {
    
    this.kFontFile =  "assets/fonts/Consolas-72";
    this.mFontRenderableGameOver = null;
    this.mFontRenderableHighScore = null;
    //this.mFontRenderableLastScore = null;
    this.mFontRenderableCurrentScore = null;
    this.mCurrentScore = currentScore;
    
    this.mCamera = null;
    this.kEndMusic = "assets/end.mp3";
    
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Fonts.loadFont(this.kFontFile);
    gEngine.AudioClips.loadAudio(this.kEndMusic);
};

GameOver.prototype.unloadScene = function () {
    gEngine.AudioClips.unloadAudio(this.kEndMusic);
    gEngine.Fonts.unloadFont(this.kFontFile);
};

GameOver.prototype.initialize = function () {
    
    gEngine.AudioClips.playBackgroundAudio(this.kEndMusic);
    
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0, 180, gWorldWidth, gWorldHeight]
        );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mFontRenderableGameOver = new FontRenderable('Game Over');
    this.mFontRenderableGameOver.setFont(this.kFontFile);
    this.mFontRenderableGameOver.getXform().setPosition(400, 150);
    this.mFontRenderableGameOver.setColor([100, 0, 0, 1]);
    this.mFontRenderableGameOver.setTextHeight(30);

    this.mFontRenderableHighScore = new FontRenderable('The record is '+gHighScore);
    this.mFontRenderableHighScore.setFont(this.kFontFile);
    this.mFontRenderableHighScore.getXform().setPosition(400, 110);
    this.mFontRenderableHighScore.setColor([100, 0, 0, 1]);
    this.mFontRenderableHighScore.setTextHeight(30);

    /*
    this.mFontRenderableLastScore= new FontRenderable('The last score is '+gLastScore);
    this.mFontRenderableLastScore.setFont(this.kFontFile);
    this.mFontRenderableLastScore.getXform().setPosition(400, 110);
    this.mFontRenderableLastScore.setColor([100, 0, 0, 1]);
    this.mFontRenderableLastScore.setTextHeight(30);
    */

    this.mFontRenderableCurrentScore = new FontRenderable('You got '+this.mCurrentScore+' points.');
    this.mFontRenderableCurrentScore.setFont(this.kFontFile);
    this.mFontRenderableCurrentScore.getXform().setPosition(400, 70);
    this.mFontRenderableCurrentScore.setColor([100, 0, 0, 1]);
    this.mFontRenderableCurrentScore.setTextHeight(30);
};

GameOver.prototype.draw = function () {
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();
    
    this.mFontRenderableGameOver.draw(this.mCamera);
    //this.mFontRenderableLastScore.draw(this.mCamera);
    this.mFontRenderableHighScore.draw(this.mCamera);
    this.mFontRenderableCurrentScore.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    
};

