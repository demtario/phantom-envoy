class Weapon {
    constructor(name, magSize, fireRate, reloadTime, bulletVelocity, maxDamage, minDamage, dispersion, variant) {
        this.name = name;
        this.magSize = magSize;
        this.fireRate = 60000/fireRate; //RPM
        this.reloadTime = reloadTime; //miliseconds
        this.bulletVelocity = bulletVelocity; // m/s
        this.damage = [maxDamage, minDamage];
        this.dispersion = dispersion;

        this.length = 70;

        this.variant = variant;

        this.mag = magSize;
        this.ammo = 400 - this.mag;
        if(this.ammo<0) {
            this.mag += this.ammo;
            this.ammo = 0;
        }
        this.delay = false;
    }
}

class Bullet {
    constructor(index, sourceX, sourceY, speed, angle, damage, parent, container) {
        this.index = index;
        this.parent = parent;
        this.container = container;

        this.x = sourceX;
        this.y = sourceY;
        this.directionX = cursorX - this.x;
        this.directionY = cursorY - this.y;
        this.speed = speed;

        this.angle = angle;

        this.damage = damage;
    }

    init(context) {
        context.save();
        context.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);
        context.rotate(this.angle);
        context.beginPath();
        context.fillStyle = 'gold';

        context.fillRect(-1, 10, 1, 25)

        context.fill();
        context.closePath();
        context.restore();
    }
    
    update(newIndex) {

        this.index = newIndex;

        // przemieszczenie pocisku
        let vx = this.speed/30 * Math.cos(this.angle-(Math.PI/2));
		let vy = this.speed/30 * Math.sin(this.angle-(Math.PI/2));

		this.x += vx;
		this.y += vy;
        
        // delecja pocisków poza światem
        if(this.x > Game.world.width+20 || this.x < -20 || this.y > Game.world.height+20 || this.y < -20) {
            this.container.splice(this.index,1);
            delete this;
        }

        // zadanie obrażeń

//        let col = isColiding(this.x, this.y, Game.enemies);
//
//        if(!col) {
//            this.dealDamage(col);
//            this.delete();
//        }

        for(var i = 0; i < Game.enemies.length; i++){
             if(this.x+30 > Game.enemies[i].x && this.x-30 < Game.enemies[i].x)
                if(this.y+30 > Game.enemies[i].y && this.y-30 < Game.enemies[i].y) {

                    this.dealDamage(Game.enemies[i]);
                    this.delete();

                }
        }

        if(this.x+30 > Game.player.x && this.x-30 < Game.player.x)
            if(this.y+30 > Game.player.y && this.y-30 < Game.player.y) {
                this.dealDamage(Game.player);
                this.delete();
            }

        // Kolizja z osłoną
        if(isColision(this)) this.delete();

    }
    
    dealDamage(target) {
        target.hurt(this.damage);
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}
