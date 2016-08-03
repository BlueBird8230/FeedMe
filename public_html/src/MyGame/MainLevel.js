
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
    this.mTestTexture = "assets/Food.png";


    this.mFishSet = null;
    this.mPlayer = null;
    this.mScoreBoard = null;
    this.mBg = null;
    this.mFg = null;
    
    this.mLight = null;

}
gEngine.Core.inheritPrototype(MainLevel, Scene);

MainLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mBgTexture);
    gEngine.Textures.loadTexture(this.mFgTexture);
    gEngine.Textures.loadTexture(this.mFishTexture);
    gEngine.Textures.loadTexture(this.mFoodTexture);
    gEngine.Fonts.loadFont(this.kFontCon72);
    
    gEngine.Textures.loadTexture(this.mTestTexture);
    
};

MainLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.mBgTexture);
    gEngine.Textures.unloadTexture(this.mFgTexture);
    gEngine.Textures.unloadTexture(this.mFishTexture);
    gEngine.Textures.unloadTexture(this.mFoodTexture);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Textures.loadTexture(this.mTestTexture);

    var nextLevel = new GameOver();
    gEngine.Core.startScene(nextLevel);
};

MainLevel.prototype.initialize = function () {
    
    // big camera initialize
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        640,
        [0, 180, gViewWidth, gViewHeight]
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 0]);

    // small camera initialize
    this.mCamera2 = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0.5*gViewWidth-128, 0, 256, 160]
        );
    this.mCamera2.setBackgroundColor([0.8, 0.8, 0.8, 1]);

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
    
    this._initializeLight();

};

MainLevel.prototype._initializeLight = function(){
    
    this.mLight = new Light();
    this.mLight.setLightType(Light.eLightType.ePointLight);
	this.mLight.setColor([100, 0, 0, 1]);
	this.mLight.setXPos(55);
	this.mLight.setYPos(61);
	this.mLight.setZPos(-1);
	this.mLight.setNear(100);
	this.mLight.setFar(200);
	this.mLight.setIntensity(20);
     
     for (var i = 0; i < 7; i++){
        var aFish = this.mFishSet.getObjectAt(i);
        var aFishRenderable = null;
        aFishRenderable = aFish.getFishRenderable();
        //aFishRenderable.getXform().setSize(100, 100);
        aFishRenderable.addLight(this.mLight);
        var renderableInside = null;
        renderableInside = aFish.mFishObj.getRenderable();
        
    }
    gEngine.DefaultResources.setGlobalAmbientIntensity(20);
    
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

    this.mFishSet.update();
    this.mPlayer.update();
    this.mScoreBoard.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
         gEngine.GameLoop.stop();
     }
     
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.O)) {
		var x = this.mLight.getPosition()[0];
		this.mLight.setXPos(x - 0.5);
	}
        
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
		var x = this.mLight.getPosition()[0];
		this.mLight.setXPos(x + 0.5);
	}
    
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
		var y = this.mLight.getPosition()[1];
		this.mLight.setYPos(y + 0.5);
	}
        
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K)) {
		var y = this.mLight.getPosition()[1];
		this.mLight.setYPos(y - 0.5);
	}  
};
