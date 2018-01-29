class Cover {
    constructor(index, x, y, size, lifetime, parent, container) {
        this.index = index;

        this.parent = parent;
        this.container = container;

        this.lifeTime = lifetime;

        this.texture = new Image();
        this.texture.src = 'img/cover.jpg';

        this.size = size;

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

function isColiding(px, py, me, table) {


    if(me.size) {
        var PsizeX = me.size/2;
        var PsizeY = me.size/2;
    } else {
        var PsizeX = me.sizeX/2;
        var PsizeY = me.sizeY/2;
    }

    for(let i = 0; i < table.length; i++) {

        let x = table[i].x;
        let y = table[i].y;

        if(table[i].size) {
            var sizeX = table[i].size/2;
            var sizeY = table[i].size/2;
        } else {
            var sizeX = table[i].sizeX/2;
            var sizeY = table[i].sizeY/2;
        }


        if(Math.abs(px - x) < sizeX + PsizeX)
            if(Math.abs(py - y) < sizeY + PsizeY) {
                return i+1;
            }

    }
    return false;
}
