"use strict";

function Player(myCamera) {
    
    this.mCamera = myCamera;
    this.mFood = null;

    this.mCameraBBox = null;

    this.mFoodPos = null;
    
    this.timerFeedGap = 400;
    this.timerFeed = this.timerFeedGap;

    // some flages
    this.shootFood = false;

    // boundaries.
    this.leftWorldBound = 0.5*gViewWidth;
    this.rightWorldBound = gWorldWidth - 0.5*gViewWidth;
    this.upWorldBound = gWorldHeight - 0.5*gViewHeight;
    this.downWorldBound = 0.5*gViewHeight;
}

Player.prototype._initializeFood = function(){
    var mRenderable = new Renderable();
    mRenderable.setColor([0, 5, 2, 1]);

    this.mFood = new GameObject(mRenderable);
    this.mFood.getXform().setSize(20, 20);
    //this.mFood.getXform().setPosition(0.5*gWorldWidth, 0.5*gWorldHeight-0.5*(gCameraWidth*9)/16+10);
    this._updateFood(); 
};

Player.prototype._initializeCameraBBox = function(){
    this.mCameraBBox = new Renderable();
    this.mCameraBBox.setColor([0.7, 0.7, 0.7, 0.5]);
    var center = this.mCamera.getWCCenter();
    var XPos = center[0];
    var YPos = center[1];
    this.mCameraBBox.getXform().setPosition(XPos, YPos);
    this.mCameraBBox.getXform().setSize(this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
};


Player.prototype.initialize = function(){
    
    this._initializeCameraBBox();
    this._initializeFood();
   
};

Player.prototype._updateFood = function(){//fix food to the bottomCenter of camera
    var camCenter = this.mCamera.getWCCenter();
    var xPos = camCenter[0];
    var yPos = camCenter[1] - 0.5*this.mCamera.getWCHeight();
    this.mFood.getXform().setPosition(xPos, yPos);
};

Player.prototype._updateCameraBBox = function(){
    
    var camCenter = this.mCamera.getWCCenter();
    var xPos = camCenter[0];
    var yPos = camCenter[1];
    this.mCameraBBox.getXform().setPosition(xPos, yPos);
};

Player.prototype.update = function() {
    
    var delta = 5;
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[1] = currentCenter[1] + delta;
        if (currentCenter[1]>this.upWorldBound)
            currentCenter[1] = this.upWorldBound;
        this.mCamera.setWCCenter(currentCenter);
        this._updateFood();
        this._updateCameraBBox();
    }    
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[1] = currentCenter[1] - delta;
        if (currentCenter[1]<this.downWorldBound)
            currentCenter[1] = this.downWorldBound;
        this.mCamera.setWCCenter(currentCenter); 
        this._updateFood();
        this._updateCameraBBox();
    }    
    
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[0] = currentCenter[0] - delta;
        if (currentCenter[0]<this.leftWorldBound)
            currentCenter[0] = this.leftWorldBound;
        this.mCamera.setWCCenter(currentCenter);
        this._updateFood();
        this._updateCameraBBox();
    }   
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[0] = currentCenter[0] + delta;
        if (currentCenter[0]>this.rightWorldBound)
            currentCenter[0] = this.rightWorldBound;
        this.mCamera.setWCCenter(currentCenter);
        this._updateFood();
        this._updateCameraBBox();
    }
    
    
    if (!this.mFood.mVisible){
        this._initializeFood();
    }
    
    this._feed();
    
};

Player.prototype._startTimer = function(){
    this.timerFeed -= 1;
    if(this.timerFeed <= 0){
        this.timerFeed = this.timerFeedGap;
        gCanFeed = true;
        gCanShoot = false;
    }
};
Player.prototype._feed = function(){
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left) && gCanFeed && gCanShoot){
        this.mFood.getXform().setSize(15, 15);
        var mouseXPos = this.mCamera.mouseWCX();
        var mouseYPos = this.mCamera.mouseWCY();
        this.mFoodPos = vec2.fromValues(mouseXPos, mouseYPos);

        this.shootFood = true;// to move the food
        gCanFeed = false;

        this.mFood.mRenderComponent.setColor([0, 0, 200, 1]);
    }    
    if(!this.canFeed){
        this._startTimer();
    }
    if(this.shootFood){
        this._shootFoodTowards(this.mFoodPos);
    }
};

Player.prototype._shootFoodTowards = function(pos){
    
    var sub = [];
    vec2.subtract(sub, pos, this.mFood.getXform().getPosition());
       
    var d = vec2.length(sub);
    if(d > 2){
            this.mFood.getXform().incXPosBy(sub[0]*0.1);
            this.mFood.getXform().incYPosBy(sub[1]*0.1);
    }
    else {
            this.shootFood = false;
            this.mFood.setVisibility(false);
    }
};

Player.prototype.draw = function(myCamera){
    this.mFood.draw(myCamera);
};

Player.prototype.getCameraBBox = function(){
    return this.mCameraBBox;
};