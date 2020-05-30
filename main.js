let player = document.querySelector('.player');
let block = document.querySelector('.block');

window.addEventListener('keydown', (event)=>{
    if (event.key == "ArrowUp") {
        jump();
    }
})

let currentOffsetPlayer=200;
let isUp=1;
function jump() {
    setTimeout(() => {
        console.log(currentOffsetPlayer)
        currentOffsetPlayer+=10*isUp;
        player.style.bottom = currentOffsetPlayer+'px';

        if (currentOffsetPlayer>400) 
            isUp=-1;
        if (isUp==-1 && currentOffsetPlayer==200) {
            currentOffsetPlayer=200;
            isUp=1;
            return
        }
            

        jump()
    }, 15);
}

function startMoving() {
    let currentOffset=-100;
    let id = setInterval(() => {
        if (currentOffset>1000) {
            clearInterval(id)
            startMoving()
        }
        currentOffset+=10;
        block.style.right = currentOffset+'px'; 
        if (block.offsetLeft < player.offsetLeft+100 && block.offsetLeft > player.offsetLeft
            ||
            block.offsetLeft+50 < player.offsetLeft+100 && block.offsetLeft+50 > player.offsetLeft
            ) {
            if (block.offsetTop>player.offsetTop &&
                block.offsetTop<(player.offsetTop+100)) {
                    player.style.backgroundImage = 'url(img/playerDed.png)';
                    clearInterval(id);
            }
        }
    }, 20); 
    
}



startMoving()