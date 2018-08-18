class Vehicle {
    constructor(index, container, x, y,) {
        this.index = index
        this.container = container

        this.x = x
        this.y = y

        this.maxHp = 2000;
        this.hp = this.maxHp;

        this.angle = 0;

        this.sizeX = 100
        this.sizeY = 160

        this.maxSpeed = 420 //pixels per second
        this.acceleration = 2
        this.breaksPower = 1

        this.currentSpeed = 0
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);
        ctx.rotate(this.angle * Math.PI/180);
        ctx.fillStyle = '#422';
        ctx.fillRect(-this.sizeX/2, -this.sizeY/2, this.sizeX, this.sizeY);
        //ctx.drawImage(this.texture, 0, 0, this.size, this.size);
        ctx.restore();
    }

    update(i) {
        this.index = i

        let vX = 0;
        let vY = 0;

        if(this.isDriver) {

            if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.angle++; // Prawo
            if(Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.angle--; // Lewo
    
            if(Key.isDown(Key.UP) || Key.isDown(Key.W) )  // Góra
                if(this.currentSpeed + this.acceleration <= this.maxSpeed) this.currentSpeed += this.acceleration;
            
            if(Key.isDown(Key.DOWN) || Key.isDown(Key.S))  //Dół
                if(this.currentSpeed - this.breaksPower >= -60)this.currentSpeed -= this.breaksPower;

        } else {
            if(this.currentSpeed - this.breaksPower >= 0)this.currentSpeed -= this.breaksPower;
        }

        let vx = this.currentSpeed/60 * Math.cos(this.angle * Math.PI/180-(Math.PI/2));
        let vy = this.currentSpeed/60 * Math.sin(this.angle * Math.PI/180-(Math.PI/2));

        this.x += vx;
        this.y += vy;

        if(this.hp <= 0) {
            this.playerExit()
            this.delete()
        }
    }

    playerEnter() {
        this.isDriver = true
    }

    playerExit() {
        this.isDriver = false

    }

    hurt(ile) {
        this.hp -= ile;
        console.log(this.hp)
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}