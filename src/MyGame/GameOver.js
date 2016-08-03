/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    
    this.kFontFile =  "assets/fonts/Consolas-72";
    this.mFontRenderable = null;
    
    this.mCamera = null;
    
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Fonts.loadFont(this.kFontFile);
};

GameOver.prototype.unloadScene = function () {

};

GameOver.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0, 180, gWorldWidth, gWorldHeight]
        );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mFontRenderable = new FontRenderable('Game Over');
    this.mFontRenderable.setFont(this.kFontFile);
    this.mFontRenderable.getXform().setPosition(400, 150);
    this.mFontRenderable.setColor([100, 0, 0, 1]);
    this.mFontRenderable.setTextHeight(30);

};

GameOver.prototype.draw = function () {
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();
    
    this.mFontRenderable.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    
};

