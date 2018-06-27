class Player {
    constructor(name, startX, startY) {
        this.name = name;

        this.x = startX;
        this.y = startY;
        this.angle;
        this.moveSpeed = 120; // px/s

        this.maxHp = 2000;
        this.hp = this.maxHp;
        this.dead = false;

        this.maxMana = 200;
        this.mana = this.maxMana;

        this.size = 60;

        this.kills = 0;

        this.reloading = false;

        this.primaryWeapon = new Weapon('AK-47', 30, 650, 2500, 1200, 25, 36, 4, 'rifle1');
        this.secondaryWeapon = new Weapon('P90', 50, 900, 1800, 840, 18, 25, 8, 'rifle2');

        this.weapon = this.primaryWeapon;

        this.texture = new Image();
        this.texture.src = 'img/player-'+this.weapon.variant+'.png';

        this.bullets = [];
        
        this.medKits = 1;
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

        // Poruszanie postaci
        let skosik = Math.sqrt(2);
        let vX = 0;
        let vY = 0;

        if(Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) vX++; // Prawo
        if(Key.isDown(Key.LEFT) || Key.isDown(Key.A)) vX--; // Lewo

        if(Key.isDown(Key.UP) || Key.isDown(Key.W) ) vY--; // Góra
        if(Key.isDown(Key.DOWN) || Key.isDown(Key.S)) vY++; //Dół

        if(vX != 0 && vY != 0) this.move(vX, vY, skosik);
        else this.move(vX, vY);

        if(this.inVehicle) {
            this.x = this.currentVehicle.x;
            this.y = this.currentVehicle.y;
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

        // Strzelanie
        if(mouseDown) this.shoot();

        //Przeładowanie
        if(nowClicked == Controls.reload) {
            this.reloadWeapon();
            nowClicked = 'r';
        }

        //Zmiana broni
        if(nowClicked == Controls.changeWeapon || scrolling == true) {
            this.switchWeapon();
            nowClicked = 'e';
            scrolling = false;
        }

        // Wsiadka do pojazdu
        if(nowClicked == Controls.enterVehicle) {
            
            if(this.inVehicle) {
                this.exitVehicle()
            } else {
                this.enterVehicle(0)
            }

            nowClicked = 'f'
        }
        
        // Skille
        if(nowClicked == Controls.skill1) { //Osłona
            this.placeCover();
            nowClicked = '1';
        }
        
        if(nowClicked == Controls.skill2) { //Medkit
            this.useMedKit();
            nowClicked = '2';
        }
        if(this.healing) this.speedModifier = 0;

        if(nowClicked == Controls.skill3) { //Pojazd
            this.summonCar();
            nowClicked = '3';
        }

        //Regeneracja many
        if(!this.manaDelay && this.mana < this.maxMana){

            this.manaDelay = true;

            this.mana++;

            let currThis = this;
            setTimeout(function() { resetManaDelay(currThis); }, 1000);
            function resetManaDelay(THIS) {
                THIS.manaDelay = false;
            }
        }

        // Kąt obrotu
        this.angle = Math.atan2(cursorX - this.x + Game.camera.xView, - (cursorY - this.y + Game.camera.yView) )*(180/Math.PI) - 90;

        // Pozycja lufy
        this.weapon.barrelX = this.x + this.weapon.length * Math.cos((this.angle + 13) / (180/Math.PI));
        this.weapon.barrelY = this.y + this.weapon.length * Math.sin((this.angle + 13) / (180/Math.PI));
        
        this.guiUpdate();
        
        // Update pocisków
        for(var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update(i);
        }

    }
    
    guiUpdate() {
        // Aktualizacja GUI
        
        if(this.mana < 10) document.getElementById('skill1').classList = 'skill unactive';
        else document.getElementById('skill1').classList = 'skill';
        
        if(this.medKits == 0) document.getElementById('skill2').classList = 'skill unactive';
        else document.getElementById('skill2').classList = 'skill';

        document.getElementById('skill2').querySelector(".counter").innerHTML = this.medKits;

        document.getElementById("username").innerHTML = this.name;

        document.getElementById('life-bar').style.width = this.hp/this.maxHp*100+'%';
        document.getElementById("life-info").innerHTML = (this.hp+'/'+this.maxHp);

        document.getElementById('mana-bar').style.width = (this.mana/this.maxMana)*100+'%';
        document.getElementById("mana-info").innerHTML = (this.mana+'/'+this.maxMana);

        document.getElementById("kills").innerHTML = this.kills;

        document.getElementById("gun-mag").innerHTML = this.weapon.mag;
        document.getElementById("gun-ammo").innerHTML = this.weapon.ammo;
        document.getElementById("gun-name").innerHTML = this.weapon.name;
    }
    
    move(vx, vy, skos = 1) {
        let covers = isColiding(this.x + vx * this.moveSpeed/Game.fps*this.speedModifier / skos, this.y + vy * this.moveSpeed/Game.fps*this.speedModifier / skos, this, Game.covers);
        let area = isColiding(this.x + vx * this.moveSpeed/Game.fps*this.speedModifier / skos, this.y + vy * this.moveSpeed/Game.fps*this.speedModifier / skos, this, [{x: Game.world.width/2, y: Game.world.height/2, sizeX: Game.world.width-50, sizeY: Game.world.height-50}]);
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
        document.getElementById("gun-reloading-bar").style.height = "0";
        this.reloading = false;
        this.weapon.delay = false;

        this.texture.src = 'img/player-'+this.weapon.variant+'.png';
    }
    
    reloadWeapon() {
        if(this.reloading == false && this.speedModifier==1) {

            if(this.weapon.ammo > 0 && this.weapon.mag < this.weapon.magSize) {

                this.reloading = true;
                document.getElementById("gun-reloading-bar").style.transition = this.weapon.reloadTime/1000 + "s linear";
                document.getElementById("gun-reloading-bar").style.height = "100%";
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
                    document.getElementById("gun-reloading-bar").style.height = "0";

                    if(Game.sound) reloadSound.play();
                }

            } else {
                //brak ammo lub pelen magazynek
            }
        }
    }
    
    placeCover() {
        if(this.mana >= 10) {
            Game.covers.push(new Cover(0, cursorX + Game.camera.xView, cursorY + Game.camera.yView, 50, 20000, this, Game.covers));
            this.mana -= 10;
        }
    }

    summonCar() {
        Game.vehicles.push(new Vehicle(Game.vehicles.length, Game.vehicles, cursorX + Game.camera.xView, cursorY + Game.camera.yView))
    }
    
    useMedKit() {
        if(this.medKits > 0 && this.hp != this.maxHp && !this.healing) {
            
            this.healing = true;
            this.medKits--;
            
            document.getElementById('skill2').querySelector(".loading").style.height = '100%';
            document.getElementById('skill2').querySelector(".loading").style.transition = "1.5s linear";

            let THIS = this;
            setTimeout(function() {
                THIS.hp += 200;
                if(THIS.hp > THIS.maxHp) THIS.hp = THIS.maxHp;
                console.log('healed');
                THIS.healing = false;

                document.getElementById('skill2').querySelector(".loading").style.height = '0';
                document.getElementById('skill2').querySelector(".loading").style.transition = "0s";
            }, 1500);
            
            
        }
        
    }

    enterVehicle(index) {
        Game.vehicles[index].playerEnter()
        this.inVehicle = true;
        this.currentVehicle = Game.vehicles[index];
    }

    exitVehicle() {
        this.currentVehicle.playerExit()
        this.inVehicle = false;
        this.currentVehicle = null;
    }

    hurt(ile) {
        this.hp -= ile;
    }

}

