class Weapon {
    constructor(name, magSize, fireRate, reloadTime, bulletVelocity, maxDamage, minDamage, dispersion, color='#333', variant) {
        this.name = name;
        this.magSize = magSize;
        this.fireRate = 60000/fireRate; //RPM
        this.reloadTime = reloadTime; //miliseconds
        this.bulletVelocity = bulletVelocity; // m/s
        this.damage = [maxDamage, minDamage];
        this.dispersion = dispersion;
        this.color = color;

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

        this.currX = sourceX;
        this.currY = sourceY;
        this.directionX = cursorX - this.currX;
        this.directionY = cursorY - this.currY;
        this.speed = speed;

        this.angle = angle;

        this.damage = damage;
    }

    init(context) {
        context.save();
        context.translate(this.currX - Game.camera.xView, this.currY - Game.camera.yView);
        context.rotate(this.angle);
        context.beginPath();
        context.fillStyle = 'gold';

        //context.arc(this.currX - Game.camera.xView, this.currY - Game.camera.yView, 2, 0, 2*Math.PI);

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

		this.currX += vx;
		this.currY += vy;	
        
        // delecja pocisków poza światem
        if(this.currX > Game.world.width+20 || this.currX < -20 || this.currY > Game.world.height+20 || this.currY < -20) {
            this.container.splice(this.index,1);
            delete this;
        }

        // zadanie obrażeń
        for(var i = 0; i < Game.enemies.length; i++){
             if(this.currX+30 > Game.enemies[i].x && this.currX-30 < Game.enemies[i].x)
                if(this.currY+30 > Game.enemies[i].y && this.currY-30 < Game.enemies[i].y) {

                    this.dealDamage(Game.enemies[i]);
                    this.delete();

                }
        }

    }
    
    dealDamage(target) {
        if(!this.shallBeDestroyed) {
            target.hurt(this.damage);
            this.shallBeDestroyed = true;
        }
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}
