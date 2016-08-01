
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

function Fish(x, y) {
    // The camera to view the scene
    this.mSpeed = 2;



    this.mFish = new Renderable();
    GameObject.call(this, this.mFish);

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
    this.mFish.setColor([1.0, 0.0, 0.0, 0.6]);
    this.mFish.getXform().setSize(20, 20);
    this.mFish.getXform().setPosition(this.xPos, this.yPos);

    //this.mCurrentState = Fish.eFishState.sPatrol;

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

   if(d>100){
       this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
       //this.getXform().incXPosBy(toTarget[0]*0.01);
       //this.getXform().incYPosBy(toTarget[1]*0.01);
    }
    else{
        this._computeNextState();
    }

};

Fish.prototype._computeNextState = function(){
    this.mTargetPosition = this._getRandomPosition();
    //this._computeSpeed();
    this.setSpeed( (0.7+0.6*Math.random()) * 2);
};

Fish.prototype.update = function(){
    this._patrol();
};