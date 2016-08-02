
"use strict";  // Operate in Strict mode such that variables must be declared before used!

Fish.eFishState = Object.freeze({
    sPatrol: 0,
    sWait: 1,
    sAngry: 2
});

function Fish(x, y, aCamera) {
    // The camera to view the scene
    this.mSpeed = 2;
    this.mCamera = aCamera;



    this.mFish = new Renderable();
    this.mFishRadius = 30;
    this.mFish.setColor([256, 0.0, 0.0, 1]);
    this.mFishObj = new GameObject(this.mFish);
    GameObject.call(this, this.mFishObj);

    this.mShowBounds = false;

    this.mCurrentState = null;
    this.mTargetPosition = null;

    this.xPos = x;
    this.yPos = y;

    this.mIsHungry = true;
    this.mIsClicked = false;
    this.mIsAngry = false;

    this.mIsWaitingForFood = false;
    this.mIsPatrolStraight = false;

    // timer
    this.timerAngryGap = 10;
    this.timerAngry = null;
    this.testTimer = 50;

    // Smooth flag
    this.mForSmooth = false;

   // this._computeNextState();

}
gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.prototype.initialize = function(){
    this.mFishObj.getXform().setSize(this.mFishRadius, this.mFishRadius);
    this.mFishObj.getXform().setPosition(this.xPos, this.yPos);
    
    // initialize the mTargetPosition and set speed;
    this.mTargetPosition = this._getRandomPosition();
    this.setSpeed( (0.8+0.6*Math.random()) * 2);

    // initialize the current state;
    this.mCurrentState = Fish.eFishState.sPatrol;

    var r = new RigidRectangle(this.mFishObj.getXform(), 20, 20);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(this.mShowBounds);
    this.mFishObj.setPhysicsComponent(r);

    // initilize the timer
    this.timerAngry = this.timerAngryGap;

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

   if(d>150){
       this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
    }
    else{
        this._computeNextState();
    }

};

Fish.prototype._computeNextState = function(){                      // Only when the food is gone, can set 
                                                                    // this fish not hungry;
    switch(this.mCurrentState){
        case 0: // Patrolling
            if(this.mIsClicked){
                if(this.mIsHungry)
                    this.mCurrentState = Fish.eFishState.sWait;
                if(!this.mIsHungry){
                    this.mIsAngry = true;
                    this.mCurrentState = Fish.eFishState.sAngry;
                }
            }
            else{
                if(this.mForSmooth){
                    this.mForSmooth = !this.mForSmooth;
                    this.mTargetPosition = this._getRandomPosition();
                }
            }
            this.mIsClicked = false;
            break;
        case 1: // Waiting
            if(!this.mIsHungry)                                     // Hungry
                this.mCurrentState = Fish.eFishState.sPatrol;
            break;
        case 2: // Angry
            if(!this.mIsAngry){
                
                this.mCurrentState = Fish.eFishState.sPatrol;
            }
            break;
    }

};

Fish.prototype._wait = function(){
    this.testTimer -= 1;
    if(this.testTimer <= 0){
        this.testTimer = 200;
        this.mIsHungry = false;
    }
};

Fish.prototype._angry = function(){
    if(this.timerAngry == this.timerAngryGap){
        this.mFishObj.getXform().setSize(80, 80);
    }
    this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
    
    this.timerAngry -= 1;
    if(this.timerAngry <= 0){
        this.timerAngry = this.timerAngryGap;
        this.mCurrentState = Fish.eFishState.sPatrol;
        this.mIsAngry = false;

        this.mFishObj.getXform().setSize(this.mFishRadius, this.mFishRadius);
        this._computeNextState();
    }
};

Fish.prototype.update = function(){
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left) && gCanFeed) {
        var x = this.mCamera.mouseWCX();
        var y = this.mCamera.mouseWCY();
        var pos = vec2.fromValues(x, y);
        //if(this.mFishObj.getPhysicsComponent())

        var sub = [];
        vec2.subtract(sub, pos, this.mFishObj.getXform().getPosition());
        var d = vec2.length(sub);
        if(d < this.mFishRadius){
            //this.mFishObj.getXform().setSize(50, 50);
            if(this.mIsHungry)
                gCanShoot = true;
            this.mIsClicked = true;
        }

    }
    this._computeNextState();

    switch(this.mCurrentState){
        case 0:
            this._patrol();
            break;
        case 1:
            this._wait();
            break;
        case 2:
            this._angry();
            break;
    }

    //gEngine.Physics.processObjObj(this.mPlatformObject, this.mMinionObject);
};