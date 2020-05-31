let player = document.querySelector('.player');
let block = document.querySelector('.block');


playerData = {
    width: 112,
    height: 153
}

let isGround = true;
let isGame = true;
let isSlashDown = false;
let windowWidth = document.documentElement.offsetWidth;

let acceleration = 1.5;

window.addEventListener('keydown', (event)=>{
    if (event.key == "ArrowUp") {
        startJump();
    }
    if (event.key =="ArrowDown") {
        isGround = false;
        slashDown();
    }
    if (event.key =="ArrowRight") {
        slashLeft();
    }
})


let currentPlayerOffsetLeft = 30;
function slashLeft() {
    currentPlayerOffsetLeft+=10;
    player.style.left=currentPlayerOffsetLeft+'px';
    if (currentPlayerOffsetLeft<100)
    setTimeout(()=>{
        slashLeft()
    }, 30)
}

function slashDown() {
    if (!isGround) {
        isSlashDown = true;
        isUp=-1;
        accelerationStep=0.85;
        // currentOffsetY=0;
        // function startSlashDown() {
        //     setTimeout(()=>{
        //         currentOffsetY-=10;
        //         player.style.bottom = currentOffsetY; 
        //     }, 30)
        // }
    }
}



let currentOffsetPlayer=200;
let isUp=1;

function startJump() {
    if (player.style.bottom=="200px" || player.style.bottom=="")
        jump()
}

let accelerationStep = 0.05;

function jump() {
    setTimeout(() => {
        console.log(currentOffsetPlayer, ' ', isUp, ' ', acceleration)
        currentOffsetPlayer+=(10*acceleration)*isUp;
        

        if (isUp==1) {
            acceleration=(acceleration<=0) ? acceleration : acceleration-accelerationStep;
        } else {
            acceleration=(acceleration>1.5) ? acceleration : acceleration+accelerationStep;
        }

        player.style.bottom = currentOffsetPlayer+'px';

        if (acceleration<=0) {
            isUp=-1;
        }
          
        if (isUp==-1 && currentOffsetPlayer<200) {
            isGround = true;
            accelerationStep = 0.05;
            acceleration = 1.5;
            player.style.bottom = "200px"
            currentOffsetPlayer=200;
            isUp=1;
            return
        }
            

        jump()
    }, 15);
}

let blocksReadyToRegenerate = 0;
let prevBlockRange = 0;


function genRand() {
    let rand = Math.random()*-200;
    prevBlockRange+=rand;
    return rand;
}

function startMoving(block, index) {

    
    let currentOffset=-100+(-index*200)+prevBlockRange+genRand();
    console.log(-100+(-index*100))
    console.log()

    let id = setInterval(() => {
        if (!isGame) return
        if (currentOffset>windowWidth) {
            clearInterval(id)
            blocksReadyToRegenerate++;
            if (blocksReadyToRegenerate == arrayOfBlocks.length) {
                blocksReadyToRegenerate = 0;
                prevBlockRange = 0;
                arrayOfBlocks.forEach((item, index) => {
                    startMoving(item, index)
                })
            }
           // startMoving(block)
        }
        currentOffset+=10;
        block.style.right = currentOffset+'px'; 
        if (block.offsetLeft < player.offsetLeft+playerData.width-50 && block.offsetLeft > player.offsetLeft+50
            ||
            block.offsetLeft+50 < player.offsetLeft+playerData.width-50 && block.offsetLeft+50 > player.offsetLeft+50
            ) {
            if (block.offsetTop>player.offsetTop &&
                block.offsetTop<(player.offsetTop+playerData.height)) {
                    //player.style.backgroundImage = 'url(img/playerDed.png)';
                    player.style.transform = 'rotateZ(90deg)'
                    clearInterval(id)
                    isGame = false;
                
                   //clearInterval(id);
            }
        }
    }, 20); 
    
}

let arrayOfBlocks = Array.from(document.querySelectorAll('.block'));
arrayOfBlocks.forEach((item, index) => {
    startMoving(item, index)
})


function blockGenerator() {
        let newBlock = document.createElement('div')
        newBlock.className = "block"
}


let currentFrame = 0;
function walkAnimation() {
    setTimeout(() => {
        
       // player.style.backgroundPosition = boolForWalk ? 'left' : "right";
        player.style.backgroundPositionX = (-playerData.width*currentFrame)+'px';
        currentFrame = (currentFrame!=5) ? currentFrame+1 : 0;
        walkAnimation()
    }, 100)
}

walkAnimation()

