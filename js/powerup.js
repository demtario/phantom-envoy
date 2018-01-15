class Powerup {
    constructor(index) {
        this.index = index;
        this.color = 'yellow';

        this.x = Math.round(Math.random()*Game.width) + Game.camera.xView;
        this.y = Math.round(Math.random()*Game.height) + Game.camera.yView;

        this.width = 80;

        this.shallBeDestroyed = false;
    }

    draw(context) {
        context.save();
        context.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);

        context.rotate(this.angle * Math.PI/180);

        context.fillStyle = this.color;
        context.fillRect(-this.width/2, -this.width/2, this.width/2, this.width/2);

        context.closePath();

        context.restore();
    }

    update() {
        //Jeśli kolizja
        if(this.x+10+this.width/2 > Game.player.x && this.x-10-this.width/2 < Game.player.x)
                if(this.y+10+this.width/2 > Game.player.y && this.y-10-this.width/2 < Game.player.y) {
                    this.shallBeDestroyed = true;
                    this.doSomething(Game.player);
                }
    }

    doSomething(target) {
        console.log('elo');
    }
}

class AmmoPack extends Powerup {

    constructor(index, howMany) {
        super();

        this.howMany = howMany;
        this.color = '#ff9900';
    }

    doSomething(target) {
       target.weapon.ammo += this.howMany;
    }

}

class HealthPack extends Powerup {

    constructor(index, howMany) {
        super();

        this.howMany = howMany;
        this.color = 'darkred';
    }

    doSomething(target) {
        target.hp += this.howMany;
        if(target.hp > target.maxHp) target.hp = target.maxHp;
    }

}
