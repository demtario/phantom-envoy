<?php 
    $rand = rand(0,999999); 
?>
<!DOCTYPE HTML>
<html lang=”pl”>
    <head>
        <title>Phantom Envoy The Video Game</title>
        <meta charset="UTF-8">
        <meta name="description" content="template" />
        <meta name="keywords" content="Tutaj słowa kluczowe oddzielone przecinkiem" />
		<meta name="theme-color" content="#ffffff" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <link rel="Shortcut icon" href="img/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Lato:300,400&amp;subset=latin-ext" rel="stylesheet">
		<link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/game.css?<?php echo $rand; ?>" />
    </head>
    <body>
        
        <div class="user">
            <h1 id="username">Jonasz</h1>
            <div class="user-life">
                <div id="life-bar"></div>
                <div id="life-info"></div>
            </div>    
            <div class="user-mana">
                <div id="mana-bar"></div>
                <div id="mana-info"></div>
            </div>
        </div>
        
        <div class="asidearea">
            <div class="map">
                <canvas id="minimap"></canvas>
            </div>
        </div>
        
        <div class="killinfo">
            <p>Zabici</p>
            <h3 id="kills"></h3>
        </div>

        <div class="skillbar">

            <div class="skill" id="skill1">
                <img src="img/cover.jpg" />
            </div>

            <div class="skill" id="skill2">
                <img src="img/firstaid.png" >
                <div class="loading"></div>
                <div class="counter">0</div>
            </div>

            <div class="skill"></div>
            <div class="skill"></div>
        </div>
        
        <div class="guns">

            <div class="left">
                <h2 id="gun-name"></h2>
                <p><span id="gun-mag"></span>/<span id="gun-ammo"></span></p>
            </div>

            <div class="image">
                <img src="img/bron.jpg" />
                <div id="gun-reloading-bar"></div>
            </div>
        </div>

        <script type="text/javascript" src="js/functions.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/core.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/camera.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/map.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/player.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/enemy.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/weapon.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/powerup.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/cover.js?<?php echo $rand; ?>"></script>
    </body>
</html>
