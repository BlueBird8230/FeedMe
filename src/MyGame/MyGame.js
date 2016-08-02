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

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionSpriteNormal = "assets/minion_sprite_normal.png";

    // The camera to view the scene
    this.mCamera = null;
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kMinionSpriteNormal);
};

MyGame.prototype.unloadScene = function () {
    //gEngine.LayerManager.cleanUp();
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    /*
    this.mParallaxCam = new Camera(
        vec2.fromValues(25, 40), // position of the camera
        30,                       // width of camera
        [0, 420, 700, 300],           // viewport (orgX, orgY, width, height)
        2
    );
    */
    var nextLevel = new MainLevel();
    gEngine.Core.startScene(nextLevel);

};

MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    //this.mCamera.setupViewProjection();
};

MyGame.prototype.update = function () {
};

MyGame.prototype._selectCharacter = function () {
};
