
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/*
var gCanvasWidth = 960;
var gCanvasHeight = 540;
var gWorldWidth = 960;
var gWorldHeight = 540;
var gViewWidth = 640;
var gViewHeight = 360;
*/
Fish.eFishState = Object.freeze({
    sPatrol: 0,
    sEndPatrol: 1,
    sWait: 2
});

function Fish(x, y, aCamera) {
    // The camera to view the scene
    this.mSpeed = 2;
    this.mCamera = aCamera;



    this.mFish = new Renderable();
    this.mFishRadius = 20;
    this.mFish.setColor([1.0, 0.0, 0.0, 0.6]);
    this.mFishObj = new GameObject(this.mFish);
    GameObject.call(this, this.mFishObj);

    this.mShowBounds = false;

    this.mCurrentState = null;
    this.mTargetPosition = null;

    this.xPos = x;
    this.yPos = y;

    this.mIsHungry = true;
    this.mIsWaitingForFood = false;
    this.mIsPatrolStraight = false;

    this._computeNextState();

}
gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.prototype.initialize = function(){
    this.mFishObj.getXform().setSize(this.mFishRadius, this.mFishRadius);
    this.mFishObj.getXform().setPosition(this.xPos, this.yPos);

    var r = new RigidRectangle(this.mFishObj.getXform(), 20, 20);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(this.mShowBounds);
    this.mFishObj.setPhysicsComponent(r);

};

Fish.prototype._getRandomPosition = function(){
    var tmpX = Math.random()*gWorldWidth;
    var tmpY = Math.random()*gWorldHeight;
    return vec2.fromValues(tmpX, tmpY);
};

Fish.prototype._patrol = function(){

   // Continue patrolling!
   GameObject.prototype.update.call(this);
   var toTarget = [];
   vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
   var d = vec2.length(toTarget);

   if(d>300){
       this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
    }
    else{
        this._computeNextState();
    }

};

Fish.prototype._computeNextState = function(){

    this.mTargetPosition = this._getRandomPosition();
    //this._computeSpeed();
    this.setSpeed( (0.1+0.6*Math.random()) * 2);
};

Fish.prototype.update = function(){
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        var x = this.mCamera.mouseWCX();
        var y = this.mCamera.mouseWCY();
        var pos = vec2.fromValues(x, y);
        //if(this.mFishObj.getPhysicsComponent())

        var sub = [];
        vec2.subtract(sub, pos, this.mFishObj.getXform().getPosition());
        var d = vec2.length(sub);
        if(d < this.mFishRadius){
            this.mFishObj.getXform().setSize(50, 50);
        }

    }

    this._patrol();
    //gEngine.Physics.processObjObj(this.mPlatformObject, this.mMinionObject);
};