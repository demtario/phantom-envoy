var name = "AK-74M";
var magSize = 30;
var fireRate = 60000/650; //6000/RPM
var reloadTime = 3500; //miliseconds
var bulletVelocity = 600; //m/s
var damage = [18, 25];

var reloading = false;
var mag = 30;
var ammo = 120;
var mousedown = false;
var fireInterval;

document.getElementById("gun-name").innerHTML = name;
reload();

function fire() {

    if (reloading == false) {
        if (mag > 0) {

            //strzał
            $("<div class='bullet' style='left:"+(x+50)+"px; bottom:"+(y+30)+"px;' ></div>").appendTo('.board');
            mag--;

        } else if (ammo > 0) {

            //brak amunicji w magazunku
            reload();

        } else {

            //brak amunicji

        }

        gunGUI();
    }

}

function reload() {

    if (reloading == false) {

        if (ammo > 0 && mag < magSize) {

            reloading = true;

            let reloadTimeout = setTimeout(function() { 

                if (mag > 0) {

                    ammo += mag;
                    mag = 0;
    
                }
                
                mag = ammo >= magSize ? magSize : ammo;
                ammo -= mag;
                reloading = false;

                gunGUI();

            }, reloadTime); 

        } else {

            //brak amunicji lub pełen magazynek

        }

        gunGUI();

    }

}

function gunGUI() {

    document.getElementById("gun-mag").innerHTML = mag;
    document.getElementById("gun-ammo").innerHTML = ammo;

    if (reloading == true) 
        document.getElementById("gun-reloading").innerHTML = "reloading";
    else
        document.getElementById("gun-reloading").innerHTML = "";

}

document.addEventListener('keydown', (event) => {
    const key = event.keyCode;

    if(key == 82)
        reload();

  });

document.addEventListener('mousedown', (event) => {

    fireInterval = setInterval(fire, fireRate);

});

document.addEventListener('mouseup', (event) => {

    clearInterval(fireInterval);
    
});