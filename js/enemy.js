class Mob {
    constructor (index, parent, container, name) {
        this.index = index;
        this.parent = parent;
        this.container = container;

        this.name = name;
        this.x = Math.round(Math.random()*Game.width) + Game.camera.xView;
        this.y = Math.round(Math.random()*Game.height) + Game.camera.yView;
        this.angle = 0;
        this.moveSpeed = 140; // px/s

        this.attackSpeed = 2; // ciosy na sekunde
        this.damage = 20;
        this.attackRange = 45; // kwadrat o daną odległość od centrum mobka
        this.attackDelay = false;

        this.maxHp = 600;
        this.hp = this.maxHp;
    }
    
    draw(context) {
        context.save();
        context.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);

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
    
    update(newIndex) {

        this.index = newIndex;

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

        // Śmierć
        if(this.hp <= 0) {
            this.parent.player.kills++;
            this.delete();
        }
    }
    
    moveLeft() {
        if(this.x > 20) this.x -= this.moveSpeed/Game.fps;
    }
    
    moveRight() {
        if(this.x < Game.width - 20) this.x += this.moveSpeed/Game.fps;
    }
    
    moveUp() {
        if(this.y > 20) this.y -= this.moveSpeed/Game.fps;
    }
    
    moveDown() {
        if(this.y < Game.height - 20) this.y += this.moveSpeed/Game.fps;
    }
    
    hurt(ile) {
        this.hp -= ile;
    }
    
    attack(target) {
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

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}