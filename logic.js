let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("GAME STARTED");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 500);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 220);
}

function blinkRed() {
    document.querySelector('body').style.backgroundColor = "red";
    setTimeout(function () {
        document.querySelector('body').style.backgroundColor = "";
    }, 1000);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randbtn);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start`;
        blinkRed();
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
