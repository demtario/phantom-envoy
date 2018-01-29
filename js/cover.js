class Cover {
    constructor(index, x, y, size, parent, container) {
        this.index = index;

        this.parent = parent;

        this.texture = new Image();
        this.texture.src = 'img/cover.jpg';

        this.size = size;
        this.sizeX = size;
        this.sizeY = size;

        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - Game.camera.xView - this.size/2, this.y - Game.camera.yView - this.size/2);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.drawImage(this.texture, 0, 0, this.size, this.size);
        ctx.restore();
    }
}

function isColision(object) {
    for(let i = 0; i < Game.covers.length; i++){
        if(object.x > Game.covers[i].x - Game.covers[i].size/2 && object.x < Game.covers[i].x + Game.covers[i].size/2)
            if(object.y > Game.covers[i].y - Game.covers[i].size/2 && object.y < Game.covers[i].y + Game.covers[i].size/2) {
                return true;
            }
        }
    return false;
}

function isColiding(px, py, table) {
    for(let i = 0; i < table.length; i++) {

        let x = table[i].x;
        let y = table[i].y;
        let sizeX = table[i].sizeX/2;
        let sizeY = table[i].sizeY/2;

        if(Math.abs(px - x) < sizeX + 20)
            if(Math.abs(py - y) < sizeY + 20) return table[i];

    }
    return false;
}
