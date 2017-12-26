var x = 100, y = 300;

player.css('bottom', y+'px');
player.css('left', x+'px');

var timeout;

document.addEventListener('keydown', (event) => {
    if( !timeout ) {
        if(event.keyCode == 38 || event.keyCode == 87) moveUp();
        if(event.keyCode == 39 || event.keyCode == 68) moveRight();
        if(event.keyCode == 40 || event.keyCode == 83) moveDown();
        if(event.keyCode == 37 || event.keyCode == 65) moveLeft();
//        console.log(x + ', ' + y);
        
        timeout = setTimeout(function() {

            // Reset timeout
            timeout = null;

        }, 100);
    }
    
}, false);

function moveUp() {
    if(board.height() - 85 - y < 40) y = board.height() - 85;
    else if(y < board.height() - 85) y += 40;
    player.css('bottom', y+'px');
}

function moveDown() {
    if(y < 40) y = 0;
    else if(y>0) y -= 40;
    player.css('bottom', y+'px');
}

function moveLeft() {
    if(x < 40) x = 0;
    else if(x > 0) x -= 40;
    player.css('left', x+'px');
}

function moveRight() {
    if(board.width() - 30 - x < 40) x = board.width() - 30;
    else if(x < board.width() - 30) x += 40;
    player.css('left', x+'px');
}

