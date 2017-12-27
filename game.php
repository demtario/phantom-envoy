<?php 
    $rand = rand(0,999999); 
?>
<!DOCTYPE HTML>
<html lang=”pl”>
    <head>
        <title>Game</title>
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
    <body onload="">
        
        <div class="board">
            <div class="player" id="player1">
                <div id="weapon"></div>
            </div>
            
            
        </div>
        
        <div class="user">
            <img src="img/face.jpg" class="user-picture" />
            <h1>Jonas Skarabeusz</h1>
            <div class="user-life">
                <div id="life-bar"></div>
                <div id="life-info"></div>
            </div>    
            <div class="user-mana">
                <div id="mana-bar"></div>
                <div id="mana-info">500/1000</div>
            </div>
        </div>
        
        <div class="map"></div>
        
        <div class="guns">
            <h2 id="gun-name">Ak-47</h2>
            <p><span id="gun-mag"></span>/<span id="gun-ammo"></span></p>
            <img src="img/bron.jpg" />
            <div id="gun-reloading">
                <div id="gun-reloading-bar"></div>
            </div>
        </div>
        
        <div id="zgon">
            <div class="modal">
                <p>Umarłeś!</p>
                <a href="game.php">Spróbuj ponownie</a>
            </div>
        </div>
        
        <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
        <script type="text/javascript" src="js/core.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/movement.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/life.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/gun.js?<?php echo $rand; ?>"></script>
        <script type="text/javascript" src="js/npc.js?<?php echo $rand; ?>"></script>
    </body>
</html>