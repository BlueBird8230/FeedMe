"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gCanvasWidth = 960;
var gCanvasHeight = 540;
var gWorldWidth = 960;
var gWorldHeight = 540;
var gViewWidth = 640;
var gViewHeight = 360;

var gCanFeed = true;
var gCanShoot = false;

function MyGame() {
    
    this.kFontFile =  "assets/fonts/Consolas-72";
    this.mFontRenderable = null;
    
    this.mCamera = null;
    
    this.ifQuit = false;
    
}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
     gEngine.Fonts.loadFont(this.kFontFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Fonts.unloadFont(this.kFontFile);
    if (this.ifQuit==false){
        var nextLevel = new MainLevel();
        gEngine.Core.startScene(nextLevel);
    }
    else{
        var nextLevel = new GameOver();
        gEngine.Core.startScene(nextLevel);
    }
};

MyGame.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0, 180, gWorldWidth, gWorldHeight]
        );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mFontRenderable = new FontRenderable('Press P to start. Press Q to exit');
    this.mFontRenderable.setFont(this.kFontFile);
    this.mFontRenderable.getXform().setPosition(280, 150);
    this.mFontRenderable.setColor([100, 0, 0, 1]);
    this.mFontRenderable.setTextHeight(25);
};

MyGame.prototype.draw = function () {
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();
    
    this.mFontRenderable.draw(this.mCamera);
 
};

MyGame.prototype.update = function () {
    
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)){
         gEngine.GameLoop.stop();
     }
     
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
         this.ifQuit = true;
         gEngine.GameLoop.stop();
     }
};
