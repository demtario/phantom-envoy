function Mob(index, name) {
    this.index = index;
    
    this.name = name;
    this.x = Math.round(Math.random()*Game.width);
    this.y = Math.round(Math.random()*Game.height);
    this.angle = 0;
    this.moveSpeed = 120; // px/s
    
    this.attackSpeed = 2; // ciosy na sekunde
    this.damage = 20;
    this.attackRange = 45; // kwadrat o daną odległość od centrum mobka
    this.attackDelay = false;
    
    this.hp = 500;
    this.maxHp = 1000;
    
}

Mob.prototype.draw = function(context) {
    
    context.save();
    context.translate(this.x, this.y);
    
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText(this.hp,-10,-30);
    
    context.rotate(this.angle * Math.PI/180);
    
    context.fillStyle='darkred';
    context.fillRect(-10, -30, 20, 60);
    
    context.beginPath();
    context.fillStyle = 'darksalmon';
    context.arc(0,0,20,0,2*Math.PI);
    context.fill();
    
    context.closePath();
    
    context.restore();
}

Mob.prototype.update = function() {
    
    // Kąt obrotu
    this.angle = Math.atan2(Game.player.x - this.x, - (Game.player.y - this.y) )*(180/Math.PI) - 90;
    
    // Ruch
    var vx = this.moveSpeed/60 * Math.cos(this.angle-(Math.PI/2));
    var vy = this.moveSpeed/60 * Math.sin(this.angle-(Math.PI/2));

    this.x += vx;
    this.y += vy;
    
    // Atak gracza
    if(this.x+this.attackRange > Game.player.x && this.x-this.attackRange < Game.player.x)
        if(this.y+this.attackRange > Game.player.y && this.y-this.attackRange < Game.player.y) this.attack(Game.player);
    
}

Mob.prototype.moveLeft = function() {
    if(this.x > 20) this.x -= this.moveSpeed/Game.fps;
}

Mob.prototype.moveRight = function() {
    if(this.x < Game.width - 20) this.x += this.moveSpeed/Game.fps;
}

Mob.prototype.moveUp = function() {
    if(this.y > 20) this.y -= this.moveSpeed/Game.fps;
}

Mob.prototype.moveDown = function() {
    if(this.y < Game.height - 20) this.y += this.moveSpeed/Game.fps;
}

Mob.prototype.hurt = function(ile) {
    this.hp -= ile;
}

Mob.prototype.attack = function(target) {
    
    if(this.attackDelay == false){
        
        this.attackDelay = true;
        
        target.hurt(this.damage);
        
        let currThis = this;
        setTimeout(function() { resetAttackDelay(currThis); }, 1000/this.attackSpeed);
        function resetAttackDelay(THIS) {
            THIS.attackDelay = false;
        }
    }
}