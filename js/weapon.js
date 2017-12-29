function Weapon(name, magSize, fireRate, reloadTime, bulletVelocity, maxDamage, minDamage, color) {
    this.name = name;
    this.magSize = magSize;
    this.fireRate = 60000/fireRate; //RPM
    this.reloadTime = reloadTime; //miliseconds
    this.bulletVelocity = bulletVelocity; // m/s
    this.damage = [maxDamage, minDamage];
    this.color = color;

    this.mag = magSize;
    this.ammo = 400 - this.mag;
    this.delay = false;

}

function Bullet(index, sourceX, sourceY, speed, angle, damage, parent) {
    
    this.index = index;
    this.parent = parent;
    
    this.currX = sourceX;
    this.currY = sourceY;
    this.directionX = cursorX - this.currX;
    this.directionY = cursorY - this.currY;
    this.speed = speed;
    this.angle = (angle+90) * Math.PI/180;
    this.damage = damage;

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

		this.currX += vx;
		this.currY += vy;	
        
        for(var i = 0; i < Game.enemies.length; i++){
            
             if(this.currX+30 > Game.enemies[i].x && this.currX-30 < Game.enemies[i].x)
                if(this.currY+30 > Game.enemies[i].y && this.currY-30 < Game.enemies[i].y) this.dealDamage(Game.enemies[i]);
        }
        
    }
    
    this.dealDamage = function(target){
        if(!this.shallBeDestroyed) {
            target.hurt(this.damage);
            this.shallBeDestroyed = true;
        }
    }
    
}

Player.prototype.shoot = function() {
    if(this.weapon.mag > 0) {

        if(this.reloading == false) {

            if(this.weapon.delay == false) {
                    
                // Strzal
                let damageRand = Math.floor(Math.random()*(this.weapon.damage[1]-this.weapon.damage[0]+1)+this.weapon.damage[1]);
                    
                var newBullet = new Bullet(this.bullets.length, this.x, this.y, this.weapon.bulletVelocity, this.angle, damageRand, this);
                this.bullets.push(newBullet);
                    
                this.weapon.mag--;
                
                if(Game.sound) shot2Sound.play();

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
    } else {
        //brak pocisków w magazynku
        if(Game.sound) emptySound.play();
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
            var oldSpeed = this.moveSpeed;
            this.moveSpeed /= 2;
            
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
                
                play.moveSpeed = oldSpeed;
                document.getElementById("gun-reloading-bar").style.transition = "0s";
                document.getElementById("gun-reloading-bar").style.width = "0";
                
                if(Game.sound) reloadSound.play();
            }
            
        } else {
            //brak ammo lub pelen magazynek
        }
    }
}