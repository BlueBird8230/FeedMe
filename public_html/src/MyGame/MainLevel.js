
/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainLevel() {
    this.mCamera = null;
    this.mCamera2 = null;   // Camera for the minimap
    this.mScoreBoard = null;

    this.mCamPos = null;
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.mBgTexture = "assets/FeedMe_bg_down.png";
    this.mFgTexture = "assets/FeedMe_bg_up.png";
    this.mFishTexture = "assets/Fish.png";
    this.mFoodTexture = "assets/Food.png";


    this.mFishSet = null;
    this.mPlayer = null;
    this.mSmallViewPort = null;
    //this.mScoreBoard = null;
    this.mBg = null;
    this.mFg = null;

}
gEngine.Core.inheritPrototype(MainLevel, Scene);

MainLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mBgTexture);
    gEngine.Textures.loadTexture(this.mFgTexture);
    gEngine.Textures.loadTexture(this.mFishTexture);
    gEngine.Textures.loadTexture(this.mFoodTexture);
    gEngine.Fonts.loadFont(this.kFontCon72);
};

MainLevel.prototype.unloadScene = function () {
    //gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.mBgTexture);
    gEngine.Textures.unloadTexture(this.mFgTexture);
    gEngine.Textures.unloadTexture(this.mFishTexture);
    gEngine.Textures.unloadTexture(this.mFoodTexture);
    gEngine.Fonts.unloadFont(this.kFontCon72);

    var nextLevel = new GameOver();
    gEngine.Core.startScene(nextLevel);
};

MainLevel.prototype.initialize = function () {

    // small camera initialize
    this.mCamera2 = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0.5*gViewWidth-128, 0, 256, 160]
        );
    this.mCamera2.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        640,
        [0, 180, gViewWidth, gViewHeight]
        );

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 0]);

    // initialize the mini map.
    this.mSmallViewPort = new SmallViewPort();
    this.mSmallViewPort.initialize();

    // initialize the fish set.
    this.mFishSet = new FishSet(this.mCamera, this.mFishTexture);
    this.mFishSet.addFishes(7);

    // initialize the player.
    this.mPlayer = new Player(this.mCamera, this.mFoodTexture);
    this.mPlayer.initialize();

    // initialize the background;
    this.mBg = new Background(this.mCamera, this.mBgTexture);
    this.mBg.initialize([gWorldWidth, gWorldHeight], [0.5*gWorldWidth, 0.5*gWorldHeight]);

    this.mFg = new Background(this.mCamera, this.mFgTexture);
    this.mFg.initialize([128, 256], [0.5*gWorldWidth, 0.5*gWorldHeight]);

    // initialize the scoreboard.
    this.mScoreBoard = new ScoreBoard(this.kFontCon72);
    this.mScoreBoard.initialize();
};

MainLevel.prototype.draw = function () {

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 0]);

    // setup big camera
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mFishSet.draw(this.mCamera);
    this.mPlayer.draw();
    this.mFg.draw(this.mCamera);

    // set up the small camera
    this.mCamera2.setupViewProjection();
    var bigCameraBBox = this.mPlayer.getCameraBBox();
    bigCameraBBox.draw(this.mCamera2);
    this.mBg.draw(this.mCamera2);
    this.mFishSet.draw(this.mCamera2); 
    this.mFg.draw(this.mCamera2);

    this.mScoreBoard.draw();

};

MainLevel.prototype.update = function () {
    //this.testFish.update();
    this.mFishSet.update();
    this.mPlayer.update();
    this.mScoreBoard.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
         gEngine.GameLoop.stop();
     }
};
