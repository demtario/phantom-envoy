class Mob {
    constructor (index, parent, container, target) {
        this.index = index;
        this.parent = parent;
        this.container = container;

        this.sizeX = 20;
        this.sizeY = 20;

        this.target = target;

        this.texture = new Image();

        this.x = Math.round(Math.random()*Game.width) + Game.camera.xView;
        this.y = Math.round(Math.random()*Game.height) + Game.camera.yView;
        this.angle = 0;
        this.moveSpeed = 110; // px/s

        this.maxHp = 500;
        this.hp = this.maxHp;
    }

    moveLeft(skos = 1) {
        if(this.x > 20) this.x -= this.moveSpeed/Game.fps*this.speedModifier / skos;
    }

    moveRight(skos = 1) {
        if(this.x < Game.world.width - 20) this.x += this.moveSpeed/Game.fps / skos;
    }

    moveUp(skos = 1) {
        if(this.y > 20) this.y -= this.moveSpeed/Game.fps / skos;
    }

    moveDown(skos = 1) {
        if(this.y < Game.world.height - 20) this.y += this.moveSpeed/Game.fps / skos;
    }

    hurt(ile) {
        this.hp -= ile;
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}

class Zombie extends Mob {
    constructor (index, parent, container, target) {

        super(index, parent, container, target);

        this.texture.src = 'img/zombie.png';

        this.attackSpeed = 2; // ciosy na sekunde
        this.damage = 20;
        this.attackRange = 45; // kwadrat o daną odległość od centrum mobka
        this.attackDelay = false;
    }
    
    draw(context) {
        context.save();
        context.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);

        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(this.hp,-20,-40);

        context.rotate(this.angle * Math.PI/180);

        context.drawImage(this.texture, -40, -50, 120, 90);

//        context.fillStyle='darkred';
//        context.fillRect(-10, -30, 20, 60);
//
//        context.beginPath();
//        context.fillStyle = 'darksalmon';
//        context.arc(0,0,20,0,2*Math.PI);
//        context.fill();

        context.closePath();

        context.restore();
    }
    
    update(newIndex) {

        this.index = newIndex;

        // Kąt obrotu
        this.angle = Math.atan2(this.target.x - this.x, - (this.target.y - this.y) )*(180/Math.PI) - 90;

        // Ruch
        var vx = this.moveSpeed/60 * Math.cos(this.angle-(Math.PI/2));
        var vy = this.moveSpeed/60 * Math.sin(this.angle-(Math.PI/2));


        let col = isColiding(this.x + vx, this.y + vy, Game.covers);

        if ( !col ) {
            this.x += vx;
            this.y += vy;
        }

        // Atak gracza
        if(this.x+this.attackRange > Game.player.x && this.x-this.attackRange < Game.player.x)
            if(this.y+this.attackRange > Game.player.y && this.y-this.attackRange < Game.player.y) this.attack(Game.player);

        // Śmierć
        if(this.hp <= 0) {
            this.parent.player.kills++;
            this.delete();
        }
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
}

class Sniper extends Mob {
    constructor (index, parent, container, target) {

        super(index, parent, container, target);

        this.texture.src = 'img/snajper.png';

        this.weapon = new Weapon('AK-47', 30, 650, 2500, 1200, 18, 25, 4, 'rifle1');

        this.shootRange = 400;
        this.shootSpeed = 1; // ciosy na sekunde
        this.shootDelay = false;

        this.bullets = [];
    }

    draw(context) {
         // Pociski
        for(var i = 0; i < this.bullets.length; i++) this.bullets[i].init(context);

        context.save();
        context.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);

        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(this.hp,-20,-40);

        context.rotate(this.angle * Math.PI/180);

        context.drawImage(this.texture, -40, -50, 120, 90);

        context.closePath();

        context.restore();
    }

    update(newIndex) {

        this.index = newIndex;

        // Kąt obrotu
        this.angle = Math.atan2(this.target.y - this.y, (this.target.x - this.x) )*(180/Math.PI);
        if(this.angle < 0) this.angle += 360;

        // Ruch
        var vx = this.moveSpeed/60 * Math.cos(this.angle-(Math.PI/2));
        var vy = this.moveSpeed/60 * Math.sin(this.angle-(Math.PI/2));

        this.distance = Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2));

        let forward = isColiding(this.x + vx, this.y + vy, Game.covers);
        let backward = isColiding(this.x - vx, this.y + vy, Game.covers);

        if ( this.distance > this.shootRange + 30 && !forward ) {
            this.x += vx;
            this.y += vy;
        } else if( this.distance < this.shootRange - 30 && !backward ) {
            this.x -= vx;
            this.y += vy;
        }

        // Pociski
        for(var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update(i);
        }

        // Pozycja lufy
        this.weapon.barrelX = this.x + this.weapon.length * Math.cos((this.angle + 13) / (180/Math.PI));
        this.weapon.barrelY = this.y + this.weapon.length * Math.sin((this.angle + 13) / (180/Math.PI));

        // Atak gracza
        this.shoot(Game.player);

        // Śmierć
        if(this.hp <= 0) {
            this.parent.player.kills++;
            this.delete();
        }
    }

    shoot(target) {
        if(!this.shootDelay){

            this.shootDelay = true;
            let newBullet = new Bullet(this.bullets.length, this.weapon.barrelX, this.weapon.barrelY, 300, (this.angle+90)/(180/Math.PI), 20, this, this.bullets);
            this.bullets.push(newBullet);

            let currThis = this;
            setTimeout(function() { resetAttackDelay(currThis); }, 1000/this.shootSpeed);
            function resetAttackDelay(THIS) {
                THIS.shootDelay = false;
            }
        }
    }
}
