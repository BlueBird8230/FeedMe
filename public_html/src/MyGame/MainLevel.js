
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
    
    
    this.mLightFishSet = null;
    this.mFishSet = null;
    this.mPlayer = null;
    this.mScoreBoard = null;
    this.mBg = null;
    this.mFg = null;
    
    this.mLight = null;
    this.mLightArray = null;;

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
    gEngine.Textures.unloadTexture(this.mBgTexture);
    gEngine.Textures.unloadTexture(this.mFgTexture);
    gEngine.Textures.unloadTexture(this.mFishTexture);
    gEngine.Textures.unloadTexture(this.mFoodTexture);
    gEngine.Fonts.unloadFont(this.kFontCon72);

    var nextLevel = new GameOver();
    gEngine.Core.startScene(nextLevel);
};

MainLevel.prototype._initializeLight = function(){
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    this.mLight = new Light();
	this.mLight.setLightType(Light.eLightType.ePointLight);
	this.mLight.setColor([1.0, 0, 0, 1]);
	this.mLight.setXPos(55);
	this.mLight.setYPos(61);
	this.mLight.setZPos(-1);
	this.mLight.setNear(400);
	this.mLight.setFar(700);
	this.mLight.setIntensity(10);
    //this.mLightArray.push(this.mLight);
};

MainLevel.prototype.initialize = function () {
    
    
    this._initializeLight();
    
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
    
    // initialize lightFish Set
    this.mLightFishSet = new LightFishSet(this.mCamera, this.mFishTexture);
    this.mLightFishSet.addFishes(2);
    this.mLightArray = this.mLightFishSet.getLightSet();
    
    // initialize the fish set.
    this.mFishSet = new FishSet(this.mCamera, this.mFishTexture, this.mLightArray);
    this.mFishSet.addFishes(7);

    // initialize the player.
    this.mPlayer = new Player(this.mCamera, this.mFoodTexture);
    this.mPlayer.initialize();

    // initialize the background;
    this.mBg = new Background(this.mCamera, this.mBgTexture);
    this.mBg.initialize([gWorldWidth, gWorldHeight], [0.5*gWorldWidth, 0.5*gWorldHeight]);
    for (var i = 0; i < this.mLightArray.length; i++){
        this.mBg.getRenderable().addLight(this.mLightArray[i]);
    }

    this.mFg = new Background(this.mCamera, this.mFgTexture);
    this.mFg.initialize([128, 256], [0.5*gWorldWidth, 0.5*gWorldHeight]);
    for (var i = 0; i < this.mLightArray.length; i++){
        this.mFg.getRenderable().addLight(this.mLightArray[i]);
    }
    

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
    this.mLightFishSet.draw(this.mCamera);

    // set up the small camera
    this.mCamera2.setupViewProjection();
    var bigCameraBBox = this.mPlayer.getCameraBBox();
    bigCameraBBox.draw(this.mCamera2);
    this.mBg.draw(this.mCamera2);
    this.mFishSet.draw(this.mCamera2); 
    this.mFg.draw(this.mCamera2);
    this.mLightFishSet.draw(this.mCamera2);

    this.mScoreBoard.draw();

};

MainLevel.prototype.update = function () {
    //this.testFish.update();
    this.mFishSet.update();
    this.mPlayer.update();
    this.mScoreBoard.update();
    this.mLightFishSet.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
         gEngine.GameLoop.stop();
     }
};
