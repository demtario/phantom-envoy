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
               <h1>Welcome back <span>Arthur</span></h1>
                <p>Choose your character</p>
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
                <a class="button" href="game.php">GRAJ</a>
           </div>
        </div>
        <div class="box">
            <div class="sterowanie">
               <h2>Sterowanie</h2>
                <span class="key">[W]</span> - Ruch do góry<br />
                <span class="key">[S]</span> - Ruch na dół<br />
                <span class="key">[A]</span> - Ruch w lewo<br />
                <span class="key">[D]</span> - Ruch w prawo<br />
                <span class="key">[E]</span> - Zmiana broni<br />
                <span class="key">[R]</span> - Przeładowanie broni<br />
            </div>
        </div>
        <script> //var sugesterChatOptions = {"login":"your user login","client_id":"your client id","info":"your additional data"}</script>
        <script src="https://cdn.intum.com/0/h/heseya/chat/JeQg5IY81hMejG4YWxho/widget.js"></script>
        
        <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    </body>
</html>