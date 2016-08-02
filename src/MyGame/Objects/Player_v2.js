"use strict";

function Player(myCamera) {
    
    this.mCamera = myCamera;
    this.mCameraBBox = null;
    
    
    this.mFood = null;
    this.mFoodPos = null;
    this.shootFood = false;
}

Player.prototype._initializeFood = function(){
    var mRenderable = new Renderable();
    mRenderable.setColor([0, 1, 0, 1]);
    this.mFood = new GameObject(mRenderable);
    this.mFood.getXform().setSize(20, 20);
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
        if (currentCenter[1]>gWorldHeight)
            currentCenter[1] = gWorldHeight;
        this.mCamera.setWCCenter(currentCenter);
        this._updateFood();
        this._updateCameraBBox();
    }    
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[1] = currentCenter[1] - delta;
        if (currentCenter[1]<0)
            currentCenter[1] = 0;
        this.mCamera.setWCCenter(currentCenter); 
        this._updateFood();
        this._updateCameraBBox();
    }    
    
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[0] = currentCenter[0] - delta;
        if (currentCenter[0]<0)
            currentCenter[0] = 0;
        this.mCamera.setWCCenter(currentCenter);
        this._updateFood();
        this._updateCameraBBox();
    }   
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        var currentCenter = this.mCamera.getWCCenter();
        currentCenter[0] = currentCenter[0] + delta;
        if (currentCenter[0]>gWorldWidth)
            currentCenter[0] = gWorldWidth;
        this.mCamera.setWCCenter(currentCenter);
        this._updateFood();
        this._updateCameraBBox();
    }
    
    
    if (!this.mFood.mVisible){
        this._initializeFood();
    }
    
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        this.mFood.getXform().setSize(15, 15);
        var mouseXPos = this.mCamera.mouseWCX();
        var mouseYPos = this.mCamera.mouseWCY();
        this.mFoodPos = vec2.fromValues(mouseXPos, mouseYPos);
        this.shootFood = true;
        this.mFood.mRenderComponent.setColor([1, 0, 0, 1]);
    }    
    
    if(this.shootFood) 
        this.shootFoodTowards(this.mFoodPos);
        
};

Player.prototype.shootFoodTowards = function(pos){
    
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

Player.prototype.draw = function(){
    
    this.mFood.draw(this.mCamera);
    
};

Player.prototype.getCameraBBox = function(){
    return this.mCameraBBox;
};


