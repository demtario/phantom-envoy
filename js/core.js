$( document ).ready(function() {
    Game.start();
});

// Poruszanie się
var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    W: 87,
    S: 83,
    A: 65,
    D: 68,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};
        
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var mouseDown=false;
window.addEventListener('mousedown', function() { mouseDown=true }, false);
window.addEventListener('mouseup', function() { mouseDown=false }, false);

document.addEventListener('keydown', function(event) { nowClicked = event.keyCode; });
var nowClicked;

var Game = {
    fps: 60,
    width: window.innerWidth,
    height: window.innerHeight,
};

Game._onEachFrame = (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    
    if (requestAnimationFrame) {
        return function(cb) {
            var _cb = function() { cb(); requestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        return function(cb) {
            setInterval(cb, 1000 / Game.fps);
        }
    }
})();

var cursorX, cursorY;

Game.start = function() {
    
    
    
    Game.canvas = document.createElement("canvas");
    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;
    
    Game.context = Game.canvas.getContext("2d");
    
    document.body.appendChild(Game.canvas);
    
    Game.player = new Player();
    
    Game._onEachFrame(Game.run);
}

Game.run = (function() {
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime(),
        lastGameTick;
    
    return function() {
        loops = 0;
        
        while ((new Date).getTime() > nextGameTick) {
            Game.update();
            nextGameTick += skipTicks;
            loops++;
        }
        
        if(loops) Game.draw();
    }
})();

Game.draw = function() {
    Game.context.clearRect(0, 0, Game.width, Game.height);
    Game.player.draw(Game.context);
};

Game.update = function() {
    
    document.onmousemove=function(e){cursorX=(e=e||event).clientX;cursorY=e.clientY}
    
    Game.player.update();
    
};
