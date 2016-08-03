"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainLevel() {
    this.mCamera = null;
    this.mCamera2 = null;

    this.mScoreBoard = null;
    this.kFontCon72 = "assets/fonts/Consolas-72";
    
    this.mFishSet = null;
    this.mPlayer = null;

}
gEngine.Core.inheritPrototype(MainLevel, Scene);

MainLevel.prototype.loadScene = function () {
    gEngine.Fonts.loadFont(this.kFontCon72);
};

MainLevel.prototype.unloadScene = function () {

    gEngine.Fonts.unloadFont(this.kFontCon72);
    var nextLevel = new GameOver();
    gEngine.Core.startScene(nextLevel);
};

MainLevel.prototype.initialize = function () {
    
    // big camera intialize
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        640,
        [0, 180, gViewWidth, gViewHeight]
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    // small camera initialize
    this.mCamera2 = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0.5*gViewWidth-128, 0, 256, 160]
        );
    this.mCamera2.setBackgroundColor([0.8, 0.8, 0.8, 1]);


    // initialize the fish set.
    this.mFishSet = new FishSet(this.mCamera);
    this.mFishSet.addFishes(7);

    // initialize the player.
    this.mPlayer = new Player(this.mCamera);
    this.mPlayer.initialize();

    // initialize the scoreboard.
    this.mScoreBoard = new ScoreBoard(this.kFontCon72);
    this.mScoreBoard.initialize();
};

MainLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

    //set up big camera
    this.mCamera.setupViewProjection();
    this.mFishSet.draw(this.mCamera);   //draw fish
    this.mPlayer.draw(this.mCamera);    //draw player

    // set up the small camera
    this.mCamera2.setupViewProjection();
    var bigCameraBBox = this.mPlayer.getCameraBBox();
    bigCameraBBox.draw(this.mCamera2);   //draw player's box
    this.mFishSet.draw(this.mCamera2);   //draw fish
    
    // draw scoreBoard in its camera
    this.mScoreBoard.draw();

};

MainLevel.prototype.update = function () {
    
    this.mFishSet.update();
    this.mPlayer.update();
    this.mScoreBoard.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
         gEngine.GameLoop.stop();
     }
    
    
};
