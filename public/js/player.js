class Player {
    constructor(name, startX, startY) {
        this.name = name;

        this.x = startX;
        this.y = startY;
        this.angle;
        this.moveSpeed = 120; // px/s

        this.maxHp = 1000;
        this.hp = this.maxHp;
        this.dead = false;

        this.maxMana = 1400;
        this.mana = this.maxMana;

        this.kills = 0;

        this.reloading = false;

        this.primaryWeapon = new Weapon('AK-47', 30, 650, 3500, 1200, 18, 25, 4, '#333');
        this.secondaryWeapon = new Weapon('P90', 50, 900, 3000, 840, 11, 20, 8, '#169');

        this.weapon = this.primaryWeapon;

        this.bullets = [];
    }
    
    draw(context, xView, yView) {
        // Pociski
        for(var i = 0; i < this.bullets.length; i++) this.bullets[i].init(context);
    
        // Postać
        context.save();
        context.translate(this.x - xView, this.y - yView);
        context.rotate(this.angle * Math.PI/180);

        context.beginPath();
        context.fillStyle='#CCBAAC';
        context.moveTo(10, -15);
        context.lineTo(10, 15);
        context.lineTo(36, 0);
        context.fill();
        context.closePath();

        context.fillStyle='#260';
        context.fillRect(-10, -30, 20, 60);

        context.fillStyle = this.weapon.color;
        context.fillRect(24, -4, 20, 8);

        context.beginPath();
        context.fillStyle = 'saddlebrown';
        context.arc(0,0,20,0,2*Math.PI);
        context.fill();
        context.closePath();

        context.restore();
    }
    
    update() {
        // Poruszanie się
        if(Key.isDown(Key.UP) || Key.isDown(Key.W)) this.moveUp();
        if(Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.moveLeft();
        if(Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.moveDown();
        if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.moveRight();

        // Strzelanie
        if(mouseDown) this.shoot();

        // Pociski
        for(var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update(i);
        }

        //Przeładowanie
        if(nowClicked == 82) {
            this.reloadWeapon();
            nowClicked = 'r';
        }

        //Zmiana broni
        if(nowClicked == 69 || scrolling == true) {
            this.switchWeapon();
            nowClicked = 'e';
            scrolling = false;
        }

        //Sprint
        if(Key.isDown(Key.SHIFT) && !this.reloading) {
            this.speedModifier = 1.4;
            this.sprint = true;
        }
        else if(this.reloading) {
            this.sprint = false;
        } else {
            this.speedModifier = 1;
            this.sprint = false;
        }

        // Aktualizacja GUI

        document.getElementById("username").innerHTML = this.name;

        $('#life-bar').css('width', (this.hp/this.maxHp)*100+'%');
        $('#life-info').html(this.hp+'/'+this.maxHp);

        $('#mana-bar').css('width', (this.mana/this.maxMana)*100+'%');
        $('#mana-info').html(this.mana+'/'+this.maxMana);

        document.getElementById("kills").innerHTML = this.kills;

        document.getElementById("gun-mag").innerHTML = this.weapon.mag;
        document.getElementById("gun-ammo").innerHTML = this.weapon.ammo;
        document.getElementById("gun-name").innerHTML = this.weapon.name;

        // Kąt obrotu
        this.angle = Math.atan2(cursorX - this.x + Game.camera.xView, - (cursorY - this.y + Game.camera.yView) )*(180/Math.PI) - 90;
    }
    
    moveLeft() {
        if(this.x > 20) this.x -= this.moveSpeed/Game.fps*this.speedModifier;
    }
    
    moveRight() {
        if(this.x < Game.world.width - 20) this.x += this.moveSpeed/Game.fps*this.speedModifier;
    }
    
    moveUp() {
        if(this.y > 20) this.y -= this.moveSpeed/Game.fps*this.speedModifier;
    }
    
    moveDown() {
        if(this.y < Game.world.height - 20) this.y += this.moveSpeed/Game.fps*this.speedModifier;
    }
    
    shoot() {
        if(this.weapon.mag > 0 && !this.sprint) {

            if(!this.reloading) {

                if(!this.weapon.delay) {

                    // Strzal
                    let damageRand = Math.floor(Math.random()*(this.weapon.damage[1]-this.weapon.damage[0]+1)+this.weapon.damage[1]);

                    let dispersion = (this.angle+(Math.round(Math.random()*this.weapon.dispersion)-(this.weapon.dispersion/2))+90) * Math.PI/180;

                    let newBullet = new Bullet(this.bullets.length, this.x, this.y, this.weapon.bulletVelocity, dispersion, damageRand, this, this.bullets);
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
    
    switchWeapon() {
        if(this.weapon == this.primaryWeapon) this.weapon = this.secondaryWeapon;
        else this.weapon = this.primaryWeapon;

        clearTimeout(this.reloadTimeout);
        document.getElementById("gun-reloading-bar").style.transition = "0s";
        document.getElementById("gun-reloading-bar").style.width = "0";
        this.reloading = false;
        this.weapon.delay = false;
    }
    
    reloadWeapon() {
        if(this.reloading == false && this.speedModifier==1) {

            if(this.weapon.ammo > 0 && this.weapon.mag < this.weapon.magSize) {

                this.reloading = true;
                document.getElementById("gun-reloading-bar").style.transition = this.weapon.reloadTime/1000 + "s linear";
                document.getElementById("gun-reloading-bar").style.width = "100%";
                var oldSpeed = this.moveSpeed;
                this.speedModifier = 1/2;

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

                    play.speedModifier = 1;
                    document.getElementById("gun-reloading-bar").style.transition = "0s";
                    document.getElementById("gun-reloading-bar").style.width = "0";

                    if(Game.sound) reloadSound.play();
                }

            } else {
                //brak ammo lub pelen magazynek
            }
        }
    }

    hurt(ile) {
        this.hp -= ile;
    }

}

