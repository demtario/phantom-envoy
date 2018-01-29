class Powerup {
    constructor(index, container) {
        this.index = index;
        this.container = container;
        this.color = 'yellow';

        this.x = Math.round(Math.random()*Game.width) + Game.camera.xView;
        this.y = Math.round(Math.random()*Game.height) + Game.camera.yView;

        this.width = 50;

        this.shallBeDestroyed = false;
    }

    draw(context) {
        context.save();
        context.translate(this.x - Game.camera.xView, this.y - Game.camera.yView);

        context.rotate(this.angle * Math.PI/180);

        if(this.texture) {
            context.drawImage(this.texture, -this.width/2, -this.width/2, this.width, this.width);
        } else {
            context.fillStyle = this.color;
            context.fillRect(-this.width/2, -this.width/2, this.width/2, this.width/2);
        }

        context.closePath();

        context.restore();
    }

    update(newIndex) {

        this.index = newIndex;

        //Jeśli kolizja
        if(this.x+10+this.width/2 > Game.player.x && this.x-10-this.width/2 < Game.player.x)
                if(this.y+10+this.width/2 > Game.player.y && this.y-10-this.width/2 < Game.player.y) {

                    // Działanie
                    this.doSomething(Game.player);

                    // Zniszczenie
                    this.delete();
                }
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }

    doSomething(target) {
        console.log('jeszcze nic nie robię');
    }
}

class AmmoPack extends Powerup {

    constructor(index, container, howMany) {
        super();

        //this.texture = new Image();
        //this.texture.src = 'img/ammopack.png';

        this.container = container;
        this.howMany = howMany;
        this.color = '#ff9900';
    }

    doSomething(target) {
       target.weapon.ammo += this.howMany;
    }

}

class HealthPack extends Powerup {

    constructor(index, container, howMany) {
        super();

        this.texture = new Image();
        this.texture.src = 'img/firstaid.png';

        this.container = container;
        this.howMany = howMany;
        this.color = 'darkred';
    }

    doSomething(target) {
        target.hp += this.howMany;
        if(target.hp > target.maxHp) target.hp = target.maxHp;
    }

}
