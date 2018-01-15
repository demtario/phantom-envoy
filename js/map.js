class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    generate() {

        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        let rows = ~~(this.width/44) + 1;
        let columns = ~~(this.height/44) + 1;

        let color = "#555";
        ctx.save();
        ctx.fillStyle = color;

        for (var x = 0, i = 0; i < rows; x+=44, i++) {
            ctx.beginPath();
            for (var y = 0, j=0; j < columns; y+=44, j++) {
                ctx.rect (x, y, 40, 40);
            }
            color = (color == "#555" ? "#4a4a4a" : "#555");
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();

        // store the generate map as this image texture
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL("image/png");

        // clear context
        ctx = null;

    }

    draw(context, xView, yView) {
        // easiest way: draw the entire map changing only the destination coordinate in canvas
        // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
        //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);

        // didactic way:

        var sx, sy, dx, dy;
                var sWidth, sHeight, dWidth, dHeight;

        // offset point to crop the image
        sx = xView;
        sy = yView;

        // dimensions of cropped image
        sWidth =  context.canvas.width;
        sHeight = context.canvas.height;

        // if cropped image is smaller than canvas we need to change the source dimensions
        if(this.image.width - sx < sWidth){
            sWidth = this.image.width - sx;
        }
        if(this.image.height - sy < sHeight){
            sHeight = this.image.height - sy;
        }

        // location on canvas to draw the croped image
        dx = 0;
        dy = 0;
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;

        context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
