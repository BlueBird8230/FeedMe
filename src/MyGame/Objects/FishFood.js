
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishFood(aCamera, aTexture){
    this.mCamera = aCamera;
    this.mFoodObj = null;
    this.mFoodRadius = null;
    this.mFoodTexture = aTexture;
}
//gEngine.Core.inheritPrototype(FishFood, GameObject);

FishFood.prototype.initialize = function(){
    this.mFoodRadius = 20;
    var mRenderable = new LightRenderable(this.mFoodTexture);
    this.mFoodObj = new GameObject(mRenderable);

    this.mFoodObj.getXform().setSize(20, 20);
    var camCenter = this.mCamera.getWCCenter();
    var xPos = camCenter[0];
    var yPos = camCenter[1] - 0.5*this.mCamera.getWCHeight();
    this.mFood.getXform().setPosition(xPos, yPos);
};

FishFood.prototype.update = function(){

};

FishFood.prototype.draw = function(){
    this.mFoodObj.draw(this.mCamera);
};

FishFood.prototype.setSize = function(x, y){
    this.mFoodObj.setSize(x, y);
};

FishFood.prototype.move = function(x, y){
    this.mFoodObj.getXform().incXPosBy(x);
    this.mFoodObj.getXform().incYPosBy(y);
};