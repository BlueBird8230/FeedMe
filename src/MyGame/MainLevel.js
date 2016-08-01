
/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainLevel() {
    this.mCamera = null;

    this.mCamPos = null;


    this.testFish = null;
    this.mFishSet = null;
}
gEngine.Core.inheritPrototype(MainLevel, Scene);

MainLevel.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kMinionSpriteNormal);
};

MainLevel.prototype.unloadScene = function () {
    //gEngine.LayerManager.cleanUp();
};

MainLevel.prototype.initialize = function () {

    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        640,
        [0, 180, gViewWidth, gViewHeight]
        );

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mFishSet = new FishSet(this.mCamera);
//    this.mFishSet.initialize(6);
    this.mFishSet.addFishes(4);

    //this.mFishSet.addToSet(this.testFish);
};

MainLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();

   // this.testFish.draw(this.mCamera);

    this.mFishSet.draw(this.mCamera);
};

MainLevel.prototype.update = function () {
    //this.testFish.update();
    this.mFishSet.update(this.mCamera);
};
