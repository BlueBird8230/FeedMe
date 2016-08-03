"use strict";

function Button(myTexture) {
    
    this.mBottonTexture = myTexture;
    this.mBotton = null;
    
};

Button.prototype.initialize = function(){
    
    this.mBotton = new TextureRenderable(this.mBottonTexture);
    var textureInfo = this.mBottonTexture.getTextureInfo();
    this.mBotton.getXform().setSize(textureInfo[0], textureInfo[1]);
    
};

Button.prototype.draw = function(myCamera){
    this.mBotton.draw(myCamera);
};

Button.prototype.update = function(){
    
    
};