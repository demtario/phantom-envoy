function Weapon(name, magSize, fireRate, reloadTime, bulletVelocity, maxDamage, minDamage, color) {
    this.name = name;
    this.magSize = magSize;
    this.fireRate = 60000/fireRate; //RPM
    this.reloadTime = reloadTime; //miliseconds
    this.bulletVelocity = bulletVelocity; // m/s
    this.damage = [maxDamage, minDamage];
    this.color = color;

    this.mag = 28;
    this.ammo = 120;
    this.delay = false;

}

Player.prototype.shoot = function() {
    if(this.weapon.mag > 0) {

        if(this.reloading == false) {

            if(this.weapon.delay == false) {
                    
                // Strzal
                let damageRand = Math.floor(Math.random()*(this.weapon.damage[1]-this.weapon.damage[0]+1)+this.weapon.damage[1]);
                    
                var newBullet = new Bullet(this.x, this.y, this.weapon.bulletVelocity, this.angle, damageRand);
                this.bullets.push(newBullet);
                    
                this.weapon.mag--;

                this.weapon.delay = true;
                let currThis = this;

                setTimeout(function() { resetDelay(currThis); }, this.weapon.fireRate);
                
                function resetDelay(THIS) {
                    THIS.weapon.delay = false;
                }
                    
            }
        } else {

            clearTimeout(this.reloadTimeout);
            document.getElementById("gun-reloading-bar").style.transition = "0s";
            document.getElementById("gun-reloading-bar").style.width = "0";
            this.reloading = false;
            this.shoot();

        }
    }
}

Player.prototype.switchWeapon = function() {
    
    if(this.weapon == this.primaryWeapon) this.weapon = this.secondaryWeapon;
    else this.weapon = this.primaryWeapon;

    clearTimeout(this.reloadTimeout);
    document.getElementById("gun-reloading-bar").style.transition = "0s";
    document.getElementById("gun-reloading-bar").style.width = "0";
    this.reloading = false;
    this.weapon.delay = false;
}

Player.prototype.reloadWeapon = function() {
    
    if(this.reloading == false) {
        
        if(this.weapon.ammo > 0 && this.weapon.mag < this.weapon.magSize) {
            
            this.reloading = true;
            document.getElementById("gun-reloading-bar").style.transition = this.weapon.reloadTime/1000 + "s linear";
            document.getElementById("gun-reloading-bar").style.width = "100%";
            
            let currThis = this;
            
            this.reloadTimeout = setTimeout(function() { relo(currThis); }, this.weapon.reloadTime);
            
            let relo = function(play) {
                
                if(play.weapon.mag > 0) {
                    
                   play.weapon.ammo += play.weapon.mag;
                   play.weapon.mag = 0;
                    
                } 
                
                play.weapon.mag = play.weapon.ammo >= play.weapon.magSize ? play.weapon.magSize : play.weapon.ammo;
                play.weapon.ammo -= play.weapon.mag;
                play.reloading = false;
                
                document.getElementById("gun-reloading-bar").style.transition = "0s";
                document.getElementById("gun-reloading-bar").style.width = "0";
            }
            
        } else {
            //brak ammo lub pelen magazynek
        }
    }
}

function Bullet(sourceX, sourceY, speed, angle, damage) {
    
    this.currX = sourceX;
    this.currY = sourceY;
    this.directionX = cursorX - this.currX;
    this.directionY = cursorY - this.currY;
    this.speed = speed;
    this.angle = (angle+90) * Math.PI/180;
    this.damage = damage;
    
    this.len = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
    this.directionX /= this.len;
    this.directionY /= this.len;

    this.init = function(context) {
        context.beginPath();
        context.fillStyle = 'gold';
        context.arc(this.currX, this.currY, 2, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    }
    
    this.move = function() {
        
        var vx = this.speed/30 * Math.cos(this.angle-(Math.PI/2));
		var vy = this.speed/30 * Math.sin(this.angle-(Math.PI/2));
        
//        console.log(vx);
		
        // move the bullet 
		this.currX += vx;
		this.currY += vy;		
        
//        this.currX += speed / 60;
//        this.currY += speed / 60;
//        console.log(this.currX + ', ' + this.currY);
    }
    
}