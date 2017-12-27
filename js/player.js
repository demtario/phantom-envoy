function Player() {
    this.x = 100;
    this.y = 500;
    this.angle;
    
    this.hp = 500;
    this.maxHp = 1000;
    this.zgonAlert = false;
    
    this.mana = 600;
    this.maxMana = 1400;
    
    this.reloading = false;
    
    this.primaryWeapon = new Weapon('AK-47', 30, 650, 3500, 600, 18, 25, '#333');
    this.secondaryWeapon = new Weapon('P90', 50, 900, 3000, 420, 11, 20, '#169');
    
    this.weapon = this.primaryWeapon;
    
    this.bullets = [];
}

Player.prototype.draw = function(context) {
    
    for(var i = 0; i < this.bullets.length; i++) this.bullets[i].init(context);
    
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle * Math.PI/180);
    
    context.beginPath();
    context.fillStyle='#CCBAAC';
    context.moveTo(10, -15);
    context.lineTo(10, 15);
    context.lineTo(36, 0);
    context.fill();
    context.closePath();
    
    context.fillStyle='#260';
    context.fillRect(-10, -30, 20, 60);
    
    context.fillStyle = this.weapon.color;
    context.fillRect(24, -4, 20, 8);
    
    context.beginPath();
    context.fillStyle = 'saddlebrown';
    context.arc(0,0,20,0,2*Math.PI);
    context.fill();
    context.closePath();
    
    context.restore();
    
}

Player.prototype.update = function() {
    
    // Poruszanie się
    if(Key.isDown(Key.UP) || Key.isDown(Key.W)) this.moveUp();
    if(Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.moveLeft();
    if(Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.moveDown();
    if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.moveRight();
    
    //Strzelanie
    if(mouseDown) this.shoot();
    
    for(var i = 0; i < this.bullets.length; i++) {
        
        this.bullets[i].move();
        
        //niszczy pociski poza planszą
        if(this.bullets[i].currX > Game.width+20 || this.bullets[i].currX < -20 || this.bullets[i].currY > Game.height+20 || this.bullets[i].currY < -20) {
            delete this.bullets[i];
            this.bullets.splice(i,1);
        }
    }
    
    //Przeładowanie
    if(nowClicked == 82) {
        this.reloadWeapon();
        nowClicked = 'r';
    } 
    
    //Zmiana broni
    if(nowClicked == 69) {
        this.switchWeapon();
        nowClicked = 'e';
    }
    
    // Aktualizacja GUI
    $('#life-bar').css('width', (this.hp/this.maxHp)*100+'%');
    $('#life-info').html(this.hp+'/'+this.maxHp);
    
    $('#mana-bar').css('width', (this.mana/this.maxMana)*100+'%');
    $('#mana-info').html(this.mana+'/'+this.maxMana);
    
    document.getElementById("gun-mag").innerHTML = this.weapon.mag;
    document.getElementById("gun-ammo").innerHTML = this.weapon.ammo;
    document.getElementById("gun-name").innerHTML = this.weapon.name;
    
    // Kąt obrotu
    this.angle = Math.atan2(cursorX - this.x, - (cursorY - this.y) )*(180/Math.PI) - 90;
    
    // Zgon
    if(this.hp <= 0 && this.zgonAlert == false) {
        this.zgonAlert = true;
        
        // Tutaj kod po śmierci
        alert('umarles');
    }
    
}

Player.prototype.moveLeft = function() {
    this.x -=2;
}

Player.prototype.moveRight = function() {
    this.x +=2;
}

Player.prototype.moveUp = function() {
    this.y -=2;
}

Player.prototype.moveDown = function() {
    this.y +=2;
} 

Player.prototype.hurt = function(ile) {
    this.hp -= ile;
}

