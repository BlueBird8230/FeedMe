/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gCanvasWidth = 960;
var gCanvasHeight = 540;
var gWorldWidth = 960;
var gWorldHeight = 540;
var gViewWidth = 640;
var gViewHeight = 360;

var gCanFeed = true;
var gCanShoot = false;

var gGetScore = false;
var gGameOver = false;
var gAngry = false;

var gHighScore = 0;  // store the highest score.
var gLastScore = 0; // store the last score.

function MyGame() {
    // The camera to view the scene
    this.mCamera = null;

    this.kFontFile =  "assets/fonts/Consolas-72";
    this.mFontRenderable = null;
    this.ifQuit = false;

    this.mButtonFiles = [];
    this.mButtonFilesOver = [];
    this.mButtons = [];
    this.mButtonWid = 64;

    this.mStartLevel = 3;
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Fonts.loadFont(this.kFontFile);
    //gEngine.Fonts.loadFont(this.kFontFile);
    for(var i=3; i<9; i++){
        gEngine.Textures.loadTexture("assets/buttons/level"+String(i)+".png");
        gEngine.Textures.loadTexture("assets/buttons/level"+String(i)+"o.png");
    }
};

MyGame.prototype.unloadScene = function () {
    gEngine.Fonts.unloadFont(this.kFontFile);
    for(var i=3; i<9; i++){
        gEngine.Textures.unloadTexture("assets/buttons/level"+String(i)+".png");
        gEngine.Textures.unloadTexture("assets/buttons/level"+String(i)+"o.png");
    }
    if (this.ifQuit==false){
        var nextlevel = new MainLevel(this.mStartLevel, 0, true);
        gEngine.Core.startScene(nextlevel);
    }
};

MyGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0, 180, gWorldWidth, gWorldHeight]
        );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    //this.mFontRenderable = new FontRenderable('Press P to start. Press Q to exit');
    this.mFontRenderable = new FontRenderable('       Choose one level.');
    this.mFontRenderable.setFont(this.kFontFile);
    this.mFontRenderable.getXform().setPosition(280, 200);
    this.mFontRenderable.setColor([100, 0, 0, 1]);
    this.mFontRenderable.setTextHeight(25);

    // initialize buttons

    for(var i=3; i<9; i++){
        this.mButtonFiles.push("assets/buttons/level"+String(i)+".png");
        this.mButtonFilesOver.push("assets/buttons/level"+String(i)+"o.png");
        if(i<6){
            var tmpButton = new Button(this.mButtonFiles[i-3], this.mButtonFilesOver[i-3]);
            tmpButton.initialize(
                [400+80*(i-3), 110],
                this.mButtonWid, this.mButtonWid
                );
            this.mButtons.push(tmpButton);
        }   else{
            var tmpButton = new Button(this.mButtonFiles[i-3], this.mButtonFilesOver[i-3]);
            tmpButton.initialize(
                [400+80*(i-6), 40],
                this.mButtonWid, this.mButtonWid
                );
            this.mButtons.push(tmpButton);

        }
    }
};

MyGame.prototype.draw = function () {

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();
    this.mFontRenderable.draw(this.mCamera);

    for(var i=0; i<this.mButtons.length; i++){
        this.mButtons[i].draw(this.mCamera);
    }
};

MyGame.prototype.update = function () {
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)){
         gEngine.GameLoop.stop();
     }
     
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
         this.ifQuit = true;
         gEngine.GameLoop.stop();
     }
     for(var i=0; i<this.mButtons.length; i++){
        this.mButtons[i].update(this.mCamera);
     }

     if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        var xMouse = this.mCamera.mouseWCX();
        var yMouse = this.mCamera.mouseWCY();
        for(var i=3; i<9; i++){
            var tmpX = 0;
            var tmpY = 0;
            if(i<6){
                tmpX = 400 + 80*(i-3);
                tmpY = 110;
            }   else{
                tmpX = 400 + 80*(i-6);
                tmpY = 40;
            }
            if(
                xMouse > (tmpX-0.5*this.mButtonWid) && 
                xMouse < (tmpX+0.5*this.mButtonWid) &&
                yMouse > (tmpY-0.5*this.mButtonWid) && 
                yMouse < (tmpY+0.5*this.mButtonWid))
            {
                this.mStartLevel = i;
                gEngine.GameLoop.stop();
            }
        }
     }
};
