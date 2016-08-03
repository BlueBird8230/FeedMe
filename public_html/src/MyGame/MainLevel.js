
/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainLevel(level, iniScore, aChance) {
    this.mCamera = null;
    this.mCamera2 = null;   // Camera for the minimap
    this.mScoreBoard = null;

    this.mCamPos = null;
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.mBgTexture = "assets/FeedMe_bg_down1.png";
    this.mFgTexture = "assets/FeedMe_bg_up.png";
    this.mFgTexture2 = "assets/FeedMe_bg_up3.png";
    this.mFishTexture = "assets/Cute_Fish.png";
    this.mFoodTexture = "assets/Food.png";

    this.kBgMusic = "assets/backgroundMusic.mp3";
    this.kScore = "assets/score.wav";
    this.kWrong = "assets/wrong.wav";
    this.kEndMusic = "assets/end.mp3";
    this.mLightFishSet = null;
    this.mLightArray = null;;


    this.mFishSet = null;
    this.mPlayer = null;
    this.mSmallViewPort = null;
    //this.mScoreBoard = null;
    this.mBg = null;
    this.mFg = null;
    this.mFg2 = null;

    this.mChance = aChance;

    this.mLevel = level;
    this.nextLevelNum = 0;

    this.mLevelUp = null;
    this.mGameOver = null;

    this.mNextScore = iniScore;

}
gEngine.Core.inheritPrototype(MainLevel, Scene);

MainLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mBgTexture);
    gEngine.Textures.loadTexture(this.mFgTexture);
    gEngine.Textures.loadTexture(this.mFgTexture2);
    gEngine.Textures.loadTexture(this.mFishTexture);
    gEngine.Textures.loadTexture(this.mFoodTexture);
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    gEngine.AudioClips.loadAudio(this.kScore);
    gEngine.AudioClips.loadAudio(this.kWrong);
    gEngine.AudioClips.loadAudio(this.kEndMusic);
};

MainLevel.prototype.unloadScene = function () {
    //gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.mBgTexture);
    gEngine.Textures.unloadTexture(this.mFgTexture);
    gEngine.Textures.unloadTexture(this.mFgTexture2);
    gEngine.Textures.unloadTexture(this.mFishTexture);
    gEngine.Textures.unloadTexture(this.mFoodTexture);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.AudioClips.unloadAudio(this.kBgMusic);
    gEngine.AudioClips.unloadAudio(this.kScore);
    gEngine.AudioClips.unloadAudio(this.kWrong);
    gEngine.AudioClips.loadAudio(this.kEndMusic);

    if(!this.mChance && this.nextLevelNum===0){
        var nextLevel = new GameOver();
        gEngine.Core.startScene(nextLevel);
    }

    if(this.mGameOver){
        var nextLevel = new GameOver();
        gEngine.Core.startScene(nextLevel);
    }   else {
        this.mNextScore = this.mPlayer.getCurrentScore();
        if(this.nextLevelNum === 0){
            var nextLevel = new MainLevel(this.mLevel+this.nextLevelNum, this.mNextScore, false);
            gEngine.Core.startScene(nextLevel);
        }
        else{
            var nextLevel = new MainLevel(this.mLevel+this.nextLevelNum, this.mNextScore, true);
            gEngine.Core.startScene(nextLevel);
        }
    }

};

MainLevel.prototype._initializeLight = function(){
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
};

MainLevel.prototype.initialize = function () {
    // initialize cute audio
    if (!gEngine.AudioClips.isBackgroundAudioPlaying())
        gEngine.AudioClips.playBackgroundAudio(this.kBgMusic);

    // initialize light
    this._initializeLight();

    // 
    this.mGameOver = false;
    this.mLevelUp = false;

    // small camera initialize
    this.mCamera2 = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0.5*gViewWidth-128, 0, 256, 160]
        );
    this.mCamera2.setBackgroundColor([0, 0, 0, 0]);

    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        800,
        [0, 180, gViewWidth, gViewHeight]
        );

    this.mCamera.setBackgroundColor([0, 0, 0, 0]);

    this.mLightFishSet = new LightFishSet(this.mCamera, this.mFishTexture);
    this.mLightFishSet.addFishes(2);
    this.mLightArray = this.mLightFishSet.getLightSet();

    // initialize the mini map.
    //this.mSmallViewPort = new SmallViewPort();
    //this.mSmallViewPort.initialize();

    // initialize the fish set.
    this.mFishSet = new FishSet(this.mCamera, this.mFishTexture, 
                                this.mLightArray, this.kScore, this.kWrong);
    this.mFishSet.addFishes(this.mLevel);

    // initialize the background;
    this.mBg = new Background(this.mCamera, this.mBgTexture);
    this.mBg.initialize([1024, 512], [0.5*gWorldWidth, 0.5*gWorldHeight]);
    for (var i = 0; i < this.mLightArray.length; i++){
        this.mBg.getRenderable().addLight(this.mLightArray[i]);
    }

    this.mFg2 = new Background(this.mCamera, this.mFgTexture2);
    this.mFg2.initialize([128, 128], [0.5*gWorldWidth, 0.5*gWorldHeight]);
    for (var i = 0; i < this.mLightArray.length; i++){
        this.mFg2.getRenderable().addLight(this.mLightArray[i]);
    }

    this.mFg = new Background(this.mCamera, this.mFgTexture);
    this.mFg.initialize([256, 128], [140, 78]);
    for (var i = 0; i < this.mLightArray.length; i++){
        this.mFg.getRenderable().addLight(this.mLightArray[i]);
    }
    // initialize the player.
    this.mPlayer = new Player(this.mCamera, this.mFoodTexture, 
                            this.mLevel, this.kFontCon72, this.mNextScore, this.mChance);
    this.mPlayer.initialize();


    // initialize the scoreboard.
    //this.mScoreBoard = new ScoreBoard(this.kFontCon72);
    //this.mScoreBoard.initialize();
};

MainLevel.prototype.draw = function () {

    gEngine.Core.clearCanvas([0, 0, 0, 1]);

    // setup big camera
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mFishSet.draw(this.mCamera);
    this.mFg.draw(this.mCamera);
    this.mFg2.draw(this.mCamera);
    this.mLightFishSet.draw(this.mCamera);
    this.mPlayer.draw();

    // set up the small camera
    this.mCamera2.setupViewProjection();
    var bigCameraBBox = this.mPlayer.getCameraBBox();
    this.mBg.draw(this.mCamera2);
    bigCameraBBox.draw(this.mCamera2);
    this.mFishSet.draw(this.mCamera2); 
    this.mFg.draw(this.mCamera2);
    this.mFg2.draw(this.mCamera2);
    this.mLightFishSet.draw(this.mCamera2);

    //this.mScoreBoard.draw();

};

MainLevel.prototype.update = function () {
    //this.testFish.update();
    this.mFishSet.update();
    this.mPlayer.update();
    this.mLightFishSet.update();
   // this.mScoreBoard.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.mGameOver = true;
        gEngine.GameLoop.stop();
    }

    var num = this.mPlayer.LevelUp();
    if(num >= 0){
        this.nextLevelNum = num;
        gEngine.GameLoop.stop();
        //this.unloadScene();
    }
    
    if(this.mPlayer.GameOver()){
        this.mGameOver = true;
        gEngine.GameLoop.stop();
        //this.unloadScene;
    }
    

};
