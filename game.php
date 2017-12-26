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
        
        <div class="gui">
            <div class="info">
                <h1>Jonas Skarabeusz</h1>
                <p>Zabójca  - 20 lvl</p>
                <div id="life">
                    <div id="life-bar"></div>
                    <div id="life-info"></div>
                </div>
                
                <div id="exp">
                    <div id="exp-bar"></div>
                    <div id="exp-info">600/1200</div>
                </div>
            </div>
            <button onclick="hurtMe(50);">Zrań mnie!</button>
            <div id="gun">
                <div id="gun-name"></div>
                <div id="gun-mag"></div>
                <div id="gun-ammo"></div>
                <div id="gun-reloading"></div>
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