const body = document.querySelector('body');
const slider = document.querySelector('.slider');
const itImg = document.querySelectorAll('.slider .item item');
const boardImage = document.querySelector('.hero-enlr')
const heroCards = document.querySelectorAll('.hero-card');
const veil = document.querySelector('.veil');
const crossBtn = document.querySelector('.crossBtn');
const controlIcon = document.querySelector(".control-icon");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const items = document.querySelectorAll('.slider .item')
const turnControl = document.querySelector('.turn-control-div');
const leftControl = document.querySelector('.left-control');
const rightControl = document.querySelector('.right-control');
const quantity = 10;

const navDiv = document.querySelector('.nav-div')
const heroCont = document.querySelector('.imgcontainer');
const heroImg = document.querySelector('.hero-enlr');
const liveImg = document.querySelector('.live-img');
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');


let currentCard = null; 
let flipWrapper = null;
let infoContainer = null;
let livimgCont = null;

document.addEventListener('DOMContentLoaded', () => {
    const guideDiv = document.querySelector('.guide-div');
    const clsBtn = document.querySelector('.clsbtn');
    

    let hasSeenGuide = sessionStorage.getItem('guideDismissed');

    if(!hasSeenGuide){
        guideDiv.style.display = 'block';
        stopAnimation();
    }

    if(hasSeenGuide){
        guideDiv.style.display = "none";
        startAnimation();
    }

    clsBtn.addEventListener('click', () => {
        guideDiv.classList.add('fade-out');
        setTimeout(startAnimation, 400);
        sessionStorage.setItem('guideDismissed', 'true');
    });
});


function showCurrentCard(ID) {
    
    heroCards.forEach(card => {
        card.style.display = 'none';
    });

    
    currentCard = document.getElementById(`hero-${ID}`);
    if (!currentCard) return;

    
    flipWrapper = currentCard.querySelector('.film-wrapper');
    infoContainer = currentCard.querySelector('.container');
    livimgCont = currentCard.querySelector('.backLeft');

   
    currentCard.style.display = 'block';
    flipWrapper.style.transform = 'rotateY(0deg)';
    infoContainer.style.display = 'none';
    livimgCont.style.display = 'none';

    rFlipped = false;
    lFlipped = false;
    rightBtn.style.opacity = '1';
    leftBtn.style.opacity = '1';
    rightBtn.style.pointerEvents = 'auto';
    leftBtn.style.pointerEvents = 'auto';
}

const glitchTarget = document.querySelector('#h3-data-cont');

function triggerGlitch() {
    glitchTarget.classList.add('glitch-active');

    setTimeout(() => {
        glitchTarget.classList.remove('glitch-active');
    }, 1000);

} 

rightBtn.addEventListener("click", () => {
    if (!currentCard || !flipWrapper) return;

    if (!rFlipped && !lFlipped){
        flipWrapper.style.transform = 'rotateY(180deg)';
        infoContainer.style.display = 'block';
        livimgCont.style.display = 'none';

        rightBtn.style.opacity = '0.5';
        rightBtn.style.pointerEvents = 'none';
        rFlipped = true;
        setInterval(triggerGlitch, 5000);
    }

    if (lFlipped) {
        flipWrapper.style.transform = 'rotateY(0deg)';

        lFlipped = false;
        leftBtn.style.opacity = '1';
        leftBtn.style.pointerEvents = 'auto';
    }
});

leftBtn.addEventListener('click', () => {
    if (!currentCard || !flipWrapper) return;

    if (!lFlipped && !rFlipped){
        flipWrapper.style.transform = 'rotateY(-180deg)';
        livimgCont.style.display = 'block';
        infoContainer.style.display = 'none';

        leftBtn.style.opacity = '0.5';
        leftBtn.style.pointerEvents = 'none';
        lFlipped = true;
    }

    if (rFlipped) {
        flipWrapper.style.transform = 'rotateY(0deg)';

        rFlipped = false;
        rightBtn.style.opacity = '1';
        rightBtn.style.pointerEvents = 'auto';
    }
});



isPaused = false;

function stopAnimation() {
    slider.style.animationPlayState = 'paused';
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

function startAnimation() {
    slider.style.animationPlayState = 'running';
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}

pauseBtn.addEventListener("click", () => {
    if (isPaused == false){
        isPaused = true;  
         stopAnimation();
    }
})

playBtn.addEventListener('click', () => {
    if (isPaused == true){
        isPaused = false;    
        startAnimation();
    }
})


items.forEach(item => {
    item.addEventListener('click', () => {
        const ID = item.dataset.id;

        showCurrentCard(ID);
        
        veil.style.display = 'block';
        navDiv.style.display = 'inline';

        if (!isPaused) {
            isPaused = true;
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'block';
            stopAnimation();
        }
    });
});

crossBtn.addEventListener('click', () => {
    heroCards.forEach(card => {
        card.style.display = 'none';
    });
    veil.style.display = 'none';
    navDiv.style.display = 'none';

    if (isPaused) {
        isPaused = false;

        startAnimation();
    }
});



    













