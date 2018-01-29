class Cover {
    constructor(index, x, y, size, lifetime, parent, container) {
        this.index = index;

        this.parent = parent;
        this.container = container;

        this.lifeTime = lifetime;

        this.texture = new Image();
        this.texture.src = 'img/cover.jpg';

        this.size = size;
        this.sizeX = size - 20;
        this.sizeY = size - 20;

        this.x = x;
        this.y = y;

        let THIS = this;

        setTimeout(function() { THIS.delete() }, this.lifeTime);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - Game.camera.xView - this.size/2, this.y - Game.camera.yView - this.size/2);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.drawImage(this.texture, 0, 0, this.size, this.size);
        ctx.restore();
    }

    delete() {
        this.container.splice(this.index,1);
        delete this;
    }
}

function isColiding(px, py, table) {
    for(let i = 0; i < table.length; i++) {

        let x = table[i].x;
        let y = table[i].y;
        let sizeX = table[i].sizeX/2;
        let sizeY = table[i].sizeY/2;

        if(Math.abs(px - x) < sizeX + 20)
            if(Math.abs(py - y) < sizeY + 20) {
                return i+1;
            }

    }
    return false;
}
