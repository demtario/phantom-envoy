class Player {
    constructor(name, startX, startY) {
        this.name = name;

        this.x = startX;
        this.y = startY;
        this.angle;
        this.moveSpeed = 120; // px/s

        this.texture = new Image();

        this.maxHp = 1000;
        this.hp = this.maxHp;
        this.dead = false;

        this.maxMana = 200;
        this.mana = this.maxMana;

        this.kills = 0;

        this.reloading = false;

        this.primaryWeapon = new Weapon('AK-47', 30, 650, 2500, 1200, 25, 36, 4, 'rifle1');
        this.secondaryWeapon = new Weapon('P90', 50, 900, 1800, 840, 18, 25, 8, 'rifle2');

        this.weapon = this.primaryWeapon;

        this.texture.src = 'img/player-'+this.weapon.variant+'.png';

        this.bullets = [];
    }
    
    draw(context, xView, yView) {
        // Pociski
        for(var i = 0; i < this.bullets.length; i++) this.bullets[i].init(context);
    
        // Postać
        context.save();
        context.translate(this.x - xView, this.y - yView);
        context.rotate(this.angle * Math.PI/180);

        context.drawImage(this.texture, -40, -50, 120, 90);

        context.restore();
    }
    
    update() {

        if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.move(1, 0); // Prawo
        if(Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.move(-1, 0); // Lewo

        if(Key.isDown(Key.UP) || Key.isDown(Key.W) )this.move(0, -1); // Góra
        if(Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.move(0, 1); //Dół


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
        if(Key.isDown(Key.SHIFT) && !this.reloading && this.mana > 0) {
            this.speedModifier = 1.4;
            this.sprint = true;
        }
        else if(this.reloading) {
            this.sprint = false;
        } else {
            this.speedModifier = 1;
            this.sprint = false;
        }

        // Stawianie klocka hyhyhy
        if(nowClicked == 49 && this.mana > 0) {
            Game.covers.push(new Cover(0, cursorX + Game.camera.xView, cursorY + Game.camera.yView, 50, this, this.cover));
            this.mana -= 10;
            nowClicked = '1';
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

        // Pozycja lufy
        this.weapon.barrelX = this.x + this.weapon.length * Math.cos((this.angle + 13) / (180/Math.PI));

        this.weapon.barrelY = this.y + this.weapon.length * Math.sin((this.angle + 13) / (180/Math.PI));

    }
    
    move(vx, vy, skos = 1) {
        let covers = isColiding(this.x + vx * this.moveSpeed/Game.fps*this.speedModifier / skos, this.y + vy * this.moveSpeed/Game.fps*this.speedModifier / skos, Game.covers);
        let area = isColiding(this.x + vx * this.moveSpeed/Game.fps*this.speedModifier / skos, this.y + vy * this.moveSpeed/Game.fps*this.speedModifier / skos, [{x: Game.world.width/2, y: Game.world.height/2, sizeX: Game.world.width-50, sizeY: Game.world.height-50}]);
        if(area && !covers) {
            this.x += vx * this.moveSpeed/Game.fps*this.speedModifier / skos;
            this.y += vy * this.moveSpeed/Game.fps*this.speedModifier / skos
        }
    }
    
    shoot() {
        if(this.weapon.mag > 0 && !this.sprint) {

            if(!this.reloading) {

                if(!this.weapon.delay) {

                    // Strzal
                    let damageRand = Math.floor(Math.random()*(this.weapon.damage[1]-this.weapon.damage[0]+1)+this.weapon.damage[1]);

                    let dispersion = (this.angle+(Math.round(Math.random()*this.weapon.dispersion)-(this.weapon.dispersion/2))+90) * Math.PI/180;

                    let newBullet = new Bullet(this.bullets.length, this.weapon.barrelX, this.weapon.barrelY, this.weapon.bulletVelocity, dispersion, damageRand, this, this.bullets);
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

        this.texture.src = 'img/player-'+this.weapon.variant+'.png';
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

