var name = "AK-74M";
var magSize = 30;
var fireRate = 60000/650; //6000/RPM
var reloadTime = 3500; //miliseconds
var bulletVelocity = 600; //m/s
var damage = [18, 25];
var color = "#111"; //hex

var reloading = false;
var mag = 30;
var ammo = 120;
var mousedown = false;
var fireInterval;

function fire() {

    if (reloading == false) {
        if (mag > 0) {

            //strzał
            $("<div class='bullet' style='left:"+(x+50)+"px; bottom:"+(y+30)+"px;' ></div>").appendTo('.board');
            mag--;

        } else if (ammo > 0) {

            //brak amunicji w magazunku

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
            document.getElementById("gun-reloading-bar").style.transition = reloadTime/1000 + "s linear";
            document.getElementById("gun-reloading-bar").style.width = "100%";

            let reloadTimeout = setTimeout(function() { 

                if (mag > 0) {

                    ammo += mag;
                    mag = 0;
    
                }
                
                mag = ammo >= magSize ? magSize : ammo;
                ammo -= mag;
                reloading = false;

                document.getElementById("gun-reloading-bar").style.transition = "0s";
                document.getElementById("gun-reloading-bar").style.width = "0";

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

document.getElementById("gun-name").innerHTML = name;
document.getElementById("weapon").style.backgroundColor = color;
reload();
console.log("ready!");