class Weapon {
    constructor(name, magSize, fireRate, reloadTime, bulletVelocity, maxDamage, minDamage, dispersion, color='#333') {
        this.name = name;
        this.magSize = magSize;
        this.fireRate = 60000/fireRate; //RPM
        this.reloadTime = reloadTime; //miliseconds
        this.bulletVelocity = bulletVelocity; // m/s
        this.damage = [maxDamage, minDamage];
        this.dispersion = dispersion;
        this.color = color;

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
    constructor(index, sourceX, sourceY, speed, angle, damage, parent) {
        this.index = index;
        this.parent = parent;

        this.currX = sourceX;
        this.currY = sourceY;
        this.directionX = cursorX - this.currX;
        this.directionY = cursorY - this.currY;
        this.speed = speed;

        this.angle = angle;

        this.damage = damage;
    }

    init(context) {
        context.beginPath();
        context.fillStyle = 'gold';
        context.arc(this.currX, this.currY, 2, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    }
    
    move() {
        var vx = this.speed/30 * Math.cos(this.angle-(Math.PI/2));
		var vy = this.speed/30 * Math.sin(this.angle-(Math.PI/2));

		this.currX += vx;
		this.currY += vy;	
        
        for(var i = 0; i < Game.enemies.length; i++){
            
             if(this.currX+30 > Game.enemies[i].x && this.currX-30 < Game.enemies[i].x)
                if(this.currY+30 > Game.enemies[i].y && this.currY-30 < Game.enemies[i].y) this.dealDamage(Game.enemies[i]);
        }
    }
    
    dealDamage(target) {
        if(!this.shallBeDestroyed) {
            target.hurt(this.damage);
            this.shallBeDestroyed = true;
        }
    }
}
