var cookie_btn = document.getElementById('cookie_btn');
var btn_start = document.getElementById('btn_start');
var btn_restart = document.getElementById('btn_restart');
var btn_continue = document.getElementById('btn_continue');
var btn_pause = document.getElementById('btn_pause');
var btn_finish = document.getElementById('btn_finish');

var timer = document.getElementById('timer');
var clicks = document.getElementById('clicks');

var small_cookie_container = document.getElementById('small_cookie_container');
var audio = document.getElementById('audio');

const finish_overlay = document.getElementById('finish_overlay');

var clicks_counter = document.getElementById('clicks_counter');
var cps_counter = document.getElementById('cps_counter');

var counter = 0;
var maxCPS = 0;
var currentCPS = 0;
var countdown;
var paused = false;

btn_start.addEventListener('click', () => {
    cookie_btn.disabled = false;
    btn_start.style.display = 'none';
    btn_pause.style.display = 'flex';
    startTime();
});

btn_pause.addEventListener('click', () => {
    cookie_btn.disabled = true;
    btn_continue.style.display = 'flex';
    btn_restart.style.display = 'flex';
    btn_pause.style.display = 'none';
    pauseTime();
});

btn_restart.addEventListener('click', () => {
    cookie_btn.disabled = false;
    btn_continue.style.display = 'none';
    btn_restart.style.display = 'none';
    btn_pause.style.display = 'flex';
    restartTime();
});

btn_continue.addEventListener('click', () => {
    cookie_btn.disabled = false;
    btn_continue.style.display = 'none';
    btn_restart.style.display = 'none';
    btn_pause.style.display = 'flex';
    continueTime();
});

cookie_btn.addEventListener('click', () => {

    counter ++;
    currentCPS ++;
    clicks.innerText = 'CLICKS: ' + counter;

    audio.play();
    createFallingIMG();
});

btn_finish.addEventListener('click', () => {
    hideFinishCard();
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }
    return '0' + minutes + ':' + remainingSeconds;
}

function startTime() {
    clearInterval(countdown);
    let time = 60;
    paused = false;
    timer.innerText = formatTime(time);
    timer.style.color = '#424242';

    countdown = setInterval(function() {
        if(!paused) {
            time--;
            timer.innerText = formatTime(time);
            if (time <= 10) {
                timer.style.color = '#9A1515';
            }
            if (time <= 0) {
                clearInterval(countdown);
                showFinishCard();
                timer.innerText = '01:00';
            }
            if (currentCPS > maxCPS) {
                maxCPS = currentCPS;
            }
            currentCPS = 0;
        }
    }, 1000);
}

function pauseTime() {
    paused = true;
}

function restartTime() {
    clearInterval(countdown);
    counter = 0;
    currentCPS = 0;
    maxCPS = 0;
    clicks.innerText = 'CLICKS ' + counter;
    startTime();
}

function continueTime() {
    paused = false;
}

function createFallingIMG() {
    let falling_img = document.createElement('img');
    falling_img.src = './img/small_cookie.svg';
    falling_img.classList.add('falling_image');
    falling_img.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    small_cookie_container.appendChild(falling_img);
    
    setTimeout(() => {
        falling_img.style.top = (window.innerHeight - 50) + 'px';
    });

    falling_img.addEventListener('transitionend', () => {
        falling_img.remove();
    });
}

function showFinishCard() {
    finish_overlay.style.display = 'block';
    clicks_counter.innerText = counter;
    cps_counter.innerText = maxCPS;
}

function hideFinishCard() {
    finish_overlay.style.display = 'none';
    cookie_btn.disabled = true;
    btn_start.style.display = 'flex';
    btn_pause.style.display = 'none';
    counter = 0;
    maxCPS = 0;
    clicks.innerText = 'CLICKS: ' + counter;
    timer.style.color = '#424242';
}

