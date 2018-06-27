class Vehicle {
    constructor(index, container, x, y,) {
        this.index = index
        this.container = container

        this.x = x
        this.y = y

        this.angle = 0;

        this.sizeX = 100
        this.sizeY = 160

        this.maxSpeed = 40 //pixels per second
        this.acceleration = 2 //pps^2

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

        if(this.isDriver) {

            let vX = 0;
            let vY = 0;

            if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.angle++; // Prawo
            if(Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.angle--; // Lewo
    
            if(Key.isDown(Key.UP) || Key.isDown(Key.W) ) this.currentSpeed = 40; // Góra
            if(Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.currentSpeed = 0; //Dół

            let vx = this.currentSpeed/30 * Math.cos(this.angle-(Math.PI/2));
            let vy = this.currentSpeed/30 * Math.sin(this.angle-(Math.PI/2));

            this.x += vx;
            this.y += vy;

        }
    }

    playerEnter() {
        this.isDriver = true
    }

    playerExit() {
        this.isDriver = false

    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}