$( document ).ready(function() {
    Game.start();
});

var reloadSound = new Audio("music/reload.wav");
var shotSound = new Audio("music/shot.wav");
var shot2Sound = new Audio("music/shot2.wav");
var emptySound = new Audio("music/empty.wav");

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

// Wykrywanie przycisków
var mouseDown=false;
window.addEventListener('mousedown', function() { mouseDown=true }, false);
window.addEventListener('mouseup', function() { mouseDown=false }, false);

var nowClicked;
document.addEventListener('keydown', function(e) { nowClicked = e.keyCode; });

var scrolling;
window.addEventListener('mousewheel', function(e) { scrolling=true; });

//Obiekt gra
var Game = {
    fps: 60,
    width: window.innerWidth,
    height: window.innerHeight,
    endGame: false,
    score: 0,
    sound: false
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
    
    Game.player = new Player('Jonas Skarabeusz');
    
    this.enemies = [];
    this.wave = 1;
    
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
            if(Game.endGame == false) Game.update();
            nextGameTick += skipTicks;
            loops++;
        }
        
        if(loops) {
            if(Game.endGame == false) Game.draw();
            else Game.drawEnd();
        }
    }
})();

Game.draw = function() {
    // Czyści plansze
    Game.context.clearRect(0, 0, Game.width, Game.height);
    
    // Rysuje gracza
    Game.player.draw(Game.context);
    
    // Rysuje wrogów
    for(var i = 0; i<this.enemies.length; i++) Game.enemies[i].draw(Game.context);
};

Game.drawEnd = function() {
    Game.context.clearRect(0, 0, Game.width, Game.height);
    Game.context.font = "60px Arial";
    Game.context.fillStyle = "darkred";
    Game.context.fillText("Game Over",200,500);
    Game.context.font = "20px Arial";
    Game.context.fillStyle = "white";
    Game.context.fillText("Zabici wrogowie: "+Game.score,210,540);
}

Game.update = function() {
    
    document.onmousemove=function(e){cursorX=(e=e||event).clientX;cursorY=e.clientY}
    
    // Gracz
    Game.player.update();
    
    // Zgon gracza
    if(this.player.hp <= 0 && this.player.dead == false) {
        this.player.dead = true;
        Game.endGame = true;
    }
    
    // Wrogowie
    for(var i = 0; i<this.enemies.length; i++) {
        
        Game.enemies[i].update();
        
        // Jeśli umarł
        if(Game.enemies[i].hp <= 0) {
            delete Game.enemies[i];
            Game.enemies.splice(i,1);
            Game.score++;
        }
    }
    
    // Tworzenie wrogów
    
    if(Game.enemies.length == 0){
        for(var i = 0; i<this.wave; i++) Game.enemies[i] = new Mob(i, 'Albert');
        this.wave++;
    }
        
};
