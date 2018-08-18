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

        this.size = 2;

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
        
        // Kolizje
        let area = isColiding(this.x + vx, this.y + vy, this, [{x: Game.world.width/2, y: Game.world.height/2, sizeX: Game.world.width-50, sizeY: Game.world.height-50}]);
        if(!area) {
            this.delete();
        }

        // zadanie obrażeń

        //wróg
        let enemyCol = isColiding(this.x, this.y, this, Game.enemies);
        if(enemyCol) {
            this.dealDamage(Game.enemies[enemyCol-1]);
            this.delete();
        }

        //pojazdy
        let vehicleCol = isColiding(this.x, this.y, this, Game.vehicles);
        if(vehicleCol && !Game.player.inVehicle) {
            this.dealDamage(Game.vehicles[vehicleCol-1]);
            this.delete();
        }

        //gracz
        let playerCol = isColiding(this.x, this.y, this, [Game.player]);
        if(playerCol) {
            this.dealDamage(Game.player);
            this.delete();
        }

        // Kolizja z osłoną
        let coverCol = isColiding(this.x - vx, this.y - vy, this, Game.covers);
        if(coverCol) this.delete();

    }
    
    dealDamage(target) {
        target.hurt(this.damage);
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}
