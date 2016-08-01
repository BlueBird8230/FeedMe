
/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishSet() {
    GameObjectSet.call(this);
    //this.kSpriteSheet = sprite;
}
gEngine.Core.inheritPrototype(FishSet, GameObjectSet);

FishSet.prototype.initialize = function(){
    var tmpFish = new Fish(200, 200);
    this.addToSet(tmpFish);
};


FishSet.prototype.update = function(aCamera) {
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
    
    GameObjectSet.prototype.update.call(this);
};
