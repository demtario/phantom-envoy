var npcCount = 0;
function createNpc() {
    npcCount++;
    var nX = Math.round(Math.random()*(board.width() - 100));
    var nY = Math.round(Math.random()*(board.height() - 30));
    $("<div class='npc' id='npc"+npcCount+"' style='left:"+nX+"px; bottom:"+nY+"px;' ></div>").appendTo('.board');
}

var enemyCount = 0;
function createEnemy() {
    enemyCount++;
    var nX = Math.round(Math.random()*(board.width() - 100));
    var nY = Math.round(Math.random()*(board.height() - 30));
    $("<div class='enemy' id='npc"+enemyCount+"' style='left:"+nX+"px; bottom:"+nY+"px;' ></div>").appendTo('.board');
}

createNpc();
createEnemy();
