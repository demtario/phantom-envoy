var maxHp = 1200,
    hp = 500;

function hpRefreash() {
    $('#life-bar').css('width', (hp/maxHp)*100+'%');
    $('#life-info').html(hp+'/'+maxHp); 
}

function hurtMe(ile) {
    if(hp > 0) hp -= ile;
    hpRefreash();
    
    if(hp <= 0) zgon();
}

function zgon() {
    $('#zgon').addClass('online');
}