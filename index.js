// Note: Assets are referenced using the following path: '/assets/your-file.png'
/*------------------------------------------------------------*/
//  SPRITE ANIMATION OBJECT
/*------------------------------------------------------------*/
// Prototype object animates the sprite from css classes
function SpriteAnimation(obj) {
    this.element = obj.element;
    this.totalFrames = obj.totalFrames;
    this.frameNum = 1;
    this.classNamePrefixStr = obj.classNamePrefix;
    this.speed = obj.speed;
    this.animationInterval;
    this.frameFunctions = obj.frameFunctions;
}

SpriteAnimation.prototype.animate = function () {
    this.element.className = this.classNamePrefixStr + this.frameNum;
    //console.log(this.element.className)

    this.frameNum++;

    for (var i = 0; i < this.frameFunctions.length; i++) {
        if (this.frameNum == this.frameFunctions[i].frame) {
            this.frameFunctions[i].callback();
        }
    }

    if (this.frameNum >= this.totalFrames) {
        this.frameNum = this.totalFrames;
        this.element.className = this.classNamePrefixStr + this.totalFrames;
        clearInterval(this.animationInterval);
    }
}

SpriteAnimation.prototype.play = function () {
    this.animationInterval = setInterval(this.animate.bind(this), this.speed);
}

SpriteAnimation.prototype.pause = function () {
    clearInterval(this.animationInterval);
}

SpriteAnimation.prototype.frame = function (num) {
    this.pause();
    this.frameNum = num;
    this.element.className = this.classNamePrefixStr + num;
    //console.log(this.element.className)
}

SpriteAnimation.prototype.reset = function () {
    clearInterval(this.animationInterval);
    this.frameNum = 1;
    this.element.className = this.classNamePrefixStr + this.frameNum;
}

/////////////////////////////////////////////////////////////////////////////////////
// ANIMATION - TIMELINEMAX
/////////////////////////////////////////////////////////////////////////////////////
// SETUP ELEMENTS TO ANIMATE
//ADD YOUR VARIABLES HERE

// SETS UP ANIMATION ARRAY AND OTHER NEEDED VARIABLES
var tl = gsap.timeline({repeat: 0, repeatDelay: 0});

var car = new SpriteAnimation({
    element: document.getElementById("car"),
    totalFrames: 31,
    classNamePrefix: "carFrame",
    speed: 40,
    frameFunctions: [{frame: 31, callback: function () {}},]
});

var title = new SpriteAnimation({
    element: document.getElementById("title"),
    totalFrames: 15,
    classNamePrefix: "titleFrame",
    speed: 60,
    frameFunctions: [{frame: 15, callback: function () {
        document.getElementById("title_hiRes").style.opacity = 1;
    }},]
});

document.querySelector("#cta_text").onmouseover = function(){
    gsap.to("#cta_bg_rollover", 0.3, {opacity: 1, ease:Quad.easeOut});
};

document.querySelector("#cta_text").onmouseout = function(){
    gsap.to("#cta_bg_rollover", 0.3, {opacity: 0, ease:Quad.easeIn});
};


// SETUP ANIMATION ITEMS
initAnimation = function () {
    //ADD YOUR TWEENS HERE

            tl.to("#bg", 0.55, {opacity: 1, ease:Quad.easeOut}, 0.1),
            tl.call(function(){
                car.play();
            }, null, 0.1),
            tl.call(function(){
                title.play();
            }, null, 0.7),
            tl.to("#logo", 0.55, {opacity: 1, top:"111px", ease:Quad.easeOut}, 1);
            tl.to("#address1", 0.55, {opacity: 1, top:"120px", ease:Quad.easeOut}, 1.2);
            tl.to("#divider1", 0.45, {width:"228px", ease:Quad.easeInOut}, 1.2);
            tl.to("#divider2", 0.45, {width:"300px", ease:Quad.easeInOut, onStart: function(){
                gsap.to(".divider_gradient", 0.35, {opacity: 0, ease:Linear.easeNone});
                gsap.to("#cta_bg", 0.35, {opacity: 1, ease:Linear.easeNone, delay:0.2});
                gsap.to("#cta_text", 0.35, {opacity: 1, top:"129px", ease:Quad.easeOut, delay:0.2});
            }}, 1.2);
            tl.to("#apr_divider", 0.55, {height: "34px", ease:Quad.easeOut}, 1),
            tl.to("#apr", 0.55, {opacity:1, top: "181px", ease:Quad.easeOut}, 1.4);
            tl.to("#legal1", 0.45, {opacity:1, top: "184px", ease:Quad.easeOut}, 1.4);
            tl.to("#legal2", 0.45, {opacity:1, top: "194px", ease:Quad.easeOut}, 1.5);
            tl.to("#legal3", 0.45, {opacity:1, top: "204px", ease:Quad.easeOut}, 1.6);
            tl.to("#divider3", 0.45, {opacity:0.32, top: "223px", ease:Quad.easeOut}, 1.7);
            tl.to("#bullet1", 0.45, {opacity:1, top: "234px", ease:Quad.easeOut}, 1.8);

}
