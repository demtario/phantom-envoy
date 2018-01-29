<?php 
    $rand = rand(0,999999); 
?>
<!DOCTYPE HTML>
<html lang=”pl”>
    <head>
        <title>Phantom Envoy Game</title>
        <meta charset="UTF-8">
        <meta name="description" content="template" />
        <meta name="keywords" content="Tutaj słowa kluczowe oddzielone przecinkiem" />
		<meta name="theme-color" content="#ffffff" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <link rel="Shortcut icon" href="img/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Lato:300,400&amp;subset=latin-ext" rel="stylesheet">
		<link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/main.css?<?php echo $rand; ?>" />
    </head>
    <body onload="">
        
        <div class="box">
           <div class="characters">
              <a class="button" href="game.php">GRAJ</a>
               <h1>Podaj <span>login</span></h1>
<!--                <p>Let's the show begin</p>-->
<!--
                <div class="char">
                    <p>Jonas Skarabeusz</p>
                    <p>20 lvl</p>
                    <p>Zabójca</p>
                </div>
                <div class="char">
                    <p>Zabijaka</p>
                    <p>20 lvl</p>
                    <p>Klasa</p>
                </div>
-->

              <form action="room.php">
                  <input type="text" name="nickname">
                  <button type="submit" class="button">Kontunuuj</button>
              </form>
           </div>
        </div>
        
        <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    </body>
</html>
