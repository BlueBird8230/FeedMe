"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishSet(aCamera) {
    this.mCamera = aCamera;
    GameObjectSet.call(this);
    //this.kSpriteSheet = sprite;
}
gEngine.Core.inheritPrototype(FishSet, GameObjectSet);

FishSet.prototype.initialize = function(){
    this._addFishes();
};

FishSet.prototype.addFishes= function(x){
    for(var i=0; i<x; i++){
        var tx = Math.random()*500 + 200;
        var ty = Math.random()*300 + 100;
        var tmpFish = new Fish(tx, ty, this.mCamera);
        tmpFish.initialize();
        this.addToSet(tmpFish);
    }
};

/*
FishSet.prototype.initialize = function(){
    var tmpFish = new Fish(300, 300);
    this.addToSet(tmpFish);
};
*/


FishSet.prototype.update = function() {
    /*
    var x, y, d;
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        x = aCamera.mouseWCX();
        y = aCamera.mouseWCY();
        d = new Fish(x, y);
        this.addToSet(d);
    }
    
    var index, size;
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        size = this.size();
        if (size >= 1) {
            index = Math.floor(Math.random() * size);
            if (index >= size)
                index = size - 1;
            this.removeFromSet(this.getObjectAt(index));
        }
    }
    
    */
    GameObjectSet.prototype.update.call(this);

};