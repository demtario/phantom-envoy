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

        <div class="ster">
            <h2>Sterowanie</h2>

            <h3>Poruszanie</h3>
            <p><span class="key">[W]</span> - Ruch do góry</p>
            <p><span class="key">[S]</span> - Ruch na dół</p>
            <p><span class="key">[A]</span> - Ruch w lewo</p>
            <p><span class="key">[D]</span> - Ruch w prawo</p>

            <h3>Umiejętności</h3>
            <p><span class="key">[PPM]</span> - Strzał</p>

            <p><span class="key">[E]</span> - Zmiana broni</p>
            <p><span class="key">[R]</span> - Przeładowanie broni</p>
            <p><span class="key">[1]</span> - Ustawienie osłony (koszt 10 many)</p>
            <p><span class="key">[2]</span> - Użycie apteczki</p>

            <h3>Generalne</h3>
            <p><span class="key">[SHIFT]</span> - Sprint</p>
            <p><span class="key">[ESC]</span> - Pauza</p>
        </div>
        
        <div class="box">
           <div class="characters">
              <h1>Phantom Envoy</h1>
              <h3><span>The Video Game</span></h3>
              <a class="button" href="game.php">GRAJ</a>
           </div>
        </div>
        
        <div class="changelog">
            <h2>ChangeLog</h2>
            <ul>
                <li>
                    <p>Beta 0.5 <i>(04.02.2018r)</i></p>
                    <ol>
                        <li>Apteczki jako skill</li>
                        <li>Minimapka</li>
                        <li>Nowe Gui</li>
                        <li>Nowy system kolizji</li>
                    </ol>
                </li>
                <li>
                    <p>Beta 0.4 <i>(29.01.2018r)</i></p>
                    <ol>
                        <li>Stawianie klocków</li>
                        <li>Przeciwnicy snajperzy!</li>
                        <li>Pozbycie się jQuery xdd</li>
                        <li>Poprawa w systemie fal</li>
                        <li>Przeciwnicy nie respią Ci się na mordce</li>
                        <li>Tekstury</li>
                    </ol>
                </li>
                <li>
                    <p>Beta 0.3 <i>(20.01.2018r)</i></p>
                    <ol>
                        <li>Mapa większa niż obszar monitora</li>
                        <li>Powerupy w postaci pakietów życia i amunicji</li>
                        <li>Kamera</li>
                        <li>Pauza</li>
                        <li>Sprint</li>
                        <li>Rozrzut broni</li>
                    </ol>
                </li>
                <li>
                    <p>Beta 0.2 <i>(28.12.2017r)</i></p>
                    <ol>
                        <li>Przeciwnik zombie</li>
                        <li>Pierwsza wersja systemu fal</li>
                        <li>Punktacja po śmierci</li>
                        <li>Ekran końcowy</li>
                    </ol>
                </li>
                <li>
                    <p>Beta 0.1 <i>(28.12.2017r)</i></p>
                    <ol>
                        <li>Gracz może się poruszać</li>
                        <li>Gui się aktualizuje</li>
                        <li>Działa system przeładowwywania i strzelania</li>
                    </ol>
                </li>
            </ul>
        </div>

        <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    </body>
</html>
