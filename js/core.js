$(document).ready(function () {
    Game.start();
});

let reloadSound = new Audio("music/reload.wav");
let shotSound = new Audio("music/shot2.wav");
let shot2Sound = new Audio("music/shot2.wav");
let emptySound = new Audio("music/empty.wav");

// Poruszanie się
let Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    
    SHIFT: 16,

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
let mouseDown=false;
window.addEventListener('mousedown', function() { mouseDown=true }, false);
window.addEventListener('mouseup', function() { mouseDown=false }, false);

let nowClicked;
document.addEventListener('keydown', function(e) { nowClicked = e.keyCode; });

let scrolling;
window.addEventListener('mousewheel', function(e) { scrolling=true; });

//Obiekt gra
let Game = {
    fps: 60,
    width: window.innerWidth,
    height: window.innerHeight,
    endGame: false,
    gamePaused: false,
    sound: false
};

Game._onEachFrame = (function() {
    let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    
    if (requestAnimationFrame) {
        return function(cb) {
            let _cb = function() { cb(); requestAnimationFrame(_cb); }
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
    
    // Plansza
    Game.canvas = document.createElement("canvas");
    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;
    
    Game.context = Game.canvas.getContext("2d");
    
    document.body.appendChild(Game.canvas);
    
    // Świat
    Game.world = new Map(4000,4000);
    this.world.generate();
    
    // Gracz
    Game.player = new Player('Jonas Skarabeusz', Game.world.width/2, Game.world.height/2);

    // Jego Kamera
    this.camera = new Camera(0, 0, Game.width, Game.height, Game.world.width, Game.world.height);
    Game.camera.follow(Game.player, Game.width/2, Game.height/2);

    // Wrogowie
    this.enemies = [];
    this.wave = 1;
    
    // Powerupy
    this.ammoPacks = [];

    // Let's go
    Game._onEachFrame(Game.run);
}

Game.run = (function() {
    let loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime(),
        lastGameTick;
    
    return function() {
        loops = 0;
        
        while ((new Date).getTime() > nextGameTick) {
            if(!Game.endGame && !Game.gamePaused) Game.update();
            nextGameTick += skipTicks;
            loops++;
        }
        
        //Kontrola pauzy
        if(nowClicked == 27 && !Game.gamePaused) {
            Game.gamePaused = true;
            console.log('pauza');
            nowClicked = 'esc';
        } 

        if(nowClicked == 27 && Game.gamePaused) {
            Game.gamePaused = false;
            console.log('koniec pauzy');
            nowClicked = 'esc';
        }
        
        //Pętla gry
        if(loops) {
            if(!Game.endGame && !Game.gamePaused) Game.draw();
            else if(Game.gamePaused) Game.drawPause();
            else Game.drawEnd();
        }
    }
})();

Game.draw = function() {
    // Czyści plansze
    Game.context.clearRect(0, 0, Game.width, Game.height);
    
    //Rysuje mapę
    Game.world.draw(Game.context,Game.camera.xView,Game.camera.yView);

    // Rysuje ammo
    for(let i = 0; i<this.ammoPacks.length; i++) Game.ammoPacks[i].draw(Game.context);

    // Rysuje gracza
    Game.player.draw(Game.context,Game.camera.xView,Game.camera.yView);
    
    // Rysuje wrogów
    for(let i = 0; i<this.enemies.length; i++) Game.enemies[i].draw(Game.context);
};

// GameOver
Game.drawEnd = function() {
    
    if(this.player.kills>getCookie('rekord')) setCookie('rekord',Game.player.kills);
    
    Game.context.fillStyle = "#444";
    Game.context.fillRect(0, 0, Game.width, Game.height);
    Game.context.font = "60px Arial";
    Game.context.fillStyle = "darkred";
    Game.context.fillText("Game Over",200,500);
    Game.context.font = "20px Arial";
    Game.context.fillStyle = "white";
    Game.context.fillText("Zabici wrogowie: "+Game.player.kills,210,540);
    Game.context.fillText("Obecny rekord: "+getCookie('rekord'),210,565);
}

// Pauza
Game.drawPause = function() {
    Game.context.fillStyle = "#555";
    Game.context.fillRect(0, 0, Game.width, Game.height);
    Game.context.font = "60px Arial";
    Game.context.fillStyle = "darkred";
    Game.context.fillText("Gra wstrzymana!",200,500);
    Game.context.font = "20px Arial";
    Game.context.fillStyle = "white";
    Game.context.fillText("Naciśnij [ESC] by kontynuować",210,540);
}

Game.update = function() {
    
    document.onmousemove=function(e){cursorX=(e=e||event).clientX;cursorY=e.clientY} 
    
    //// UPDATE'Y

    Game.camera.update(); // Kamera

    Game.player.update(); // Gracz

    for(let i = 0; i<this.enemies.length; i++) Game.enemies[i].update(i); // Wrogowie

    for(let i = 0; i<this.ammoPacks.length; i++) Game.ammoPacks[i].update(i); // AmmoPack'i i HealtPack'i

    if(this.player.hp <= 0 && this.player.dead == false) { // Zgon gracza
        this.player.dead = true;
        Game.endGame = true;
    }

    //// GENERACJA OBIEKTÓW

    if(Game.enemies.length == 0){ // Tworzenie wrogów
        for(let i = 0; i<this.wave; i++) Game.enemies[i] = new Mob(i, Game, Game.enemies,'Albert');
        this.wave+=2;
    }

    if(Game.ammoPacks.length == 0){ // Tworzenie AmmoPacków i HealtPacków
        for(let i = 0; i<this.wave; i+=2) {
            Game.ammoPacks[i] = new AmmoPack(i, Game.ammoPacks, 50);
            Game.ammoPacks[i+1] = new HealthPack(i+1, Game.ammoPacks, 50);
        }
    }
        
};
